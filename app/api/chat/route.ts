import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are Vyapar Mitra, an expert Indian business advisor. You help first-time entrepreneurs in India start businesses. You know about Indian legal requirements (GST, Udyam, FSSAI), government schemes (Mudra, CGTMSE, Startup India), and business ideas suited for Indian markets. 

CRITICAL MAP INSTRUCTION: If the user asks for the location of a government office (e.g. MSME-DI, DIC, FSSAI, Bank, CSC, Incubator) or asks "where can I register", "show me nearby offices", etc., you MUST include exactly this tag in your response: [MAP:OfficeType-City] or [MAP:OfficeType]. For example: [MAP:MSME-DI].`;

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { language, sessionId } = body;
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const businessIdeaId = body.businessIdeaId ? parseInt(body.businessIdeaId, 10) : null;
    if (messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400, headers: corsHeaders });
    }
    if (businessIdeaId !== null && (isNaN(businessIdeaId) || businessIdeaId < 1)) {
      return NextResponse.json({ error: 'Invalid business idea ID' }, { status: 400, headers: corsHeaders });
    }

    // 1. Auth check
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. Rate Limiting Check
    const isAllowed = await checkRateLimit(userId);
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded (50 msgs/hr).' }, { status: 429, headers: corsHeaders });
    }

    // 3. Fetch User Profile for Context Injection
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    let contextStr = `[User Context]\n`;
    if (profile) {
      if (profile.city) contextStr += `- Location: ${profile.city}\n`;
      if (profile.investment_budget) contextStr += `- Budget: ${profile.investment_budget}\n`;
    }
    contextStr += `- Preferred Language: ${language || 'english'}\n`;

    // Check if Hinglish is requested
    if (language === 'hinglish') {
      contextStr += `- INSTRUCTION: You MUST reply in conversational Hinglish (Hindi written in English alphabet, mixed with English terms). Use phrases like "Bhai, tension mat lo", "Zabardast idea hai!".`;
    } else {
      contextStr += `- INSTRUCTION: You MUST reply in clear, professional Standard English. Do NOT use Hindi or Hinglish words.`;
    }

    // Fetch business idea context if provided
    let businessContext = '';
    if (businessIdeaId) {
      const { data: idea } = await supabase
        .from('business_ideas')
        .select('title, category, investment_min, investment_max, required_licenses, description, pros, cons')
        .eq('id', businessIdeaId)
        .single();

      if (idea) {
        businessContext = `\n[Selected Business Idea]\n- Name: ${idea.title}\n- Category: ${idea.category}\n- Description: ${idea.description}\n- Pros: ${idea.pros?.join(', ') || 'N/A'}\n- Cons: ${idea.cons?.join(', ') || 'N/A'}\n- Investment: ₹${idea.investment_min.toLocaleString('en-IN')} - ₹${idea.investment_max.toLocaleString('en-IN')}\n- Required Licenses: ${idea.required_licenses.join(', ')}\n`;
        
        // Fetch active checklist tasks
        const { data: checklist } = await supabase
          .from('checklists')
          .select('id')
          .eq('user_id', userId)
          .eq('business_idea_id', businessIdeaId)
          .single();

        if (checklist) {
          const { data: tasks } = await supabase
            .from('checklist_tasks')
            .select('title, status, category')
            .eq('checklist_id', checklist.id)
            .order('sort_order');
            
          if (tasks && tasks.length > 0) {
            businessContext += `\n[User's Current Checklist Workflow]\n`;
            tasks.forEach(t => {
              businessContext += `- [${t.status === 'completed' ? 'Completed' : 'Pending'}] ${t.title} (${t.category})\n`;
            });
            businessContext += `\nINSTRUCTION: The user is currently following this workflow. If they ask about next steps, refer to their pending tasks.\n`;
          }
        }
      }
    }

    const groqMessages = [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\n${contextStr}${businessContext}` },
      ...messages
    ];

    // 4. Initialize Chat Session in Supabase
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      const userMessage = messages.find(m => m.role === 'user');
      const { data: newSession, error: sessionErr } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: userId,
          title: userMessage?.content.substring(0, 40) || 'New Chat',
          messages: messages,
          business_idea_id: businessIdeaId || null
        })
        .select()
        .single();

      if (sessionErr || !newSession) {
        console.error('Error creating session:', sessionErr);
        return NextResponse.json({ error: 'Failed to create chat session' }, { status: 500, headers: corsHeaders });
      }
      currentSessionId = newSession.id;
    } else {
      await supabase
        .from('chat_sessions')
        .update({ messages: messages })
        .eq('id', currentSessionId);
    }
    // 5. Call Groq API with streaming
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${await response.text()}`);
    }

    // 6. Proxy the stream & intercept chunks to save the AI's final response to DB
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        let streamBuffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process any remaining buffer
              if (streamBuffer.trim()) {
                 const lines = streamBuffer.split('\n').filter(line => line.trim() !== '');
                 for (const line of lines) {
                   if (line.startsWith('data: ')) {
                     const data = line.replace('data: ', '');
                     if (data === '[DONE]') continue;
                     try {
                       const parsed = JSON.parse(data);
                       const token = parsed.choices[0]?.delta?.content || '';
                       fullResponse += token;
                     } catch (e) {}
                   }
                 }
              }
              break;
            }

            // Forward chunk to client immediately
            controller.enqueue(value);

            // Decode and parse chunk to accumulate the final AI response
            const chunk = decoder.decode(value, { stream: true });
            streamBuffer += chunk;
            
            const lines = streamBuffer.split('\n');
            // Keep the last element in the buffer because it might be incomplete
            streamBuffer = lines.pop() || '';
            
            for (const line of lines) {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.replace('data: ', '');
                if (data === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(data);
                  const token = parsed.choices[0]?.delta?.content || '';
                  fullResponse += token;
                } catch (e) {
                  // Ignore JSON parse errors on incomplete chunks
                }
              }
            }
          }

          // Stream is finished. Save the final AI response to Supabase
          if (currentSessionId && fullResponse) {
            const updatedMessages = [...messages, { role: 'assistant', content: fullResponse }];
            const { error: updateError } =             await supabase
              .from('chat_sessions')
              .update({
                messages: updatedMessages,
                message_count: updatedMessages.length
              })
              .eq('id', currentSessionId);
            if (updateError) console.error('Error saving messages:', updateError);
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    const headers = new Headers(response.headers);
    if (currentSessionId) {
      headers.set('X-Session-ID', currentSessionId);
    }
    
    // Add CORS headers to the response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new Response(stream, {
      status: 200,
      headers
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

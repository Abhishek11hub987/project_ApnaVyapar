import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { checkRateLimit } from '@/lib/utils/rate-limit';
import { streamGroqResponse } from '@/lib/ai/stream';
import type { ChatMessage } from '@/lib/ai/stream';
import { VYAPAR_MITRA_SYSTEM_PROMPT } from '@/lib/ai/prompts';

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

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { 
        cookies: { 
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })); } catch (error) {} }
        } 
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const isAllowed = await checkRateLimit(userId);
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded (50 msgs/hr).' }, { status: 429, headers: corsHeaders });
    }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

    let contextStr = `[User Context]\n`;
    if (profile) {
      if (profile.city) contextStr += `- Location: ${profile.city}\n`;
      if (profile.investment_budget) contextStr += `- Budget: ${profile.investment_budget}\n`;
    }
    contextStr += `- Preferred Language: ${language || 'english'}\n`;
    contextStr += language === 'hinglish'
      ? `- INSTRUCTION: You MUST reply in conversational Hinglish.`
      : `- INSTRUCTION: You MUST reply in clear, professional Standard English.`;

    let currentSessionId = sessionId;
    if (!currentSessionId) {
      const userMessage = messages.find(m => m.role === 'user');
      const { data: newSession, error: sessionErr } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: userId,
          title: userMessage?.content.substring(0, 40) || 'New Chat',
          messages: messages,
          business_idea_id: businessIdeaId || null,
        })
        .select()
        .single();

      if (sessionErr || !newSession) {
        console.error('Error creating session:', sessionErr);
        return NextResponse.json({ error: 'Failed to create chat session' }, { status: 500, headers: corsHeaders });
      }
      currentSessionId = newSession.id;
    } else {
      const { data: existingSession } = await supabase
        .from('chat_sessions')
        .select('messages')
        .eq('id', currentSessionId)
        .single();
      const existingMessages: ChatMessage[] = existingSession?.messages || [];
      const newMessages = [...existingMessages, ...messages.slice(existingMessages.length)];
      const { error: updateError } = await supabase
        .from('chat_sessions')
        .update({ messages: newMessages })
        .eq('id', currentSessionId);
      if (updateError) console.error('Error saving user messages:', updateError);
    }

    let businessContext = '';
    if (businessIdeaId) {
      const { data: idea } = await supabase
        .from('business_ideas')
        .select('title, category, investment_min, investment_max, required_licenses, description, pros, cons')
        .eq('id', businessIdeaId)
        .single();
      if (idea) {
        businessContext = `\n[Selected Business Idea]\n- Name: ${idea.title}\n- Category: ${idea.category}\n- Investment: ₹${idea.investment_min.toLocaleString('en-IN')} - ₹${idea.investment_max.toLocaleString('en-IN')}\n- Description: ${idea.description}\n- Licenses Needed: ${idea.required_licenses?.join(', ') || 'None'}\n- Pros: ${idea.pros?.join(', ') || 'N/A'}\n- Cons: ${idea.cons?.join(', ') || 'N/A'}`;
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
            tasks.forEach(t => { businessContext += `- [${t.status === 'completed' ? 'Completed' : 'Pending'}] ${t.title} (${t.category})\n`; });
          }
        }
      }
    }

    const groqMessages: ChatMessage[] = [
      { role: 'system', content: `${VYAPAR_MITRA_SYSTEM_PROMPT}\n\n${contextStr}${businessContext}` },
      ...messages,
    ];

    let fullResponse = '';
    const { stream } = await streamGroqResponse(groqMessages, (token) => {
      fullResponse += token;
    });

    const responseHeaders = new Headers();
    if (currentSessionId) {
      responseHeaders.set('X-Session-ID', currentSessionId);
    }
    Object.entries(corsHeaders).forEach(([key, value]) => responseHeaders.set(key, value));

    // Auto-save and final save handled via stream completion
    const wrappedStream = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        let chunkCount = 0;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
            chunkCount++;

            if (currentSessionId && fullResponse && chunkCount % 8 === 0) {
              const partialMessages = [...messages, { role: 'assistant' as const, content: fullResponse }];
              supabase.from('chat_sessions')
                .update({ messages: partialMessages, message_count: partialMessages.length })
                .eq('id', currentSessionId)
                .then();
            }
          }

          if (currentSessionId && fullResponse) {
            const updatedMessages = [...messages, { role: 'assistant' as const, content: fullResponse }];
            await supabase
              .from('chat_sessions')
              .update({ messages: updatedMessages, message_count: updatedMessages.length })
              .eq('id', currentSessionId);

            const publishMatch = fullResponse.match(/<PUBLISH_IDEA>([\s\S]*?)<\/PUBLISH_IDEA>/);
            if (publishMatch && publishMatch[1]) {
              try {
                const ideaData = JSON.parse(publishMatch[1]);
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
                const reqCookies = req.headers.get('cookie');
                fetch(`${appUrl}/api/ideas-agent`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Cookie: reqCookies || '' },
                  body: JSON.stringify(ideaData),
                }).catch(err => console.error('Background publish failed:', err));
              } catch (parseError) {
                console.error('Failed to parse PUBLISH_IDEA JSON:', parseError);
              }
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(wrappedStream, { status: 200, headers: responseHeaders });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { IDEA_ENRICHMENT_PROMPT } from '@/lib/ai/prompts';

const GROQ_TIMEOUT = 30000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return NextResponse.json({ error: 'Prompt too long' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })); } catch (error) {}
          }
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GROQ_TIMEOUT);

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: IDEA_ENRICHMENT_PROMPT },
          {
            role: 'user',
            content: `VERIFY if the following prompt represents a genuine business idea. If it is spam or gibberish, return { "rejected_reason": "Explanation" }. Do NOT return the full schema if rejected. 

If it IS a valid business idea concept, generate a highly detailed, professional business plan JSON following the provided schema for the Indian market based on this concept:
Concept: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!groqResponse.ok) {
      throw new Error(`Groq API Error: ${await groqResponse.text()}`);
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices[0]?.message?.content || '';

    let enrichedIdea;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enrichedIdea = JSON.parse(jsonMatch[0]);
        if (enrichedIdea.rejected_reason) {
          return NextResponse.json({ error: 'Idea rejected by AI moderator', details: enrichedIdea.rejected_reason }, { status: 400 });
        }
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (e) {
      console.error("AI Parsing error", e);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      idea: enrichedIdea
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Admin Idea Gen Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

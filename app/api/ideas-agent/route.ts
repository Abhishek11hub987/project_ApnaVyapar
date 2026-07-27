import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { IDEA_ENRICHMENT_PROMPT, generateSlug } from '@/lib/ai/prompts';

const GROQ_TIMEOUT = 30000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    if (title.length > 200 || description.length > 2000) {
      return NextResponse.json({ error: 'Title or description too long' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, city')
      .eq('id', session.user.id)
      .single();

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
            content: `Research this business idea for the Indian market:\n\nTitle: ${title}\nDescription: ${description}\n${category ? `Suggested Category: ${category}` : ''}\n${profile?.city ? `Location context: ${profile.city}, India` : ''}`
          }
        ],
        temperature: 0.5,
        max_tokens: 2048,
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
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch {
      enrichedIdea = {
        title: title,
        description: description,
        category: category || 'Services',
        investment_min: 10000,
        investment_max: 100000,
        location_type: 'hybrid',
        time_commitment: 'flexible',
        skill_level: 'beginner',
        monthly_profit_min: 5000,
        monthly_profit_max: 50000,
        pros: ['Growing market demand', 'Low entry barrier', 'Scalable business model'],
        cons: ['Competitive market', 'Requires consistent marketing', 'Initial learning curve'],
        required_skills: ['Business management', 'Customer service', 'Marketing'],
        required_licenses: ['Basic Trade License', 'GST Registration'],
        real_example_name: null,
        real_example_location: null,
        real_example_description: null,
        market_analysis: null,
        competition_strategy: null,
        roadmap: null,
        financial_projections: null,
        resources_needed: [],
        risk_analysis: null,
        success_stories: null,
      };
    }

    const slug = generateSlug(enrichedIdea.title, 'community');

    const { data: savedIdea, error: saveError } = await supabase
      .from('community_ideas')
      .insert({
        user_id: session.user.id,
        title: enrichedIdea.title,
        description: enrichedIdea.description,
        category: enrichedIdea.category,
        investment_min: enrichedIdea.investment_min,
        investment_max: enrichedIdea.investment_max,
        location_type: enrichedIdea.location_type,
        monthly_profit_min: enrichedIdea.monthly_profit_min,
        monthly_profit_max: enrichedIdea.monthly_profit_max,
        time_commitment: enrichedIdea.time_commitment || 'flexible',
        skill_level: enrichedIdea.skill_level || 'beginner',
        pros: enrichedIdea.pros || [],
        cons: enrichedIdea.cons || [],
        required_skills: enrichedIdea.required_skills || [],
        required_licenses: enrichedIdea.required_licenses || [],
        real_example_name: enrichedIdea.real_example_name || null,
        real_example_location: enrichedIdea.real_example_location || null,
        real_example_description: enrichedIdea.real_example_description || null,
        market_analysis: enrichedIdea.market_analysis || null,
        competition_strategy: enrichedIdea.competition_strategy || null,
        roadmap: enrichedIdea.roadmap || null,
        financial_projections: enrichedIdea.financial_projections || null,
        resources_needed: enrichedIdea.resources_needed || [],
        risk_analysis: enrichedIdea.risk_analysis || null,
        success_stories: enrichedIdea.success_stories || null,
        slug,
        ai_generated: true,
        contributor_name: profile?.full_name || 'Anonymous',
      })
      .select()
      .single();

    if (saveError) {
      console.error('Supabase save error:', saveError);
      return NextResponse.json({ error: 'Failed to save idea', details: saveError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      idea: savedIdea,
      enrichedData: enrichedIdea
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Ideas Agent Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

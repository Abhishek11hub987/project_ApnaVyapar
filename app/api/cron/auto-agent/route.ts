import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { IDEA_ENRICHMENT_PROMPT, generateSlug } from '@/lib/ai/prompts';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: recentIdeas } = await supabaseAdmin
      .from('community_ideas')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: businessIdeas } = await supabaseAdmin
      .from('business_ideas')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(10);

    const existingTitles = [
      ...(recentIdeas?.map((i: any) => i.title) || []),
      ...(businessIdeas?.map((i: any) => i.title) || [])
    ].slice(0, 20).join(', ');

    const { data: userLocations } = await supabaseAdmin
      .from('profiles')
      .select('city, state')
      .not('city', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);
    const uniqueLocations = Array.from(new Set(userLocations?.map((l: any) => `${l.city}, ${l.state}`) || []));
    const targetLocation = uniqueLocations.length > 0
      ? uniqueLocations[Math.floor(Math.random() * uniqueLocations.length)]
      : 'a growing Tier-2 or Tier-3 city in India';

    const prompt = `You are a visionary business analyst specializing in emerging Indian markets.
Brainstorm a COMPLETELY UNIQUE, highly profitable, and trendy business idea specifically tailored for ${targetLocation} based on the newest 2026 consumer trends in India.
DO NOT use any of these existing ideas: ${existingTitles || 'None'}.

The idea should be modern, scalable, and tap into current local behavior in ${targetLocation}.

${IDEA_ENRICHMENT_PROMPT}`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 2048,
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API Error: ${await groqResponse.text()}`);
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices[0]?.message?.content || '';

    let enrichedIdea;
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      enrichedIdea = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in AI response');
    }

    const slug = generateSlug(enrichedIdea.title, 'auto');

    const { data: savedIdea, error: saveError } = await supabaseAdmin
      .from('business_ideas')
      .insert({
        title: enrichedIdea.title,
        description: enrichedIdea.description,
        category: enrichedIdea.category,
        investment_min: enrichedIdea.investment_min,
        investment_max: enrichedIdea.investment_max,
        location_type: enrichedIdea.location_type,
        monthly_profit_min: enrichedIdea.monthly_profit_min,
        monthly_profit_max: enrichedIdea.monthly_profit_max,
        time_commitment: enrichedIdea.time_commitment || 'flexible',
        skill_level: enrichedIdea.skill_level || 'intermediate',
        pros: enrichedIdea.pros || [],
        cons: enrichedIdea.cons || [],
        required_skills: enrichedIdea.required_skills || [],
        required_licenses: enrichedIdea.required_licenses || [],
        real_example_name: enrichedIdea.real_example_name || null,
        real_example_location: enrichedIdea.real_example_location || null,
        real_example_description: enrichedIdea.real_example_description || null,
        real_example_url: enrichedIdea.real_example_url || null,
        market_analysis: enrichedIdea.market_analysis || null,
        competition_strategy: enrichedIdea.competition_strategy || null,
        roadmap: enrichedIdea.roadmap || null,
        financial_projections: enrichedIdea.financial_projections || null,
        resources_needed: enrichedIdea.resources_needed || [],
        risk_analysis: enrichedIdea.risk_analysis || null,
        success_stories: enrichedIdea.success_stories || null,
        slug,
        is_active: true,
        is_trending: true,
        competition_level: 'medium',
      })
      .select()
      .single();

    if (saveError) {
      throw new Error(`DB Save Error: ${saveError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Autonomous idea generated successfully',
      idea: savedIdea,
    });

  } catch (error: any) {
    console.error('Auto-Agent Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

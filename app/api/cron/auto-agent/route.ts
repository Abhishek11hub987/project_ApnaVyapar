import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const maxDuration = 60; // Allow more time for AI generation

export async function GET(req: Request) {
  try {
    // 1. Verify Vercel Cron Security Header
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch recent ideas to avoid duplicates
    const { data: recentIdeas } = await supabaseAdmin
      .from('community_ideas')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(20);
      
    const { data: businessIdeas } = await supabaseAdmin
      .from('business_ideas')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(20);

    const existingTitles = [
      ...(recentIdeas?.map(i => i.title) || []),
      ...(businessIdeas?.map(i => i.title) || [])
    ].join(', ');

    // 2.5 Fetch recent user locations to personalize ideas
    const { data: userLocations } = await supabaseAdmin
      .from('profiles')
      .select('city, state')
      .not('city', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);
    const uniqueLocations = Array.from(new Set(userLocations?.map(l => `${l.city}, ${l.state}`) || []));
    const targetLocation = uniqueLocations.length > 0 
      ? uniqueLocations[Math.floor(Math.random() * uniqueLocations.length)] 
      : 'a growing Tier-2 or Tier-3 city in India';

    // 3. Construct the prompt
    const prompt = `You are a visionary business analyst specializing in emerging Indian markets.
Brainstorm a COMPLETELY UNIQUE, highly profitable, and trendy business idea specifically tailored for ${targetLocation} based on the newest 2026 consumer trends in India.
DO NOT use any of these existing ideas: ${existingTitles || 'None'}.

The idea should be modern, scalable, and tap into current local behavior in ${targetLocation} (e.g. D2C, health-tech, sustainable living, quick commerce, gig economy, pet care, local tier-2 city growth).

You MUST respond with ONLY valid JSON (no markdown, no code fences, no intro/outro text).

Response format:
{
  "title": "polished and catchy business idea title",
  "description": "detailed 3-4 sentence description of the business idea, its market potential, and why it works in India",
  "category": "one of: Food, Education, Technology, Services, Retail, Manufacturing, Agriculture, Health, Fashion, Transportation",
  "investment_min": number (in INR, minimum investment needed),
  "investment_max": number (in INR, maximum investment range),
  "location_type": "one of: home-based, physical-shop, online-only, hybrid",
  "time_commitment": "one of: part-time, full-time, flexible",
  "skill_level": "one of: beginner, intermediate, advanced",
  "monthly_profit_min": number (estimated minimum monthly profit in INR),
  "monthly_profit_max": number (estimated maximum monthly profit in INR),
  "pros": ["advantage 1", "advantage 2", "advantage 3"],
  "cons": ["challenge 1", "challenge 2", "challenge 3"],
  "required_skills": ["skill 1", "skill 2", "skill 3"],
  "required_licenses": ["license 1", "license 2"],
  "real_example_name": "Name of a real or highly realistic fictional Indian example business",
  "real_example_location": "City, State",
  "real_example_description": "1 sentence describing their success or business model",
  "market_analysis": { "marketSize": "description", "targetAudience": "description", "growthTrends": "description" },
  "competition_strategy": { "localCompetitors": "description", "differentiation": "description" },
  "roadmap": { "week1": "action", "week2": "action", "month1": "action", "month3": "action" },
  "financial_projections": { "breakEven": "Time to break even", "monthlyPnL": "Revenue vs Costs breakdown" },
  "resources_needed": ["resource 1", "resource 2"],
  "risk_analysis": [ { "risk": "description", "mitigation": "description" } ],
  "success_stories": [ { "name": "Business Name", "description": "Short success story" } ]
}`;

    // 4. Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7, // Higher temp for more creativity
        max_tokens: 2048,
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API Error: ${await groqResponse.text()}`);
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices[0]?.message?.content || '';

    // 5. Parse JSON
    let enrichedIdea;
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      enrichedIdea = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in AI response');
    }

    // 6. Save to DB
    const slug = `auto-${enrichedIdea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;

    const { data: savedIdea, error: saveError } = await supabaseAdmin
      .from('community_ideas')
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
        market_analysis: enrichedIdea.market_analysis || null,
        competition_strategy: enrichedIdea.competition_strategy || null,
        roadmap: enrichedIdea.roadmap || null,
        financial_projections: enrichedIdea.financial_projections || null,
        resources_needed: enrichedIdea.resources_needed || [],
        risk_analysis: enrichedIdea.risk_analysis || null,
        success_stories: enrichedIdea.success_stories || null,
        slug,
        is_approved: true, // Auto-approve agent ideas
        ai_generated: true,
        contributor_name: 'Apna Vyapar Auto-Agent',
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

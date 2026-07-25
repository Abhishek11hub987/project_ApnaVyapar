import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Auth check
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile for contributor name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, city')
      .eq('id', session.user.id)
      .single();

    // Use Groq to research and enrich the idea
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a business research analyst specializing in Indian markets. Given a business idea title and description, research and provide a detailed analysis. You MUST respond with ONLY valid JSON (no markdown, no code fences).

Response format:
{
  "title": "polished business idea title",
  "description": "detailed 2-3 sentence description of the business idea, its market potential in India",
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
  "real_example_name": "Name of a real/fictional Indian example business",
  "real_example_location": "City, State",
  "real_example_description": "1 sentence describing their success",
  "market_analysis": { "marketSize": "description", "targetAudience": "description", "growthTrends": "description" },
  "competition_strategy": { "localCompetitors": "description", "differentiation": "description" },
  "roadmap": { "week1": "action", "week2": "action", "month1": "action", "month3": "action" },
  "financial_projections": { "breakEven": "Time to break even", "monthlyPnL": "Revenue vs Costs breakdown" },
  "resources_needed": ["resource 1", "resource 2"],
  "risk_analysis": [ { "risk": "description", "mitigation": "description" } ],
  "success_stories": [ { "name": "Business Name", "description": "Short success story" } ]
}`
          },
          {
            role: 'user',
            content: `Research this business idea for the Indian market:\n\nTitle: ${title}\nDescription: ${description}\n${category ? `Suggested Category: ${category}` : ''}\n${profile?.city ? `Location context: ${profile.city}, India` : ''}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API Error: ${await groqResponse.text()}`);
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices[0]?.message?.content || '';

    // Parse the AI response
    let enrichedIdea;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enrichedIdea = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      // Fallback with user's input
      enrichedIdea = {
        title,
        description,
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
        real_example_name: 'Example Enterprise',
        real_example_location: 'Mumbai, Maharashtra',
        real_example_description: 'Started small and scaled to a profitable business within a year.',
        market_analysis: { marketSize: 'Growing rapidly in urban areas.', targetAudience: 'Local residents and businesses.', growthTrends: 'Consistent year-over-year growth.' },
        competition_strategy: { localCompetitors: 'Various unorganized players.', differentiation: 'Professional service and digital presence.' },
        roadmap: { week1: 'Market research and planning.', week2: 'Setup and licenses.', month1: 'Launch and acquire first 10 customers.', month3: 'Break-even and optimization.' },
        financial_projections: { breakEven: '3-6 Months', monthlyPnL: 'Estimated 30-40% margin on operations.' },
        resources_needed: ['Basic equipment', 'Initial marketing budget', 'Working capital'],
        risk_analysis: [ { risk: 'Initial low traction', mitigation: 'Aggressive local marketing and discounts.' } ],
        success_stories: [ { name: 'Local Success Story', description: 'Grew from 0 to 100 recurring clients in 6 months.' } ]
      };
    }

    // Generate slug
    const slug = `community-${enrichedIdea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;

    // Save to Supabase
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

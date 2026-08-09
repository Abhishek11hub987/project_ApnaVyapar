import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { IDEA_ENRICHMENT_PROMPT } from '../lib/ai/prompts';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const groqApiKey = process.env.GROQ_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Fetching ideas missing market analysis...');
  const { data: ideas, error } = await supabase
    .from('business_ideas')
    .select('id, title, description, category');

  if (error) {
    console.error('Error fetching ideas:', error);
    return;
  }

  console.log(`Found ${ideas.length} ideas to enrich.`);

  for (const idea of ideas) {
    console.log(`\nEnriching idea ${idea.id}: ${idea.title}...`);
    
    const prompt = `You are a visionary business analyst specializing in the Indian market.
I need you to deeply analyze the following business idea:
Title: ${idea.title}
Category: ${idea.category}
Description: ${idea.description}

${IDEA_ENRICHMENT_PROMPT}`;

    let success = false;
    let retries = 3;
    
    while (!success && retries > 0) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2500,
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

      console.log(`Successfully parsed JSON for ${idea.title}. Updating DB...`);

      const { error: updateError } = await supabase
        .from('business_ideas')
        .update({
          real_example_name: enrichedIdea.real_example_name || null,
          real_example_location: enrichedIdea.real_example_location || null,
          real_example_description: enrichedIdea.real_example_description || null,
          market_size_note: enrichedIdea.market_size_note || null,
          market_analysis: enrichedIdea.market_analysis || null,
          competition_strategy: enrichedIdea.competition_strategy || null,
          roadmap: enrichedIdea.roadmap || null,
          financial_projections: enrichedIdea.financial_projections || null,
          resources_needed: enrichedIdea.resources_needed || [],
          risk_analysis: enrichedIdea.risk_analysis || null,
          success_stories: enrichedIdea.success_stories || null,
        })
        .eq('id', idea.id);

        if (updateError) {
          console.error(`Failed to update ${idea.title}:`, updateError);
        } else {
          console.log(`Successfully updated ${idea.title}`);
        }
        
        success = true;
        // Rate limit protection
        await sleep(4000);

      } catch (e: any) {
        if (e.message.includes('429') || e.message.includes('rate_limit')) {
          console.log(`Rate limit hit, sleeping for 10 seconds...`);
          await sleep(10000);
          retries--;
        } else {
          console.error(`Failed processing ${idea.title}:`, e.message);
          break;
        }
      }
    }
  }
  
  console.log('\nEnrichment complete!');
}

run();

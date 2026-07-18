const fs = require('fs');
const ideas = require('./locales/ideas_en.json');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [k, v] = line.split('=');
  if (k && v) acc[k.trim()] = v.trim();
  return acc;
}, {});

async function translate() {
  const results = {};
  
  for (const idea of ideas) {
    const prompt = `Translate the following business idea details into Hindi. Provide the response as a valid JSON object ONLY, with exactly these three keys: "title", "description", "category". DO NOT wrap in markdown blocks, just raw JSON.

Title: ${idea.title}
Description: ${idea.description}
Category: ${idea.category}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.1
        })
      });
      
      const data = await response.json();
      let text = data.choices[0].message.content.trim();
      
      // Clean up markdown wrapping if Groq insists
      if (text.startsWith('```json')) text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      else if (text.startsWith('```')) text = text.replace(/```/g, '').trim();
      
      const translated = JSON.parse(text);
      
      results[idea.id] = {
        title: translated.title,
        description: translated.description,
        category: translated.category
      };
      console.log(`Translated: ${idea.title} -> ${translated.title}`);
      
    } catch (err) {
      console.error(`Failed to translate idea ${idea.title}`, err);
    }
    
    // Add a tiny delay to respect rate limits
    await new Promise(r => setTimeout(r, 500));
  }
  
  fs.writeFileSync('locales/ideas_hi.json', JSON.stringify(results, null, 2));
  console.log('Successfully wrote locales/ideas_hi.json');
}

translate();

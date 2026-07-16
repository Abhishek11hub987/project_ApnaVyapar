

async function testGroq() {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'Test' }]
      })
    });
    
    if (!res.ok) {
      const err = await res.text();
      console.error('Groq Error:', res.status, err);
    } else {
      console.log('Groq API: Success with llama-3.3-70b-versatile');
    }
  } catch (e) {
    console.error('Groq Fetch Error:', e.message);
  }
}

testGroq();

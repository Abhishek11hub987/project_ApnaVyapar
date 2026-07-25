import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, store, products } = body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400, headers: corsHeaders });
    }

    // Build the system prompt
    let systemPrompt = `You are Vyapar Mitra, an AI sales assistant for the online store "${store.store_name}". 
Your goal is to help customers find products, answer their questions about the store, and provide contact details if they need human support.

STORE DETAILS:
- Name: ${store.store_name}
- Support Email: ${store.support_email || 'Not provided'}
- Support Phone: ${store.support_phone || 'Not provided'}
- Tagline/Hero Text: ${store.hero_text || 'Not provided'}

AVAILABLE PRODUCTS:
`;

    if (products && products.length > 0) {
      products.forEach((p: any) => {
        systemPrompt += `- ${p.name}: ₹${p.price} (${p.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'})\n  Description: ${p.description || 'N/A'}\n`;
      });
    } else {
      systemPrompt += "There are currently no products available in the store.\n";
    }

    systemPrompt += `
INSTRUCTIONS:
1. Always be polite, welcoming, and helpful.
2. If a customer asks about a product, recommend it from the AVAILABLE PRODUCTS list.
3. If a customer asks for a product not in the list, politely inform them it's not available.
4. If a customer needs help beyond your capabilities, provide the Support Email or Phone.
5. Do NOT make up prices or products.
6. Do NOT mention that you are an AI from Apna Vyapar unless asked.
7. Keep your responses concise and readable.`;

    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Call Groq API with streaming
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
        temperature: 0.5, // slightly lower for more factual responses
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${await response.text()}`);
    }

    // Proxy the stream
    const reader = response.body!.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new Response(stream, {
      status: 200,
      headers
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Store Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

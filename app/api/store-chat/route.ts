import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/utils/rate-limit';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { sanitizeProductName } from '@/lib/ai/prompts';

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
    const { messages, store, products } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400, headers: corsHeaders });
    }

    if (!store || !store.store_name) {
      return NextResponse.json({ error: 'Store information required' }, { status: 400, headers: corsHeaders });
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
    if (session?.user) {
      const isAllowed = await checkRateLimit(session.user.id, 30, 60);
      if (!isAllowed) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: corsHeaders });
      }
    }

    let productList = '';
    if (products && products.length > 0) {
      products.forEach((p: any) => {
        const safeName = sanitizeProductName(p.name || 'Unnamed Product');
        const safeDesc = p.description ? sanitizeProductName(p.description) : 'N/A';
        productList += `- ${safeName}: ₹${p.price} (${p.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'})\n  Description: ${safeDesc}\n`;
      });
    } else {
      productList = "There are currently no products available in the store.\n";
    }

    let systemPrompt = `You are Vyapar Mitra, an AI sales assistant for the online store "${sanitizeProductName(store.store_name)}". Your goal is to help customers find products, answer their questions about the store, and provide contact details if they need human support.

STORE DETAILS:
- Name: ${sanitizeProductName(store.store_name)}
- Support Email: ${store.support_email || 'Not provided'}
- Support Phone: ${store.support_phone || 'Not provided'}
- Tagline: ${store.hero_text || 'Not provided'}

AVAILABLE PRODUCTS:
${productList}

INSTRUCTIONS:
1. Always be polite, welcoming, and helpful.
2. If a customer asks about a product, recommend it from the available products list.
3. If a customer asks for a product not in the list, politely inform them it's not available.
4. If a customer needs help beyond your capabilities, provide the Support Email or Phone.
5. Do NOT make up prices or products.
6. Keep your responses concise and readable.`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
        temperature: 0.5,
        max_tokens: 1024
      })
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API Error: ${await groqResponse.text()}`);
    }

    const reader = groqResponse.body!.getReader();
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

    const headers = new Headers(groqResponse.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => { headers.set(key, value); });

    return new Response(stream, { status: 200, headers });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Store Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

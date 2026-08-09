export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function streamGroqResponse(
  messages: ChatMessage[],
  onToken?: (token: string) => void
): Promise<{ stream: ReadableStream; fullText: string }> {
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!groqRes.ok) {
    throw new Error(`Groq API Error: ${await groqRes.text()}`);
  }

  const reader = groqRes.body!.getReader();
  const decoder = new TextDecoder();

  let fullText = '';

  function makeLineParser() {
    let parseBuffer = '';
    return {
      parse(value: Uint8Array, controller: ReadableStreamDefaultController) {
        controller.enqueue(value);
        const chunk = decoder.decode(value, { stream: true });
        parseBuffer += chunk;
        const lines = parseBuffer.split('\n');
        parseBuffer = lines.pop() || '';
        for (const line of lines) {
          processLine(line);
        }
      },
      flush() {
        if (parseBuffer.trim()) {
          const lines = parseBuffer.split('\n').filter(l => l.trim());
          for (const line of lines) processLine(line);
        }
      },
    };
  }

  function processLine(line: string) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data: ')) return;
    const data = trimmed.replace('data: ', '');
    if (data === '[DONE]') return;
    try {
      const parsed = JSON.parse(data);
      const token = parsed.choices[0]?.delta?.content || '';
      if (token) {
        fullText += token;
        onToken?.(token);
      }
    } catch { /* ignore parse errors */ }
  }

  const lineParser = makeLineParser();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            lineParser.flush();
            break;
          }
          lineParser.parse(value, controller);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return { stream, fullText };
}

'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Send, Globe, Bot, MapPin, Mic, MicOff, History, ArrowLeft } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { useSearchParams, useRouter } from 'next/navigation';
import MessageBubble from './message-bubble';
import QuickActions from './quick-actions';
import ChatHistorySidebar from './chat-history-sidebar';

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const businessIdeaId = searchParams.get('idea');
  const initialQuery = searchParams.get('query');
  const { messages, isLoading, language, sessionId, addMessage, updateLastMessage, setLanguage, setLoading, setSessionId, setMessages } = useChat();
  const [input, setInput] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'english' ? 'en-US' : 'hi-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput(currentTranscript.trim());
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    if (businessIdeaId) {
      const id = parseInt(businessIdeaId, 10);
      if (isNaN(id)) return;
      import('@/lib/supabase').then(({ supabase }) => {
        supabase.from('business_ideas').select('title').eq('id', id).single()
          .then(({ data }) => { if (data) setIdeaTitle(data.title); });
      });
    }
  }, [businessIdeaId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    // If we are in the middle of submitting a message and setting a new session ID, 
    // don&apos;t fetch from DB because it will overwrite the AI's streaming response
    if (isSubmittingRef.current) return;

    if (sessionId) {
      import('@/lib/supabase').then(({ supabase }) => {
        supabase.from('chat_sessions').select('messages').eq('id', sessionId).single()
          .then(({ data }) => { 
            if (data && data.messages) {
              setMessages(data.messages);
            }
          });
      });
    } else {
      setMessages([]);
      if (initialQuery && !isSubmittingRef.current) {
        // Add a small delay to ensure refs are ready
        setTimeout(() => {
          handleSubmit(undefined, initialQuery);
        }, 100);
      }
    }
  }, [sessionId, setMessages, initialQuery]);

  const submitRef = useRef<{ abort: () => void } | null>(null);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    e?.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    setInput('');
    addMessage({ role: 'user', content: text });
    setLoading(true);
    isSubmittingRef.current = true;

    const abortController = new AbortController();
    submitRef.current = abortController;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: text }],
          language,
          sessionId,
          businessIdeaId
        }),
        signal: abortController.signal,
      });

      if (!res.ok) throw new Error('Failed to send message');

      const returnedSessionId = res.headers.get('X-Session-ID');
      if (returnedSessionId && returnedSessionId !== sessionId) {
        setSessionId(returnedSessionId);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';
      let streamBuffer = '';

      if (reader) {
        addMessage({ role: 'assistant', content: '' });
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            if (streamBuffer.trim()) {
              const lines = streamBuffer.split('\n').filter(line => line.trim() !== '');
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.replace('data: ', '');
                  if (data === '[DONE]') continue;
                  try {
                    const parsed = JSON.parse(data);
                    const token = parsed.choices[0]?.delta?.content || '';
                    aiResponse += token;
                    updateLastMessage(aiResponse);
                  } catch (e) {}
                }
              }
            }
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          streamBuffer += chunk;
          
          const lines = streamBuffer.split('\n');
          streamBuffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.replace('data: ', '');
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices[0]?.delta?.content || '';
                aiResponse += token;
                updateLastMessage(aiResponse);
              } catch (e) {}
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error(error);
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error connecting to Vyapar Mitra. Please try again.' });
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
      submitRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      submitRef.current?.abort();
    };
  }, []);

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-200px)] bg-gray-50 md:border md:border-gray-200 md:rounded-lg overflow-hidden shadow-sm transition-colors">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => router.push('/')}
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden md:flex w-10 h-10 bg-gray-100 text-gray-700 rounded-full items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight text-lg md:text-base">Vyapar Mitra</h2>
            <p className="text-xs text-gray-500">Your AI Business Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(true)}
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Chat History"
          >
            <History size={18} />
          </button>
          <button 
            onClick={() => setLanguage(language === 'english' ? 'hinglish' : 'english')}
            className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
          >
            <Globe size={14} />
            {language === 'english' ? 'English' : 'Hinglish'}
          </button>
        </div>
      </div>
      
      <ChatHistorySidebar 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        onSelectSession={(id) => {
          setSessionId(id || null);
        }}
        currentSessionId={sessionId || null}
      />
      
      {ideaTitle && (
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 text-xs font-medium text-gray-700 flex items-center gap-2 animate-in slide-in-from-top-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse"></span>
          Vyapar Mitra has context for: <strong>{ideaTitle}</strong>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8 md:mt-12 animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bot size={32} />
            </div>
            <p className="font-semibold text-gray-900 mb-1 text-lg">Welcome! I&apos;m Vyapar Mitra.</p>
            <p className="text-sm max-w-xs mx-auto">I can help you validate your ideas, explain legal terms simply, and build a launch roadmap.</p>
            <div className="mt-8 flex justify-center">
              <QuickActions onSelect={(txt) => handleSubmit(undefined, txt)} />
            </div>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
            
            {isLoading && messages[messages.length-1].role === 'user' && (
              <div className="flex items-center gap-2 text-gray-400 text-sm p-2 animate-pulse">
                <Bot size={16} /> Vyapar Mitra is thinking...
              </div>
            )}
            
            {!isLoading && messages.length > 0 && messages[messages.length-1].role === 'assistant' && (
              <QuickActions onSelect={(txt) => handleSubmit(undefined, txt)} />
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => handleSubmit(undefined, "Find nearby MSME-DI, DIC, and Bank branches")}
            className="shrink-0 flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200 transition-colors"
          >
            <MapPin size={14} /> Find Nearby Offices
          </button>
        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg pl-5 pr-24 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all placeholder-gray-400"
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleListening}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-50 text-red-600 animate-pulse' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-lg disabled:opacity-50 disabled:bg-gray-300 hover:bg-gray-800 transition-colors"
            >
              <Send size={18} className="-ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ChatInterface() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-gray-500">Loading chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}

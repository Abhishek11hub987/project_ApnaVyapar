'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Send, Globe, Bot, MapPin, Mic, MicOff, History } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { useSearchParams } from 'next/navigation';
import MessageBubble from './message-bubble';
import QuickActions from './quick-actions';
import ChatHistorySidebar from './chat-history-sidebar';

function ChatContent() {
  const searchParams = useSearchParams();
  const businessIdeaId = searchParams.get('idea');
  const { messages, isLoading, language, sessionId, addMessage, updateLastMessage, setLanguage, setLoading, setSessionId } = useChat();
  const [input, setInput] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize speech recognition if supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = language === 'english' ? 'en-IN' : 'hi-IN';

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    }
  };

  useEffect(() => {
    if (businessIdeaId) {
      import('@/lib/supabase').then(({ supabase }) => {
        supabase.from('business_ideas').select('title').eq('id', parseInt(businessIdeaId)).single()
          .then(({ data }) => { if (data) setIdeaTitle(data.title); });
      });
    }
  }, [businessIdeaId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    e?.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    setInput('');
    addMessage({ role: 'user', content: text });
    setLoading(true);

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
      });

      if (!res.ok) throw new Error('Failed to send message');

      const returnedSessionId = res.headers.get('X-Session-ID');
      if (returnedSessionId && returnedSessionId !== sessionId) {
        setSessionId(returnedSessionId);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      if (reader) {
        addMessage({ role: 'assistant', content: '' }); // Initial empty message
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.replace('data: ', '');
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices[0]?.delta?.content || '';
                aiResponse += token;
                updateLastMessage(aiResponse);
              } catch (e) {
                // Ignore parse errors on incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error connecting to Vyapar Mitra. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[800px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Vyapar Mitra</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your AI Business Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(true)}
            className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-full transition-colors"
            title="Chat History"
          >
            <History size={18} />
          </button>
          <button 
            onClick={() => setLanguage(language === 'english' ? 'hinglish' : 'english')}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors"
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
          setSessionId(id || undefined);
        }}
        currentSessionId={sessionId || null}
      />
      
      {ideaTitle && (
        <div className="bg-teal-50 dark:bg-teal-900/20 border-b border-teal-100 dark:border-teal-900/50 px-4 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 flex items-center gap-2 animate-in slide-in-from-top-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span>
          Vyapar Mitra has context for: <strong>{ideaTitle}</strong>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-8 md:mt-12 animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bot size={32} />
            </div>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-lg">Welcome! I'm Vyapar Mitra.</p>
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
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm p-2 animate-pulse">
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
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => handleSubmit(undefined, "Find nearby MSME-DI, DIC, and Bank branches")}
            className="shrink-0 flex items-center gap-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 transition-colors"
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
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-full pl-5 pr-24 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleListening}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                  : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 flex items-center justify-center bg-teal-700 dark:bg-teal-600 text-white rounded-full disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 hover:bg-teal-600 dark:hover:bg-teal-500 transition-colors"
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
    <Suspense fallback={<div className="p-4 text-center text-slate-500 dark:text-slate-400">Loading chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, GripHorizontal } from "lucide-react";
import { Product } from "@/components/dashboard/inventory-table";
import { motion, useDragControls } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function VyaparMitraChat({ store, products }: { store: any, products: Product[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi there! Welcome to ${store.store_name}. I'm the AI assistant for this store. How can I help you today?`
        }
      ]);
    }
  }, [isOpen, messages.length, store.store_name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI immediately
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/store-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          store,
          products
        })
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      // Setup SSE reading
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader available");

      let assistantMessage = "";
      
      // Add empty assistant message to UI
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '').trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content || '';
              assistantMessage += token;
              
              // Update the last message (the assistant one)
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantMessage;
                return updated;
              });
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I am having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          className="fixed bottom-6 left-6 z-50 cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-cyan text-navy-dark shadow-neon-cyan flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group px-4 py-3 gap-2"
          >
            <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm">Ask Vyapar Mitra</span>
          </button>
        </motion.div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          drag
          dragMomentum={false}
          dragControls={dragControls}
          dragListener={false}
          className="fixed bottom-6 left-6 w-full max-w-sm h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200"
        >
          
          {/* Header */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing p-4 flex items-center justify-between text-white shadow-md relative z-10"
            style={{ backgroundColor: store.theme_color || '#00D4FF' }}
          >
            <div className="flex items-center gap-3 text-white">
              <GripHorizontal size={16} className="opacity-50" />
              <Bot size={20} />
              <div>
                <h3 className="font-bold text-sm leading-tight text-white">Store Assistant</h3>
                <p className="text-[10px] opacity-80 text-white">Powered by Apna Vyapar</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/20 transition-colors text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-cyan/10 text-cyan-dark'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-cyan/10 text-cyan-dark flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-white rounded-tl-sm border border-slate-100 flex items-center gap-1 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex items-end gap-2 relative z-10">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask about products..."
              className="flex-1 max-h-32 min-h-[44px] bg-slate-100 border-none rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan/50 resize-none"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
          
        </motion.div>
      )}
    </>
  );
}

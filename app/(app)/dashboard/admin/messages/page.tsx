"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { markMessageRead } from "@/app/actions/admin";
import { MessageSquare, CheckCircle, Mail, Clock } from "lucide-react";

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
        return;
      }

      // Check if admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }

      // Fetch messages using client (relies on RLS)
      const { data: msgs, error } = await supabase
        .from("platform_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && msgs) {
        setMessages(msgs);
      }
      setLoading(false);
    }
    
    init();
  }, [router]);

  async function handleMarkRead(id: number) {
    const result = await markMessageRead(id);
    if (result.success) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    }
  }

  if (loading) {
    return <div className="p-10 text-white/50 animate-pulse text-center">Loading inbox...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-cyan/10 border border-cyan/20 rounded-xl flex items-center justify-center">
          <MessageSquare className="text-cyan" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Support Inbox</h1>
          <p className="text-white/50 text-sm mt-1">Manage incoming questions from your users.</p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="glass-card p-12 text-center border-white/5 flex flex-col items-center justify-center">
            <Mail className="text-white/20 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white">No messages yet</h3>
            <p className="text-white/40 mt-2">When users ask questions in the Help Center, they will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`glass-card p-6 border ${msg.is_read ? 'border-white/5 opacity-70' : 'border-cyan/30 bg-cyan/5'} transition-all`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{msg.subject || "No Subject"}</h3>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan text-navy font-bold text-[10px] uppercase tracking-wider">New</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                    <span className="text-white/80 font-medium">{msg.name}</span>
                    <span className="text-white/40">&bull;</span>
                    <a href={`mailto:${msg.email}`} className="text-cyan hover:underline">{msg.email}</a>
                    <span className="text-white/40">&bull;</span>
                    <span className="text-white/40 flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {!msg.is_read && (
                  <button 
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium border border-white/10"
                  >
                    <CheckCircle size={16} className="text-cyan" />
                    Mark as Read
                  </button>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-navy-dark/50 rounded-xl border border-white/5">
                <p className="text-white/70 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

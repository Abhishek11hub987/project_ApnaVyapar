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
    return <div className="p-10 text-gray-400 animate-pulse text-center">Loading inbox...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <MessageSquare className="text-gray-500" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Inbox</h1>
          <p className="text-gray-500 text-sm mt-1">Manage incoming questions from your users.</p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-lg shadow-card p-12 text-center flex flex-col items-center justify-center">
            <Mail className="text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900">No messages yet</h3>
            <p className="text-gray-500 mt-2">When users ask questions in the Help Center, they will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-white border rounded-lg shadow-card p-6 transition-all ${
                msg.is_read ? 'border-gray-100' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{msg.subject || "No Subject"}</h3>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-900 text-white font-bold text-[10px] uppercase tracking-wider">New</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                    <span className="text-gray-700 font-medium">{msg.name}</span>
                    <span className="text-gray-400">&bull;</span>
                    <a href={`mailto:${msg.email}`} className="text-gray-600 hover:text-gray-900 hover:underline">{msg.email}</a>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {!msg.is_read && (
                  <button 
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium border border-gray-200"
                  >
                    <CheckCircle size={16} className="text-gray-500" />
                    Mark as Read
                  </button>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
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

'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, X, Trash2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

interface ChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSession: (sessionId: string) => void;
  currentSessionId: string | null;
}

export default function ChatHistorySidebar({ isOpen, onClose, onSelectSession, currentSessionId }: ChatHistoryProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      fetchSessions();
    }
  }, [isOpen]);

  const fetchSessions = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    let query = supabase.from('chat_sessions').select('id, title, created_at').order('created_at', { ascending: false });
    
    if (session?.user) {
      query = query.eq('user_id', session.user.id);
    } else {
      // If anonymous, just get the last 10 sessions created recently to avoid getting everyone's sessions
      // A better approach would be local storage for anon users, but this works for MVP
      query = query.limit(10); 
    }

    const { data, error } = await query;
    if (!error && data) {
      setSessions(data);
    }
    setLoading(false);
  };

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await supabase.from('chat_sessions').delete().eq('id', id);
    setSessions(sessions.filter(s => s.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="absolute inset-0 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-sm z-40 md:hidden rounded-2xl" 
        onClick={onClose}
      />
      
      <div className="absolute top-0 right-0 h-full w-full md:w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col shadow-xl rounded-r-2xl md:rounded-2xl transition-transform animate-in slide-in-from-right-full duration-300">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Chat History
          </h3>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="p-4 text-center text-sm text-slate-500">Loading history...</div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center">
              <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No past conversations found.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectSession(''); // Start new chat
                  onClose();
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors mb-2 border border-dashed border-teal-200 dark:border-teal-900"
              >
                + Start New Conversation
              </button>
              
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-colors cursor-pointer group flex justify-between items-center ${
                    currentSessionId === session.id 
                      ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 font-medium' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    {session.title || 'Conversation'}
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(session.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => deleteSession(e, session.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

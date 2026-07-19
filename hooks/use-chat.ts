import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  language: 'english' | 'hinglish';
  sessionId: string | null;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setMessages: (messages: Message[]) => void;
  setLanguage: (lang: 'english' | 'hinglish') => void;
  setLoading: (loading: boolean) => void;
  setSessionId: (id: string | null) => void;
}

export const useChat = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      language: 'english',
      sessionId: null,

      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

      updateLastMessage: (content) => set((state) => {
        const newMessages = [...state.messages];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
          newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content };
        }
        return { messages: newMessages };
      }),

      setMessages: (messages) => set({ messages }),
      setLanguage: (language) => set({ language }),
      setLoading: (isLoading) => set({ isLoading }),
      setSessionId: (sessionId) => set({ sessionId }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ language: state.language, sessionId: state.sessionId }),
    }
  )
);

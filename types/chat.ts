export type ChatSession = {
  id: string;
  user_id: string;
  business_idea_id: number | null;
  title: string | null;
  messages: any[];
  message_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

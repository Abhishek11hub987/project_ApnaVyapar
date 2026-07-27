export type Checklist = {
  id: string;
  user_id: string;
  business_idea_id: number | null;
  title: string;
  overall_progress: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ChecklistTask = {
  id: string;
  checklist_id: string;
  title: string;
  description: string | null;
  category: 'Registration' | 'Licenses' | 'Finance' | 'Location' | 'Marketing' | 'Operations' | 'Hiring' | 'Compliance';
  status: 'not_started' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  resource_link: string | null;
  resource_title: string | null;
  estimated_time: string | null;
  is_mandatory: boolean;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

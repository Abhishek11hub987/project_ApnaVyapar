export type GovernmentScheme = {
  id: number;
  name: string;
  ministry: string;
  category: 'Loan' | 'Grant' | 'Subsidy' | 'Tax Benefit' | 'Mentorship' | 'Infrastructure';
  description: string;
  eligibility: string;
  benefits: string;
  max_amount: string | null;
  interest_rate: string | null;
  application_link: string | null;
  documents_required: string[];
  applicable_states: string[];
  is_central_scheme: boolean;
  is_active: boolean;
  launch_date: string | null;
  last_updated: string | null;
  created_at: string;
};

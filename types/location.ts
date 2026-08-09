export type ResourceLocation = {
  id: number;
  name: string;
  type: 'MSME-DI' | 'DIC' | 'Bank Branch' | 'CSC' | 'SEZ' | 'Incubator' | 'Co-working';
  address: string;
  city: string;
  state: string;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  services: string[];
  is_active: boolean;
  created_at: string;
};

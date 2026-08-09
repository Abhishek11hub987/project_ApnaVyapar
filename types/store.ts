export type Product = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  sku: string | null;
  image_url: string | null;
  status: 'active' | 'draft' | 'out_of_stock';
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  total_spent: number;
  total_orders: number;
  status: 'active' | 'inactive' | 'vip';
  created_at: string;
  updated_at: string;
};

export type StoreSettings = {
  id: string;
  user_id: string;
  store_name: string;
  slug: string;
  theme_color: string;
  logo_url: string | null;
  hero_text: string | null;
  support_email: string | null;
  support_phone: string | null;
  privacy_policy: string | null;
  terms_conditions: string | null;
  payment_instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  store_id: string;
  customer_id: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: any;
  shipping_address: string | null;
  idempotency_key: string | null;
  created_at: string;
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database (based on your schema)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  seller_id: string;
  brand: string;
  stock: number;
  location: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  category?: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
  created_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  total_amount: number;
  status: string;
  payment_method: string;
  delivery_address: Record<string, unknown>;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  phone?: string;
}
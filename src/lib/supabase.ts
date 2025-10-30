import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  package_name: string;
  amount: number;
  currency: string;
  stripe_payment_id?: string;
  stripe_session_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}


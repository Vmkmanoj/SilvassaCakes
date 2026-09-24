export interface Product {
  id: number | string;
  name: string;
  img_url?: string | null;
  description?: string | null;
  type?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

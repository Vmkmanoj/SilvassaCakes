import type { Product } from "../types/product";

export const API_BASE_URL = "https://silvassacakes-backend.onrender.com"
  

export async function fetchProducts(params?: {
  is_active?: boolean;
  search?: string;
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params?.is_active !== undefined) {
    searchParams.append("is_active", String(params.is_active));
  }
  if (params?.search) {
    searchParams.append("search", params.search);
  }

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/products/${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `Failed to fetch products (${res.status})`
    );
  }
  return res.json();
}

export async function fetchProductById(
  id: number | string
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to fetch product ${id}`);
  }
  return res.json();
}

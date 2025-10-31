import type { Book, User as UserType } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function http<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export function fetchBooks(): Promise<Book[]> {
  return http<Book[]>('/books');
}

export function fetchBook(id: string): Promise<Book> {
  return http<Book>(`/books/${id}`);
}

export function fetchMe(): Promise<UserType> {
  return http<UserType>('/me');
}



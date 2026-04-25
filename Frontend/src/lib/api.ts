const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || `API error: ${response.statusText}`);
  }

  return response.json();
}

export interface Election {
  id: number;
  name: string;
  country?: string;
  status: string;
}

export interface ElectionsResponse {
  items: Election[];
}

export const endpoints = {
  auth: {
    login: (data: any) => apiFetch<{ access_token: string, user: any }>('/api/v1/auth/login', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    register: (data: any) => apiFetch<{ id: string }>('/api/v1/auth/register', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    me: (token: string) => apiFetch<any>(`/api/v1/auth/me?token=${token}`),
  },
  elections: {
    list: () => apiFetch<ElectionsResponse>('/api/v1/elections/'),
    live: () => apiFetch<{ status: string }>('/api/v1/elections/live'),
  },
  chat: {
    send: (message: string) => apiFetch<{ response: string }>('/api/v1/chat/', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  },
};

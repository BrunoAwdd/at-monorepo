'use client';

import { useSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useApi() {
  const { data: session } = useSession();

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const accessToken = session?.user?.accessToken;
    const provider = session?.user?.provider;

    if (!accessToken) {
      throw new Error('User not authenticated');
    }

    if (!provider) {
      throw new Error('Provider not found');
    }

    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Provider': provider,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  };

  return { fetchWithAuth };
}

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useApi } from '@app/hooks/use-api';
import { useState } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useApi();

  const [publicResponse, setPublicResponse] = useState<string>('');
  const [privateResponse, setPrivateResponse] = useState<string>('');
  const [prismaResponse, setPrismaResponse] = useState<string>('');
  const [demoResponse, setDemoResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchPublicRoute = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public`
      );
      const data = await response.json();
      setPublicResponse(data.public);
      console.log('Public Route Response:', data);
    } catch (error) {
      console.error('Error fetching public route:', error);
    }
  };

  const fetchPrismaRoute = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prisma`
      );
      const data = await response.json();
      setPrismaResponse(data);
      console.log('Prisma Route Response:', data);
    } catch (error) {
      console.error('Error fetching prisma route:', error);
    }
  };

  const fetchDemoRoute = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/demo-user`
      );
      const data = await response.json();
      setDemoResponse(data);
      console.log('Demo Route Response:', data);
    } catch (error) {
      console.error('Error fetching demo route:', error);
    }
  };

  const fetchPrivateRoute = async () => {
    try {
      const data = await fetchWithAuth('/private');
      setPrivateResponse(data.private);
      console.log('Private Route Response:', data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      console.error('Error fetching private route:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">At Monorepo</h1>
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          (Nx + Next + Nest + NextAuth + Prisma)
        </h2>

        {/* Login / Logout */}
        {session ? (
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-2">
              Welcome, <span className="font-bold">{session.user?.name}</span>!
            </p>
            <button
              className="w-full bg-red-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-red-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-blue-600 mb-6"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}

        {/* API Requests */}
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-green-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-green-600"
            onClick={fetchPublicRoute}
          >
            🔓 Fetch Public Route
          </button>
          {publicResponse && <span>{publicResponse}</span>}
          <button
            className="w-full bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-yellow-600"
            onClick={fetchPrivateRoute}
          >
            🔒 Fetch Private Route
          </button>
          {privateResponse && <span>{privateResponse}</span>}
          <button
            className="w-full bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-yellow-600"
            onClick={fetchPrismaRoute}
          >
            🔒 Fetch Prisma (Public Route)
          </button>
          {prismaResponse && <span>{JSON.stringify(prismaResponse)}</span>}

          <button
            className="w-full bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold transition hover:bg-yellow-600"
            onClick={fetchDemoRoute}
          >
            🔒 Demo User (Public Route)
          </button>
          {demoResponse && <span>{JSON.stringify(demoResponse)}</span>}
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
}

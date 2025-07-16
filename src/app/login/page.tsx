'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) {
      alert('Check your email for the login link!');
    } else {
      alert('Login error: ' + error.message);
    }
  };

  return (
    <main className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login to BLOX</h1>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        Send Magic Link
      </button>
    </main>
  );
}
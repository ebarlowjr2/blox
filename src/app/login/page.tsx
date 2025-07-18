'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'auth_callback_failed') {
      setMessage('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleLogin = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });

    setLoading(false);

    if (!error) {
      setMessage('Check your email for the login link!');
    } else {
      setMessage('Login error: ' + error.message);
    }
  };

  return (
    <main className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login to BLOX</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.includes('error') || message.includes('failed') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {message}
        </div>
      )}

      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        disabled={loading}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`mt-4 w-full py-2 rounded text-white ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 max-w-sm mx-auto">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

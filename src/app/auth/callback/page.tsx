'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=auth_callback_failed');
          return;
        }

        if (data.session) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Unexpected error during auth callback:', err);
        router.push('/login?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <main className="p-6 max-w-sm mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing Authentication...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Please wait while we log you in.</p>
      </div>
    </main>
  );
}

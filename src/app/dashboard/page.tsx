'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import AgentPanel from '@/components/AgentPanel';
import type { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading || !user) {
    return (
      <main className="p-6">
        <p>Loading BLOX CEO Dashboard...</p>
      </main>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <AgentPanel />
    </Layout>
  );
}

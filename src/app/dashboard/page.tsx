'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import AgentDashboard from '@/components/AgentDashboard';
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, CEO</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <AgentDashboard />
    </Layout>
  );
}

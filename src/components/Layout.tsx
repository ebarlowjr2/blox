'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '🏠 Dashboard', href: '/dashboard' },
  { name: '🤖 Agents', href: '/dashboard/agents' },
  { name: '🔗 Integrations', href: '/dashboard/integrations' },
  { name: '⚙️ Settings', href: '/dashboard/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">🧠 BLOX</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded ${
                pathname === item.href
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <form action="/login" method="post" onSubmit={async (e) => {
            e.preventDefault();
            const { supabase } = await import('@/lib/supabase');
            await supabase.auth.signOut();
            window.location.href = '/login';
          }}>
            <button
              type="submit"
              className="block w-full text-left px-3 py-2 rounded hover:bg-red-700 mt-6 bg-red-600"
            >
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}

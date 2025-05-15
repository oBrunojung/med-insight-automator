
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Header } from './Header';

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}


'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardLayout({ children, isAdmin }: { children: ReactNode, isAdmin: boolean }) {
  const { toast } = useToast();
  const { logout } = useAuth();


  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged Out',
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
                <Logo className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">TimeWise</h1>
            </div>
            <nav className="flex items-center gap-4">
                {isAdmin && <Link href="/admin/settings" className="text-sm font-medium text-muted-foreground hover:text-primary">Admin Settings</Link>}
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </nav>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}

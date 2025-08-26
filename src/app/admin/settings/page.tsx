
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !user.email?.includes('admin')) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !user.email?.includes('admin')) {
    return null; 
  }

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">Manage application-wide settings.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all users in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View Users</Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Configure global settings and integrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Configure Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

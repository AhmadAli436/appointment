
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { CreateOneOffMeeting } from '@/components/dashboard/create-one-off-meeting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventTypes from '@/components/dashboard/event-types';
import CalendarView from '@/components/dashboard/calendar-view';
import MeetingPolls from '@/components/dashboard/meeting-polls';
import AvailabilitySettings from '@/components/dashboard/availability-settings';
import Workflows from '@/components/dashboard/workflows';
import RoutingForms from '@/components/dashboard/routing-forms';
import Integrations from '@/components/dashboard/integrations';
import TeamsView from '@/components/dashboard/teams-view';
import AnalyticsView from '@/components/dashboard/analytics-view';
import BrandingSettings from '@/components/dashboard/branding-settings';
import MeetingSummary from '@/components/dashboard/meeting-summary';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // A real app would have a more robust way of checking for admin role
  // For now, we will assume a user is an admin if their email contains 'admin'
  useEffect(() => {
    if(user?.email?.includes('admin')) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [user])


  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // or a login form
  }

  return (
    <DashboardLayout isAdmin={isAdmin}>
       {isAdmin ? <AdminPanel /> : <UserPanel />}
    </DashboardLayout>
  );
}

function UserPanel() {
    return (
        <Tabs defaultValue="events">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3">
                    <TabsTrigger value="events">Event Types</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="polls">Meeting Polls</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="summary">AI Summary</TabsTrigger>
                </TabsList>
                <CreateOneOffMeeting>
                    <Button>Create One-off Meeting</Button>
                </CreateOneOffMeeting>
            </div>
            <TabsContent value="events"><EventTypes /></TabsContent>
            <TabsContent value="calendar"><CalendarView /></TabsContent>
            <TabsContent value="polls"><MeetingPolls /></TabsContent>
            <TabsContent value="availability"><AvailabilitySettings /></TabsContent>
            <TabsContent value="summary"><MeetingSummary /></TabsContent>
        </Tabs>
    )
}

function AdminPanel() {
    return (
        <Tabs defaultValue="analytics">
             <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <TabsList className="grid grid-cols-2 sm:flex">
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                    <TabsTrigger value="workflows">Workflows</TabsTrigger>
                    <TabsTrigger value="routing">Routing Forms</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                </TabsList>
                 <CreateOneOffMeeting>
                    <Button>Create One-off Meeting</Button>
                </CreateOneOffMeeting>
            </div>
            <TabsContent value="analytics"><AnalyticsView /></TabsContent>
            <TabsContent value="teams"><TeamsView /></TabsContent>
            <TabsContent value="workflows"><Workflows /></TabsContent>
            <TabsContent value="routing"><RoutingForms /></TabsContent>
            <TabsContent value="integrations"><Integrations /></TabsContent>
            <TabsContent value="branding"><BrandingSettings /></TabsContent>
        </Tabs>
    )
}

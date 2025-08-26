
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap,Webhook } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getIntegrations, type Integration } from "@/services/integrations";

export default function Integrations() {
  const [crmIntegrations, setCrmIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getIntegrations().then(data => {
        setCrmIntegrations(data);
        setLoading(false);
    });
  }, []);

  return (
    <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">Connect TimeWise with your favorite tools.</p>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>CRM & Marketing</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-9 w-24 rounded-md" />
                            </div>
                        ))
                    ) : (
                        crmIntegrations.map((int) => (
                            <div key={int.name} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img src={int.logo} alt={int.name} className="h-10 w-10" data-ai-hint={int['data-ai-hint']} />
                                    <span className="font-medium">{int.name}</span>
                                </div>
                                <Button variant="outline">Connect</Button>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Webhooks & API</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Webhook className="h-8 w-8 text-primary" />
                            <div>
                                <h3 className="font-medium">Webhooks</h3>
                                <p className="text-sm text-muted-foreground">Send real-time data to any URL.</p>
                            </div>
                        </div>
                        <Button variant="outline">Manage Hooks</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Zap className="h-8 w-8 text-yellow-500" />
                            <div>
                                <h3 className="font-medium">Zapier</h3>
                                <p className="text-sm text-muted-foreground">Connect to 5,000+ apps.</p>
                            </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

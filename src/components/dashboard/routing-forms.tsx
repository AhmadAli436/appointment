
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoutingForms, type RoutingForm } from "@/services/routing-forms";


export default function RoutingForms() {
  const [forms, setForms] = useState<RoutingForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRoutingForms().then(data => {
      setForms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Routing Forms</h2>
          <p className="text-muted-foreground">Qualify and route invitees to the right person or event type.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Routing Form
        </Button>
      </div>
       <div className="space-y-6">
        {loading ? (
           Array.from({ length: 2 }).map((_, index) => (
             <Card key={index}>
               <CardHeader className="flex flex-row items-center justify-between">
                 <div className="space-y-1">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24" />
                 </div>
                 <Skeleton className="h-6 w-16 rounded-full" />
               </CardHeader>
               <CardContent>
                 <Skeleton className="h-16 w-full" />
               </CardContent>
             </Card>
           ))
        ) : (
          forms.map((form, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{form.title}</CardTitle>
                  <CardDescription>
                    {form.rules.length} routing rule{form.rules.length > 1 && 's'}.
                  </CardDescription>
                </div>
                <Badge variant={form.active ? "default" : "secondary"}>{form.active ? "Active" : "Inactive"}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Routing Logic</p>
                <div className="space-y-3">
                {form.rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">If</span>
                      <Badge variant="outline">{rule.field}</Badge>
                      <span className="text-sm">{rule.condition}</span>
                    </div>
                    <div className="hidden sm:block">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Then</span>
                      <div className="flex items-center gap-1.5">
                          {rule.action.includes("Sales") || rule.action.includes("Engineer") ? <User className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                          <span className="text-sm">{rule.action}</span>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

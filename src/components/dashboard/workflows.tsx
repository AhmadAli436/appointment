
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Mail, MessageSquare, ArrowRight, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkflows, type Workflow } from "@/services/workflows";


export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWorkflows().then(data => {
      setWorkflows(data);
      setLoading(false);
    });
  }, []);

  const getStepIcon = (step: string) => {
    if (step.toLowerCase().includes("email")) return <Mail className="h-4 w-4" />;
    if (step.toLowerCase().includes("sms")) return <MessageSquare className="h-4 w-4" />;
    if (step.toLowerCase().includes("invite")) return <Video className="h-4 w-4" />;
    return <MessageSquare className="h-4 w-4" />;
  }

  return (
    <div>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflows</h2>
          <p className="text-muted-foreground">Automate your pre- and post-meeting communication.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Workflow
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? 
          Array.from({length: 3}).map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
                 <Skeleton className="h-4 w-5/6 mt-1" />
              </CardHeader>
              <CardContent className="flex-grow">
                 <Skeleton className="h-6 w-1/2" />
              </CardContent>
              <CardFooter>
                 <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        : workflows.map((flow, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{flow.title}</CardTitle>
              <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {flow.steps.map((step: string, stepIndex: number) => (
                  <React.Fragment key={stepIndex}>
                    <div className="flex items-center gap-1">
                      {getStepIcon(step)}
                      <span>{step.split(':')[1]}</span>
                    </div>
                    {stepIndex < flow.steps.length - 1 && <ArrowRight className="h-4 w-4" />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Workflow
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const eventTypes = [
  {
    title: "30 Minute Meeting",
    duration: "30 min",
    type: "One-on-One",
    url: "https://timewise.com/link/user/30min"
  },
  {
    title: "Project Kick-off",
    duration: "60 min",
    type: "Group",
    url: "https://timewise.com/link/user/kickoff"
  },
  {
    title: "User Interview",
    duration: "45 min",
    type: "One-on-One",
    url: "https://timewise.com/link/user/interview"
  },
  {
    title: "Team Brainstorm",
    duration: "1.5 hours",
    type: "Collective",
    url: "https://timewise.com/link/user/brainstorm"
  },
];

export default function EventTypes() {
    const { toast } = useToast();

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        toast({
            title: "Link Copied!",
            description: "The booking link has been copied to your clipboard.",
        });
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventTypes.map((event, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>A standard event type for quick scheduling.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{event.type}</span>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleCopy(event.url)}>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Circle } from "lucide-react";
import type { DateRange } from "react-day-picker";

const pollResults = [
  { name: "Alice", votes: [true, true, false] },
  { name: "Bob", votes: [false, true, true] },
  { name: "Charlie", votes: [true, true, true] },
  { name: "You", votes: [true, false, true] },
];

const timeSlots = ["4:00 PM", "4:30 PM", "5:00 PM"];

export default function MeetingPolls() {
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Create a Poll</CardTitle>
            <CardDescription>Propose times and let invitees vote.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="poll-title">Title</Label>
              <Input id="poll-title" placeholder="e.g., Q3 Planning Session" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poll-dates">Proposed Dates</Label>
              <Calendar
                id="poll-dates"
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                className="border rounded-md"
              />
            </div>
            <Button className="w-full">Create Poll & Share</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Example Poll: Q2 Retro</CardTitle>
            <CardDescription>Results for your recently created poll.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Participant</TableHead>
                    {timeSlots.map(slot => <TableHead key={slot} className="text-center">{slot}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pollResults.map((result) => (
                    <TableRow key={result.name}>
                      <TableCell className="font-medium">{result.name}</TableCell>
                      {result.votes.map((vote, index) => (
                        <TableCell key={index} className="text-center">
                          {vote ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : 
                            <Circle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <div className="mt-4 text-center p-3 bg-accent/10 rounded-md">
                <p className="font-semibold">Best time is <span className="text-accent">4:30 PM</span> with 3/4 votes.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

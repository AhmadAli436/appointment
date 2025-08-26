"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import type { DateRange } from "react-day-picker";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AvailabilitySettings() {
  const [blackoutDates, setBlackoutDates] = useState<DateRange | undefined>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Hours</CardTitle>
                    <CardDescription>Set your standard weekly availability.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <Switch id={day.toLowerCase()} defaultChecked={index > 0 && index < 6} />
                                <Label htmlFor={day.toLowerCase()} className="text-base font-medium">{day}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type="time" defaultValue="09:00" className="w-32"/>
                                <span>-</span>
                                <Input type="time" defaultValue="17:00" className="w-32"/>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Blackout Dates</CardTitle>
                    <CardDescription>Add dates when you are unavailable.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="range"
                        selected={blackoutDates}
                        onSelect={setBlackoutDates}
                        className="p-0"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Buffer Times</CardTitle>
                    <CardDescription>Add time before or after events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Before event</Label>
                        <Input type="number" placeholder="e.g., 15" defaultValue={15} />
                    </div>
                     <div className="space-y-2">
                        <Label>After event</Label>
                        <Input type="number" placeholder="e.g., 15" defaultValue={15} />
                    </div>
                </CardContent>
            </Card>
             <Button className="w-full">Save Changes</Button>
        </div>
    </div>
  );
}

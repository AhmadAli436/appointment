"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const startingDayIndex = getDay(start);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">
            {format(currentDate, "MMMM yyyy")}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <ToggleGroup type="single" defaultValue="month" value={view} onValueChange={(value) => value && setView(value)}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground">
          {daysOfWeek.map((day) => (
            <div key={day} className="font-semibold py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startingDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="border rounded-md h-24" />
          ))}
          {daysInMonth.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "border rounded-md h-24 p-2 text-left",
                !isSameMonth(day, currentDate) && "text-muted-foreground",
                isToday(day) && "bg-accent/50"
              )}
            >
              <span className={cn(
                "font-medium",
                isToday(day) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center"
              )}>
                {format(day, "d")}
              </span>
              {/* Dummy event */}
              {Math.random() > 0.7 && (
                 <div className="mt-2 text-xs bg-primary/20 text-primary-foreground p-1 rounded-md truncate">
                   Team Sync
                 </div>
              )}
            </div>
          ))}
           {Array.from({ length: 42 - daysInMonth.length - startingDayIndex }).map((_, i) => (
            <div key={`empty-end-${i}`} className="border rounded-md h-24" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

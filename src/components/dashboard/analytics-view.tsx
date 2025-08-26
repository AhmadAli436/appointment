
"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton";
import { getAnalyticsData, type AnalyticsData } from "@/services/analytics";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const chartConfig = {
  meetings: {
    label: "Meetings Booked",
    color: "hsl(var(--primary))",
  },
  duration: {
    label: "Meeting Hours",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function AnalyticsView() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAnalyticsData().then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);


  return (
    <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Gain insights into your team's scheduling activities.</p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Meeting Trends</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading || !data ? (
                         <div className="h-[300px] w-full">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ) : (
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <BarChart data={data.chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="meetings" fill="var(--color-meetings)" radius={4} />
                                <Bar dataKey="duration" fill="var(--color-duration)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Team members with the most meetings booked.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading || !data ? (
                        Array.from({ length: 3 }).map((_, i) => (
                             <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="text-right space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))
                    ) : (
                        data.topPerformers.slice(0, 3).map((perf, i) => (
                            <div key={perf.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={perf.imageUrl} alt={perf.name} />
                                        <AvatarFallback>{perf.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-medium">{perf.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{perf.meetings} meetings</p>
                                    <p className="text-sm text-muted-foreground">{perf.acceptanceRate} acceptance</p>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

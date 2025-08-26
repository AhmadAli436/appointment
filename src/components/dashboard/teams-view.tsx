
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Users, Shield, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getTeamMembers, type TeamMember } from "@/services/teams";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function TeamsView() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTeamMembers().then(data => {
      setTeamMembers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage your team members and settings.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" >
                <Settings />
                Team Settings
            </Button>
            <Button>
                <PlusCircle />
                Invite Member
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Team Members ({teamMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                          <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-1">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-3 w-32 md:hidden" />
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                teamMembers.map(member => (
                                    <TableRow key={member.email}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person" />
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <span className="font-medium">{member.name}</span>
                                                    <p className="text-sm text-muted-foreground md:hidden">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{member.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={member.role === 'Admin' || member.role === 'Owner' ? 'destructive' : 'secondary'}>{member.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Team Event Templates</CardTitle>
                    <CardDescription>Create and manage event templates for your team.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full">
                        <PlusCircle />
                        New Managed Event
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Team Routing</CardTitle>
                    <CardDescription>Set up how meetings are assigned to your team.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                   <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3"><Users className="text-primary"/> <span className="font-medium">Round Robin</span></div>
                        <Button variant="outline" size="sm">Configure</Button>
                   </div>
                   <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3"><Users className="text-primary"/> <span className="font-medium">Collective</span></div>
                        <Button variant="outline" size="sm">Configure</Button>
                   </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Security & SSO</CardTitle>
                    <CardDescription>Enhance security with Single Sign-On.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" variant="outline">
                        <Shield /> Configure SSO
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

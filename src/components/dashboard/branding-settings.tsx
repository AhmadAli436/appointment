"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UploadCloud } from "lucide-react";

export default function BrandingSettings() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Customization & Branding</h2>
        <p className="text-muted-foreground">Tailor the look and feel of your booking pages.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Booking Page</CardTitle>
                    <CardDescription>Preview how your booking page will look to invitees.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <h3 className="text-lg font-semibold text-foreground">Your Company Name</h3>
                            <p>30 Minute Meeting</p>
                            <p className="mt-4">Calendar placeholder</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">Click to upload</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>
                    <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <Input type="color" defaultValue="#60A5FA" className="h-12"/>
                    </div>
                    <div className="flex items-center justify-between">
                         <Label>Remove "Powered by TimeWise"</Label>
                         <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>
            <Button className="w-full">Save Branding</Button>
        </div>
      </div>
    </div>
  );
}

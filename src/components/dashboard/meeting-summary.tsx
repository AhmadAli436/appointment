
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { handleSummarizeMeeting } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ListTodo, CheckSquare } from 'lucide-react';
import { type SummarizeMeetingOutput } from '@/ai/flows/summarize-meeting-flow';

const formSchema = z.object({
  transcript: z.string().min(50, { message: 'Transcript must be at least 50 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function MeetingSummary() {
  const [summary, setSummary] = useState<SummarizeMeetingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transcript: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: FormData) {
    setSummary(null);
    const result = await handleSummarizeMeeting(values);

    if (result.success && result.data) {
      setSummary(result.data);
      toast({
        title: 'Summary Generated!',
        description: 'Your meeting summary and action items are ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: result.error,
      });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            AI Meeting Summarizer
          </CardTitle>
          <CardDescription>
            Paste your meeting transcript below and let AI generate a summary and action items.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="transcript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Transcript</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full meeting transcript here..."
                        className="min-h-[250px] font-mono text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Results</CardTitle>
          <CardDescription>Your summary and action items will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
          {isSubmitting ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : summary ? (
            <>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <ListTodo className="h-5 w-5 text-accent" />
                  Summary
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{summary.summary}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <CheckSquare className="h-5 w-5 text-accent" />
                  Action Items
                </h3>
                <ul className="space-y-2">
                  {summary.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#8227;</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
             <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Waiting for transcript...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

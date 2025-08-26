
'use server';
/**
 * @fileOverview An AI agent for summarizing meeting transcripts.
 *
 * - summarizeMeeting - A function that generates a meeting summary and action items.
 * - SummarizeMeetingInput - The input type for the summarizeMeeting function.
 * - SummarizeMeetingOutput - The return type for the summarizeMeeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMeetingInputSchema = z.object({
  transcript: z.string().describe('The full transcript of the meeting.'),
});
export type SummarizeMeetingInput = z.infer<typeof SummarizeMeetingInputSchema>;

const SummarizeMeetingOutputSchema = z.object({
  summary: z.string().describe('A concise, paragraph-form summary of the meeting, capturing the key discussion points and decisions.'),
  actionItems: z.array(z.string()).describe('A list of clear, actionable tasks assigned during the meeting.'),
});
export type SummarizeMeetingOutput = z.infer<typeof SummarizeMeetingOutputSchema>;


export async function summarizeMeeting(input: SummarizeMeetingInput): Promise<SummarizeMeetingOutput> {
  return summarizeMeetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMeetingPrompt',
  input: {schema: SummarizeMeetingInputSchema},
  output: {schema: SummarizeMeetingOutputSchema},
  prompt: `You are an expert at summarizing meetings. Analyze the provided transcript and perform the following tasks:
1.  Generate a concise summary of the key discussion points, decisions made, and overall outcomes. The summary should be in a single paragraph.
2.  Extract a list of all clear action items. Each action item should be a standalone task.

Meeting Transcript:
{{{transcript}}}
`,
});

const summarizeMeetingFlow = ai.defineFlow(
  {
    name: 'summarizeMeetingFlow',
    inputSchema: SummarizeMeetingInputSchema,
    outputSchema: SummarizeMeetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

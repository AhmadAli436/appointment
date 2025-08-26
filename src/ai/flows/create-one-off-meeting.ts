'use server';
/**
 * @fileOverview An AI agent for creating one-off meetings.
 *
 * - createOneOffMeeting - A function that creates a one-off meeting.
 * - CreateOneOffMeetingInput - The input type for the createOneOffMeeting function.
 * - CreateOneOffMeetingOutput - The return type for the createOneOffMeeting function.
 */

import {ai} from '@/ai/genkit';
import {getAvailability} from '@/services/calendar';
import {z} from 'genkit';

const CreateOneOffMeetingInputSchema = z.object({
  description: z.string().describe('A description of the meeting topic.'),
  participants: z.string().describe('A comma-separated list of participants.'),
  preferences: z.string().describe('Any preferences for the meeting.'),
});
export type CreateOneOffMeetingInput = z.infer<typeof CreateOneOffMeetingInputSchema>;

const CreateOneOffMeetingOutputSchema = z.object({
  startTime: z.string().describe('The start time of the meeting.'),
  endTime: z.string().describe('The end time of the meeting.'),
});
export type CreateOneOffMeetingOutput = z.infer<typeof CreateOneOffMeetingOutputSchema>;

export async function createOneOffMeeting(input: CreateOneOffMeetingInput): Promise<CreateOneOffMeetingOutput> {
  return createOneOffMeetingFlow(input);
}

const checkAvailabilityTool = ai.defineTool(
  {
    name: 'checkAvailability',
    description: 'Check the availability of a list of participants.',
    inputSchema: z.object({
      participants: z
        .array(z.string())
        .describe('The list of participants to check availability for.'),
    }),
    outputSchema: z.any(),
  },
  async ({participants}) => {
    return await getAvailability(participants);
  }
);

const prompt = ai.definePrompt({
  name: 'createOneOffMeetingPrompt',
  input: {schema: CreateOneOffMeetingInputSchema},
  output: {schema: CreateOneOffMeetingOutputSchema},
  tools: [checkAvailabilityTool],
  prompt: `You are a meeting scheduler AI. You will take a description of the meeting topic, participants, and any preferences, and find the optimal time slot for the meeting.

Description: {{{description}}}
Participants: {{{participants}}}
Preferences: {{{preferences}}}

Consider the availability of the participants and the preferences when determining the optimal time slot. You must use the checkAvailability tool to get the availability of the participants.

Return the start and end time of the meeting.
`,
});

const createOneOffMeetingFlow = ai.defineFlow(
  {
    name: 'createOneOffMeetingFlow',
    inputSchema: CreateOneOffMeetingInputSchema,
    outputSchema: CreateOneOffMeetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

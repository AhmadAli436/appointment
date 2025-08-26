
"use server";

import { createOneOffMeeting, type CreateOneOffMeetingInput } from "@/ai/flows/create-one-off-meeting";
import { summarizeMeeting, type SummarizeMeetingInput } from "@/ai/flows/summarize-meeting-flow";
import { z } from "zod";

const CreateOneOffMeetingInputSchema = z.object({
  description: z.string().min(1, "Description is required."),
  participants: z.string().min(1, "Participants are required."),
  preferences: z.string(),
});

const SummarizeMeetingInputSchema = z.object({
  transcript: z.string().min(50, "Transcript must be at least 50 characters."),
});

export async function handleCreateOneOffMeeting(input: CreateOneOffMeetingInput) {
  try {
    const validatedInput = CreateOneOffMeetingInputSchema.parse(input);
    const result = await createOneOffMeeting(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    console.error(error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function handleSummarizeMeeting(input: SummarizeMeetingInput) {
    try {
        const validatedInput = SummarizeMeetingInputSchema.parse(input);
        const result = await summarizeMeeting(validatedInput);
        return { success: true, data: result };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, error: "An unexpected error occurred. Please try again." };
    }
}

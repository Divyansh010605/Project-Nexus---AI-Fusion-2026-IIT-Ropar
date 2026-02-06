'use server';

/**
 * @fileOverview An AI agent that provides personalized resource recommendations based on mood and campus activities.
 *
 * - getResourceRecommendations - A function that suggests relevant resources.
 * - ResourceRecommendationsInput - The input type for the getResourceRecommendations function.
 * - ResourceRecommendationsOutput - The return type for the getResourceRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceRecommendationsInputSchema = z.object({
  mood: z
    .string()
    .describe(
      'The current mood of the student, e.g., happy, sad, stressed.  Use a single word to describe the mood.'
    ),
  campusActivities: z
    .string()
    .describe(
      'A comma separated list of campus activities the student is involved in, e.g., attending classes, sports, clubs.'
    ),
});
export type ResourceRecommendationsInput = z.infer<
  typeof ResourceRecommendationsInputSchema
>;

const ResourceRecommendationsOutputSchema = z.object({
  suggestedResources: z
    .string()
    .describe(
      'A list of relevant campus resources, such as counseling, tutoring, or events, tailored to the student\'s mood and activities.'
    ),
});
export type ResourceRecommendationsOutput = z.infer<
  typeof ResourceRecommendationsOutputSchema
>;

export async function getResourceRecommendations(
  input: ResourceRecommendationsInput
): Promise<ResourceRecommendationsOutput> {
  return getResourceRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getResourceRecommendationsPrompt',
  input: {schema: ResourceRecommendationsInputSchema},
  output: {schema: ResourceRecommendationsOutputSchema},
  prompt: `You are a helpful assistant that suggests campus resources to students based on their mood and activities.

  Suggest resources like counseling, tutoring, events, or clubs that may be helpful to the student given their current mood and activities.

  Mood: {{{mood}}}
  Campus Activities: {{{campusActivities}}}

  Suggested Resources:`,
});

const getResourceRecommendationsFlow = ai.defineFlow(
  {
    name: 'getResourceRecommendationsFlow',
    inputSchema: ResourceRecommendationsInputSchema,
    outputSchema: ResourceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An AI agent that recognizes items from images for a Lost & Found.
 *
 * - recognizeItem - A function that identifies an item in a photo.
 * - RecognizeItemInput - The input type for the recognizeItem function.
 * - RecognizeItemOutput - The return type for the recognizeItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecognizeItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecognizeItemInput = z.infer<typeof RecognizeItemInputSchema>;

const RecognizeItemOutputSchema = z.object({
  itemName: z.string().describe('A short, concise name for the item.'),
  description: z
    .string()
    .describe('A brief, one-sentence physical description of the item.'),
});
export type RecognizeItemOutput = z.infer<typeof RecognizeItemOutputSchema>;

export async function recognizeItem(
  input: RecognizeItemInput
): Promise<RecognizeItemOutput> {
  return recognizeItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recognizeItemPrompt',
  input: {schema: RecognizeItemInputSchema},
  output: {schema: RecognizeItemOutputSchema},
  prompt: `You are an expert at identifying objects in images for a lost and found service. 
  
  Based on the image provided, identify the main object. Provide a short name for the item and a one-sentence physical description.
  
  For example:
  - If you see a red hydroflask, the name should be "Red Water Bottle".
  - If you see a pair of black Ray-Ban sunglasses on a table, the name should be "Black Sunglasses".
  
  Image: {{media url=photoDataUri}}`,
});

const recognizeItemFlow = ai.defineFlow(
  {
    name: 'recognizeItemFlow',
    inputSchema: RecognizeItemInputSchema,
    outputSchema: RecognizeItemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

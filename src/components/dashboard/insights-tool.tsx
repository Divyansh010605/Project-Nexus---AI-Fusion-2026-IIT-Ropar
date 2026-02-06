'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getResourceRecommendations } from '@/ai/flows/get-resource-recommendations';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const insightsFormSchema = z.object({
  mood: z.string().min(2, {
    message: 'Please enter your current mood.',
  }),
  campusActivities: z.string().min(2, {
    message: 'List at least one activity.',
  }),
});

type InsightsFormValues = z.infer<typeof insightsFormSchema>;

export function InsightsTool() {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<InsightsFormValues>({
    resolver: zodResolver(insightsFormSchema),
    defaultValues: {
      mood: '',
      campusActivities: '',
    },
  });

  async function onSubmit(values: InsightsFormValues) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getResourceRecommendations(values);
      setRecommendations(result.suggestedResources);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations('Sorry, I was unable to get recommendations at this time.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">AI Insights</CardTitle>
            <CardDescription>
              Get personalized resource recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How are you feeling?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Stressed, excited, curious" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campusActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you up to?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Studying for finals, clubs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className='w-full'>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <BrainCircuit />
              )}
              <span>Get Recommendations</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
      {(isLoading || recommendations) && (
        <CardContent>
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-lg">Suggested For You</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[60%]" />
                </div>
              ) : (
                <p className="text-sm">{recommendations}</p>
              )}
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}

'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { summarizeEmail } from '@/ai/flows/summarize-email';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Envelope, Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const summarizerFormSchema = z.object({
  emailContent: z
    .string()
    .min(50, { message: 'Email must be at least 50 characters long.' })
    .max(10000, { message: 'Email cannot exceed 10,000 characters.' }),
});

type SummarizerFormValues = z.infer<typeof summarizerFormSchema>;

export function EmailSummarizer() {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<SummarizerFormValues>({
    resolver: zodResolver(summarizerFormSchema),
    defaultValues: {
      emailContent: '',
    },
  });

  async function onSubmit(values: SummarizerFormValues) {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeEmail(values);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error getting summary:', error);
      setSummary('Sorry, I was unable to generate a summary at this time.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card className="h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Envelope /> Email to Summarize
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <FormField
                control={form.control}
                name="emailContent"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormLabel className="sr-only">Email Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your email content here..."
                        className="h-full min-h-[300px] resize-none"
                        {...field}
                      />
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
                  <Sparkles />
                )}
                <span>Summarize Email</span>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI Summary
          </CardTitle>
          <CardDescription>
            Key takeaways from your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          ) : summary ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ul>
                {summary.split('- ').filter(s => s.trim() !== '').map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-center text-muted-foreground py-16">
              <Sparkles className="h-10 w-10" />
              <p>Your email summary will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

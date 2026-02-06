import { DocumentSummarizer } from '@/components/summarizer/document-summarizer';
import { EmailSummarizer } from '@/components/summarizer/email-summarizer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function SummarizerPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-headline text-4xl font-bold">AI Summarizer</h1>
        <p className="text-muted-foreground">
          Summarize long documents or emails into succinct takeaways.
        </p>
      </header>
      <Tabs defaultValue="document" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="document">
          <DocumentSummarizer />
        </TabsContent>
        <TabsContent value="email">
          <EmailSummarizer />
        </TabsContent>
      </Tabs>
    </div>
  );
}

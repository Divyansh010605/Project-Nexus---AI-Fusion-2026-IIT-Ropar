import { DocumentSummarizer } from '@/components/summarizer/document-summarizer';

export default function SummarizerPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-headline text-4xl font-bold">
          AI Document Summarizer
        </h1>
        <p className="text-muted-foreground">
          Summarize long documents into succinct takeaways.
        </p>
      </header>
      <DocumentSummarizer />
    </div>
  );
}

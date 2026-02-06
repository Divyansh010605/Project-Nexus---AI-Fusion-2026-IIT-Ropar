'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { PlusCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { lostAndFoundItems } from '@/lib/placeholder-data';
import type { LostAndFoundItem as LostAndFoundItemType } from '@/lib/placeholder-data';
import { Textarea } from '@/components/ui/textarea';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { recognizeItem } from '@/ai/flows/recognize-item';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const reportItemFormSchema = z.object({
  status: z.enum(['lost', 'found'], {
    required_error: 'You need to select a status.',
  }),
  name: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  image: z.any().optional(),
});

type ReportItemFormValues = z.infer<typeof reportItemFormSchema>;

function ReportItemForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ReportItemFormValues>({
    resolver: zodResolver(reportItemFormSchema),
    defaultValues: {
      status: 'found',
      name: '',
      description: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setIsRecognizing(true);
        form.setValue('name', '');
        form.setValue('description', '');
        try {
          const result = await recognizeItem({ photoDataUri: dataUri });
          form.setValue('name', result.itemName);
          form.setValue('description', result.description);
        } catch (error) {
          console.error('Error recognizing item:', error);
          toast({
            variant: 'destructive',
            title: 'AI Recognition Failed',
            description:
              'Could not recognize the item from the image. Please enter the details manually.',
          });
        } finally {
          setIsRecognizing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: ReportItemFormValues) {
    console.log(values);
    toast({
      title: 'Item Reported!',
      description: `Your ${values.status} item "${values.name}" has been listed.`,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Is the item lost or found?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="found" />
                      </FormControl>
                      <FormLabel className="font-normal">I found something</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="lost" />
                      </FormControl>
                      <FormLabel className="font-normal">I lost something</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative aspect-video w-full cursor-pointer rounded-lg border-2 border-dashed bg-muted hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
             <input
              type="file"
              ref={fileInputRef}
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-md" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                    <p className="mt-2 text-sm font-semibold">Click to upload an image</p>
                    <p className="text-xs">AI will try to recognize the item for you!</p>
                </div>
            )}
            {isRecognizing && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            )}
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Red Water Bottle" {...field} disabled={isRecognizing}/>
                </FormControl>
                {isRecognizing && <Skeleton className="h-4 mt-1 w-2/3" />}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Found near the library, has a dent on the side."
                    {...field}
                    disabled={isRecognizing}
                  />
                </FormControl>
                {isRecognizing && <Skeleton className="h-4 mt-1 w-full" />}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Report Item</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


function ItemCard({ item }: { item: LostAndFoundItemType }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video w-full">
          {item.image ? (
            <Image
              src={item.image.imageUrl}
              alt={item.image.description}
              fill
              className="rounded-t-lg object-cover"
              data-ai-hint={item.image.imageHint}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        <Badge
          className="absolute top-2 right-2"
          variant={item.status === 'Found' ? 'default' : 'destructive'}
        >
          {item.status}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          More Info
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function LostAndFoundPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold">Lost &amp; Found</h1>
          <p className="text-muted-foreground">
            Help reconnect items with their owners across the IIT Ropar campus.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              <span>Report Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Report an Item</DialogTitle>
              <DialogDescription>
                Fill out the details for the item you lost or found. Upload an image to have AI help you out.
              </DialogDescription>
            </DialogHeader>
            <ReportItemForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </header>

      {/* Search and filter can be added here later */}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lostAndFoundItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

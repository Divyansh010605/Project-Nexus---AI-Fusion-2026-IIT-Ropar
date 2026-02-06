'use client';

import * as React from 'react';
import { MarketplaceItem } from '@/components/marketplace/marketplace-item';
import { Button } from '@/components/ui/button';
import { marketplaceItems } from '@/lib/placeholder-data';
import { PlusCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { recognizeItem } from '@/ai/flows/recognize-item';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const listItemFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  price: z.string().min(1, {
    message: 'You must enter a price.',
  }),
  description: z.string().optional(),
  image: z.any().optional(),
});

type ListItemFormValues = z.infer<typeof listItemFormSchema>;

function ListItemForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ListItemFormValues>({
    resolver: zodResolver(listItemFormSchema),
    defaultValues: {
      name: '',
      price: '',
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

  function onSubmit(values: ListItemFormValues) {
    console.log(values);
    toast({
      title: 'Item Listed!',
      description: `Your item "${values.name}" has been listed for sale.`,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div
            className="relative aspect-video w-full cursor-pointer rounded-lg border-2 border-dashed bg-muted hover:border-primary"
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
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ImageIcon className="h-12 w-12" />
                <p className="mt-2 text-sm font-semibold">
                  Click to upload an image
                </p>
                <p className="text-xs">
                  AI will try to recognize the item for you!
                </p>
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
                  <Input
                    placeholder="e.g., Used Calculus Textbook"
                    {...field}
                    disabled={isRecognizing}
                  />
                </FormControl>
                {isRecognizing && <Skeleton className="h-4 mt-1 w-2/3" />}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., INR 500" {...field} />
                </FormControl>
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
                    placeholder="e.g., Good condition, minimal highlighting."
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
          <Button type="submit">List Item</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default function MarketplacePage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold">
            IITR Student Exchange
          </h1>
          <p className="text-muted-foreground">
            Buy, sell, and trade with fellow students at IIT Ropar.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              <span>List an Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>List an Item for Sale</DialogTitle>
              <DialogDescription>
                Fill out the details for the item you want to sell. Upload an
                image to have AI help you out.
              </DialogDescription>
            </DialogHeader>
            <ListItemForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {marketplaceItems.map((item) => (
          <MarketplaceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

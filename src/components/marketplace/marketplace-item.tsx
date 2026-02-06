import type { MarketplaceItem as MarketplaceItemType } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MarketplaceItemProps {
  item: MarketplaceItemType;
}

export function MarketplaceItem({ item }: MarketplaceItemProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
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
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">{item.price}</p>
        <Button variant="outline">View</Button>
      </CardFooter>
    </Card>
  );
}

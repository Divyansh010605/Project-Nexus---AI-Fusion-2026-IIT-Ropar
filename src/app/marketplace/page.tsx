import { MarketplaceItem } from '@/components/marketplace/marketplace-item';
import { Button } from '@/components/ui/button';
import { marketplaceItems } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold">
            Student Exchange
          </h1>
          <p className="text-muted-foreground">
            Buy, sell, and trade with fellow students.
          </p>
        </div>
        <Button>
          <PlusCircle />
          <span>List an Item</span>
        </Button>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {marketplaceItems.map((item) => (
          <MarketplaceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

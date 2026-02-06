'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LeafletMap = dynamic(() => import('@/components/map/leaflet-map'), {
  loading: () => <Skeleton className="h-full w-full" />,
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-headline text-4xl font-bold">IIT Ropar Pathfinder</h1>
        <p className="text-muted-foreground">
          Find your way around the IIT Ropar campus with ease.
        </p>
      </header>
      <div className="h-[calc(100vh-200px)]">
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">
                Interactive Map
                </CardTitle>
                <CardDescription>A live map of the IIT Ropar campus.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <LeafletMap />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

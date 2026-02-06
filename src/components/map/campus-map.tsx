'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CampusMap() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/leaflet-map'), {
        loading: () => <Skeleton className="h-full w-full" />,
        ssr: false,
      }),
    []
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Interactive Map
        </CardTitle>
        <CardDescription>A live map of the IIT Ropar campus.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <Map />
      </CardContent>
    </Card>
  );
}

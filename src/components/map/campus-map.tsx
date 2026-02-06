'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, MapPin } from 'lucide-react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function CampusMap() {
  const mapPlaceholder = getPlaceholderImage('mapPlaceholder');
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Interactive Map
        </CardTitle>
        <CardDescription>
          AR navigation and accessibility routes coming soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Feature in Development</AlertTitle>
          <AlertDescription>
            The interactive map requires a Google Maps API key. Please add it to
            your environment variables as `NEXT_PUBLIC_MAPS_API_KEY` to enable
            this feature.
          </AlertDescription>
        </Alert>
        <div className="relative flex-1 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {mapPlaceholder && (
            <Image
              src={mapPlaceholder.imageUrl}
              alt={mapPlaceholder.description}
              fill
              className="object-cover opacity-30"
              data-ai-hint={mapPlaceholder.imageHint}
            />
          )}
          <div className="z-10 flex flex-col items-center text-muted-foreground">
            <MapPin className="h-12 w-12" />
            <p className="mt-2 font-semibold">Map View Unavailable</p>
            <p className="text-sm">Please configure API key.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

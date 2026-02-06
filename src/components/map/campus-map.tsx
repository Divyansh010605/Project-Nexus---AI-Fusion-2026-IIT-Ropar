'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CampusMap() {
  const iitRoparEmbedUrl =
    'https://www.openstreetmap.org/export/embed.html?bbox=76.5134%2C30.9613%2C76.553%2C30.9739&layer=mapnik&marker=30.9676%2C76.5332';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Interactive Map
        </CardTitle>
        <CardDescription>
          A live map of the IIT Ropar campus powered by OpenStreetMap.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full w-full rounded-lg overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={iitRoparEmbedUrl}
            title="IIT Ropar Campus Map"
            aria-label="IIT Ropar Campus Map"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}

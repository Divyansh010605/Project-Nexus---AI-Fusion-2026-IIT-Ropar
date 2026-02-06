'use client';

import { CampusMap } from '@/components/map/campus-map';

export default function MapPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <header>
        <h1 className="font-headline text-4xl font-bold">IIT Ropar Pathfinder</h1>
        <p className="text-muted-foreground">
          Discover and navigate your local ecosystem.
        </p>
      </header>
      <div className="flex-1 min-h-0">
        <CampusMap />
      </div>
    </div>
  );
}

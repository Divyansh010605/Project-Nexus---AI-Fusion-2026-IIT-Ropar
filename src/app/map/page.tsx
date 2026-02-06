'use client';

import { CampusMap } from '@/components/map/campus-map';

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
        <CampusMap />
      </div>
    </div>
  );
}

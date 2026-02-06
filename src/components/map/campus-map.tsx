'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function CampusMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const position = { lat: 30.9676, lng: 76.5332 }; // IIT Ropar coordinates

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
        <Card className="h-full flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle className='text-2xl'>Google Maps API Key Missing</CardTitle>
                <CardDescription>Please provide a valid API key to display the map.</CardDescription>
            </CardHeader>
            <CardContent className='w-full max-w-lg'>
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Action Required</AlertTitle>
                    <AlertDescription className='text-left'>
                        <p>To enable the interactive map, add a Google Maps API key to your project:</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                            <li>Go to the <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Google Cloud Console</a> and enable the "Maps JavaScript API".</li>
                            <li>Create a new API key.</li>
                            <li>Create a file named <code>.env</code> in your project's root folder (or use the existing one).</li>
                            <li>Add your key to the file: <pre className="p-2 my-2 bg-muted rounded-md text-xs"><code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"</code></pre></li>
                            <li>Restart your app to apply the changes.</li>
                        </ol>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Interactive Map
        </CardTitle>
        <CardDescription>A live map of the IIT Ropar campus.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <APIProvider apiKey={apiKey}>
            <div className='h-full w-full rounded-lg overflow-hidden relative'>
                <Map
                    defaultCenter={position}
                    defaultZoom={16}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    mapId={'iit-ropar-map'}
                    className="h-full w-full"
                >
                    <AdvancedMarker position={position} onClick={() => setInfoWindowOpen(true)}>
                        <Pin
                            background={'hsl(var(--primary))'}
                            borderColor={'hsl(var(--accent))'}
                            glyphColor={'hsl(var(--primary-foreground))'}
                        />
                    </AdvancedMarker>
                    {infoWindowOpen && (
                    <InfoWindow position={position} onCloseClick={() => setInfoWindowOpen(false)}>
                        <div className="p-1">
                            <h3 className="font-bold">IIT Ropar</h3>
                            <p className="text-sm">Main Campus</p>
                        </div>
                    </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
      </CardContent>
    </Card>
  );
}

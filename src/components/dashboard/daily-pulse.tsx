import {
  campusAlerts,
  campusEvents,
  diningOptions,
} from '@/lib/placeholder-data';
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Utensils,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';

export function DailyPulse() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Daily Pulse</CardTitle>
        <CardDescription>
          Real-time updates from around campus.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {campusAlerts.length > 0 && (
          <div className="space-y-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Campus Alerts
            </h3>
            {campusAlerts.map((alert, index) => (
              <div key={index}>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-destructive/80">
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div>
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <Utensils className="h-5 w-5 text-primary" />
            Dining Options
          </h3>
          <div className="space-y-3">
            {diningOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-secondary/50 p-3"
              >
                <div>
                  <p className="font-medium">{option.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Wait time: {option.waitTime}
                  </p>
                </div>
                <Badge
                  variant={option.status === 'Open' ? 'default' : 'secondary'}
                  className={
                    option.status === 'Open'
                      ? 'bg-green-600/20 text-green-800 border-transparent'
                      : ''
                  }
                >
                  {option.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {campusEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-secondary/50 p-3"
              >
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.time} &middot; {event.location}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

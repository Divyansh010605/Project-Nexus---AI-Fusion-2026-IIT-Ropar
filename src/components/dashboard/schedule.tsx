import { schedule } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Schedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">My Schedule</CardTitle>
        <CardDescription>Your classes for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {schedule.map((item, index) => (
            <li key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item.course}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.location}</p>
              {index < schedule.length - 1 && (
                <Separator className="mt-4" />
              )}
            </li>
          ))}
          {schedule.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 text-center text-muted-foreground py-8">
                <Clock className="h-8 w-8" />
                <p>No classes scheduled for today.</p>
            </div>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}

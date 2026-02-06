import { DailyPulse } from '@/components/dashboard/daily-pulse';
import { InsightsTool } from '@/components/dashboard/insights-tool';
import { Schedule } from '@/components/dashboard/schedule';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-headline text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Your daily overview of life at IIT Ropar.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyPulse />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Schedule />
          <InsightsTool />
        </div>
      </div>
    </div>
  );
}

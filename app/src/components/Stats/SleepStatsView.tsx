import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SleepStats {
  averageSleepHours: number;
  averageFatigue: number;
  totalLogs: number;
  streakDays: number;
  recentLogs: {
    date: string;
    sleepHours: number;
    fatigueLevel: number;
  }[];

  trendData: {
    date: string;
    sleepHours: number;
    fatigueLevel: number;
  }[];
}

interface SleepStatsViewProps {
  stats: SleepStats;
}

export const SleepStatsView = ({ stats }: SleepStatsViewProps) => {
  const getFatigueColor = (level: number) => {
    if (level <= 2) return 'text-destructive';
    if (level <= 3) return 'text-orange-500';
    return 'text-success';
  };

  const getSleepQuality = (hours: number) => {
    if (hours >= 8) return { label: 'Great', color: 'text-success' };
    if (hours >= 7) return { label: 'Good', color: 'text-success' };
    if (hours >= 6) return { label: 'Fair', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-destructive' };
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Avg Sleep</span>
            </div>
            <div className="text-2xl font-bold">{stats.averageSleepHours.toFixed(1)}h</div>
            <div className={`text-xs ${getSleepQuality(stats.averageSleepHours).color}`}>
              {getSleepQuality(stats.averageSleepHours).label}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Avg Energy</span>
            </div>
            <div className="text-2xl font-bold">{stats.averageFatigue.toFixed(1)}/5</div>
            <div className={`text-xs ${getFatigueColor(stats.averageFatigue)}`}>
              {stats.averageFatigue >= 4 ? 'Energized' : stats.averageFatigue >= 3 ? 'Moderate' : 'Low'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.streakDays}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Total Logs</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalLogs}</div>
            <div className="text-xs text-muted-foreground">entries</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Recent Sleep
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentLogs.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No sleep logs yet</p>
              <p className="text-sm text-muted-foreground">Start logging to see your patterns!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium">{log.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {log.sleepHours.toFixed(1)} hours
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getFatigueColor(log.fatigueLevel)}`}>
                      Energy: {log.fatigueLevel}/5
                    </div>
                    <div className={`text-xs ${getSleepQuality(log.sleepHours).color}`}>
                      {getSleepQuality(log.sleepHours).label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {stats.trendData && (stats.trendData.length > 0) &&(
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary"/>
              Sleep Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30"/>
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 10}}
                    tickFormatter={(value)=>{
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis 
                    yAxisId="hours"
                    orientation="left"
                    tick={{fontSize: 10}}
                    domain={[0, 12]}
                  />
                  <YAxis 
                    yAxisId="fatigue"
                    orientation="right"
                    tick={{fontSize: 10}}
                    domain={[1, 5]}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'sleepHours' ? `${value}h`:`${value}/5`,
                      name === 'sleepHours' ? 'Sleep':'Energy'
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Line 
                    yAxisId="hours"
                    type="monotone" 
                    dataKey="sleepHours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))',strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    yAxisId="fatigue"
                    type="monotone" 
                    dataKey="fatigueLevel" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))',strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Sleep Hours</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Energy Level</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-soft bg-gradient-secondary">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">💡 Sleep Tip</h3>
          <p className="text-sm text-muted-foreground">
            {stats.averageSleepHours < 7 
              ? "Try going to bed 15 minutes earlier each night until you reach 7-9 hours of sleep."
              : stats.averageFatigue < 3
              ? "Consider your sleep environment - is it dark, quiet, and cool?"
              : "Great job! Keep up your healthy sleep routine."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
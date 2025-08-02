import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const useSleepStats = (userId: string) => {
  const [stats, setStats] = useState<SleepStats>({
    averageSleepHours: 0,
    averageFatigue: 0,
    totalLogs: 0,
    streakDays: 0,
    recentLogs: [],
    trendData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (userId) {
      loadStats();
    }
  }, [userId]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const { data: sleepLogs, error } = await supabase
        .from('sleep_logs')
        .select('*')
        .eq('user_id', userId)
        .order('log_date', { ascending: false });

      if (error) throw error;
      if (!sleepLogs || sleepLogs.length === 0) {
        setIsLoading(false);
        return;
      }

      const logsWithHours = sleepLogs.map(log => {
        const sleepHours = log.bedtime && log.wake_time ? 
          (new Date(log.wake_time).getTime() - new Date(log.bedtime).getTime())/(1000 * 60 * 60) : 0;
        return { ...log, sleepHours };
      });
      const totalHours = logsWithHours.reduce((sum, log) => sum + log.sleepHours, 0);
      const totalFatigue = logsWithHours.reduce((sum, log) => sum + log.fatigue_level, 0);
      const averageSleepHours = totalHours / logsWithHours.length;
      const averageFatigue = totalFatigue / logsWithHours.length;
      const streakDays = calculateStreak(sleepLogs);
      const recentLogs = logsWithHours.slice(0, 7).map(log => ({
        date: formatDate(log.log_date),
        sleepHours: log.sleepHours,
        fatigueLevel: log.fatigue_level,
      }));
      const trendData = logsWithHours.slice(0, 30).reverse().map(log => ({
        date: log.log_date,
        sleepHours: log.sleepHours,
        fatigueLevel: log.fatigue_level,
      }));

      setStats({
        averageSleepHours,
        averageFatigue,
        totalLogs: sleepLogs.length,
        streakDays,
        recentLogs,
        trendData,
      });
    }
    catch (error){
      console.error('Error loading sleep stats:', error);
    } finally{
      setIsLoading(false);
    }
  };

  const calculateStreak = (logs: any[]) => {
    if (logs.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    const sortedLogs = logs.sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime());

    for (let i = 0;i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].log_date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (logDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      }
      else {
        break;
      }
    }

    return streak;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    else if(date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    else{
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));

      return `${diffDays} days ago`;
    }
  };

  return { stats,isLoading,refreshStats: loadStats };
};
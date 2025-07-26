import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "./Layout/AppHeader";
import { TabNavigation } from "./Layout/TabNavigation";
import { QuickLogForm } from "./SleepLog/QuickLogForm";
import { AIChatInterface } from "./Chat/AIChatInterface";
import { SleepStatsView } from "./Stats/SleepStatsView";
import { useToast } from "@/hooks/use-toast";

interface SleepLogData {
  bedtime: string;
  wakeTime: string;
  fatigueLevel: number;
  hadNap: boolean;
  napDuration?: number;
  notes?: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ZenoApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState<'log' | 'chat' | 'stats'>('log');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [todaysLog, setTodaysLog] = useState<SleepLogData | null>(null);
  const { toast } = useToast();

  // Auth state management
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load today's sleep log
  useEffect(() => {
    if (user) {
      loadTodaysLog();
      loadChatHistory();
    }
  }, [user]);

  const loadTodaysLog = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('sleep_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setTodaysLog({
          bedtime: data.bedtime.split('T')[1].substring(0, 5),
          wakeTime: data.wake_time.split('T')[1].substring(0, 5),
          fatigueLevel: data.fatigue_level,
          hadNap: data.had_nap,
          napDuration: data.nap_duration,
          notes: data.notes,
        });
      }
    } catch (error) {
      console.error('Error loading today\'s log:', error);
    }
  };

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      const formattedMessages: Message[] = data.map(msg => ({
        id: msg.id,
        content: msg.message,
        isUser: msg.is_user,
        timestamp: new Date(msg.created_at),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSleepLogSubmit = async (data: SleepLogData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const bedtimeDate = new Date(`${today}T${data.bedtime}:00`);
      const wakeTimeDate = new Date(`${today}T${data.wakeTime}:00`);

      // If wake time is before bedtime, assume wake time is next day
      if (wakeTimeDate < bedtimeDate) {
        wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
      }

      const logData = {
        user_id: user.id,
        bedtime: bedtimeDate.toISOString(),
        wake_time: wakeTimeDate.toISOString(),
        fatigue_level: data.fatigueLevel,
        had_nap: data.hadNap,
        nap_duration: data.hadNap ? data.napDuration : null,
        notes: data.notes || null,
        log_date: today,
      };

      const { error } = await supabase
        .from('sleep_logs')
        .upsert(logData, { onConflict: 'user_id,log_date' });

      if (error) throw error;

      setTodaysLog(data);
    } catch (error) {
      console.error('Error saving sleep log:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    await supabase.from('chat_messages').insert({
      user_id: user.id,
      message: message,
      is_user: true,
    });

    setTimeout(async () => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for sharing! I'm here to help you with your sleep wellness journey. 😊",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        message: aiResponse.content,
        is_user: false,
      });
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "See you later! 👋",
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const mockStats = {
    averageSleepHours: 7.2,
    averageFatigue: 3.4,
    totalLogs: 12,
    streakDays: 5,
    recentLogs: [
      { date: 'Today', sleepHours: 7.5, fatigueLevel: 4 },
      { date: 'Yesterday', sleepHours: 6.8, fatigueLevel: 3 },
      { date: '2 days ago', sleepHours: 8.2, fatigueLevel: 5 },
    ],
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in to continue</h1>
          <p className="text-muted-foreground">Authentication is required to access Zeno</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      <AppHeader 
        userName={user?.user_metadata?.display_name || user?.email?.split('@')[0]} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 pb-20">
        {activeTab === 'log' && (
          <QuickLogForm
            onSubmit={handleSleepLogSubmit}
            isLoading={isLoading}
            existingLog={todaysLog}
          />
        )}
        
        {activeTab === 'chat' && (
          <div className="h-full">
            <AIChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={false}
            />
          </div>
        )}
        
        {activeTab === 'stats' && (
          <SleepStatsView stats={mockStats} />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};
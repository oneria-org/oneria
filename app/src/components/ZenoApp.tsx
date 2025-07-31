import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "./Layout/AppHeader";
import { TabNavigation } from "./Layout/TabNavigation";
import { QuickLogForm } from "./SleepLog/QuickLogForm";
import { AIChatInterface } from "./Chat/AIChatInterface";
import { SleepStatsView } from "./Stats/SleepStatsView";
import { useToast } from "@/hooks/use-toast";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import { useSleepStats } from "@/hooks/useSleepStats";

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
  const { sendMessage: sendGeminiMessage, isLoading: isGeminiLoading } = useGeminiChat(user?.id || '');
  const { stats: sleepStats, isLoading: statsLoading } = useSleepStats(user?.id || '');

  // Auth state management
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

      // If wake time is before bedtime, assume wake time is next day (work after testing)
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

    try {
      const aiResponseText = await sendGeminiMessage(message);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }
    catch (error) {
      console.error('Error calling Gemini:', error);
      
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble right now. How about we chat about your sleep anyway? 😊",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    }
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
              isLoading={isGeminiLoading}
            />
          </div>
        )}
        
        {activeTab === 'stats' && (
          <SleepStatsView stats={sleepStats} />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};
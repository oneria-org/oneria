import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LandingPage } from "@/components/Landing/LandingPage";
import { AuthPage } from "@/components/Auth/AuthPage";
import { ZenoApp } from "@/components/ZenoApp";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
          </div>
          <p className="text-muted-foreground">Loading Zeno...</p>
        </div>
      </div>
    );
  }

  if (showAuth && !user) {
    return <AuthPage />;
  }

  if (user) {
    return <ZenoApp />;
  }

  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
};

export default Index;

import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LandingPage } from "@/components/Landing/LandingPage";
import { AuthPage } from "@/components/Auth/AuthPage";
import { OrgSetupForm } from "@/components/Auth/OrgSetupForm";
import { ZenoApp } from "@/components/ZenoApp";
import { AdminDashboard } from "@/components/Admin/AdminDashboard";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    user_id: string;
    organization_id?: string;
    is_admin?: boolean;
    organizations?: { name: string };
  } | null>(null);
  const [organization, setOrganization] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam && !user) {
      setShowAuth(true);
    }
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          loadUserProfile(session.user.id);
        }
        
        else {
          setUserProfile(null);
          setOrganization(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user){
        loadUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) =>{
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          organizations (*)
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116'){
        throw profileError;
      }

      setUserProfile(profile);
      setOrganization(profile?.organizations);
    }
    catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

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

  if (user && !userProfile?.organization_id){
    return <OrgSetupForm onComplete={() => loadUserProfile(user.id)} />;
  }

  if (user && userProfile?.is_admin){
    return (
      <AdminDashboard 
        user={user} 
        orgId={userProfile.organization_id} 
        orgName={organization?.name || 'Organization'} 
      />
    );
  }

  if (user) {
    return <ZenoApp />;
  }

  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
};

export default Index;

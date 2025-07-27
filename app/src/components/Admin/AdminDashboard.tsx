import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, Moon, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminStats {
  totalMembers: number;
  activeThisWeek: number;
  averageSleepHours: number;
  averageFatigue: number;
}

interface InviteCode {
  id: string;
  code: string;
  current_uses: number;
  max_uses: number | null;
  expires_at: string | null;
  is_active: boolean;
}

interface AdminDashboardProps {
  user: User;
  orgId: string;
  orgName: string;
}

export const AdminDashboard = ({ user, orgId, orgName }: AdminDashboardProps) => {
  const [stats, setStats] = useState<AdminStats>({
    totalMembers: 0,
    activeThisWeek: 0,
    averageSleepHours: 0,
    averageFatigue: 0,
  });
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
    loadInviteCodes();
  }, [orgId]);

  const loadStats = async () => {
    try {
      const { data: members, error: membersError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('organization_id', orgId);

      if (membersError) throw membersError;

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data: recentLogs, error: logsError } = await supabase
        .from('sleep_logs')
        .select('user_id, bedtime, wake_time, fatigue_level')
        .in('user_id', members?.map(m => m.user_id) || [])
        .gte('created_at', oneWeekAgo.toISOString());

      if (logsError) throw logsError;

      const uniqueActiveUsers = new Set(recentLogs?.map(log => log.user_id) || []).size;
      
      const sleepHours = recentLogs?.map(log => {
        if (log.bedtime && log.wake_time) {
          return (new Date(log.wake_time).getTime() - new Date(log.bedtime).getTime()) / (1000 * 60 * 60);
        }
        return 0;
      }).filter(hours => hours > 0) || [];

      const fatigueScores = recentLogs?.map(log => log.fatigue_level).filter(Boolean) || [];
      setStats({
        totalMembers: members?.length || 0,
        activeThisWeek: uniqueActiveUsers,
        averageSleepHours: sleepHours.length > 0 ? sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length : 0,
        averageFatigue: fatigueScores.length > 0 ? fatigueScores.reduce((a, b) => a + b, 0) / fatigueScores.length : 0,
      });
    }
    catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadInviteCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('org_invite_codes')
        .select('*')
        .eq('organization_id', orgId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInviteCodes(data || []);
    } catch (error) {
      console.error('Error loading invite codes:', error);
    }
  };

  const generateInviteCode = async () => {
    setIsGenerating(true);
    try {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { error } = await supabase
        .from('org_invite_codes')
        .insert({
          organization_id: orgId,
          code,
          created_by: user.id,
          max_uses: null,
        });

      if (error) throw error;

      await loadInviteCodes();
      toast({
        title: "Invite code generated!",
        description: `Code: ${code}`,
      });
    }
    catch (error) {
      console.error('Error generating invite code:', error);
      toast({
        title: "Error",
        description: "Failed to generate invite code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard",
    });
  };

  const deactivateCode = async (codeId: string) => {
    try {
      const { error } = await supabase
        .from('org_invite_codes')
        .update({ is_active: false })
        .eq('id', codeId);

      if (error) throw error;
      await loadInviteCodes();
      toast({
        title: "Code deactivated",
        description: "Invite code has been deactivated",
      });
    } catch (error) {
      console.error('Error deactivating code:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">{orgName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeThisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sleep Hours</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSleepHours.toFixed(1)}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fatigue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageFatigue.toFixed(1)}/5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invite Codes</CardTitle>
          <CardDescription>
            Generate and manage invite codes for your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={generateInviteCode} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate New Code"}
          </Button>

          <div className="space-y-2">
            {inviteCodes.map((code) => (
              <div
                key={code.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <code className="font-mono text-lg">{code.code}</code>
                  <Badge variant={code.is_active ? "default" : "secondary"}>
                    {code.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Used: {code.current_uses}{code.max_uses ? `/${code.max_uses}` : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyCode(code.code)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {code.is_active && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deactivateCode(code.id)}
                    >
                      Deactivate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
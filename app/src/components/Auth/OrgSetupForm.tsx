import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrgSetupFormProps {
  onComplete: () => void;
}

export const OrgSetupForm = ({ onComplete }: OrgSetupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [defaultTab, setDefaultTab] = useState("create");
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam) {
      setInviteCode(codeParam.toUpperCase());
      setDefaultTab("join");
    }
  }, []);

  const createOrganization = async () => {
    if (!orgName.trim() || !adminEmail.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("No authenticated user");

      const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: orgName,
          admin_email: adminEmail,
          referral_code: referralCode,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          organization_id: org.id,
          is_admin: true,
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0],
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;
      const { error: inviteError } = await supabase
        .from('org_invite_codes')
        .insert({
          organization_id: org.id,
          code: referralCode,
          created_by: user.id,
        });

      if (inviteError) throw inviteError;

      toast({
        title: "Organization created!",
        description: `Your referral code is: ${referralCode}`,
      });

      onComplete();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast({
        title: "Error",
        description: "Failed to create organization",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const joinOrganization = async () => {
    if (!inviteCode.trim()) {
      toast({
        title: "Missing code",
        description: "Please enter an invite code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("No authenticated user");

      const { data: inviteData, error: inviteError } = await supabase
        .from('org_invite_codes')
        .select('organization_id, current_uses, max_uses')
        .eq('code', inviteCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (inviteError) throw inviteError;

      if (!inviteData) {
        toast({
          title: "Invalid code",
          description: "The invite code is invalid or expired",
          variant: "destructive",
        });
        return;
      }

      if (inviteData.max_uses && inviteData.current_uses >= inviteData.max_uses) {
        toast({
          title: "Code expired",
          description: "This invite code has reached its maximum uses",
          variant: "destructive",
        });
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          organization_id: inviteData.organization_id,
          is_admin: false,
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0],
          joined_via_code: inviteCode.toUpperCase(),
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      const { error: updateError } = await supabase
        .from('org_invite_codes')
        .update({ current_uses: inviteData.current_uses + 1 })
        .eq('code', inviteCode.toUpperCase());

      if (updateError) throw updateError;

      toast({
        title: "Joined organization!",
        description: "Welcome to your organization",
      });

      onComplete();
    }
    catch (error) {
      console.error('Error joining organization:', error);
      toast({
        title: "Error",
        description: "Failed to join organization",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Setup Your Organization</CardTitle>
          <CardDescription>
            Create a new organization or join an existing one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create New</TabsTrigger>
              <TabsTrigger value="join">Join Existing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="My School/Class"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@school.edu"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={createOrganization} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create Organization"}
              </Button>
            </TabsContent>
            
            <TabsContent value="join" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  type="text"
                  placeholder="ABC123"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="uppercase"
                />
              </div>
              
              <Button 
                onClick={joinOrganization} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Joining..." : "Join Organization"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
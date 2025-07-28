import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  type: 'signup' | 'reset' | 'invite';
  confirm_url?: string;
  display_name?: string;
  org_name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, confirm_url, display_name, org_name }: AuthEmailRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case 'signup':
        subject = "Welcome to Zeno - Confirm Your Account";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
              <p style="color: #6b7280; font-size: 16px;">Your sleep wellness companion</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center;">
              <h2 style="margin: 0 0 20px 0;">Welcome to Zeno, ${display_name || 'friend'}! 🎉</h2>
              <p style="margin: 0 0 25px 0; font-size: 16px; opacity: 0.9;">
                You're one step away from starting your sleep wellness journey.
              </p>
              <a href="${confirm_url}" 
                 style="display: inline-block; background: white; color: #6366f1; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Confirm Your Account
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #6b7280;">
              <p>Best regards,<br><strong>The Zeno Team</strong></p>
              <p style="font-size: 12px; margin-top: 20px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>
        `;
        break;

      case 'reset':
        subject = "Reset Your Zeno Password";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
              <p style="color: #6b7280; font-size: 16px;">Password Reset Request</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 4px solid #6366f1;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0;">Reset Your Password</h2>
              <p style="color: #6b7280; margin: 0 0 25px 0;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              <div style="text-align: center;">
                <a href="${confirm_url}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                  Reset Password
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #6b7280;">
              <p>Best regards,<br><strong>The Zeno Team</strong></p>
              <p style="font-size: 12px; margin-top: 20px;">
                If you didn't request this reset, you can safely ignore this email.
              </p>
            </div>
          </div>
        `;
        break;

      case 'invite':
        subject = `You've been invited to join ${org_name} on Zeno`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
              <p style="color: #6b7280; font-size: 16px;">Organization Invitation</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center;">
              <h2 style="margin: 0 0 20px 0;">You're Invited! 🎊</h2>
              <p style="margin: 0 0 25px 0; font-size: 16px; opacity: 0.9;">
                ${org_name} has invited you to join their organization on Zeno for collaborative sleep wellness tracking.
              </p>
              <a href="${confirm_url}" 
                 style="display: inline-block; background: white; color: #6366f1; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Join Organization
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #6b7280;">
              <p>Best regards,<br><strong>The Zeno Team</strong></p>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "Zeno <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
  catch (error: unknown) {
    console.error("Error in send-auth-emails function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
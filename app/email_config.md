# Zeno Email Templates Config.

##  Confirm Signup
**Subject:** Welcome to Zeno - Confirm Your Account 🌙
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: rgba(255,255,255,0.9); font-size: 16px;">Your sleep wellness companion</p>
  </div>
  
  <div style="background: white; padding: 30px; border-radius: 12px; text-align: center;">
    <h2 style="color: #1f2937; margin: 0 0 20px 0;">Welcome to your sleep journey!</h2>
    <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 16px;">
      You're one step away from starting your personalized sleep wellness experience.
    </p>
    <a href="{{ .ConfirmationURL }}" 
       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
      Confirm Your Account
    </a>
  </div>
  <div style="text-align: center; margin-top: 30px; color: rgba(255,255,255,0.8);">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
    <p style="font-size: 12px; margin-top: 20px;">
      If you didn't create an account, you can safely ignore this email.
    </p>
  </div>
</div>
```
---

## Invite User
**Subject:** You've been invited to join on Zeno!
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: #6b7280; font-size: 16px;">Organization Invitation</p>
  </div>
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center;">
    <h2 style="margin: 0 0 20px 0;">You're Invited!</h2>
    <p style="margin: 0 0 25px 0; font-size: 16px; opacity: 0.9;">
      Your organization has invited you to join their sleep wellness program on Zeno for collaborative tracking and insights!
    </p>
    <a href="{{ .ConfirmationURL }}" 
       style="display: inline-block; background: white; color: #6366f1; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
      Accept Invitation
    </a>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #6b7280;">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
  </div>
</div>
```
---

## Magic Link
**Subject:** Your Zeno Login Link 🔗
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: #6b7280; font-size: 16px;">Secure Login</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 4px solid #6366f1;">
    <h2 style="color: #1f2937; margin: 0 0 20px 0;">Quick & Secure Login</h2>
    <p style="color: #6b7280; margin: 0 0 25px 0;">
      Click the button below to securely log into your Zeno account. This link will expire in 1 hour.
    </p>
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Log Into Zeno
      </a>
    </div>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #6b7280;">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
    <p style="font-size: 12px; margin-top: 20px;">
      If you didn't request this login link, you can safely ignore this email.
    </p>
  </div>
</div>
```
---

## Change Email
**Subject:** Confirm Your New Email Address 📧
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: #6b7280; font-size: 16px;">Email Change Request</p>
  </div>
  <div style="background: #f0f9ff; padding: 30px; border-radius: 12px; border-left: 4px solid #0ea5e9;">
    <h2 style="color: #1f2937; margin: 0 0 20px 0;">Confirm Email Change</h2>
    <p style="color: #6b7280; margin: 0 0 25px 0;">
      We received a request to change your email address. Click the button below to confirm this change and update your account.
    </p>
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Confirm New Email
      </a>
    </div>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #6b7280;">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
    <p style="font-size: 12px; margin-top: 20px;">
      If you didn't request this change, please contact support immediately (info.oneria@gmail.com).
    </p>
  </div>
</div>
```
---

## Reset Pass.
**Subject:** Reset Your Zeno Password 🔐
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: #6b7280; font-size: 16px;">Password Reset Request</p>
  </div>
  
  <div style="background: #fef2f2; padding: 30px; border-radius: 12px; border-left: 4px solid #ef4444;">
    <h2 style="color: #1f2937; margin: 0 0 20px 0;">Reset Your Password</h2>
    <p style="color: #6b7280; margin: 0 0 25px 0;">
      We received a request to reset your password. Click the button below to create a new password for your Zeno account.
    </p>
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Reset Password
      </a>
    </div>
    <p style="color: #6b7280; margin: 25px 0 0 0; font-size: 14px; text-align: center;">
      This link will expire in 1 hour for security reasons.
    </p>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #6b7280;">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
    <p style="font-size: 12px; margin-top: 20px;">
      If you didn't request this reset, you can safely ignore this email.
    </p>
  </div>
</div>
```

---

## Reauth.
**Subject:** Verify Your Identity - Zeno Security Check 🛡️
**Message Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; font-size: 32px; margin: 0;">🌙 Zeno</h1>
    <p style="color: #6b7280; font-size: 16px;">Security Verification</p>
  </div>
  
  <div style="background: #fffbeb; padding: 30px; border-radius: 12px; border-left: 4px solid #f59e0b;">
    <h2 style="color: #1f2937; margin: 0 0 20px 0;">Verify Your Identity</h2>
    <p style="color: #6b7280; margin: 0 0 25px 0;">
      For your security, we need to verify your identity before proceeding. Click the button below to confirm it's really you.
    </p>
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Verify Identity
      </a>
    </div>
    <p style="color: #6b7280; margin: 25px 0 0 0; font-size: 14px; text-align: center;">
      This verification link will expire in 30 minutes.
    </p>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #6b7280;">
    <p>Best regards,<br><strong>The Zeno Team</strong></p>
    <p style="font-size: 12px; margin-top: 20px;">
      If you didn't initiate this request, please contact support immediately info.oneria@gmail.com).
    </p>
  </div>
</div>
```
---
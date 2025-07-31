# Oneria - Sleep Wellness Platform

## 🌙 Overview

This repo contains two things, both under the Oneria umbrella:

- **Marketing Website** (`/web`) - Educational content and organization information
- **Zeno App** (`/app`) - Personal sleep tracking and AI-powered wellness companion

## 🏗️ Project Structure

```
oneria/
├── web/                    # Marketing website (oneria.org)
│   ├── src/
│   ├── public/
│   └── ...
├── app/                    # Zeno sleep tracking app (app.oneria.org)
│   ├── src/
│   ├── supabase/
│   ├── public/
│   └── ...
└── ...
```

## 🌐 Deployments

- **Website**: [oneria.org](https://oneria.org) - Marketing and educational content
- **App**: [app.oneria.org](https://app.oneria.org) - Zeno sleep wellness application

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Website Setup (`/web`)
```bash
cd web
npm install
npm run dev
```

### App Setup (`/app`)
```bash
cd app
npm install
npm run dev
```

## 🛠️ Tech Stack

### Marketing Website (`/web`)
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Analytics**: Vercel Analytics

### Zeno App (`/app`)
- **Framework**: React + TypeScript + Vite
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **AI**: Google Gemini API
- **Email**: Resend
- **Analytics**: Vercel Analytics

## 🔧 Features

### Marketing Website
- Responsive
- Educational content about sleep wellness
- Organization information
- Contact forms
- SEO optimized

### Zeno App
- **User Authentication** - Secure signup/login with email confirmation
- **Sleep Logging** - Track bedtime, wake time, fatigue levels, naps
- **AI Chat Companion** - Personalized sleep advice using Gemini AI
- **Statistics Dashboard** - Sleep trends, averages, and streaks
- **Organization Management** - Admin dashboards and invite codes
- **Real-time Analytics** - User engagement and sleep pattern insights

## 🗄️ Database Schema

### Tables
- `profiles` - User profiles and organization membership
- `organizations` - Organization management and admin controls
- `sleep_logs` - Daily sleep tracking data
- `chat_messages` - AI conversation history
- `invite_codes` - Organization invitation system

## 🔐 Environment Variables

### App (`/app/.env.example`)

## 📧 Email Config

Custom email templates are configured for:
- Account confirmation
- Password reset
- Organization invitations
- Magic link authentication
- Email change verification
- Security reauthentication
See `/app/email_config.md` for complete template configs. (done through supabase, attempted to do through resend)

## 🤖 AI Integration

Zeno uses Gemini API to provide ...
- Personalized sleep advice based on user data
- Contextual responses using sleep history
- Friendly, supportive conversation style
- Practical tips for better sleep hygiene

## 👥 Organization Features

- **Admin Dashboards** - Manage members and view aggregate statistics
- **Invite Code System** - Secure organization onboarding
- **Member Analytics** - Track engagement and sleep patterns
- **Bulk Management** - Efficient user administration

## General Info

### Website
- Platform: Vercel
- Domain: oneria.org
- Build: `npm run build`

### App
- Platform: Vercel
- Domain: app.oneria.org
- Build: `npm run build`
- Database: Supabase (PostgreSQL)
- Edge Functions: Supabase

## 📊 Analytics

Both applications include Vercel Analytics for:
- Page views and user engagement
- Performance monitoring
- Core Web Vitals tracking
- Real-time visitor insights

## 📞 Support

For support or questions:
- Email: info.oneria@gmail.com
- Website: [oneria.org](https://oneria.org)
- App: [app.oneria.org](https://app.oneria.org)
- Instagram: [oneriaorg](https://instagram.com/oneriaorg)

---

**Built with <3 for better sleep wellness**
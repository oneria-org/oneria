import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  message: string;
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { message, userId }: ChatRequest = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const { data: sleepLogs } = await supabaseClient
      .from('sleep_logs')
      .select('*')
      .eq('user_id', userId)
      .order('log_date', { ascending: false })
      .limit(7);

    const { data: chatHistory } = await supabaseClient
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    let contextPrompt = `You are a supportive, friendly AI assistant helping a student with their sleep wellness. You speak like a caring friend or older sibling - casual but encouraging. Use their tone and be relatable.

Key guidelines:
- Keep responses conversational and brief (2-3 sentences max usually)
- Use emojis occasionally but not excessively
- Reference their sleep data naturally when relevant
- Ask follow-up questions to keep them engaged
- Suggest practical, student-friendly sleep tips
- Show empathy for student stress and challenges

`;

    if (sleepLogs && sleepLogs.length > 0) {
      contextPrompt += `Recent sleep data:
`;
      sleepLogs.forEach((log, index) => {
        const sleepHours = log.bedtime && log.wake_time ? 
          (new Date(log.wake_time).getTime() - new Date(log.bedtime).getTime()) / (1000 * 60 * 60) : 0;
        contextPrompt += `${index === 0 ? 'Last night' : `${index + 1} days ago`}: ${sleepHours.toFixed(1)}h sleep, fatigue level ${log.fatigue_level}/5${log.had_nap ? ', had nap' : ''}
`;
      });
    }

    if (chatHistory && chatHistory.length > 0) {
      contextPrompt += `
Recent chat context:
`;
      chatHistory.reverse().forEach(chat => {
        contextPrompt += `${chat.is_user ? 'Student' : 'You'}: ${chat.message}
`;
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${contextPrompt}

Student's message: ${message}

Respond naturally and helpfully:`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 200,
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error('Failed to get response from Gemini');
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to chat about your sleep! How are you feeling today? 😊";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "Sorry, I'm having trouble right now. How about we chat about your sleep anyway? 😊"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage{
  id: string;
  message: string;
  is_user: boolean;
  created_at: string;
}
interface SleepLog{
  bedtime: string;
  wake_time: string;
  fatigue_level: number;
  had_nap: boolean;
  log_date: string;
}

export const useGeminiChat = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    try {
      const { data: sleepLogs } = await supabase.from('sleep_logs').select('bedtime, wake_time, fatigue_level, had_nap, log_date').eq('user_id', userId).order('log_date', { ascending: false }).limit(7);
      const { data: chatHistory } = await supabase
        .from('chat_messages')
        .select('message, is_user')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      let contextPrompt = 
`You are a supportive, friendly AI assistant helping a student with their sleep wellness. You speak like a caring friend or older sibling - casual but encouraging. Use their tone and be relatable.
Key guidelines:
- Keep responses conversational and brief (2-3 sentences max usually)
- Use emojis occasionally but not excessively
- Reference their sleep data naturally when relevant
- Ask follow-up questions to keep them engaged
- Suggest practical, student-friendly sleep tips
- Show empathy for student stress and challenges`;

      if (sleepLogs && sleepLogs.length > 0){
        contextPrompt += `Recent sleep data:\n`;

        sleepLogs.forEach((log, index) => {
          const sleepHours = log.bedtime && log.wake_time ? 
            (new Date(log.wake_time).getTime() - new Date(log.bedtime).getTime()) / (1000 * 60 * 60) : 0;
          contextPrompt += `${index === 0 ? 'Last night' : `${index + 1} days ago`}: ${sleepHours.toFixed(1)}h sleep, fatigue level ${log.fatigue_level}/5${log.had_nap ? ', had nap' : ''}\n`;
        });
      }

      if (chatHistory && chatHistory.length > 0){
        contextPrompt += `\nRecent chat context:\n`;
        chatHistory.reverse().forEach(chat => {
          contextPrompt += `${chat.is_user ? 'Student' : 'You'}: ${chat.message}\n`;
        });
      }

      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${contextPrompt}\n\nStudent's message: ${message}\n\nRespond naturally and helpfully:`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 200,
          }
        }),
      });

      if(!response.ok){
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to chat about your sleep! How are you feeling today? 😊";

      await supabase.from('chat_messages').insert([
        { user_id: userId, message, is_user: true },
        { user_id: userId, message: aiResponse, is_user: false }
      ]);

      return aiResponse;
    }
    catch (error) {
      console.error('Error calling Gemini:', error);
      
      return "Sorry, I'm having trouble right now.";
    }
    finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
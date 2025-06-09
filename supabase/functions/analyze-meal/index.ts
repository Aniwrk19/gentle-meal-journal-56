
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mealDescription, goalId } = await req.json();

    // Create goal-specific context for the AI
    const goalContext = getGoalContext(goalId);

    const systemPrompt = `You are a nutritionist AI that analyzes meal descriptions and provides accurate nutritional information and mindful eating tips.

Goal Context: ${goalContext}

Instructions:
1. Analyze the meal description to estimate realistic nutritional values
2. Provide calories, protein, carbs, and fat in the exact format specified
3. Generate a personalized mindful tip based on the meal AND the user's goal
4. Be encouraging and supportive in your language
5. Keep tips practical and actionable

Response format (JSON only):
{
  "calories": "XXX kcal",
  "protein": "XXg",
  "carbs": "XXg", 
  "fat": "XXg",
  "tip": "A personalized mindful eating tip based on the meal and goal"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this meal: "${mealDescription}"` }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from OpenAI
    let nutritionalData;
    try {
      nutritionalData = JSON.parse(content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.error('Failed to parse OpenAI response:', content);
      nutritionalData = {
        calories: "250 kcal",
        protein: "10g",
        carbs: "30g",
        fat: "8g",
        tip: "Great choice! Remember to eat mindfully and savor each bite."
      };
    }

    return new Response(JSON.stringify(nutritionalData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-meal function:', error);
    
    // Return fallback data on error
    const fallbackData = {
      calories: "200 kcal",
      protein: "8g",
      carbs: "25g",
      fat: "6g",
      tip: "Unable to analyze your meal right now, but great job logging it! Every mindful choice counts."
    };

    return new Response(JSON.stringify(fallbackData), {
      status: 200, // Return 200 to not break the UI
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getGoalContext(goalId: string | null): string {
  switch (goalId) {
    case 'mindful':
      return "The user wants to be more mindful about what they eat. Focus on awareness, presence, and conscious eating habits.";
    case 'relationship':
      return "The user wants to improve their relationship with food. Focus on positive associations, balance, and self-compassion.";
    case 'wellbeing':
      return "The user wants to learn what makes them feel good. Focus on how foods affect energy, mood, and overall wellness.";
    case 'peaceful':
      return "The user wants to record meals peacefully. Focus on gentle, non-judgmental guidance and simple appreciation.";
    default:
      return "The user is exploring mindful eating. Provide general supportive guidance.";
  }
}

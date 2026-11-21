import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    if (!message) throw new Error("Message is required.");

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const prompt = `
      You are an expert psychoanalyst and communication specialist. 
      Analyze the following text message for subtext, defense mechanisms, emotional tone, and hidden meanings.
      
      Sender/Context: ${context || "Not specified"}
      Message: "${message}"
      
      Return ONLY valid JSON with these exact keys:
      {
        "surface_meaning": "What the message literally says in 1-2 sentences.",
        "emotional_subtext": "The underlying emotion or unmet need driving the message.",
        "hidden_meanings": ["Array of 2-4 specific implied meanings, passive-aggressive cues, or unspoken expectations."],
        "psychological_lens": "Identify any likely defense mechanisms, attachment cues, or power dynamics (e.g., deflection, boundary-testing, bid for reassurance).",
        "suggested_reply": "A grounded, emotionally intelligent way to respond."
      }
    `;

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    const aiData = await aiRes.json();
    const rawText = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
    const analysis = JSON.parse(rawText);

    // Save to Supabase Postgres
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabase.from("message_analyses").insert({
      original_message: message,
      sender_context: context || null,
      surface_meaning: analysis.surface_meaning,
      emotional_subtext: analysis.emotional_subtext,
      hidden_meanings: analysis.hidden_meanings,
      psychological_lens: analysis.psychological_lens,
      suggested_reply: analysis.suggested_reply,
    });

    if (dbError) console.error("DB Insert Error:", dbError);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

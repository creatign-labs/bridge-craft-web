import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

export default async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return new Response(JSON.stringify({ ok: true, time: Date.now() }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

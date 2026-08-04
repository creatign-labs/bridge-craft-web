import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CONSENT_TEXT =
  "I consent to Bridge Craft Engineers & Consultants storing the details I have submitted and contacting me about my enquiry. My details will not be sold or shared with third parties.";

const bodySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project")
    .max(2000, "Message is too long"),
  consent: z.boolean(),
  honeypot: z.string().optional(),
  loadedAt: z.number(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const json = await req.json().catch(() => null);
    if (!json) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid input";
      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, message, consent, honeypot, loadedAt } = parsed.data;

    // Honeypot: silently accept but do nothing if a bot fills the hidden field.
    if (honeypot && honeypot.trim() !== "") {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Time trap: reject submissions that arrive within 3 seconds of page load.
    if (Date.now() - loadedAt < 3000) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!consent) {
      return new Response(JSON.stringify({ error: "Please accept the data consent notice before sending." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = Deno.env.get("SANITY_API_TOKEN");
    const projectId = Deno.env.get("SANITY_PROJECT_ID") || "n5ypw1x0";
    const dataset = Deno.env.get("SANITY_DATASET") || "production";

    if (!token) {
      console.error("SANITY_API_TOKEN is not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lowerEmail = email.toLowerCase();
    const since = new Date(Date.now() - 60_000).toISOString();
    const query = encodeURIComponent(
      `*[_type == "contactSubmission" && lower(email) == "${lowerEmail}" && submittedAt > "${since}"][0]._id`,
    );

    const recentRes = await fetch(
      `https://${projectId}.api.sanity.io/v2024-06-01/data/query/${dataset}?query=${query}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!recentRes.ok) {
      const recentText = await recentRes.text();
      console.error("Sanity rate-limit query failed:", recentRes.status, recentText);
    } else {
      const recent = await recentRes.json().catch(() => ({ result: null }));
      if (recent.result) {
        return new Response(JSON.stringify({ error: "Please wait a minute before sending another enquiry." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const createRes = await fetch(
      `https://${projectId}.api.sanity.io/v2024-06-01/data/mutate/${dataset}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "contactSubmission",
                name,
                email: lowerEmail,
                phone: phone || "",
                message,
                consentGiven: true,
                consentText: CONSENT_TEXT,
                status: "new",
                submittedAt: new Date().toISOString(),
                source: "website",
              },
            },
          ],
        }),
      },
    );

    if (!createRes.ok) {
      const createText = await createRes.text();
      console.error("Sanity create failed:", createRes.status, createText);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again or email us directly." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("save-contact-to-sanity error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again or email us directly." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

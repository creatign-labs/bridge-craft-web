const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    const passcode = typeof body?.passcode === "string" ? body.passcode : "";
    const expected = Deno.env.get("ADMIN_LEADS_PASSCODE");

    if (!expected) {
      console.error("ADMIN_LEADS_PASSCODE is not configured");
      return json({ error: "Server configuration error" }, 500);
    }
    if (passcode.length < 4 || passcode !== expected) {
      return json({ error: "Incorrect passcode" }, 401);
    }

    const token = Deno.env.get("SANITY_API_TOKEN_WRITE") || Deno.env.get("SANITY_API_TOKEN");
    const projectId = Deno.env.get("SANITY_PROJECT_ID") || "n5ypw1x0";
    const dataset = Deno.env.get("SANITY_DATASET") || "production";
    if (!token) return json({ error: "Server configuration error" }, 500);

    // Optional: update the status of one lead
    const action = typeof body?.action === "string" ? body.action : "list";
    if (action === "setStatus") {
      const id = typeof body?.id === "string" ? body.id : "";
      const status = typeof body?.status === "string" ? body.status : "";
      const allowed = ["new", "contacted", "qualified", "closed"];
      if (!id || !allowed.includes(status)) return json({ error: "Invalid input" }, 400);

      const res = await fetch(`https://${projectId}.api.sanity.io/v2024-06-01/data/mutate/${dataset}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ mutations: [{ patch: { id, set: { status } } }] }),
      });
      if (!res.ok) {
        console.error("Sanity status patch failed:", res.status, await res.text());
        return json({ error: "Could not update status" }, 500);
      }
      return json({ ok: true });
    }

    const groq = encodeURIComponent(
      `*[_type == "contactSubmission"] | order(coalesce(submittedAt, _createdAt) desc)[0...500]{
        _id, name, email, phone, message, status, source, consentGiven,
        "submittedAt": coalesce(submittedAt, _createdAt)
      }`,
    );

    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2024-06-01/data/query/${dataset}?query=${groq}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res.ok) {
      console.error("Sanity leads query failed:", res.status, await res.text());
      return json({ error: "Could not load leads" }, 500);
    }

    const data = await res.json();
    return json({ ok: true, leads: data.result ?? [] });
  } catch (err) {
    console.error("list-contact-leads error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
});

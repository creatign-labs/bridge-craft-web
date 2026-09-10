const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const projectId = Deno.env.get("SANITY_PROJECT_ID") || "n5ypw1x0";
const dataset = Deno.env.get("SANITY_DATASET") || "production";
const apiBase = `https://${projectId}.api.sanity.io/v2024-06-01/data`;

const str = (v: unknown, max = 4000) =>
  typeof v === "string" ? v.slice(0, max) : undefined;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    const passcode = typeof body?.passcode === "string" ? body.passcode : "";
    const expected = Deno.env.get("ADMIN_LEADS_PASSCODE");
    if (!expected) return json({ error: "Server configuration error" }, 500);
    if (passcode.length < 4 || passcode !== expected) return json({ error: "Incorrect passcode" }, 401);

    const token = Deno.env.get("SANITY_API_TOKEN_WRITE") || Deno.env.get("SANITY_API_TOKEN");
    if (!token) return json({ error: "Server configuration error" }, 500);
    const auth = { Authorization: `Bearer ${token}` };

    const action = typeof body?.action === "string" ? body.action : "get";

    if (action === "get") {
      const groq = encodeURIComponent(`{
        "homeStats": *[_type == "homeStats"][0]{_id, intro, stats[]{value, label}},
        "services": *[_type == "service"] | order(number asc){_id, number, title, shortDescription, bullets},
        "projects": *[_type == "project"] | order(order asc, year desc){_id, title, tag, year, client, location, summary},
        "settings": *[_type == "siteSettings"][0]{_id, primaryPhone, primaryEmail, address, mapEmbedUrl}
      }`);
      const res = await fetch(`${apiBase}/query/${dataset}?query=${groq}`, { headers: auth });
      if (!res.ok) {
        console.error("Sanity query failed", res.status, await res.text());
        return json({ error: "Could not load content" }, 500);
      }
      const data = await res.json();
      return json({ ok: true, content: data.result ?? {} });
    }

    if (action === "save") {
      const id = str(body?.id, 200);
      const kind = str(body?.kind, 40);
      const v = body?.values ?? {};
      if (!id || !kind) return json({ error: "Invalid input" }, 400);

      let set: Record<string, unknown> = {};
      if (kind === "homeStats") {
        set = {
          intro: str(v.intro, 300) ?? "",
          stats: Array.isArray(v.stats)
            ? v.stats.slice(0, 6).map((s: Record<string, unknown>) => ({
                _key: str(s._key, 40) || crypto.randomUUID().slice(0, 8),
                _type: "object",
                value: str(s.value, 40) ?? "",
                label: str(s.label, 120) ?? "",
              }))
            : [],
        };
      } else if (kind === "service") {
        set = {
          number: str(v.number, 10) ?? "",
          title: str(v.title, 160) ?? "",
          shortDescription: str(v.shortDescription, 1000) ?? "",
          bullets: Array.isArray(v.bullets)
            ? v.bullets.map((b: unknown) => str(b, 200) ?? "").filter(Boolean).slice(0, 12)
            : [],
        };
      } else if (kind === "project") {
        set = {
          title: str(v.title, 200) ?? "",
          tag: str(v.tag, 80) ?? "",
          year: str(v.year, 20) ?? "",
          client: str(v.client, 200) ?? "",
          location: str(v.location, 200) ?? "",
          summary: str(v.summary, 1500) ?? "",
        };
      } else if (kind === "settings") {
        set = {
          primaryPhone: str(v.primaryPhone, 60) ?? "",
          primaryEmail: str(v.primaryEmail, 120) ?? "",
          address: str(v.address, 500) ?? "",
          mapEmbedUrl: str(v.mapEmbedUrl, 1000) ?? "",
        };
      } else {
        return json({ error: "Unknown content type" }, 400);
      }

      const res = await fetch(`${apiBase}/mutate/${dataset}`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
      });
      if (!res.ok) {
        console.error("Sanity patch failed", res.status, await res.text());
        return json({ error: "Could not save changes" }, 500);
      }
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-content error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
});

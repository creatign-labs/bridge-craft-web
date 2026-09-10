import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, RefreshCw, Save, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "bc_admin_passcode";

type Stat = { _key?: string; value?: string; label?: string };
type HomeStats = { _id: string; intro?: string; stats?: Stat[] };
type Service = { _id: string; number?: string; title?: string; shortDescription?: string; bullets?: string[] };
type Project = {
  _id: string;
  title?: string;
  tag?: string;
  year?: string;
  client?: string;
  location?: string;
  summary?: string;
};
type Settings = {
  _id: string;
  primaryPhone?: string;
  primaryEmail?: string;
  address?: string;
  mapEmbedUrl?: string;
};

type Content = {
  homeStats?: HomeStats;
  services?: Service[];
  projects?: Project[];
  settings?: Settings;
};

const TABS = [
  { id: "stats", label: "Homepage stats" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact details" },
] as const;

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const Field = ({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
    {textarea ? (
      <textarea rows={rows} className={inputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input className={inputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    )}
  </label>
);

const Admin = () => {
  const { toast } = useToast();
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("stats");
  const [content, setContent] = useState<Content>({});

  const load = async (code: string, silent = false) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-content", {
      body: { passcode: code, action: "get" },
    });
    setLoading(false);
    if (error || !data?.ok) {
      if (!silent)
        toast({
          title: "Could not load content",
          description: data?.error || "Check the passcode and try again.",
          variant: "destructive",
        });
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthed(false);
      return;
    }
    setContent(data.content as Content);
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, code);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPasscode(saved);
      load(saved, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (kind: string, id: string, values: unknown) => {
    setSavingId(id);
    const { data, error } = await supabase.functions.invoke("admin-content", {
      body: { passcode, action: "save", kind, id, values },
    });
    setSavingId(null);
    if (error || !data?.ok) {
      toast({
        title: "Not saved",
        description: data?.error || "Please try again.",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Saved", description: "Your changes are live on the website." });
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(passcode);
          }}
          className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-8"
        >
          <div className="flex items-center gap-2 text-foreground">
            <Lock className="h-4 w-4" />
            <h1 className="text-lg font-semibold">Website editor</h1>
          </div>
          <p className="text-sm text-muted-foreground">Enter the admin passcode to edit your website content.</p>
          <input
            type="password"
            autoFocus
            className={inputClass}
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Checking..." : "Unlock"}
          </button>
        </form>
      </main>
    );
  }

  const hs = content.homeStats;

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Website editor</h1>
            <p className="text-sm text-muted-foreground">
              Edit content here and it updates on the live website.{" "}
              <Link to="/admin/leads" className="text-primary underline">
                View enquiries
              </Link>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => load(passcode)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setAuthed(false);
                setPasscode("");
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground"
            >
              <LogOut className="h-4 w-4" /> Lock
            </button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === "stats" && hs && (
          <section className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Field
              label="Intro line"
              value={hs.intro}
              onChange={(v) => setContent((c) => ({ ...c, homeStats: { ...hs, intro: v } }))}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {(hs.stats ?? []).map((s, i) => (
                <div key={s._key ?? i} className="space-y-3 rounded-lg border border-border p-4">
                  <Field
                    label="Number"
                    value={s.value}
                    onChange={(v) =>
                      setContent((c) => {
                        const stats = [...(hs.stats ?? [])];
                        stats[i] = { ...stats[i], value: v };
                        return { ...c, homeStats: { ...hs, stats } };
                      })
                    }
                  />
                  <Field
                    label="Label"
                    value={s.label}
                    onChange={(v) =>
                      setContent((c) => {
                        const stats = [...(hs.stats ?? [])];
                        stats[i] = { ...stats[i], label: v };
                        return { ...c, homeStats: { ...hs, stats } };
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => save("homeStats", hs._id, hs)}
              disabled={savingId === hs._id}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {savingId === hs._id ? "Saving..." : "Save stats"}
            </button>
          </section>
        )}

        {tab === "services" &&
          (content.services ?? []).map((s, idx) => (
            <section key={s._id} className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                <Field
                  label="Number"
                  value={s.number}
                  onChange={(v) =>
                    setContent((c) => {
                      const services = [...(c.services ?? [])];
                      services[idx] = { ...services[idx], number: v };
                      return { ...c, services };
                    })
                  }
                />
                <Field
                  label="Title"
                  value={s.title}
                  onChange={(v) =>
                    setContent((c) => {
                      const services = [...(c.services ?? [])];
                      services[idx] = { ...services[idx], title: v };
                      return { ...c, services };
                    })
                  }
                />
              </div>
              <Field
                label="Description"
                textarea
                value={s.shortDescription}
                onChange={(v) =>
                  setContent((c) => {
                    const services = [...(c.services ?? [])];
                    services[idx] = { ...services[idx], shortDescription: v };
                    return { ...c, services };
                  })
                }
              />
              <Field
                label="Key capabilities (one per line)"
                textarea
                rows={6}
                value={(s.bullets ?? []).join("\n")}
                onChange={(v) =>
                  setContent((c) => {
                    const services = [...(c.services ?? [])];
                    services[idx] = { ...services[idx], bullets: v.split("\n") };
                    return { ...c, services };
                  })
                }
              />
              <button
                onClick={() =>
                  save("service", s._id, { ...s, bullets: (s.bullets ?? []).filter((b) => b.trim()) })
                }
                disabled={savingId === s._id}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> {savingId === s._id ? "Saving..." : "Save service"}
              </button>
            </section>
          ))}

        {tab === "projects" &&
          (content.projects ?? []).map((p, idx) => {
            const update = (patch: Partial<Project>) =>
              setContent((c) => {
                const projects = [...(c.projects ?? [])];
                projects[idx] = { ...projects[idx], ...patch };
                return { ...c, projects };
              });
            return (
              <section key={p._id} className="space-y-4 rounded-xl border border-border bg-card p-6">
                <Field label="Title" value={p.title} onChange={(v) => update({ title: v })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Category tag" value={p.tag} onChange={(v) => update({ tag: v })} />
                  <Field label="Year" value={p.year} onChange={(v) => update({ year: v })} />
                  <Field label="Client" value={p.client} onChange={(v) => update({ client: v })} />
                  <Field label="Location" value={p.location} onChange={(v) => update({ location: v })} />
                </div>
                <Field label="Summary" textarea value={p.summary} onChange={(v) => update({ summary: v })} />
                <button
                  onClick={() => save("project", p._id, p)}
                  disabled={savingId === p._id}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  <Save className="h-4 w-4" /> {savingId === p._id ? "Saving..." : "Save project"}
                </button>
              </section>
            );
          })}

        {tab === "contact" && content.settings && (
          <section className="space-y-4 rounded-xl border border-border bg-card p-6">
            {(() => {
              const st = content.settings as Settings;
              const update = (patch: Partial<Settings>) =>
                setContent((c) => ({ ...c, settings: { ...st, ...patch } }));
              return (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone" value={st.primaryPhone} onChange={(v) => update({ primaryPhone: v })} />
                    <Field label="Email" value={st.primaryEmail} onChange={(v) => update({ primaryEmail: v })} />
                  </div>
                  <Field label="Address" textarea value={st.address} onChange={(v) => update({ address: v })} />
                  <Field
                    label="Google Map embed link"
                    textarea
                    value={st.mapEmbedUrl}
                    onChange={(v) => update({ mapEmbedUrl: v })}
                  />
                  <button
                    onClick={() => save("settings", st._id, st)}
                    disabled={savingId === st._id}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" /> {savingId === st._id ? "Saving..." : "Save contact details"}
                  </button>
                </>
              );
            })()}
          </section>
        )}
      </div>
    </main>
  );
};

export default Admin;

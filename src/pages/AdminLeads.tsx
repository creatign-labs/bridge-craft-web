import { useEffect, useMemo, useState } from "react";
import { Lock, Search, RefreshCw, Download, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Lead = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  status?: string;
  source?: string;
  submittedAt?: string;
};

const STATUSES = ["new", "contacted", "qualified", "closed"] as const;
const STORAGE_KEY = "bc_admin_passcode";

const AdminLeads = () => {
  const { toast } = useToast();
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("all");
  const [open, setOpen] = useState<Lead | null>(null);

  const fetchLeads = async (code: string, silent = false) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("list-contact-leads", {
      body: { passcode: code, action: "list" },
    });
    setLoading(false);

    if (error || !data?.ok) {
      if (!silent) {
        toast({
          title: "Could not load leads",
          description: data?.error || "Check the passcode and try again.",
          variant: "destructive",
        });
      }
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthed(false);
      return;
    }

    setLeads(data.leads as Lead[]);
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, code);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPasscode(saved);
      fetchLeads(saved, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLeadStatus = async (id: string, next: string) => {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: next } : l)));
    const { data, error } = await supabase.functions.invoke("list-contact-leads", {
      body: { passcode, action: "setStatus", id, status: next },
    });
    if (error || !data?.ok) {
      toast({ title: "Status not saved", description: "Please try again.", variant: "destructive" });
      fetchLeads(passcode, true);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = Date.now();
    const windowMs =
      range === "7d" ? 7 * 864e5 : range === "30d" ? 30 * 864e5 : range === "90d" ? 90 * 864e5 : 0;

    return leads.filter((l) => {
      if (status !== "all" && (l.status || "new") !== status) return false;
      if (windowMs && l.submittedAt && now - new Date(l.submittedAt).getTime() > windowMs) return false;
      if (!q) return true;
      return [l.name, l.email, l.phone, l.message].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [leads, search, status, range]);

  const exportCsv = () => {
    const rows = [
      ["Date", "Name", "Email", "Phone", "Status", "Source", "Message"],
      ...filtered.map((l) => [
        l.submittedAt ? new Date(l.submittedAt).toLocaleString() : "",
        l.name || "",
        l.email || "",
        l.phone || "",
        l.status || "new",
        l.source || "",
        (l.message || "").replace(/\s+/g, " "),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `bridgecraft-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchLeads(passcode);
          }}
          className="w-full max-w-sm border border-border rounded-3xl p-8 bg-card/40"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <Lock size={18} />
          </div>
          <h1 className="display-heading text-3xl mb-2">
            Leads <span className="text-primary">access.</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Private area. Enter the admin passcode to view contact enquiries.
          </p>
          <input
            type="password"
            autoFocus
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full mt-4 justify-center">
            {loading ? "Checking…" : "Unlock"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-3">Private dashboard</div>
            <h1 className="display-heading text-4xl md:text-5xl">
              Contact <span className="text-primary">enquiries.</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {filtered.length} of {leads.length} submissions
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => fetchLeads(passcode)} className="btn-ghost" disabled={loading}>
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={exportCsv} className="btn-ghost">
              <Download size={15} /> Export CSV
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setAuthed(false);
                setPasscode("");
                setLeads([]);
              }}
              className="btn-ghost"
            >
              <LogOut size={15} /> Lock
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone or message"
              className="w-full rounded-xl border border-border bg-card/40 pl-11 pr-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        <div className="border border-border rounded-3xl overflow-hidden bg-card/30">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Name</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Phone</th>
                  <th className="px-5 py-4 font-medium">Message</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr
                    key={l._id}
                    onClick={() => setOpen(l)}
                    className="border-b border-border/60 last:border-0 hover:bg-primary/5 cursor-pointer"
                  >
                    <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                      {l.submittedAt ? new Date(l.submittedAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-5 py-4 font-medium">{l.name || "-"}</td>
                    <td className="px-5 py-4">
                      <a
                        href={`mailto:${l.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:underline"
                      >
                        {l.email}
                      </a>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">{l.phone || "-"}</td>
                    <td className="px-5 py-4 max-w-xs truncate text-muted-foreground">{l.message}</td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status || "new"}
                        onChange={(e) => setLeadStatus(l._id, e.target.value)}
                        className="rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">
                      {loading ? "Loading…" : "No submissions match these filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-lg border border-border rounded-3xl bg-card p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="eyebrow mb-3">
              {open.submittedAt ? new Date(open.submittedAt).toLocaleString() : "-"}
            </div>
            <h2 className="display-heading text-2xl mb-1">{open.name}</h2>
            <p className="text-sm text-muted-foreground">
              {open.email}
              {open.phone ? ` · ${open.phone}` : ""}
            </p>
            <p className="mt-6 whitespace-pre-wrap leading-relaxed">{open.message}</p>
            <button onClick={() => setOpen(null)} className="btn-primary mt-8">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminLeads;

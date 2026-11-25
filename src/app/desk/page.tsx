import Link from "next/link";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { getComms, getDeskStats, getEnquiries, getRecentEvents } from "@/lib/data";
import { DESK_PIPELINE, TIMELINE_EXAMPLE } from "@/lib/site";
import { money } from "@/lib/estimate";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Studio desk",
  description:
    "How every enquiry to Tallow & Stone is logged, graded, routed and followed up — with the internals showing.",
};

const GRADE_TONE: Record<string, string> = {
  hot: "bg-clay text-paper",
  warm: "bg-sand/60 text-ink",
  nurture: "bg-ink/8 text-ink/55",
};

const CHANNEL_LABEL: Record<string, string> = {
  web: "Website",
  sms: "SMS",
  whatsapp: "WhatsApp",
  email: "Email",
  system: "Automation",
};

function ago(d: Date | string) {
  const t = new Date(d).getTime();
  const mins = Math.max(1, Math.round((Date.now() - t) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.round(hrs / 24)} d ago`;
}

export default async function DeskPage() {
  const [enquiries, events, stats, comms] = await Promise.all([
    getEnquiries(10),
    getRecentEvents(9),
    getDeskStats(),
    getComms(5),
  ]);

  const byStage = new Map<string, number>();
  for (const r of stats.rows) byStage.set(r.stage, (byStage.get(r.stage) ?? 0) + 1);
  const hot = stats.rows.filter((r) => r.grade === "hot").length;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-paper md:pt-48 md:pb-24">
        <div className="grid-paper absolute inset-0 opacity-[0.14]" />
        <Shell>
          <Eyebrow tone="light">The studio desk · internal view</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal>
              <h1 className="u-display-lg max-w-[18ch]">
                Where your enquiry goes when you press send.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[15px] leading-[1.75] text-paper/60">
                We&apos;ve made the invisible part visible. Every enquiry that arrives here is
                logged, graded and routed in the first four minutes, and nothing sits in a queue
                longer than two days. This page shows the live pipeline, the automation log and the
                comms that went out — because the bit you can&apos;t see is usually where a builder
                loses you.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(enquiries.length), "Enquiries in the desk", "Last 30 days"],
              ["4 min", "Average first human reply", "During business hours"],
              [String(hot), "Graded hot and routed", "Direct to a build director"],
              ["< 2 days", "Maximum queue time", "Anything longer gets a phone call"],
            ].map(([big, label, note], i) => (
              <Reveal key={label} delay={i * 90}>
                <div>
                  <p className="font-display text-[44px] leading-none tracking-[-0.04em]">{big}</p>
                  <p className="u-eyebrow mt-3 text-clay-soft">{label}</p>
                  <p className="mt-2 text-[12.5px] text-paper/40">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* Pipeline */}
      <section className="border-b border-ink/12 py-16 md:py-20">
        <Shell wide>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Pipeline</Eyebrow>
              <Reveal>
                <h2 className="mt-5 u-display-md">Six stages. Nobody sits still for long.</h2>
              </Reveal>
            </div>
            <p className="u-eyebrow text-ink/35">Updated live</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {DESK_PIPELINE.map((s, i) => {
              const live = byStage.get(s.stage) ?? s.count;
              return (
                <Reveal key={s.stage} delay={i * 60}>
                  <div
                    className={`flex h-full flex-col justify-between rounded-xl border p-5 transition-colors ${
                      s.stage === "New enquiry"
                        ? "border-clay/40 bg-clay/6"
                        : "border-ink/12 bg-paper-2/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="u-eyebrow text-ink/40">0{i + 1}</span>
                      {s.sla && s.sla !== "—" && (
                        <span className="u-eyebrow rounded-full bg-ink/6 px-2.5 py-1.5 text-ink/50">
                          {s.sla}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 font-display text-[44px] leading-none tracking-[-0.04em]">
                      {live}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-snug text-ink/60">{s.stage}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Shell>
      </section>

      {/* Enquiries */}
      <section className="py-16 md:py-20">
        <Shell wide>
          <div className="mb-10">
            <Eyebrow>Enquiries</Eyebrow>
            <Reveal>
              <h2 className="mt-5 u-display-md">The desk, as it stands.</h2>
            </Reveal>
          </div>
          <div className="border-t border-ink/12">
            {enquiries.length === 0 && (
              <p className="py-10 text-[14px] text-ink/50">
                Nothing in the desk right now. Send an enquiry and it will appear here.
              </p>
            )}
            {enquiries.map((e, i) => (
              <Reveal key={e.id} delay={i * 40}>
                <div className="group grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 py-5">
                  <span className="col-span-12 u-eyebrow text-ink/35 md:col-span-1">
                    {e.reference}
                  </span>
                  <div className="col-span-7 md:col-span-3">
                    <p className="text-[15px] leading-tight">{e.name}</p>
                    <p className="u-eyebrow mt-1.5 text-ink/40">
                      {e.suburb || "—"} · {ago(e.createdAt)}
                    </p>
                  </div>
                  <div className="col-span-5 md:col-span-2">
                    <p className="u-eyebrow capitalize text-ink/50">
                      {e.projectType || "unscored"}
                    </p>
                    <p className="u-eyebrow mt-1.5 text-ink/35">{e.scope || "—"}</p>
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`u-eyebrow rounded-full px-2.5 py-1.5 ${GRADE_TONE[e.grade] ?? "bg-ink/8 text-ink/50"}`}
                      >
                        {e.grade.toUpperCase()}
                      </span>
                      <span className="u-eyebrow text-ink/40">{e.score}/100</span>
                    </div>
                    <div className="mt-2 h-[3px] w-full max-w-[110px] overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-clay"
                        style={{ width: `${e.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <p className="text-[13.5px] text-ink/70">{e.stage}</p>
                    {e.estimateLow ? (
                      <p className="u-eyebrow mt-1.5 text-ink/35">
                        {money(e.estimateLow)}–{money(e.estimateHigh)} · {e.confidence}%
                      </p>
                    ) : (
                      <p className="u-eyebrow mt-1.5 text-ink/35">Range pending</p>
                    )}
                  </div>
                  <div className="col-span-6 md:col-span-2 md:text-right">
                    <p className="u-eyebrow text-ink/40">{e.owner}</p>
                    <p className="u-eyebrow mt-1.5 text-clay">
                      {e.nextActionAt ? `Next action ${ago(e.nextActionAt)}` : "Closed"}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 u-eyebrow text-ink/35">
            Names and details shown are fictional examples. Your enquiry appears here in exactly
            this format.
          </p>
        </Shell>
      </section>

      {/* Automation log */}
      <section className="border-y border-ink/12 bg-paper-2/50 py-16 md:py-24">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Automation log</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">What the desk did without being asked.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="u-lede mt-6 max-w-md">
                  Acknowledgements, grading, routing, cost ranges, reminders and follow-ups. None of
                  it replaces a person — it just means a person never has to remember.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 rounded-xl bg-ink p-6 text-paper">
                  <p className="u-eyebrow text-paper/40">Worked example</p>
                  <p className="mt-3 font-display text-[22px] leading-tight">
                    {TIMELINE_EXAMPLE.reference} · {TIMELINE_EXAMPLE.suburb}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-paper/55">
                    Enquiry received 07:12, acknowledged 07:12, first human reply 07:16, indicative
                    range 08:44, site visit booked by the client at 10:15. Eight events, one of
                    them needing a human.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="space-y-3">
              {events.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 50}>
                  <div className="flex gap-4 rounded-xl border border-ink/10 bg-paper p-4">
                    <span
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] ${
                        ev.kind === "human"
                          ? "bg-clay text-paper"
                          : ev.kind === "auto"
                            ? "bg-ink/8 text-ink/55"
                            : "bg-ink text-paper"
                      }`}
                    >
                      {ev.kind === "human" ? "J" : ev.kind === "auto" ? "◇" : "→"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="text-[14.5px] leading-snug">{ev.label}</p>
                        <span className="u-eyebrow shrink-0 text-ink/35">
                          {ev.reference ?? "—"} · {ev.createdAt ? ago(ev.createdAt) : ""}
                        </span>
                      </div>
                      {ev.detail && (
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{ev.detail}</p>
                      )}
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <span className="u-eyebrow rounded-full bg-ink/6 px-2.5 py-1.5 text-ink/50">
                          {CHANNEL_LABEL[ev.channel] ?? ev.channel}
                        </span>
                        <span className="u-eyebrow rounded-full bg-ink/6 px-2.5 py-1.5 text-ink/50">
                          {ev.actor}
                        </span>
                        {ev.projectType && (
                          <span className="u-eyebrow rounded-full bg-clay/10 px-2.5 py-1.5 capitalize text-clay">
                            {ev.projectType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* Comms */}
      <section className="py-16 md:py-24">
        <Shell>
          <div className="mb-10 max-w-xl">
            <Eyebrow>Comms log</Eyebrow>
            <Reveal>
              <h2 className="mt-5 u-display-md">Everything we sent, in one place.</h2>
            </Reveal>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {comms.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <div className="flex h-full flex-col rounded-xl border border-ink/12 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`u-eyebrow rounded-full px-3 py-1.5 ${
                        c.channel === "whatsapp"
                          ? "bg-[#1faa53]/15 text-[#17903f]"
                          : c.channel === "sms"
                            ? "bg-ink/8 text-ink/55"
                            : "bg-clay/10 text-clay"
                      }`}
                    >
                      {CHANNEL_LABEL[c.channel] ?? c.channel}
                    </span>
                    <span className="u-eyebrow text-ink/30">{c.reference}</span>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-snug">{c.subject}</p>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-ink/55">{c.body}</p>
                  <p className="u-eyebrow mt-4 border-t border-ink/10 pt-3 text-ink/30">
                    {ago(c.createdAt)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-ink p-8 text-paper md:p-12">
              <div className="max-w-xl">
                <h3 className="u-display-md">
                  Send one and watch it move through the desk.
                </h3>
                <p className="u-lede mt-4 text-paper/60">
                  Or just ask a question first — Jess answers properly rather than handing you a
                  brochure.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/estimate"
                  className="btn-sweep rounded-full bg-paper px-7 py-4 text-ink"
                >
                  <span className="relative z-2 u-eyebrow">Get a cost range</span>
                  <span className="relative z-2 ml-2">→</span>
                </Link>
                <Link
                  href="/book"
                  className="rounded-full border border-paper/25 px-7 py-4 u-eyebrow text-paper/80 transition-colors hover:border-paper/70 hover:text-paper"
                >
                  Book a site visit
                </Link>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}

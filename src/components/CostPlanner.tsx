"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CONSTRAINTS,
  FINISH_LEVELS,
  PROJECT_TYPES,
  computeEstimate,
  money,
  type EstimateInput,
} from "@/lib/estimate";
import { BRAND, SUBURBS } from "@/lib/site";

type Contact = { name: string; email: string; phone: string; notes: string };

const TIMING_OPTIONS = [
  { key: "asap", label: "Ready to start", note: "We're organised and the house is available" },
  { key: "3-6", label: "3–6 months away", note: "Planning now, building later" },
  { key: "idea", label: "Working it out", note: "I want to know what things cost first" },
];

const STEPS = ["Type", "Scale", "Finish", "Site", "Details"];

export function CostPlanner({
  initial,
}: {
  initial?: EstimateInput & { name?: string; email?: string; phone?: string };
}) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<EstimateInput>({
    type: initial?.type,
    size: initial?.size,
    finish: initial?.finish ?? "signature",
    access: initial?.access,
    structure: initial?.structure,
    heritage: initial?.heritage,
    occupied: initial?.occupied,
    suburb: initial?.suburb,
    timing: initial?.timing,
  });
  const [contact, setContact] = useState<Contact>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    phone: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{
    reference: string;
    grade: string;
    score: number;
    low: number;
    high: number;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState("");

  const result = useMemo(() => computeEstimate(a), [a]);
  const type = result.type;

  const canAdvance = () => {
    if (step === 0) return Boolean(a.type);
    if (step === 1) return Boolean(a.size);
    if (step === 2) return Boolean(a.finish);
    if (step === 3) return Boolean(a.access && a.structure && a.heritage && a.occupied);
    return true;
  };

  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          suburb: a.suburb,
          projectType: a.type,
          scope: result.sizeLabel,
          budgetBand: `${money(result.low)} – ${money(result.high)}`,
          timing: a.timing,
          message: contact.notes,
          channel: "web",
          source: "cost planner",
          estimate: a,
        }),
      });
      const data = (await res.json()) as {
        reference?: string;
        grade?: string;
        score?: number;
        error?: string;
      };
      if (!res.ok || !data.reference) {
        setError(data.error ?? "That didn't go through. Try again in a moment.");
        return;
      }
      setDone({
        reference: data.reference,
        grade: data.grade ?? "warm",
        score: data.score ?? 0,
        low: result.low,
        high: result.high,
        confidence: result.confidence,
      });
    } catch {
      setError("Network hiccup. Try again, or email the studio directly.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const summary = `Tallow & Stone cost plan ${done.reference} — ${type?.label ?? "project"}${
      a.suburb ? ` in ${a.suburb}` : ""
    }, ${result.sizeLabel.toLowerCase()}, ${result.finish?.label.toLowerCase()} finish. Indicative range ${money(
      done.low,
    )}–${money(done.high)} at ${done.confidence}% confidence.`;
    return (
      <div className="pop-in rounded-2xl border border-ink/12 bg-paper-2/60 p-7 md:p-10">
        <p className="u-eyebrow text-clay">Cost plan issued · {done.reference}</p>
        <h3 className="mt-4 u-display-lg max-w-2xl">
          It&apos;s with Jess. You&apos;ll have it inside one working day.
        </h3>
        <p className="u-lede mt-5 max-w-2xl">
          Your indicative range is <strong>{money(done.low)} – {money(done.high)}</strong>. We&apos;ve
          graded this enquiry <strong>{done.grade.toUpperCase()}</strong> at {done.score}/100, so
          it&apos;s routed {done.grade === "hot" ? "to Priya Raman" : "to Jess Navarro"} rather than
          sitting in a queue. You&apos;ll get an email and a WhatsApp with the cost drivers, three
          comparable projects and the two decisions that would move your number most.
        </p>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(summary)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#1faa53] px-5 py-4 u-eyebrow text-white transition-colors hover:bg-[#17903f]"
          >
            Send it to my WhatsApp
          </a>
          <Link
            href="/book"
            className="btn-sweep rounded-xl bg-ink px-5 py-4 text-center u-eyebrow text-paper"
          >
            <span className="relative z-2">Book the free site visit</span>
          </Link>
          <a
            href={`mailto:${BRAND.email}?subject=${encodeURIComponent("Re: " + done.reference)}&body=${encodeURIComponent(summary)}`}
            className="rounded-xl border border-ink/25 px-5 py-4 u-eyebrow text-ink/70 transition-colors hover:border-ink/60 hover:text-ink"
          >
            Email the studio instead
          </a>
        </div>
        <div className="mt-10 space-y-3 border-t border-ink/12 pt-8">
          <p className="u-eyebrow text-ink/45">What happens automatically now</p>
          {[
            ["Immediately", "Acknowledgement by SMS and email with your reference"],
            ["Within 4 minutes", "A human reads it and either answers or asks one question"],
            ["Within 1 working day", "Written cost plan with quantities and unit rates"],
            ["Within 2 working days", "Follow-up call from Jess — nothing sits longer than that"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-5 border-b border-ink/8 pb-3">
              <span className="u-eyebrow w-40 shrink-0 text-clay">{t}</span>
              <span className="text-[14px] text-ink/70">{d}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      {/* Questions */}
      <div>
        <div className="flex items-center gap-2.5">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i <= step && setStep(i)}
              className={`u-eyebrow flex items-center gap-2 transition-colors ${
                i === step ? "text-clay" : i < step ? "text-ink/50" : "text-ink/25"
              }`}
            >
              <span
                className={`h-[6px] rounded-full transition-all duration-500 ${
                  i === step ? "w-8 bg-clay" : i < step ? "w-3 bg-ink/40" : "w-3 bg-ink/15"
                }`}
              />
              <span className="hidden sm:block">{s}</span>
            </button>
          ))}
        </div>

        <div className="mt-9 min-h-[420px]">
          {step === 0 && (
            <div className="pop-in">
              <h3 className="u-display-lg">What are we building?</h3>
              <p className="u-lede mt-4 max-w-lg">
                Pick the closest one. If it&apos;s a combination, choose the biggest piece and
                mention the rest at the end.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setA((p) => ({ ...p, type: t.key, size: undefined }));
                      setStep(1);
                    }}
                    className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-400 ${
                      a.type === t.key
                        ? "border-clay bg-clay/6"
                        : "border-ink/12 bg-paper hover:border-ink/40"
                    }`}
                  >
                    <span
                      className="h-14 w-14 shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${t.image})` }}
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[19px] leading-tight">
                        {t.label}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-ink/50">
                        {t.short}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && type && (
            <div className="pop-in">
              <h3 className="u-display-lg">How big is the job?</h3>
              <p className="u-lede mt-4 max-w-lg">
                Roughly is fine — this is a range, not a contract.
              </p>
              <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {type.sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setA((p) => ({ ...p, size: s.key }));
                      setStep(2);
                    }}
                    className={`group flex w-full items-baseline gap-6 py-5 text-left transition-colors ${
                      a.size === s.key ? "text-clay" : "hover:text-clay"
                    }`}
                  >
                    <span className="u-eyebrow w-6 shrink-0 text-ink/30">
                      {type.sizes.indexOf(s) + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[24px] leading-tight md:text-[28px]">
                        {s.label}
                      </span>
                      <span className="mt-1 block text-[13px] text-ink/45">{s.note}</span>
                    </span>
                    <span className="u-eyebrow shrink-0 text-ink/25 transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pop-in">
              <h3 className="u-display-lg">What level of finish?</h3>
              <p className="u-lede mt-4 max-w-lg">
                This is the single biggest swing on any job, so it&apos;s worth being honest with
                yourself.
              </p>
              <div className="mt-8 grid gap-4">
                {FINISH_LEVELS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => {
                      setA((p) => ({ ...p, finish: f.key }));
                      setStep(3);
                    }}
                    className={`rounded-xl border p-5 text-left transition-all duration-400 ${
                      a.finish === f.key
                        ? "border-clay bg-clay/6"
                        : "border-ink/12 hover:border-ink/40"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[24px] leading-none">{f.label}</span>
                      <span className="u-eyebrow text-ink/40">{f.line}</span>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink/60">{f.body}</p>
                    <p className="u-eyebrow mt-3 text-ink/35">
                      {f.examples.slice(0, 2).join(" · ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="pop-in">
              <h3 className="u-display-lg">Four things about the site</h3>
              <p className="u-lede mt-4 max-w-lg">
                These are the four things that change a build&apos;s cost more than any finish
                selection.
              </p>
              <div className="mt-8 space-y-7">
                {CONSTRAINTS.map((g) => (
                  <div key={g.key}>
                    <p className="u-eyebrow text-ink/45">{g.label}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {g.options.map((o) => (
                        <button
                          key={o.key}
                          onClick={() => setA((p) => ({ ...p, [g.key]: o.key }))}
                          className={`rounded-lg border p-3.5 text-left transition-all duration-300 ${
                            a[g.key] === o.key
                              ? "border-clay bg-clay/6 text-ink"
                              : "border-ink/12 text-ink/60 hover:border-ink/40"
                          }`}
                        >
                          <span className="block text-[13.5px] leading-snug">{o.label}</span>
                          <span className="u-eyebrow mt-2 block text-ink/35">{o.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="pop-in">
              <h3 className="u-display-lg">Where does the plan go?</h3>
              <p className="u-lede mt-4 max-w-lg">
                One email, one WhatsApp if you want it, and a call from Jess within two working
                days. Nothing else.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="u-eyebrow text-ink/45">Suburb</span>
                  <input
                    list="ts-suburbs"
                    value={a.suburb ?? ""}
                    onChange={(e) => setA((p) => ({ ...p, suburb: e.target.value }))}
                    placeholder="e.g. Hampton"
                    className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 font-display text-[22px] outline-none transition-colors focus:border-clay"
                  />
                  <datalist id="ts-suburbs">
                    {SUBURBS.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </label>
                <label className="sm:col-span-2">
                  <span className="u-eyebrow text-ink/45">Timing</span>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {TIMING_OPTIONS.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setA((p) => ({ ...p, timing: t.key }))}
                        className={`rounded-lg border p-3.5 text-left transition-all ${
                          a.timing === t.key ? "border-clay bg-clay/6" : "border-ink/12 hover:border-ink/40"
                        }`}
                      >
                        <span className="block text-[13.5px]">{t.label}</span>
                        <span className="mt-1 block text-[12px] text-ink/45">{t.note}</span>
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  <span className="u-eyebrow text-ink/45">Name</span>
                  <input
                    value={contact.name}
                    onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                    placeholder="First and last"
                    className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
                  />
                </label>
                <label>
                  <span className="u-eyebrow text-ink/45">Email</span>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
                  />
                </label>
                <label>
                  <span className="u-eyebrow text-ink/45">Mobile (optional)</span>
                  <input
                    value={contact.phone}
                    onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="For the WhatsApp summary"
                    className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="u-eyebrow text-ink/45">
                    Anything else? (optional)
                  </span>
                  <textarea
                    rows={3}
                    value={contact.notes}
                    onChange={(e) => setContact((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="The wall we want gone is load-bearing, and we have a dog that hates tradesmen."
                    className="mt-2 w-full resize-none rounded-lg border border-ink/15 bg-paper-2/50 p-3.5 text-[14px] outline-none transition-colors focus:border-clay"
                  />
                </label>
              </div>
              {error && (
                <p className="mt-5 text-[13px] text-clay">{error}</p>
              )}
              <button
                onClick={submit}
                disabled={sending || !contact.name.trim() || !contact.email.trim()}
                className="btn-sweep mt-7 w-full rounded-xl bg-ink px-6 py-4.5 text-center u-eyebrow text-paper disabled:opacity-40 sm:w-auto sm:px-10"
              >
                <span className="relative z-2">
                  {sending ? "Sending to the studio desk…" : "Send my cost plan"}
                </span>
              </button>
              <p className="u-eyebrow mt-4 text-ink/35">
                No marketing list. One email, one WhatsApp, one phone call.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="u-eyebrow text-ink/40 transition-colors hover:text-ink disabled:opacity-25"
          >
            ← Back
          </button>
          {step < 4 && (
            <button
              onClick={() => canAdvance() && setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="btn-sweep rounded-full bg-ink px-7 py-3.5 u-eyebrow text-paper disabled:opacity-35"
            >
              <span className="relative z-2">
                {step === 3 ? "Almost done" : "Continue"}
              </span>
              <span className="relative z-2 ml-2">→</span>
            </button>
          )}
        </div>
      </div>

      {/* Live range */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-ink/12 bg-ink p-6 text-paper md:p-8">
          <p className="u-eyebrow text-paper/40">
            {type ? `${type.label} · ${result.sizeLabel}` : "Indicative range"}
          </p>
          <p className="mt-4 font-display text-[40px] leading-[0.92] tracking-[-0.04em] md:text-[52px]">
            {type ? (
              <>
                {money(result.low)}
                <span className="mx-2 text-paper/30">—</span>
                {money(result.high)}
              </>
            ) : (
              <span className="text-paper/25">$— — $—</span>
            )}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/15">
              <div
                className="h-full rounded-full bg-clay-soft transition-all duration-1000 ease-out"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span className="u-eyebrow text-paper/50">{result.confidence}% confidence</span>
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-paper/55">
            {result.summary}
          </p>

          {result.drivers.length > 0 && (
            <div className="mt-7 space-y-2.5 border-t border-paper/12 pt-6">
              <p className="u-eyebrow text-paper/40">Where it goes</p>
              {result.drivers.map((d, i) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="w-[46%] text-[12.5px] text-paper/70">{d.label}</span>
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/12">
                    <div
                      className="h-full rounded-full bg-paper/45 transition-all duration-1000"
                      style={{ width: `${d.share * 3}%`, opacity: 0.3 + (i % 3) * 0.35 }}
                    />
                  </div>
                  <span className="u-eyebrow w-8 text-right text-paper/45">{d.share}%</span>
                </div>
              ))}
            </div>
          )}

          {result.chosen.length > 0 && (
            <div className="mt-7 border-t border-paper/12 pt-6">
              <p className="u-eyebrow text-paper/40">Your site factors</p>
              <div className="mt-3 space-y-2">
                {result.chosen.map((c) => (
                  <div key={c.label} className="flex items-baseline justify-between gap-3">
                    <span className="text-[12.5px] text-paper/70">{c.option}</span>
                    <span className="u-eyebrow text-paper/40">{c.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.leadWeeks.length > 0 && type && (
            <p className="u-eyebrow mt-6 border-t border-paper/12 pt-6 text-paper/45">
              On site {result.leadWeeks[0]}–{result.leadWeeks[1]} weeks · allow{" "}
              {Math.max(2, Math.round(result.leadWeeks[0] * 0.6))} weeks for permits & selections
            </p>
          )}
        </div>

        {result.recommendations.length > 0 && (
          <div className="mt-5 space-y-3">
            <p className="u-eyebrow text-ink/40">The studio recommends</p>
            {result.recommendations.map((r) => (
              <div key={r.title} className="rounded-xl border border-ink/12 bg-paper-2/50 p-4">
                <p className="u-eyebrow text-clay">{r.tag}</p>
                <p className="mt-2 text-[14.5px] leading-snug">{r.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

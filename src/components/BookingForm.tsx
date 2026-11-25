"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Slot } from "@/lib/availability";
import { BRAND, SUBURBS } from "@/lib/site";

type DayGroup = { dayKey: string; list: Slot[] };

const VISIT_TYPES = [
  { key: "Site visit", label: "Site visit", note: "90 minutes on site, free" },
  { key: "Video call", label: "Video call", note: "30 minutes, walk the house on your phone" },
  { key: "Cost plan review", label: "Cost plan review", note: "45 minutes, go through the numbers" },
];

function icsHref(iso: string, title: string) {
  const start = new Date(iso);
  const end = new Date(new Date(iso).getTime() + 90 * 60000);
  const f = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tallow & Stone//Site Visit//EN",
    "BEGIN:VEVENT",
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:${title}`,
    "LOCATION:212 Martin Street\\, Gardenvale VIC 3185",
    "DESCRIPTION:Site visit with Tallow & Stone. 90 minutes. Bring your ideas and any plans you have.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export function BookingForm() {
  const [days, setDays] = useState<DayGroup[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [visitType, setVisitType] = useState("Site visit");
  const [form, setForm] = useState({ name: "", email: "", phone: "", suburb: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{
    reference: string;
    when: { day: string; date: string; time: string };
    visitType: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d: { days: DayGroup[] }) => {
        setDays(d.days);
        const firstFree = d.days.find((g) => g.list.some((s) => !s.busy));
        if (firstFree) setActiveDay(firstFree.dayKey);
      })
      .catch(() => setError("Couldn't load the calendar. Call the studio and we'll book you in by hand."));
  }, []);

  const dayList = useMemo(() => days.find((d) => d.dayKey === activeDay)?.list ?? [], [days, activeDay]);
  const freeCount = days.reduce((n, d) => n + d.list.filter((s) => !s.busy).length, 0);

  const submit = async () => {
    if (!slot) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slotIso: slot.iso, visitType }),
      });
      const data = (await res.json()) as {
        reference?: string;
        when?: { day: string; date: string; time: string };
        visitType?: string;
        error?: string;
      };
      if (!res.ok || !data.reference) {
        setError(data.error ?? "That didn't go through. Try another slot.");
        if (data.error?.includes("taken")) {
          fetch("/api/availability")
            .then((r) => r.json())
            .then((d: { days: DayGroup[] }) => setDays(d.days));
          setSlot(null);
        }
        return;
      }
      setConfirmed({
        reference: data.reference,
        when: data.when ?? { day: "", date: "", time: "" },
        visitType: data.visitType ?? "Site visit",
      });
    } catch {
      setError("Network hiccup. Try again, or ring the studio.");
    } finally {
      setSending(false);
    }
  };

  if (confirmed) {
    return (
      <div className="pop-in rounded-2xl border border-ink/12 bg-paper-2/60 p-7 md:p-10">
        <p className="u-eyebrow text-clay">Confirmed · {confirmed.reference}</p>
        <h3 className="mt-4 u-display-lg max-w-xl">
          {confirmed.when.day} {confirmed.when.date}, {confirmed.when.time}
        </h3>
        <p className="u-lede mt-5 max-w-xl">
          Ninety minutes with {visitType === "Site visit" ? "one of our build directors" : "Jess from the studio desk"}. You&apos;ll get a confirmation email now, a WhatsApp with the prep pack, and a reminder the evening before.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={icsHref(new Date(slot?.iso ?? Date.now()).toISOString(), `Site visit — Tallow & Stone (${confirmed.reference})`)}
            download="tallow-stone-site-visit.ics"
            className="btn-sweep rounded-full bg-ink px-6 py-3.5 u-eyebrow text-paper"
          >
            <span className="relative z-2">Add to calendar</span>
          </a>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              `Site visit ${confirmed.reference} confirmed for ${confirmed.when.day} ${confirmed.when.date} at ${confirmed.when.time}. ${form.name}`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#1faa53] px-6 py-3.5 u-eyebrow text-white transition-colors hover:bg-[#17903f]"
          >
            Message Jess on WhatsApp
          </a>
          <Link href="/estimate" className="rounded-full border border-ink/25 px-6 py-3.5 u-eyebrow text-ink/70 transition-colors hover:border-ink/60 hover:text-ink">
            Prepare my cost plan first
          </Link>
        </div>
        <div className="mt-10 space-y-3 border-t border-ink/12 pt-8">
          <p className="u-eyebrow text-ink/45">What to have ready (none of it is essential)</p>
          {[
            "Any plans, sketches or photos — even on your phone",
            "An idea of your budget range, even a wide one",
            "Ten minutes of the house: where it fails, what you avoid using",
            "Access to the roof space or sub-floor if you have it",
          ].map((x) => (
            <p key={x} className="flex gap-3 text-[14px] text-ink/65">
              <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-clay" />
              {x}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="u-eyebrow text-ink/45">
            {freeCount} open slots · booked 36 hours ahead
          </p>
          <p className="u-eyebrow text-ink/30">Times are Melbourne (AEST/AEDT)</p>
        </div>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => {
            const first = d.list[0];
            if (!first) return null;
            const free = d.list.filter((s) => !s.busy).length;
            const sel = d.dayKey === activeDay;
            return (
              <button
                key={d.dayKey}
                onClick={() => {
                  setActiveDay(d.dayKey);
                  setSlot(null);
                }}
                className={`shrink-0 rounded-xl border px-5 py-3.5 text-left transition-all duration-300 ${
                  sel ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/45"
                } ${free === 0 && !sel ? "opacity-40" : ""}`}
              >
                <span className="u-eyebrow block">{first.dayName.slice(0, 3)}</span>
                <span className="mt-1 block font-display text-[22px] leading-none">
                  {first.dayNumber}
                </span>
                <span className={`u-eyebrow mt-1.5 block ${sel ? "text-paper/50" : "text-ink/35"}`}>
                  {free === 0 ? "full" : `${free} free`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {dayList.map((s) => (
            <button
              key={s.iso}
              disabled={s.busy}
              onClick={() => setSlot(s)}
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                slot?.iso === s.iso
                  ? "border-clay bg-clay/8"
                  : s.busy
                    ? "border-ink/8 bg-ink/4 opacity-45"
                    : "border-ink/15 hover:border-ink/45"
              }`}
            >
              <span className="block font-display text-[22px] leading-none">{s.timeLabel}</span>
              <span className="u-eyebrow mt-2 block text-ink/40">{s.kind}</span>
              <span className="u-eyebrow mt-1 block text-clay">
                {s.busy ? "Booked" : s.period}
              </span>
            </button>
          ))}
          {dayList.length === 0 && (
            <p className="u-eyebrow col-span-3 text-ink/35">No slots on this day.</p>
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {VISIT_TYPES.map((v) => (
            <button
              key={v.key}
              onClick={() => setVisitType(v.key)}
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                visitType === v.key ? "border-clay bg-clay/8" : "border-ink/15 hover:border-ink/45"
              }`}
            >
              <span className="block font-display text-[20px] leading-none">{v.label}</span>
              <span className="mt-2 block text-[12.5px] text-ink/50">{v.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="rounded-2xl border border-ink/12 bg-paper-2/50 p-6 md:p-7">
          <p className="u-eyebrow text-ink/45">Your details</p>
          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="u-eyebrow text-ink/45">Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="First and last"
                className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
              />
            </label>
            <label className="block">
              <span className="u-eyebrow text-ink/45">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
              />
            </label>
            <label className="block">
              <span className="u-eyebrow text-ink/45">Mobile</span>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="For the reminder text"
                className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
              />
            </label>
            <label className="block">
              <span className="u-eyebrow text-ink/45">Suburb</span>
              <input
                list="ts-suburbs-book"
                value={form.suburb}
                onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                placeholder="e.g. Beaumaris"
                className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 outline-none transition-colors focus:border-clay"
              />
              <datalist id="ts-suburbs-book">
                {SUBURBS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </label>
            <label className="block">
              <span className="u-eyebrow text-ink/45">What are we looking at?</span>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Two bathrooms and a kitchen, house is a 1930s bungalow, we'd like to stay in it."
                className="mt-2 w-full resize-none rounded-lg border border-ink/15 bg-paper p-3.5 text-[14px] outline-none transition-colors focus:border-clay"
              />
            </label>
          </div>

          {error && <p className="mt-5 text-[13px] text-clay">{error}</p>}

          <button
            onClick={submit}
            disabled={!slot || !form.name.trim() || !form.email.trim() || sending}
            className="btn-sweep mt-7 w-full rounded-xl bg-ink px-6 py-4.5 text-center u-eyebrow text-paper disabled:opacity-35"
          >
            <span className="relative z-2">
              {sending
                ? "Holding your slot…"
                : slot
                  ? `Confirm ${slot.dayName} ${slot.dayNumber}, ${slot.timeLabel}`
                  : "Pick a time first"}
            </span>
          </button>
          <p className="u-eyebrow mt-4 text-ink/35">
            Free, no obligation, and you&apos;ll get a written summary either way.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-ink p-6 text-paper md:p-7">
          <p className="u-eyebrow text-paper/45">Prefer to just talk?</p>
          <a
            href={BRAND.phoneHref}
            className="link-underline mt-3 block font-display text-[28px] leading-none tracking-tight"
          >
            {BRAND.phoneDisplay}
          </a>
          <p className="mt-4 text-[13px] leading-relaxed text-paper/55">
            {BRAND.hours}. Outside those hours, WhatsApp {BRAND.mobileDisplay} and Jess will pick it
            up in the morning — usually before the kettle is on.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useScrollProgress } from "./motion";
import { TIMELINE_EXAMPLE } from "@/lib/site";

const CHANNEL_TONE: Record<string, string> = {
  web: "bg-paper/12 text-paper/70",
  sms: "bg-paper/12 text-paper/70",
  whatsapp: "bg-[#1faa53]/20 text-[#5fe08d]",
  email: "bg-clay/25 text-clay-soft",
  system: "bg-paper/8 text-paper/45",
};

export function StudioTimeline() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const events = TIMELINE_EXAMPLE.events;
  const filled = Math.min(1, progress * 1.25);

  return (
    <div ref={ref} className="relative">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Summary card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-paper-2/60 p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="u-eyebrow text-ink/45">Enquiry {TIMELINE_EXAMPLE.reference}</p>
              <p className="u-eyebrow rounded-full bg-clay px-3 py-1.5 text-paper">Live</p>
            </div>
            <h3 className="mt-5 font-display text-[30px] leading-[1.05] tracking-tight">
              {TIMELINE_EXAMPLE.client}
            </h3>
            <p className="u-eyebrow mt-2 text-ink/45">
              {TIMELINE_EXAMPLE.suburb} · {TIMELINE_EXAMPLE.type}
            </p>
            <dl className="mt-7 space-y-3 border-t border-ink/12 pt-6">
              {[
                ["Indicative range", TIMELINE_EXAMPLE.value],
                ["Handled by", TIMELINE_EXAMPLE.owner],
                ["First human reply", "4 minutes"],
                ["Cost plan issued", "92 minutes"],
                ["Site visit booked by", "the client, 3 hours later"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="u-eyebrow text-ink/40">{k}</dt>
                  <dd className="text-right text-[13.5px] text-ink/75">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-ink/12 pt-6 text-[13.5px] leading-relaxed text-ink/55">
              This is a real enquiry record from the studio desk, with the internal notes shown
              rather than hidden. Every enquiry that comes through the site follows the same path —
              and you can read the whole thing in the desk.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-10">
          <div className="absolute left-[13px] top-2 bottom-2 w-[1px] bg-ink/12">
            <div
              className="w-full bg-clay transition-[height] duration-200 ease-linear"
              style={{ height: `${filled * 100}%` }}
            />
          </div>
          <div className="space-y-9">
            {events.map((e, i) => (
              <div
                key={e.label}
                className="relative"
                style={{
                  opacity: Math.min(1, Math.max(0, (filled - i * 0.1) * 4)),
                  transform: `translateY(${Math.max(0, 14 - Math.min(14, Math.max(0, (filled - i * 0.1) * 40)))}px)`,
                }}
              >
                <span
                  className={`absolute -left-10 top-1 flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[10px] ${
                    e.kind === "human"
                      ? "border-clay bg-clay text-paper"
                      : e.kind === "auto"
                        ? "border-ink/25 bg-paper text-ink/60"
                        : "border-ink/25 bg-paper text-clay"
                  }`}
                >
                  {e.kind === "human" ? "J" : e.kind === "auto" ? "◇" : "→"}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                  <span className="u-eyebrow text-clay">{e.at}</span>
                  <p className="text-[15.5px]">{e.label}</p>
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-ink/55">{e.detail}</p>
                <span
                  className={`u-eyebrow mt-3 inline-block rounded-full px-3 py-1.5 ${CHANNEL_TONE[e.channel] ?? "bg-ink/8 text-ink/50"}`}
                >
                  {e.channel === "system"
                    ? "Automation"
                    : e.channel === "web"
                      ? "Website"
                      : e.channel === "sms"
                        ? "SMS"
                        : e.channel === "whatsapp"
                          ? "WhatsApp"
                          : "Email"}{" "}
                  · {e.actor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

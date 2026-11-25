"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/db/schema";
import { money } from "@/lib/estimate";

const CAT_LABELS: Record<string, string> = {
  kitchens: "Kitchen",
  bathrooms: "Bathroom",
  extensions: "Extension",
  fullhome: "Whole home",
  outdoor: "Outdoor",
  restoration: "Restoration",
};

export function WorkShowcase({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);
  const cats = ["all", ...new Set(projects.map((p) => p.category))];

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`u-eyebrow shrink-0 rounded-full border px-4 py-2.5 transition-all duration-400 ${
              filter === c
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/50 hover:border-ink/45 hover:text-ink"
            }`}
          >
            {c === "all" ? "All work" : CAT_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-12">
        {shown.map((p, i) => {
          const tall = i % 5 === 0 || i % 5 === 3;
          return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`group block ${
                i % 3 === 0
                  ? "md:col-span-7"
                  : i % 3 === 1
                    ? "md:col-span-5 md:mt-16"
                    : "md:col-span-6 md:col-start-4"
              }`}
            >
              <div
                className="rv-img rv-in relative overflow-hidden rounded-xl bg-paper-2"
                style={{
                  aspectRatio: tall ? "4 / 3" : "5 / 4",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.heroImage}
                  alt={p.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                  <div>
                    <p className="u-eyebrow text-paper/55">
                      {CAT_LABELS[p.category] ?? p.category} · {p.suburb} · {p.year}
                    </p>
                    <p className="mt-2 font-display text-[26px] leading-tight text-paper md:text-[32px]">
                      {p.title.replace(", " + p.suburb, "")}
                    </p>
                  </div>
                  <span className="u-eyebrow shrink-0 rounded-full border border-paper/35 px-3.5 py-2 text-paper/85 transition-all duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    {p.investment}
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink/55">
                {p.blurb}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState<number>(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const shown = projects.filter((p) => filter === "all" || p.category === filter);
  const cats = ["all", ...new Set(projects.map((p) => p.category))];
  const active = hover >= 0 ? shown[hover] : undefined;

  return (
    <div ref={wrap}>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`u-eyebrow rounded-full border px-4 py-2.5 transition-all duration-400 ${
              filter === c
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/50 hover:border-ink/45 hover:text-ink"
            }`}
          >
            {c === "all" ? "Everything" : CAT_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      <div className="mt-12 border-t border-ink/12">
        {shown.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            className="group relative grid grid-cols-12 items-baseline gap-4 border-b border-ink/12 py-7 md:py-9"
          >
            <span className="u-eyebrow col-span-1 text-ink/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-11 font-display text-[26px] leading-[1.05] tracking-tight transition-all duration-500 group-hover:translate-x-3 md:col-span-6 md:text-[38px]">
              {p.title}
            </h3>
            <span className="col-span-6 col-start-2 u-eyebrow text-ink/40 md:col-span-3 md:col-start-8">
              {CAT_LABELS[p.category] ?? p.category} · {p.suburb}
            </span>
            <span className="col-span-6 col-start-2 u-eyebrow text-ink/40 md:col-span-2 md:col-start-11 md:text-right">
              {p.investment}
            </span>
            <span className="pointer-events-none absolute inset-0 bg-paper-2/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Cursor-following preview */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[300px] w-[400px] overflow-hidden rounded-xl lg:block"
        style={{
          transform: `translate3d(${pos.x - 200}px, ${pos.y - 150}px, 0) scale(${active ? 1 : 0.85})`,
          opacity: active ? 1 : 0,
          transition: "opacity .45s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {shown.map((p) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={p.slug}
            src={p.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: active?.slug === p.slug ? 1 : 0 }}
          />
        ))}
        {active && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
            <p className="u-eyebrow text-paper/70">
              {active.durationWeeks} weeks on site · {active.year}
            </p>
            <p className="mt-1 font-display text-[22px] text-paper">
              {money(Number(active.investment.replace(/[^0-9]/g, "")) || 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

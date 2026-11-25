"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FINISH_LEVELS,
  PROJECT_TYPES,
  computeEstimate,
  money,
  type ProjectKey,
} from "@/lib/estimate";

export function MiniRange() {
  const [type, setType] = useState<ProjectKey>("kitchen");
  const [size, setSize] = useState("standard");
  const [finish, setFinish] = useState("signature");

  const result = useMemo(() => computeEstimate({ type, size, finish }), [type, size, finish]);
  const t = PROJECT_TYPES.find((x) => x.key === type)!;

  return (
    <div className="rounded-2xl bg-ink p-6 text-paper md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="u-eyebrow text-paper/40">Twenty-second version</p>
          <h3 className="mt-4 font-display text-[30px] leading-[1.05] tracking-tight md:text-[40px]">
            Three answers and you have a real range.
          </h3>

          <div className="mt-8 space-y-7">
            <div>
              <p className="u-eyebrow text-paper/40">What kind of work</p>
              <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                {PROJECT_TYPES.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      setType(p.key);
                      setSize("standard");
                    }}
                    className={`u-eyebrow shrink-0 rounded-full border px-4 py-2.5 transition-all duration-300 ${
                      type === p.key
                        ? "border-paper bg-paper text-ink"
                        : "border-paper/20 text-paper/60 hover:border-paper/55 hover:text-paper"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="u-eyebrow text-paper/40">Scale</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {t.sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSize(s.key)}
                    className={`rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
                      size === s.key
                        ? "border-clay-soft bg-clay/20 text-paper"
                        : "border-paper/15 text-paper/60 hover:border-paper/45"
                    }`}
                  >
                    <span className="block text-[13.5px]">{s.label}</span>
                    <span className="u-eyebrow mt-1 block text-paper/35">{s.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="u-eyebrow text-paper/40">Finish level</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {FINISH_LEVELS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFinish(f.key)}
                    className={`rounded-lg border px-3 py-3 text-center transition-all duration-300 ${
                      finish === f.key
                        ? "border-clay-soft bg-clay/20 text-paper"
                        : "border-paper/15 text-paper/60 hover:border-paper/45"
                    }`}
                  >
                    <span className="block text-[13px]">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-paper/12 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <div>
            <p className="u-eyebrow text-paper/40">
              {t.label} · {result.sizeLabel}
            </p>
            <p className="mt-5 font-display text-[44px] leading-[0.92] tracking-[-0.045em] md:text-[58px]">
              {money(result.low)}
              <span className="mx-2 text-paper/25">—</span>
              {money(result.high)}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/15">
                <div
                  className="h-full rounded-full bg-clay-soft transition-all duration-700 ease-out"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span className="u-eyebrow shrink-0 text-paper/50">
                {result.confidence}% confidence
              </span>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-paper/55">
              {result.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/estimate?type=${type}&size=${size}&finish=${finish}`}
              className="btn-sweep rounded-full bg-paper px-6 py-3.5 u-eyebrow text-ink"
            >
              <span className="relative z-2">Open the full cost planner</span>
              <span className="relative z-2 ml-2">→</span>
            </Link>
            <Link
              href="/book"
              className="rounded-full border border-paper/25 px-6 py-3.5 u-eyebrow text-paper/75 transition-colors hover:border-paper/60 hover:text-paper"
            >
              Book a site visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

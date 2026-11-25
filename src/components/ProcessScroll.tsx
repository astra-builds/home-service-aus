"use client";

import { useScrollProgress } from "./motion";
import { PROCESS } from "@/lib/site";

export function ProcessScroll() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const n = PROCESS.length;
  const shift = progress * (n - 1);

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 78}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-ink text-paper">
        <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="u-display-lg">How a project actually runs</h2>
            <p className="u-eyebrow hidden shrink-0 text-paper/35 md:block">
              Step {Math.min(n, Math.round(shift) + 1)} of {n}
            </p>
          </div>

          <div className="relative mt-12">
            <div
              className="flex gap-6 md:gap-8"
              style={
                {
                  "--card": "min(78vw, 460px)",
                  "--gap": "2rem",
                  transform: `translate3d(calc(${shift} * -1 * (var(--card) + var(--gap))), 0, 0)`,
                  transition: "transform .25s linear",
                } as React.CSSProperties
              }
            >
              {PROCESS.map((s, i) => {
                const active = Math.round(shift) === i;
                return (
                  <article
                    key={s.n}
                    className={`shrink-0 rounded-2xl border p-7 transition-all duration-700 md:p-9 ${
                      active
                        ? "border-paper/30 bg-paper/6"
                        : "border-paper/10 bg-transparent"
                    }`}
                    style={
                      {
                        "--card": "min(78vw, 460px)",
                        "--gap": "2rem",
                        width: "min(78vw, 460px)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`font-display text-[64px] leading-none tracking-[-0.05em] transition-colors duration-700 ${
                          active ? "text-clay-soft" : "text-paper/15"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span className="u-eyebrow text-right text-paper/40">{s.duration}</span>
                    </div>
                    <h3 className="mt-7 font-display text-[30px] leading-[1.05] tracking-tight md:text-[36px]">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-[1.7] text-paper/65">{s.body}</p>
                    <p className="u-eyebrow mt-7 border-t border-paper/12 pt-5 text-clay-soft">
                      In practice
                    </p>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-paper/45">
                      {s.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-[2px] flex-1 bg-paper/12">
              <div
                className="h-full bg-clay-soft transition-[width] duration-200 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="u-eyebrow shrink-0 text-paper/35">
              Free to stop after any step
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

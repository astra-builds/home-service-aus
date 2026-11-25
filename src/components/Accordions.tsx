"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQS, SERVICES } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-ink/12">
      {FAQS.map((f, i) => (
        <div key={f.q} className="border-b border-ink/12">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="group flex w-full items-baseline gap-6 py-6 text-left"
          >
            <span className="u-eyebrow shrink-0 text-ink/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-display text-[21px] leading-tight tracking-tight transition-colors duration-400 group-hover:text-clay md:text-[25px]">
              {f.q}
            </span>
            <span
              className={`shrink-0 text-[20px] leading-none transition-transform duration-500 ${
                open === i ? "rotate-45 text-clay" : "text-ink/30"
              }`}
            >
              +
            </span>
          </button>
          <div className="acc-body" data-open={open === i}>
            <div>
              <p className="pb-7 pl-[calc(1.5rem+2.25rem)] pr-10 text-[14.5px] leading-[1.72] text-ink/60 md:pl-16">
                {f.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(SERVICES[0]?.slug ?? null);
  return (
    <div className="border-t border-ink/12">
      {SERVICES.map((s) => {
        const isOpen = open === s.slug;
        return (
          <div key={s.slug} id={s.slug} className="border-b border-ink/12">
            <button
              onClick={() => setOpen(isOpen ? null : s.slug)}
              className="group flex w-full items-baseline gap-6 py-7 text-left md:py-9"
            >
              <span className="u-eyebrow w-16 shrink-0 text-ink/30">{s.from}</span>
              <span className="flex-1">
                <span className="block font-display text-[26px] leading-[1.05] tracking-tight transition-colors duration-400 group-hover:text-clay md:text-[40px]">
                  {s.name}
                </span>
                <span className="mt-2 block text-[13.5px] text-ink/45">{s.short}</span>
              </span>
              <span
                className={`shrink-0 text-[22px] leading-none transition-transform duration-500 ${
                  isOpen ? "rotate-45 text-clay" : "text-ink/30"
                }`}
              >
                +
              </span>
            </button>
            <div className="acc-body" data-open={isOpen}>
              <div>
                <div className="grid gap-8 pb-10 pl-0 md:grid-cols-[1.1fr_1fr] md:pl-16">
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="mb-6 aspect-[16/9] w-full rounded-lg object-cover"
                    />
                    <p className="max-w-xl text-[14.5px] leading-[1.72] text-ink/60">
                      {s.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/estimate?type=${s.estimateKey}`}
                        className="btn-sweep rounded-full bg-ink px-5 py-3 u-eyebrow text-paper"
                      >
                        <span className="relative z-2">Price this up</span>
                        <span className="relative z-2 ml-2">→</span>
                      </Link>
                      <span className="u-eyebrow text-ink/40">{s.weeks}</span>
                    </div>
                  </div>
                  <div className="space-y-7">
                    <div>
                      <p className="u-eyebrow text-ink/40">Included, always</p>
                      <ul className="mt-3.5 space-y-2.5">
                        {s.includes.map((x) => (
                          <li key={x} className="flex gap-3 text-[14px] text-ink/70">
                            <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-clay" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="u-eyebrow text-clay">Worth thinking about</p>
                      <ul className="mt-3.5 space-y-2.5">
                        {s.consider.map((x) => (
                          <li key={x} className="flex gap-3 text-[14px] text-ink/55">
                            <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink/25" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

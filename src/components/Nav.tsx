"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid
            ? "border-b border-ink/10 bg-paper/92 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1680px] items-center justify-between px-6 transition-all duration-700 md:px-10 ${
            solid ? "h-[68px]" : "h-[92px]"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-500 ${
                solid ? "border-ink/25 text-ink" : "border-paper/35 text-paper"
              }`}
            >
              <span className="font-display text-[13px] leading-none">T</span>
            </span>
            <span className="flex flex-col">
              <span
                className={`font-display text-[19px] leading-none tracking-[-0.03em] transition-colors duration-500 ${
                  solid ? "text-ink" : "text-paper"
                }`}
              >
                Tallow <span className="italic">&amp;</span> Stone
              </span>
              <span
                className={`u-eyebrow mt-1 hidden text-[9px] transition-colors duration-500 sm:block ${
                  solid ? "text-ink/40" : "text-paper/45"
                }`}
              >
                Builders · Gardenvale VIC
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`link-underline u-eyebrow transition-colors duration-300 ${
                    solid
                      ? active
                        ? "text-clay"
                        : "text-ink/60 hover:text-ink"
                      : active
                        ? "text-clay-soft"
                        : "text-paper/60 hover:text-paper"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.phoneHref}
              className={`hidden u-eyebrow transition-colors duration-300 md:block ${
                solid ? "text-ink/55 hover:text-ink" : "text-paper/55 hover:text-paper"
              }`}
            >
              {BRAND.phoneDisplay}
            </a>
            <Link
              href="/book"
              className={`btn-sweep group hidden rounded-full px-5 py-3 md:inline-flex ${
                solid ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              <span className="relative z-2 u-eyebrow">Book a site visit</span>
              <span className="relative z-2 ml-2 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                solid ? "border-ink/25 text-ink" : "border-paper/35 text-paper"
              }`}
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[1.5px] w-4 bg-current" />
                <span className="block h-[1.5px] w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[80] bg-ink transition-all duration-700 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-[92px] items-center justify-between px-6">
          <span className="font-display text-[19px] text-paper">
            Tallow <span className="italic">&amp;</span> Stone
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="u-eyebrow text-paper/60"
          >
            Close
          </button>
        </div>
        <div className="flex h-[calc(100vh-92px)] flex-col justify-between px-6 pb-10">
          <nav className="mt-6 flex flex-col">
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-paper/10 py-5 font-display text-[2.4rem] leading-none tracking-tight text-paper/90 transition-transform duration-500 hover:translate-x-2 hover:text-paper"
                style={{
                  transitionDelay: `${i * 40}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-2">
            <a href={BRAND.phoneHref} className="u-eyebrow block text-paper/70">
              {BRAND.phoneDisplay}
            </a>
            <a href={`mailto:${BRAND.email}`} className="u-eyebrow block text-paper/70">
              {BRAND.email}
            </a>
            <p className="u-eyebrow pt-3 text-paper/35">{BRAND.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
}

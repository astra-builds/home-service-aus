import Link from "next/link";
import { Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { BRAND } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-28 pb-20 text-paper">
      <Shell>
        <p className="u-eyebrow text-clay-soft">404 · Nothing built here yet</p>
        <Reveal>
          <h1 className="mt-7 u-display-lg max-w-[20ch]">
            We haven&apos;t got to this page. We&apos;re usually better at finishing things.
          </h1>
        </Reveal>
        <Reveal delay={130}>
          <p className="u-lede mt-7 max-w-xl text-paper/60">
            Try one of these, or ask Jess at the studio desk — she&apos;ll point you at the right
            page, or the right person, in one message.
          </p>
        </Reveal>
        <Reveal delay={210}>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ["/", "Home"],
              ["/work", "Selected work"],
              ["/estimate", "Cost planner"],
              ["/book", "Book a site visit"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-paper/25 px-6 py-3.5 u-eyebrow text-paper/75 transition-colors hover:border-paper hover:text-paper"
              >
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal delay={280}>
          <p className="u-eyebrow mt-12 border-t border-paper/15 pt-6 text-paper/35">
            {BRAND.phoneDisplay} · {BRAND.email}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

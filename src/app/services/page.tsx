import Link from "next/link";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ServicesAccordion } from "@/components/Accordions";
import { MiniRange } from "@/components/MiniRange";
import { PROCESS, SERVICES } from "@/lib/site";

export const metadata = {
  title: "What we build",
  description:
    "Kitchens, bathrooms, extensions, whole-home renovations, outdoor living and heritage restoration across bayside and inner south-east Melbourne.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-paper md:pt-48 md:pb-28">
        <Shell>
          <Eyebrow tone="light">What we build · residential only</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal>
              <h1 className="u-display-lg max-w-[16ch]">
                Six things we do well, and nothing else.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[15px] leading-[1.75] text-paper/60">
                We don&apos;t do commercial fitouts, we don&apos;t do project-home work, and we
                don&apos;t take on more jobs than we can run properly. Prices below are honest
                starting points for our service area — not teaser numbers that double after a site
                visit.
              </p>
            </Reveal>
          </div>
        </Shell>
      </section>

      <section className="py-16 md:py-24">
        <Shell wide>
          <ServicesAccordion />
        </Shell>
      </section>

      <section className="border-t border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Not sure which one it is?</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">
                  Most projects are two of these at once.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="u-lede mt-6 max-w-md">
                  A new kitchen usually comes with a wall removal. A bathroom usually reveals a
                  plumbing decision you didn&apos;t know you were making. Rather than guess, tell us
                  what&apos;s wrong with the house and we&apos;ll name the category — and the two
                  things that will decide the budget.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="btn-sweep rounded-full bg-ink px-7 py-4 text-paper"
                  >
                    <span className="relative z-2 u-eyebrow">Book a site visit</span>
                    <span className="relative z-2 ml-2">→</span>
                  </Link>
                  <Link
                    href="/work"
                    className="rounded-full border border-ink/25 px-7 py-4 u-eyebrow text-ink/70 transition-colors hover:border-ink/60 hover:text-ink"
                  >
                    See the work
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={i * 70}>
                  <a
                    href={`/estimate?type=${s.estimateKey}`}
                    className="group flex h-full flex-col justify-between rounded-xl border border-ink/12 bg-paper p-6 transition-all duration-400 hover:border-clay hover:bg-clay/5"
                  >
                    <div>
                      <p className="u-eyebrow text-clay">from {s.from}</p>
                      <p className="mt-3 font-display text-[24px] leading-tight tracking-tight">
                        {s.name}
                      </p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-ink/55">{s.summary}</p>
                    </div>
                    <p className="u-eyebrow mt-6 flex items-center justify-between text-ink/40">
                      <span>{s.weeks}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-12 max-w-xl">
            <Eyebrow>Every service, same five steps</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">The process doesn&apos;t change with the size.</h2>
            </Reveal>
          </div>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="border-t border-ink/12 pt-5">
                  <span className="u-eyebrow text-clay">{p.n}</span>
                  <p className="mt-3 font-display text-[20px] leading-tight">{p.title}</p>
                  <p className="u-eyebrow mt-2 text-ink/35">{p.duration}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink/50">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-t border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="mb-12 max-w-xl">
            <Eyebrow>Quick range</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">
                Or get a number before you talk to anyone.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <MiniRange />
          </Reveal>
        </Shell>
      </section>
    </>
  );
}

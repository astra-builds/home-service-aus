import Link from "next/link";
import { getProjects } from "@/lib/data";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { WorkIndex } from "@/components/Work";
import { AWARDS } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Selected work",
  description:
    "Seven recent projects across bayside and inner south-east Melbourne — kitchens, extensions, restorations and whole-home renovations, with the brief, the decisions and the real cost.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  const totalWeeks = projects.reduce((n, p) => n + p.durationWeeks, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-paper md:pt-48 md:pb-28">
        <Shell>
          <Eyebrow tone="light">Selected work · 2024–2026</Eyebrow>
          <Reveal>
            <h1 className="mt-8 u-display-xl max-w-[16ch]">
              Everything here was someone&apos;s house first.
            </h1>
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-[1.1fr_auto] md:items-end">
            <Reveal delay={140}>
              <p className="max-w-xl text-[15.5px] leading-[1.75] text-paper/65">
                Each project includes the brief as we understood it, the decisions that shaped it,
                what it cost, how long it took and what happened at the variations. That&apos;s the
                part most builders leave out, and it&apos;s the only part that helps you plan.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex gap-10">
                <div>
                  <p className="font-display text-[38px] leading-none tracking-tight">
                    {projects.length}
                  </p>
                  <p className="u-eyebrow mt-2 text-paper/40">Projects shown</p>
                </div>
                <div>
                  <p className="font-display text-[38px] leading-none tracking-tight">
                    {totalWeeks}
                  </p>
                  <p className="u-eyebrow mt-2 text-paper/40">Weeks on site</p>
                </div>
                <div>
                  <p className="font-display text-[38px] leading-none tracking-tight">2.9%</p>
                  <p className="u-eyebrow mt-2 text-paper/40">Avg. variations</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      <section className="py-16 md:py-24">
        <Shell wide>
          <WorkIndex projects={projects} />
        </Shell>
      </section>

      <section className="border-t border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow>Recognition</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">Awards are nice. Referrals are better.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="u-lede mt-6 max-w-md">
                  96% of our work comes from someone who has already used us, or from someone they
                  sent. The awards sit in a drawer; the phone calls don&apos;t.
                </p>
              </Reveal>
            </div>
            <div className="border-t border-ink/12">
              {AWARDS.map((a, i) => (
                <Reveal key={a.title} delay={i * 80}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-6">
                    <div>
                      <p className="font-display text-[22px] leading-tight tracking-tight">
                        {a.title}
                      </p>
                      <p className="u-eyebrow mt-2 text-ink/40">{a.project}</p>
                    </div>
                    <span className="u-eyebrow shrink-0 text-clay">{a.year}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <Reveal>
              <h2 className="u-display-lg max-w-[18ch]">
                Have a house that looks like one of these?
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/estimate"
                  className="btn-sweep rounded-full bg-paper px-7 py-4 text-ink"
                >
                  <span className="relative z-2 u-eyebrow">Get a cost range</span>
                  <span className="relative z-2 ml-2">→</span>
                </Link>
                <Link
                  href="/book"
                  className="rounded-full border border-paper/25 px-7 py-4 u-eyebrow text-paper/80 transition-colors hover:border-paper/70 hover:text-paper"
                >
                  Book a site visit
                </Link>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>
    </>
  );
}

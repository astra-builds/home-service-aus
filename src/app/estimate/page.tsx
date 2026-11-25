import { CostPlanner } from "@/components/CostPlanner";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { EstimateInput } from "@/lib/estimate";
import { SERVICES } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Cost planner",
  description:
    "Nine questions, two minutes, and a realistic cost range for your Melbourne renovation — with the cost drivers named and three comparable projects attached.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function EstimatePage({ searchParams }: Props) {
  const sp = await searchParams;
  const initial: EstimateInput & { name?: string; email?: string } = {
    type: (one(sp.type) as EstimateInput["type"]) ?? undefined,
    size: one(sp.size),
    finish: one(sp.finish),
    suburb: one(sp.suburb),
    timing: one(sp.timing),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-paper md:pt-48 md:pb-28">
        <div className="grid-paper absolute inset-0 opacity-[0.14]" />
        <Shell>
          <Eyebrow tone="light">Cost planner · no email needed to see the number</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal>
              <h1 className="u-display-lg max-w-[18ch]">
                A real range, built from real finished jobs.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[15px] leading-[1.75] text-paper/60">
                This isn&apos;t a calculator multiplying square metres by a rate. It&apos;s our
                pricing model — the same one Priya uses to write cost plans — exposed to nine
                questions. It knows what a structural opening does to a kitchen, what a heritage
                overlay does to a timeline, and what living in the house during a build actually
                costs.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 border-t border-paper/15 pt-8 sm:grid-cols-3">
            {[
              ["24", "recent projects in the model", "Same six categories, same service area"],
              ["9", "questions, 2 minutes", "Each one narrows the range measurably"],
              ["±14%", "typical accuracy", "Against final contracted value, audited quarterly"],
            ].map(([big, label, note], i) => (
              <Reveal key={label} delay={i * 100}>
                <div>
                  <p className="font-display text-[44px] leading-none tracking-[-0.04em]">
                    {big}
                  </p>
                  <p className="u-eyebrow mt-3 text-clay-soft">{label}</p>
                  <p className="mt-2 text-[13px] text-paper/45">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-16 md:py-24">
        <Shell>
          <CostPlanner initial={initial} />
        </Shell>
      </section>

      <section className="border-t border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow>Honest about the limits</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">
                  What this range can&apos;t tell you.
                </h2>
              </Reveal>
            </div>
            <div className="space-y-8 border-t border-ink/12 pt-8">
              {[
                [
                  "It hasn't seen your house.",
                  "The four site factors cover a lot, but a 1930s bungalow with a failed sub-floor is different from a 1990s project home with the same footprint. A free site visit closes that gap.",
                ],
                [
                  "It assumes our service area.",
                  "Travel, access and supplier logistics change the number outside bayside and inner south-east Melbourne. We'll say so rather than pretend otherwise.",
                ],
                [
                  "It excludes what you'd want excluded.",
                  "Landscaping, furniture, appliances you're bringing with you and the cost of living elsewhere during a build are all listed separately, not bundled in to make the number look smaller.",
                ],
                [
                  "It isn't a quote.",
                  "An indicative range becomes a written cost plan after a site visit, and a contract price after the scope is locked. Both of those are free, and neither commits you to anything.",
                ],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={i * 90}>
                  <div>
                    <p className="font-display text-[22px] leading-tight tracking-tight">{t}</p>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/60">{b}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={360}>
                <div className="mt-4 rounded-xl bg-clay/8 p-6">
                  <p className="u-eyebrow text-clay">And the part nobody else publishes</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                    Our cost plans have tracked within ±14% of final contracted value over the last
                    three years, and variations average under 4% of contract. If a quote you have is
                    dramatically lower than this range, it is almost certainly missing scope rather
                    than being efficient. We&apos;ll happily read both documents with you.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Shell>
      </section>

      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-10 max-w-xl">
            <Eyebrow>Starting points</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">Jump straight to a service</h2>
            </Reveal>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <a
                  href={`/estimate?type=${s.estimateKey}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-ink/12 p-5 transition-all duration-400 hover:border-clay hover:bg-clay/5"
                >
                  <div>
                    <p className="font-display text-[21px] leading-tight tracking-tight">
                      {s.name}
                    </p>
                    <p className="mt-2 text-[13px] text-ink/50">{s.short}</p>
                  </div>
                  <p className="u-eyebrow mt-5 flex items-center justify-between text-ink/40">
                    <span>from {s.from}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}

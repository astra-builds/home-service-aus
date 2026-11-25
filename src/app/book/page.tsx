import { BookingForm } from "@/components/BookingForm";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { BRAND, CREDENTIALS, PROMISES, REVIEWS } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Book a site visit",
  description:
    "Ninety minutes on site with a Tallow & Stone build director, free, across bayside and inner south-east Melbourne. Pick a real slot from the calendar.",
};

export default function BookPage() {
  const featured = REVIEWS[0];
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-paper md:pt-48 md:pb-28">
        <Shell>
          <Eyebrow tone="light">Site visit · free · 90 minutes</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <Reveal>
              <h1 className="u-display-lg max-w-[16ch]">
                Come see the house before we say anything about money.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[15px] leading-[1.75] text-paper/60">
                One of our build directors walks the site with you: access, services, structure,
                the things nobody photographs. You get a written summary and a realistic cost range
                within 48 hours — before you spend a dollar on drawings. Pick a slot below, or call{" "}
                <a href={BRAND.phoneHref} className="underline decoration-paper/30 underline-offset-4">
                  {BRAND.phoneDisplay}
                </a>{" "}
                and Jess will do it by hand.
              </p>
            </Reveal>
          </div>
        </Shell>
      </section>

      <section className="py-16 md:py-24">
        <Shell>
          <BookingForm />
        </Shell>
      </section>

      <section className="border-t border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>What happens on the day</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">Ninety minutes, then a summary in 48 hours.</h2>
              </Reveal>
              <div className="mt-10 space-y-7 border-t border-ink/12 pt-8">
                {[
                  [
                    "First 20 minutes",
                    "You talk, we listen and take notes. What fails, what you avoid using, what you've already been quoted.",
                  ],
                  [
                    "Next 50 minutes",
                    "We walk the site with a laser measure, a moisture meter and a torch. Roughly a third of what we find happens in the roof space or under the floor.",
                  ],
                  [
                    "Last 20 minutes",
                    "We say out loud what we think is possible, what it will probably cost, and whether we're the right builder. If we're not, we'll name who is.",
                  ],
                  [
                    "Within 48 hours",
                    "A written summary: findings, an indicative range, the three decisions that matter most, and what documentation you actually need to pay for.",
                  ],
                ].map(([t, b], i) => (
                  <Reveal key={t} delay={i * 90}>
                    <div className="flex gap-6">
                      <span className="u-eyebrow w-28 shrink-0 text-clay">{t}</span>
                      <p className="text-[14.5px] leading-relaxed text-ink/65">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <Reveal>
                <div className="rounded-2xl bg-ink p-7 text-paper md:p-9">
                  <p className="u-eyebrow text-paper/40">From a recent visit</p>
                  <blockquote className="mt-5 font-display text-[23px] leading-[1.4] tracking-[-0.02em]">
                    &ldquo;{featured.quote}&rdquo;
                  </blockquote>
                  <p className="u-eyebrow mt-6 text-paper/45">
                    {featured.name} · {featured.suburb}
                  </p>
                </div>
              </Reveal>

              <div>
                <Eyebrow>On the record</Eyebrow>
                <dl className="mt-6 border-t border-ink/12">
                  {CREDENTIALS.map((c, i) => (
                    <Reveal key={c.label} delay={i * 60}>
                      <div className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4">
                        <dt className="u-eyebrow text-ink/40">{c.label}</dt>
                        <dd className="text-right text-[14px]">{c.value}</dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>
              </div>

              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {PROMISES.slice(0, 2).map((p, i) => (
                  <Reveal key={p.title} delay={i * 90}>
                    <div className="border-t border-ink/12 pt-4">
                      <p className="font-display text-[20px] leading-tight">{p.title}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}

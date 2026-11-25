import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getRelated } from "@/lib/data";
import { Eyebrow, Shell } from "@/components/ui";
import { Reveal, Parallax } from "@/components/motion";
import { CATEGORY_TO_TYPE } from "@/lib/estimate";
import { BRAND } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: "Project" };
  return {
    title: p.title,
    description: p.blurb,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();
  const related = await getRelated(p.category, p.slug, 3);
  const typeKey = CATEGORY_TO_TYPE[p.category] ?? "kitchen";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[78svh] overflow-hidden bg-ink">
        <Parallax speed={0.12} className="absolute inset-0 -top-[8%] h-[116%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.heroImage} alt={p.title} className="h-full w-full object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
        <div className="absolute inset-x-0 bottom-0">
          <Shell wide>
            <div className="pb-12 md:pb-16">
              <Link
                href="/work"
                className="u-eyebrow inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-paper"
              >
                ← All work
              </Link>
              <Reveal variant="mask">
                <h1 className="mt-6 max-w-[16ch] text-paper u-display-xl">{p.title}</h1>
              </Reveal>
              <Reveal delay={150}>
                <p className="u-eyebrow mt-6 text-paper/60">
                  {p.suburb} · {p.year} · {p.durationWeeks} weeks on site
                </p>
              </Reveal>
            </div>
          </Shell>
        </div>
      </section>

      {/* Meta strip */}
      <div className="border-b border-ink/12 bg-paper-2/60 py-6">
        <Shell wide>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {[
              ["Investment", p.investment],
              ["Contract range", p.budgetBand],
              ["Duration", `${p.durationWeeks} weeks`],
              ["Client", p.clientName],
              ["Category", p.category],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="u-eyebrow text-ink/40">{k}</p>
                <p className="mt-2 text-[14.5px] capitalize">{v}</p>
              </div>
            ))}
          </div>
        </Shell>
      </div>

      {/* Narrative */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>The story</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">{p.blurb}</h2>
              </Reveal>
            </div>
            <div className="space-y-12">
              {[
                ["The brief", p.brief],
                ["How we approached it", p.approach],
                ["What happened", p.outcome],
              ].map(([title, body], i) => (
                <Reveal key={title} delay={i * 110}>
                  <div className="border-t border-ink/12 pt-6">
                    <p className="u-eyebrow text-clay">{title}</p>
                    <p className="mt-4 text-[15.5px] leading-[1.8] text-ink/70">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* Gallery */}
      <section className="pb-20 md:pb-28">
        <Shell wide>
          <div className="grid gap-6 md:grid-cols-12">
            {p.gallery.map((src, i) => (
              <Reveal
                key={src}
                variant="img"
                delay={i * 90}
                className={`overflow-hidden rounded-xl ${
                  i % 3 === 0 ? "md:col-span-7" : "md:col-span-5"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${p.title} — detail ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* Specs + quote */}
      <section className="border-y border-ink/12 bg-paper-2/50 py-20 md:py-28">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Specification</Eyebrow>
              <dl className="mt-8 border-t border-ink/12">
                {p.specs.map((s, i) => (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4">
                      <dt className="u-eyebrow text-ink/40">{s.label}</dt>
                      <dd className="text-right text-[14.5px]">{s.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
            <div>
              <Eyebrow>Materials schedule</Eyebrow>
              <ul className="mt-8 space-y-3">
                {p.materials.map((m, i) => (
                  <Reveal key={m} delay={i * 60}>
                    <li className="flex gap-4 text-[14.5px] text-ink/70">
                      <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-clay" />
                      {m}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          <Reveal delay={120}>
            <figure className="mt-20 rounded-2xl bg-ink p-8 text-paper md:p-14">
              <blockquote className="max-w-3xl font-display text-[26px] leading-[1.32] tracking-[-0.025em] md:text-[38px]">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="u-eyebrow mt-8 text-paper/50">
                {p.clientName} · {p.suburb} · {p.investment}
              </figcaption>
            </figure>
          </Reveal>
        </Shell>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>The details that mattered</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">Six things worth stealing.</h2>
            </Reveal>
          </div>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <Reveal key={f} delay={i * 80}>
                <div className="border-t border-ink/12 pt-5">
                  <span className="u-eyebrow text-ink/25">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* Related + CTA */}
      <section className="border-t border-ink/12 py-20 md:py-28">
        <Shell wide>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>Related work</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">Other projects like this one</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link
                href={`/estimate?type=${typeKey}`}
                className="btn-sweep rounded-full bg-ink px-7 py-4 text-paper"
              >
                <span className="relative z-2 u-eyebrow">
                  Price something like this
                </span>
                <span className="relative z-2 ml-2">→</span>
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <Link href={`/work/${r.slug}`} className="group block">
                  <div className="overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.heroImage}
                      alt={r.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-display text-[22px] leading-tight tracking-tight transition-colors group-hover:text-clay">
                    {r.title}
                  </p>
                  <p className="u-eyebrow mt-2 text-ink/40">
                    {r.suburb} · {r.investment} · {r.durationWeeks} weeks
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-20 rounded-2xl bg-clay/8 p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h3 className="u-display-md">
                    A house like this one, or something completely different?
                  </h3>
                  <p className="u-lede mt-4">
                    Ninety minutes on site, free, and you&apos;ll get a written summary either way.
                    Or open the cost planner and see a range in two minutes.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/book" className="btn-sweep rounded-full bg-ink px-7 py-4 text-paper">
                    <span className="relative z-2 u-eyebrow">Book a site visit</span>
                  </Link>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                      `Hi — I just read about ${p.title}. Something similar here.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#1faa53] px-7 py-4 u-eyebrow text-white transition-colors hover:bg-[#17903f]"
                  >
                    WhatsApp the studio
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}

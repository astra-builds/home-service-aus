import Link from "next/link";
import { getProjects } from "@/lib/data";
import { Btn, Eyebrow, Shell } from "@/components/ui";
import { Reveal, Counter, Parallax } from "@/components/motion";
import { WorkShowcase } from "@/components/Work";
import { ProcessScroll } from "@/components/ProcessScroll";
import { MiniRange } from "@/components/MiniRange";
import { StudioTimeline } from "@/components/StudioTimeline";
import { ServicesAccordion, Faq } from "@/components/Accordions";
import {
  BRAND,
  PROCESS,
  PROMISES,
  REVIEWS,
  SERVICES,
  STATS,
  TEAM,
  px,
} from "@/lib/site";

export const dynamic = "force-dynamic";

const HERO_IMG = px(4626277, 2000);
const DETAIL_IMG = px(29738857, 1200);
const CREW_IMG = px(8817846, 1400);

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
        <Parallax speed={0.14} className="absolute inset-0 -top-[8%] h-[116%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt="A contemporary Melbourne home at dusk"
            className="h-full w-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-10 pt-36 md:px-10 md:pb-14">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Reveal variant="mask">
              <span className="u-eyebrow inline-block rounded-full border border-paper/30 px-4 py-2 text-paper/70">
                Gardenvale, Victoria · {BRAND.est} · 214 projects
              </span>
            </Reveal>
          </div>

          <h1 className="mt-8 u-display-xl max-w-[26ch] text-paper">
            <Reveal variant="mask" as="span" className="block">
              Building rooms
            </Reveal>
            <Reveal variant="mask" as="span" className="block" delay={110}>
              you&apos;ll <span className="u-italic text-clay-soft">never want</span>
            </Reveal>
            <Reveal variant="mask" as="span" className="block" delay={220}>
              to leave.
            </Reveal>
          </h1>

          <div className="mt-10 grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-[1.1fr_auto] md:items-end">
            <Reveal delay={280}>
              <p className="max-w-xl text-[15.5px] leading-[1.75] text-paper/65">
                A design-led building studio working across bayside and inner south-east
                Melbourne. Kitchens, bathrooms, extensions, whole-home renovations and
                restoration — cost-planned before you spend a dollar on drawings, and looked
                after for a year after we hand over the keys.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="btn-sweep group rounded-full bg-paper px-7 py-4 text-ink"
                >
                  <span className="relative z-2 u-eyebrow">Book a free site visit</span>
                  <span className="relative z-2 ml-2 transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/estimate"
                  className="group inline-flex items-center gap-3 rounded-full border border-paper/30 px-7 py-4 text-paper transition-colors hover:border-paper/70"
                >
                  <span className="u-eyebrow">Get an instant cost range</span>
                  <span className="u-eyebrow text-paper/40 transition-transform duration-500 group-hover:translate-x-1">
                    2 min
                  </span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={380} className="w-full md:w-[320px]">
              <div className="rounded-xl border border-paper/20 bg-paper/8 p-5 backdrop-blur-md">
                <p className="u-eyebrow text-paper/50">Studio desk · live</p>
                <div className="mt-4 space-y-3.5">
                  {[
                    ["Next site visit", "Thu 9:30am — 1 slot left"],
                    ["Average first reply", "4 minutes"],
                    ["Rated", "4.9 / 5 from 63 reviews"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3">
                      <span className="u-eyebrow text-paper/40">{k}</span>
                      <span className="text-right text-[13px] text-paper/85">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-paper/15 pt-4">
                  <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#3ddc84]" />
                  <span className="u-eyebrow text-paper/55">
                    Jess is answering questions right now
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <div className="border-y border-ink/12 bg-paper-2/70 py-5">
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {SERVICES.map((s) => (
                <span key={k + s.slug} className="flex items-center">
                  <span className="u-eyebrow px-7 text-ink/55">{s.name}</span>
                  <span className="h-1 w-1 rounded-full bg-clay" />
                </span>
              ))}
              <span className="u-eyebrow px-7 text-ink/35">Since 2011</span>
              <span className="h-1 w-1 rounded-full bg-clay" />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- MANIFESTO ---------------- */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <Eyebrow>01 — The studio</Eyebrow>
              <Reveal>
                <h2 className="mt-7 u-display-lg max-w-[22ch]">
                  We are a building studio, not a subcontracting machine.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-9 max-w-xl space-y-6 text-[15.5px] leading-[1.78] text-ink/65">
                  <p>
                    Five people work here. Three of them are on the tools most weeks, and the
                    joinery is built in our own workshop in Gardenvale — which is why a cabinet
                    arrives at 2mm rather than 6mm, and why nobody waits three weeks for a
                    correction to come back from interstate.
                  </p>
                  <p>
                    We take on a limited number of projects each year, deliberately, so the same
                    crew stays with your job from the first day to the last. You meet them before
                    you sign. There is no rotating cast of subcontractors, and no site manager
                    you have never spoken to.
                  </p>
                  <p>
                    And we cost the job honestly before you spend anything. That single decision
                    has saved our clients more money than every other thing we do combined.
                  </p>
                </div>
              </Reveal>

              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/12 pt-10 sm:grid-cols-4">
                {STATS.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90}>
                    <p className="font-display text-[42px] leading-none tracking-[-0.04em] md:text-[52px]">
                      <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                    </p>
                    <p className="u-eyebrow mt-3 text-ink/40">{s.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative">
              <Reveal variant="img" className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DETAIL_IMG}
                  alt="Detail of timber pergola casting shadows on brickwork"
                  className="aspect-[4/5] w-full object-cover"
                />
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-6 rounded-xl bg-clay/8 p-6">
                  <p className="u-eyebrow text-clay">Our rolling average, printed in every quote</p>
                  <p className="mt-3 font-display text-[34px] leading-none tracking-tight">
                    Variations under 4%
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink/55">
                    Audited quarterly across the last three years. Every provisional sum carries a
                    stated quantity and a unit rate, so nothing is left to hide behind.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Shell>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section className="py-10 md:py-16">
        <Shell wide>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>02 — Selected work</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg max-w-[20ch]">
                  Seven projects, told properly.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="flex flex-wrap items-center gap-6">
                <p className="max-w-xs text-[14px] leading-relaxed text-ink/50">
                  Not a curated highlight reel — each one includes the brief, the decisions, what
                  it cost and what we&apos;d do differently.
                </p>
                <Btn href="/work" variant="outline">
                  All work
                </Btn>
              </div>
            </Reveal>
          </div>
          <WorkShowcase projects={projects} />
        </Shell>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <ProcessScroll />

      {/* ---------------- COST PLANNER ---------------- */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>03 — Cost planner</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">
                Every builder says &ldquo;it depends&rdquo;. Here&apos;s what it depends on.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="u-lede mt-6">
                Nine questions, two minutes, and you get the range our last two dozen jobs of the
                same type actually landed in — with the cost drivers named, not hidden in a
                schedule. No email required to see the number.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <MiniRange />
          </Reveal>
        </Shell>
      </section>

      {/* ---------------- STUDIO DESK ---------------- */}
      <section className="relative overflow-hidden border-y border-ink/12 bg-paper-2/50 py-24 md:py-32">
        <div className="grid-paper absolute inset-0 opacity-60" />
        <Shell>
          <div className="relative">
            <div className="mb-14 max-w-3xl">
              <Eyebrow>04 — The studio desk</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">
                  What happens in the four minutes after you press send.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="u-lede mt-6 max-w-xl">
                  We&apos;ve made our enquiry handling visible, because the bit you can&apos;t see
                  is usually where a builder loses you. Here&apos;s a real enquiry, from the moment
                  it arrived to the moment she booked the site visit herself.
                </p>
              </Reveal>
            </div>
            <StudioTimeline />
            <Reveal delay={100}>
              <div className="mt-16 flex flex-wrap items-center gap-4">
                <Btn href="/desk" variant="solid">
                  Open the studio desk
                </Btn>
                <p className="u-eyebrow text-ink/40">
                  Live pipeline · enquiry grading · SLA timers · comms log
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>05 — What clients say</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg max-w-[18ch]">
                  4.9 from 63 reviews. No edited highlights.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="flex items-center gap-5 rounded-xl border border-ink/12 bg-paper-2/50 px-6 py-5">
                <p className="font-display text-[46px] leading-none tracking-tight">4.9</p>
                <div>
                  <p className="u-eyebrow text-clay">★★★★★</p>
                  <p className="u-eyebrow mt-1.5 text-ink/40">63 verified reviews</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 110}>
                <figure className="group flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.project}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 u-eyebrow rounded-full bg-paper/90 px-3 py-1.5 text-ink">
                      {r.suburb}
                    </span>
                  </div>
                  <blockquote className="mt-5 flex-1 font-display text-[19px] leading-[1.42] tracking-[-0.015em] text-ink/85">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-ink/12 pt-4">
                    <p className="text-[14px]">{r.name}</p>
                    <p className="u-eyebrow mt-1.5 text-ink/40">
                      {r.project} · {r.value} · {r.year}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="border-y border-ink/12 bg-paper-2/50 py-24 md:py-32">
        <Shell>
          <div className="mb-14 max-w-2xl">
            <Eyebrow>06 — What we build</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">
                Six things we do well, and nothing else.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="u-lede mt-6">
                Residential only. Prices are honest starting points for our service area, not
                teaser numbers that double after a site visit.
              </p>
            </Reveal>
          </div>
          <ServicesAccordion />
        </Shell>
      </section>

      {/* ---------------- PEOPLE & PROMISES ---------------- */}
      <section className="py-24 md:py-32">
        <Shell wide>
          <div className="mb-14 max-w-2xl">
            <Eyebrow>07 — The people</Eyebrow>
            <Reveal>
              <h2 className="mt-6 u-display-lg">The crew you meet is the crew you get.</h2>
            </Reveal>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl bg-paper-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute bottom-3 left-3 u-eyebrow rounded-full bg-ink/85 px-3 py-1.5 text-paper/85 backdrop-blur">
                      {t.years}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-[21px] leading-tight">{t.name}</p>
                  <p className="u-eyebrow mt-1.5 text-clay">{t.role}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink/50">{t.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-x-8 gap-y-10 border-t border-ink/12 pt-14 md:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="flex h-full flex-col">
                  <span className="u-eyebrow text-ink/25">0{i + 1}</span>
                  <p className="mt-4 font-display text-[24px] leading-[1.15] tracking-tight">
                    {p.title}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink/55">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ---------------- CREW IMAGE BAND ---------------- */}
      <section className="relative h-[52vh] overflow-hidden md:h-[64vh]">
        <Parallax speed={0.1} className="absolute inset-0 -top-[10%] h-[120%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CREW_IMG} alt="The crew at work" className="h-full w-full object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 flex items-end">
          <Shell wide className="w-full pb-10">
            <Reveal>
              <p className="max-w-2xl font-display text-[26px] leading-[1.28] tracking-[-0.02em] text-paper md:text-[36px]">
                &ldquo;The house should work better after we leave than it ever did before. That&apos;s
                the whole brief.&rdquo;
              </p>
              <p className="u-eyebrow mt-5 text-paper/55">Tom Ellery · Founder</p>
            </Reveal>
          </Shell>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>08 — Questions</Eyebrow>
              <Reveal>
                <h2 className="mt-6 u-display-lg">The things people actually ask us.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="u-lede mt-6 max-w-sm">
                  If yours isn&apos;t here, Jess will answer it properly rather than send you a
                  brochure.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn href="/book" variant="solid">
                    Book a site visit
                  </Btn>
                  <Btn href="/estimate" variant="outline">
                    Get a cost range
                  </Btn>
                </div>
              </Reveal>
            </div>
            <Faq />
          </div>
        </Shell>
      </section>

      {/* ---------------- PROCESS SUMMARY STRIP ---------------- */}
      <section className="border-y border-ink/12 bg-paper-2/50 py-16">
        <Shell wide>
          <div className="grid gap-8 md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div className="flex flex-col border-l border-ink/15 pl-5">
                  <span className="u-eyebrow text-clay">{p.n}</span>
                  <p className="mt-3 text-[14.5px] leading-snug">{p.title}</p>
                  <p className="u-eyebrow mt-2 text-ink/35">{p.duration}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow tone="light">Start here</Eyebrow>
              <Reveal>
                <h2 className="mt-7 u-display-xl">
                  Tell us what&apos;s
                  <br />
                  <span className="u-italic text-clay-soft">wrong</span> with the house.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="u-lede mt-8 max-w-lg text-paper/60">
                  Twenty minutes on the phone, then ninety minutes on site, then a written cost
                  plan with real numbers. You can stop after any of it. No forms, no sales script,
                  no obligation to like us.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/book"
                    className="btn-sweep group rounded-full bg-paper px-7 py-4 text-ink"
                  >
                    <span className="relative z-2 u-eyebrow">Book a free site visit</span>
                    <span className="relative z-2 ml-2 transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                      "Hi Tallow & Stone — I'd like to talk about a project.",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#1faa53] px-7 py-4 u-eyebrow text-white transition-colors hover:bg-[#17903f]"
                  >
                    WhatsApp the studio
                  </a>
                  <a
                    href={BRAND.phoneHref}
                    className="u-eyebrow px-2 py-4 text-paper/60 transition-colors hover:text-paper"
                  >
                    Or call {BRAND.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={260}>
              <div className="rounded-2xl border border-paper/15 p-6 md:p-8">
                <p className="u-eyebrow text-paper/40">Two ways to get a number</p>
                <div className="mt-6 space-y-5">
                  <Link href="/estimate" className="group block">
                    <p className="font-display text-[24px] leading-tight transition-colors group-hover:text-clay-soft">
                      Cost planner — 2 minutes
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-paper/55">
                      Nine questions, an indicative range, the cost drivers behind it and three
                      comparable projects. No email required to see the number.
                    </p>
                  </Link>
                  <div className="hairline-light" />
                  <Link href="/book" className="group block">
                    <p className="font-display text-[24px] leading-tight transition-colors group-hover:text-clay-soft">
                      Site visit — 90 minutes, free
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-paper/55">
                      A build director walks the site, finds the things nobody photographs, and
                      you get a written summary within 48 hours.
                    </p>
                  </Link>
                </div>
                <p className="u-eyebrow mt-7 border-t border-paper/15 pt-5 text-paper/35">
                  {BRAND.address} · {BRAND.hours}
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>
    </>
  );
}

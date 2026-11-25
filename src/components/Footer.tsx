import Link from "next/link";
import { BRAND, NAV_LINKS, SERVICE_AREAS } from "@/lib/site";

const colLinks = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Selected work" },
      { href: "/services", label: "What we build" },
      { href: "/estimate", label: "Cost planner" },
      { href: "/desk", label: "Studio desk" },
      { href: "/book", label: "Book a site visit" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#kitchens", label: "Kitchens" },
      { href: "/services#bathrooms", label: "Bathrooms & ensuites" },
      { href: "/services#extensions", label: "Extensions" },
      { href: "/services#whole-home", label: "Whole-home renovation" },
      { href: "/services#outdoor", label: "Outdoor living" },
      { href: "/services#restoration", label: "Restoration" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1680px] px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 border-b border-paper/12 pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <p className="u-eyebrow text-paper/40">Get in touch</p>
            <a
              href={BRAND.phoneHref}
              className="link-underline mt-5 block font-display text-[2.6rem] leading-none tracking-tight text-paper md:text-[3.2rem]"
            >
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="link-underline mt-4 block text-[15px] text-paper/70"
            >
              {BRAND.email}
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Tallow & Stone — I'd like to talk about a project.")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#1faa53] px-5 py-3 u-eyebrow text-white transition-colors hover:bg-[#17903f]"
              >
                WhatsApp the studio
              </a>
              <Link
                href="/book"
                className="rounded-full border border-paper/25 px-5 py-3 u-eyebrow text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
              >
                Book a site visit
              </Link>
            </div>
            <p className="mt-8 max-w-sm text-[13.5px] leading-relaxed text-paper/45">
              {BRAND.address}
              <br />
              {BRAND.hours}
            </p>
          </div>

          {colLinks.map((col) => (
            <div key={col.title}>
              <p className="u-eyebrow text-paper/40">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="link-underline text-[14.5px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="u-eyebrow text-paper/40">Where we work</p>
            <p className="mt-5 text-[13.5px] leading-relaxed text-paper/55">
              {SERVICE_AREAS}
            </p>
            <p className="u-eyebrow mt-8 text-paper/40">Nav</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-[14.5px] text-paper/70 hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 border-b border-paper/12 py-8 text-[12.5px] text-paper/45 md:grid-cols-3">
          <p>{BRAND.abn}</p>
          <p>{BRAND.licence}</p>
          <p>{BRAND.warranty}</p>
        </div>

        <div className="relative py-10">
          <p className="font-display text-[15vw] leading-[0.8] tracking-[-0.05em] text-paper/[0.07] select-none">
            Tallow &amp; Stone
          </p>
          <div className="absolute bottom-10 left-0 flex w-full flex-wrap items-center justify-between gap-4 px-0">
            <p className="u-eyebrow text-paper/30">
              © {new Date().getFullYear()} {BRAND.legal} · Gardenvale, Victoria
            </p>
            <p className="u-eyebrow text-paper/30">
              Built by the studio · No stock templates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

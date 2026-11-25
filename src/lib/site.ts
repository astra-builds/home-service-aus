export const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const BRAND = {
  name: "Tallow & Stone",
  legal: "Tallow & Stone Constructions Pty Ltd",
  tagline: "Design-led renovations, extensions & restorations",
  region: "Bayside & inner south-east Melbourne",
  est: "Est. 2011",
  abn: "ABN 34 621 880 107",
  licence: "VIC CDB-L 61284 · Registered Building Practitioner",
  phoneDisplay: "(03) 9576 2040",
  phoneHref: "tel:+61395762040",
  mobileDisplay: "0402 118 347",
  whatsapp: "61402118347",
  email: "studio@tallowandstone.com.au",
  emailAccounts: "accounts@tallowandstone.com.au",
  address: "212 Martin Street, Gardenvale VIC 3185",
  hours: "Mon–Fri 7:30am–5:30pm · Sat 9:00am–12:30pm",
  instagram: "@tallowandstone",
  warranty: "6-year structural warranty · 12-month maintenance visit included",
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Cost planner" },
  { href: "/desk", label: "Studio desk" },
  { href: "/book", label: "Visit" },
] as const;

export const STATS = [
  { value: 214, suffix: "", label: "Projects delivered" },
  { value: 14, suffix: " yrs", label: "On the tools & in the studio" },
  { value: 96, suffix: "%", label: "Clients who refer or return" },
  { value: 4.9, suffix: "/5", label: "Across 63 verified reviews", decimals: 1 },
];

export const SUBURBS = [
  "Brighton",
  "Hampton",
  "Sandringham",
  "Beaumaris",
  "Black Rock",
  "Elwood",
  "Elsternwick",
  "Gardenvale",
  "Ripponlea",
  "St Kilda",
  "Balaclava",
  "Bentleigh",
  "McKinnon",
  "Ormond",
  "Malvern",
  "Armadale",
  "Toorak",
  "Prahran",
  "Windsor",
  "Caulfield North",
  "Kew",
  "Hawthorn",
  "Camberwell",
  "Middle Park",
  "Albert Park",
  "Port Melbourne",
];

export const SERVICE_AREAS =
  "Brighton, Hampton, Sandringham, Beaumaris, Black Rock, Elwood, Elsternwick, Gardenvale, Ripponlea, St Kilda, Bentleigh, McKinnon, Ormond, Malvern, Armadale, Toorak, Prahran, Windsor, Caulfield, Kew, Hawthorn, Camberwell, Middle Park, Albert Park & Port Melbourne.";

export type ServiceItem = {
  slug: string;
  name: string;
  short: string;
  from: string;
  weeks: string;
  image: string;
  summary: string;
  includes: string[];
  consider: string[];
  estimateKey: string;
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "kitchens",
    name: "Kitchens",
    short: "Full kitchen replacements, structural openings and joinery",
    from: "$62,000",
    weeks: "6–9 weeks on site",
    image: px(6908558, 1600),
    summary:
      "The room that decides how the rest of the house is used. We take kitchens back to the frame, reroute services, remove walls where they're holding the plan hostage, and build joinery in our own Gardenvale workshop so the cabinetmaker and the carpenter are never arguing about a 6mm tolerance.",
    includes: [
      "Design development, drawings and 3D study",
      "Structural openings and steelwork",
      "Custom joinery built in-house",
      "Stone, timber and metal benchtops",
      "Plumbing, electrical and gas relocation",
      "Lighting design and switchboard upgrades",
      "Tiling, splashbacks and floor transitions",
      "Weekly site report and fixed stage invoicing",
    ],
    consider: [
      "Pantries that actually hold a fortnight of shopping",
      "Benchtop heights matched to the cook, not the catalogue",
      "Ducted range hoods that don't roar at full speed",
    ],
    estimateKey: "kitchen",
  },
  {
    slug: "bathrooms",
    name: "Bathrooms & ensuites",
    short: "Wet areas rebuilt on new membranes, never patched over",
    from: "$34,000",
    weeks: "4–7 weeks on site",
    image: px(7195883, 1600),
    summary:
      "Most of the bathrooms we demolish were failing behind the tiles long before anyone noticed. We strip to stud, rebuild the substrate, waterproof to AS 3740 with a 7-year membrane warranty, and install drainage that has somewhere to go. Then we make it beautiful.",
    includes: [
      "Full strip-out and substrate rebuild",
      "AS 3740 compliant waterproofing + inspection",
      "Recessed niches, linear drains, curbless entries",
      "Hydronic or electric underfloor heating",
      "Fixture and fitting selection support",
      "Ventilation and mould-resistant detailing",
      "Glass, mirrors and shaving cabinets",
      "Five-week defect-free guarantee at handover",
    ],
    consider: [
      "A second bathroom while the first is out of action",
      "Water pressure testing before fixtures are ordered",
      "Niche depth that fits the bottles you already own",
    ],
    estimateKey: "bathroom",
  },
  {
    slug: "extensions",
    name: "Extensions",
    short: "Ground-floor rear extensions and first-floor additions",
    from: "$210,000",
    weeks: "18–30 weeks on site",
    image: px(4692281, 1600),
    summary:
      "The most expensive mistakes in extensions are made before anyone sets foot on site. We lead the planning pathway, coordinate the structural engineer and land surveyor, and cost the project twice — once for the decision, once for the build — so you sign a contract with numbers that survive contact with reality.",
    includes: [
      "Site measure, level survey and soil report",
      "Planning permit or VicSmart pathway management",
      "Structural engineering and energy report (NATHERS)",
      "Building surveyor permit and occupancy stage gates",
      "Temporary protection, dust walls and site hygiene",
      "Weekly photographic progress reports",
      "Insurance, permits and neighbour notification handled",
      "Landscape and reinstatement works included",
    ],
    consider: [
      "Where the new roof meets the old one — the detail that fails",
      "A 3-week contingency buffer inside the programme",
      "Services relocation: sewer, stormwater, power",
    ],
    estimateKey: "extension",
  },
  {
    slug: "whole-home",
    name: "Whole-home renovation",
    short: "Full interior reconstruction, staged or lived-in",
    from: "$240,000",
    weeks: "20–36 weeks on site",
    image: px(19050702, 1600),
    summary:
      "For houses where every room needs attention but the bones are worth keeping. One team, one contract, one programme across the whole site — so the electrician isn't returning three times and the skirting matches from the front door to the back.",
    includes: [
      "Whole-of-house scope and programme planning",
      "Rewiring, replumbing and switchboard replacement",
      "Sub-floor and roof restoration",
      "Windows, doors and glazing upgrades",
      "Custom joinery across all rooms",
      "One site manager accountable end to end",
      "Staged occupancy so you can stay or move once",
      "Archival photo record of the build",
    ],
    consider: [
      "Whether to stay, move once, or live in part of the house",
      "Single colour and hardware schedule across all rooms",
      "Where the budget shortfall should be taken — not randomly",
    ],
    estimateKey: "fullhome",
  },
  {
    slug: "outdoor",
    name: "Outdoor living",
    short: "Decks, pergolas, alfresco kitchens and garden structure",
    from: "$58,000",
    weeks: "6–14 weeks on site",
    image: px(7587879, 1600),
    summary:
      "Australian outdoor rooms work hardest in the four months you actually use them. We design for summer shade and winter sun, spec hardwoods and steel that survive a bayside salt wind, and detail the junctions where water and timber usually go to war.",
    includes: [
      "Hardwood or thermally-modified timber decking",
      "Steel and timber pergola structures",
      "Alfresco kitchens, BBQ and fridges",
      "Retractable and fixed shading",
      "Outdoor heating, fans and lighting",
      "Retaining, paving and drainage",
      "Spotted gum, ironbark and recycled options",
      "Bayside corrosion-rated fixings throughout",
    ],
    consider: [
      "Northerly sun angles across the year, not just January",
      "Class 1 durability timber within 1km of the bay",
      "Storage built in — not an afterthought shed",
    ],
    estimateKey: "outdoor",
  },
  {
    slug: "restoration",
    name: "Restoration",
    short: "Period homes, heritage overlays and careful repair",
    from: "$86,000",
    weeks: "12–26 weeks on site",
    image: px(29738857, 1600),
    summary:
      "Restoration is judgement work: knowing which lumps of plaster can stay, which lintel is doing nothing, and where a modern intervention earns its place. We work regularly with heritage consultants and Stonnington, Bayside and Port Phillip planners.",
    includes: [
      "Condition report and materials schedule",
      "Heritage consultant engagement",
      "Lath and plaster, cornice and ceiling rose repair",
      "Double-hung sash window overhaul",
      "Chimney, verandah and barge board restoration",
      "Lime mortar and traditional renders",
      "Timber floor repair and board matching",
      "Documented before/after condition record",
    ],
    consider: [
      "Repairing sash windows instead of replacing them",
      "Paint scrapes back to the original scheme",
      "Where a contemporary insertion makes the old sing",
    ],
    estimateKey: "restoration",
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "The first conversation",
    duration: "20 minutes, phone or WhatsApp",
    body: "Tell us what's wrong with the house in your own words. We'll tell you straight away if we're the right builder — and if we're not, we'll name the one who is. No forms, no pressure, no sales script.",
    detail:
      "Most enquiries get a reply within four minutes during business hours because the studio desk routes them the moment they arrive.",
  },
  {
    n: "02",
    title: "Site visit & measure",
    duration: "60–90 minutes on site",
    body: "One of our build directors walks the site with you: access, services, structure, the things nobody photographs. You get a written summary and a realistic cost range within 48 hours — before you spend a dollar on drawings.",
    detail:
      "We bring a laser measure, a moisture meter and a torch. About a third of what we find happens in the roof space or under the floor.",
  },
  {
    n: "03",
    title: "Cost plan & scope lock",
    duration: "1–2 weeks",
    body: "We price the job three ways so you can see what each decision actually costs. Then we write the scope in plain English, line by line, with allowances listed honestly instead of buried in a schedule.",
    detail:
      "Every allowance carries a stated quantity and a unit rate. You always know what 'provisional sum' means on your job.",
  },
  {
    n: "04",
    title: "Build",
    duration: "Varies — reported weekly",
    body: "A named site manager, the same crew, a locked programme and a weekly report with photographs. We protect the parts of the house you're still living in, and we clean up like we're being filmed.",
    detail:
      "Clients get a shared build log, stage-by-stage payment schedule aligned to real completion, and one mobile number that gets answered.",
  },
  {
    n: "05",
    title: "Handover & the 12-month care visit",
    duration: "Handover day, then month 12",
    body: "You get an operations pack: warranties, product care, paint colours, and a marked-up record of where everything is in the wall. Twelve months later we come back, walk the house and fix the defects before you have to ask.",
    detail:
      "Six-year structural warranty and a named aftercare contact. Defect lists are closed within 21 days, and we publish our average close-out time.",
  },
];

export const REVIEWS = [
  {
    name: "Eleanor & Tom Whitfield",
    suburb: "Hampton",
    project: "Kitchen, laundry & dining opening",
    value: "$148,000",
    year: 2025,
    image: px(5502219, 900),
    quote:
      "We'd been quoted by five builders and every number was different. Tallow & Stone were the only ones who sat us down and showed us what the cheap number was leaving out. The build came in 2% over contract and that was our own change of mind on the stone.",
    rating: 5,
  },
  {
    name: "Daniel Okafor",
    suburb: "Elsternwick",
    project: "Rear extension & alfresco",
    value: "$312,000",
    year: 2025,
    image: px(7587879, 900),
    quote:
      "Lived in the house the whole time with two kids. Dust walls went up properly, the crew swept every Friday, and we got a photo report every Thursday afternoon without ever chasing it. That's the part nobody else promised.",
    rating: 5,
  },
  {
    name: "Marguerite Lewis",
    suburb: "Middle Park",
    project: "Victorian restoration",
    value: "$196,000",
    year: 2024,
    image: px(29738857, 900),
    quote:
      "It's a heritage overlay and the council was difficult. Tom handled the whole thing, including the neighbour who objected to everything. The verandah detail they recovered is better than what was there in 1908.",
    rating: 5,
  },
  {
    name: "Priya & Arun Sunder",
    suburb: "Beaumaris",
    project: "Two-bathroom rebuild",
    value: "$94,000",
    year: 2026,
    image: px(6580405, 900),
    quote:
      "The studio desk sent a WhatsApp with our cost range before we'd even finished the second coffee. Felt like dealing with a big practice without losing the person who actually builds it.",
    rating: 5,
  },
  {
    name: "Con Karamalikis",
    suburb: "Malvern",
    project: "Whole-home renovation",
    value: "$486,000",
    year: 2025,
    image: px(18108651, 900),
    quote:
      "Twelve months after handover they turned up unannounced with a punch list of their own. Fixed a door that had dropped and re-caulked the shower. Nobody does that.",
    rating: 5,
  },
  {
    name: "Sally Anagnostou",
    suburb: "Brighton",
    project: "First-floor addition",
    value: "$528,000",
    year: 2024,
    image: px(11731740, 900),
    quote:
      "They told us at the site visit that our budget and our plan didn't agree, and showed us how to get 80% of what we wanted for 60% of the money. Honest to a fault.",
    rating: 5,
  },
];

export const TEAM = [
  {
    name: "Tom Ellery",
    role: "Founder & registered builder",
    years: "Since 2011",
    image: px(8817847, 800),
    bio: "Carpenter by trade, registered building practitioner since 2014. Tom still walks every site at least once a fortnight and answers his mobile on Saturdays.",
  },
  {
    name: "Priya Raman",
    role: "Build director",
    years: "Since 2016",
    image: px(8821564, 800),
    bio: "Runs the programme and the numbers. Priya writes the cost plans and is the reason our variations average under 4% of contract value.",
  },
  {
    name: "Dean Whitford",
    role: "Site manager",
    years: "Since 2018",
    image: px(8830265, 800),
    bio: "Twenty-two years on the tools. Dean's sites run to a weekly rhythm and his defect lists at handover are famously short.",
  },
  {
    name: "Cait Malouf",
    role: "Interiors & joinery lead",
    years: "Since 2019",
    image: px(8829896, 800),
    bio: "Designs and details the joinery built in our Gardenvale workshop, so the cabinetmaker and the carpenter share a drawing set.",
  },
  {
    name: "Jess Navarro",
    role: "Client care & studio desk",
    years: "Since 2021",
    image: px(8817853, 800),
    bio: "Your first point of contact. Jess answers the studio desk, keeps enquiries moving, and is the person who texts you on the day she said she would.",
  },
];

export const FAQS = [
  {
    q: "How quickly can you give me a real number?",
    a: "An indicative range comes the same day from our cost planner or the studio desk. A written cost plan with quantities takes 5–10 working days after a site visit, and it's free. We won't ask you to pay for drawings before you know what the build costs.",
  },
  {
    q: "Do you charge for the first site visit?",
    a: "No. The first 90-minute site visit and the follow-up written summary are free across our service area. If your project needs a land survey, soil report or heritage consultant, we'll quote those separately and they're yours to keep regardless of who builds.",
  },
  {
    q: "Can we stay in the house while you build?",
    a: "Usually, yes — about 60% of our clients do. Bathrooms and kitchens are manageable with dust walls and a temporary setup. Whole-home renovations are harder; we'll walk you through staging so you either move once or stay in a sealed wing with a working kitchen.",
  },
  {
    q: "Are you registered and insured?",
    a: "Yes — registered building practitioner VIC CDB-L 61284, domestic building insurance for every project over the threshold, $20M public liability, and a 6-year structural warranty. Certificates are issued with your contract.",
  },
  {
    q: "How do payments work?",
    a: "Staged payments tied to real completion, not calendar dates — typically 5% deposit, then frame, lock-up, fix, and completion stages. There's no payment before the work that stage covers is finished and inspected. You can see the exact schedule in your contract.",
  },
  {
    q: "What if we change our mind mid-build?",
    a: "Variations are normal and ours average under 4% of contract value. Every variation is priced in writing with labour, materials and a 48-hour cooling window before it's actioned. Nothing gets done on a handshake.",
  },
  {
    q: "Do you work with architects and designers?",
    a: "Constantly — roughly half our work comes in with drawings already done. We'll review the documentation, flag anything that will blow the budget, and price to the drawings. We're also happy to lead design ourselves with our draftsman and engineer.",
  },
  {
    q: "What areas do you cover?",
    a: `We work across ${SERVICE_AREAS} If you're outside that, send the address anyway — we sometimes take a project we believe in further afield.`,
  },
  {
    q: "Can you just fix something small?",
    a: "Yes — our Care Crew handles defect work, aftercare and small repairs for existing clients, and we keep two days a month open for one-off jobs. Use the studio desk and Jess will find the first available slot.",
  },
];

export const PROMISES = [
  {
    title: "Fixed scope, honest allowances",
    body: "Every provisional sum in our contracts carries a stated quantity and a unit rate. No vagueness to hide behind.",
  },
  {
    title: "One number that gets answered",
    body: "A named site manager and a studio desk that replies inside four minutes during business hours. Not a call centre.",
  },
  {
    title: "Variations under 4%",
    body: "Our rolling average across the last three years. Printed in every cost plan, audited every quarter.",
  },
  {
    title: "The 12-month visit",
    body: "We come back before you have to ask. Defects are closed within 21 days — we publish our average close-out time.",
  },
];

export const CREDENTIALS = [
  { label: "Registered building practitioner", value: "VIC CDB-L 61284" },
  { label: "Domestic building insurance", value: "Every project, every stage" },
  { label: "Public liability", value: "$20,000,000" },
  { label: "Structural warranty", value: "6 years" },
  { label: "Waterproofing warranty", value: "7 years, AS 3740" },
  { label: "HIA & Master Builders", value: "Member since 2013" },
];

export const PRESS = [
  "Houses",
  "Architectural Digest Australia",
  "The Design Files",
  "HIA Awards 2025",
  "Bayside Leader",
];

export const AWARDS = [
  { year: "2025", title: "HIA Victorian Renovation of the Year", project: "Roslyn Street, Hampton" },
  { year: "2025", title: "Master Builders Excellence in Housing", project: "Wellington Street, Brighton" },
  { year: "2024", title: "Bayside Design Awards — Heritage", project: "Beach Street, Middle Park" },
  { year: "2023", title: "HIA Bathroom of the Year (finalist)", project: "Alma Road, Elsternwick" },
];

export const TIMELINE_EXAMPLE = {
  reference: "TS-2611",
  client: "Amelia & Josh Vance",
  suburb: "Sandringham",
  type: "Kitchen, laundry & rear opening",
  value: "$128,000 – $164,000",
  owner: "Jess Navarro",
  events: [
    {
      at: "07:12",
      minutesAfter: 0,
      kind: "received",
      label: "Enquiry received",
      detail: "Submitted from the cost planner on the website. Suburb and project type captured automatically.",
      actor: "Website",
      channel: "web",
    },
    {
      at: "07:12",
      minutesAfter: 1,
      kind: "auto",
      label: "Acknowledged by SMS + email",
      detail: "Reference TS-2611 issued. Expected reply time, studio address and what happens next sent in both channels.",
      actor: "Studio desk",
      channel: "sms",
    },
    {
      at: "07:16",
      minutesAfter: 4,
      kind: "human",
      label: "First human reply",
      detail: "Jess: \"Good morning Amelia — thanks for the detail on the load-bearing wall, that's the bit that changes the number. Two questions before I put a range in front of you…\"",
      actor: "Jess Navarro",
      channel: "whatsapp",
    },
    {
      at: "07:31",
      minutesAfter: 19,
      kind: "auto",
      label: "Qualification complete",
      detail: "Scope, access, timing and budget range confirmed. Graded HOT — 61/65. Routed to Priya Raman for the cost plan.",
      actor: "Studio desk",
      channel: "system",
    },
    {
      at: "08:44",
      minutesAfter: 92,
      kind: "auto",
      label: "Indicative range issued",
      detail: "Range $128k–$164k at 78% confidence, driven by 4.9m structural opening and occupied site. Comparables attached from two Sandringham projects.",
      actor: "Studio desk",
      channel: "email",
    },
    {
      at: "10:15",
      minutesAfter: 183,
      kind: "human",
      label: "Site visit booked by client",
      detail: "Thursday 12 March, 9:30am — 90 minutes. Confirmed automatically, calendar invite and reminder set for the evening before.",
      actor: "Amelia Vance",
      channel: "web",
    },
    {
      at: "18:00",
      minutesAfter: 648,
      kind: "auto",
      label: "Reminder + prep pack sent",
      detail: "What we'll look at together, what to have ready, and a 90-second video on how we measure a structural opening.",
      actor: "Studio desk",
      channel: "whatsapp",
    },
    {
      at: "+48h",
      minutesAfter: 2880,
      kind: "auto",
      label: "Follow-up scheduled",
      detail: "If the cost plan hasn't been opened by 10am, Jess makes a call. Nothing sits in a queue longer than two days.",
      actor: "Studio desk",
      channel: "system",
    },
  ],
};

export const DESK_PIPELINE = [
  { stage: "New enquiry", count: 3, sla: "4 min", colour: "clay" },
  { stage: "Qualifying", count: 5, sla: "19 min", colour: "sand" },
  { stage: "Cost plan in progress", count: 4, sla: "2 days", colour: "moss" },
  { stage: "Cost plan issued", count: 6, sla: "—" },
  { stage: "Site visit booked", count: 5, sla: "—" },
  { stage: "Contracted", count: 2, sla: "—" },
];

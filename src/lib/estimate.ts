export type ProjectKey =
  | "kitchen"
  | "bathroom"
  | "extension"
  | "fullhome"
  | "outdoor"
  | "restoration";

export type ProjectType = {
  key: ProjectKey;
  label: string;
  short: string;
  blurb: string;
  image: string;
  baseLow: number;
  baseHigh: number;
  leadWeeks: [number, number];
  sizes: { key: string; label: string; note: string; factor: number }[];
  drivers: { label: string; share: number; note: string }[];
  watch: string[];
};

export const PROJECT_TYPES: ProjectType[] = [
  {
    key: "kitchen",
    label: "Kitchen",
    short: "Joinery, stone, structure & services",
    blurb:
      "Full replacement kitchens, structural openings and the joinery that makes a plan work.",
    image:
      "https://images.pexels.com/photos/6908558/pexels-photo-6908558.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 62000,
    baseHigh: 94000,
    leadWeeks: [8, 14],
    sizes: [
      { key: "compact", label: "Galley or small U", note: "Under 14m², existing layout kept", factor: 0.74 },
      { key: "standard", label: "Family kitchen", note: "14–22m², island bench, one opening", factor: 1 },
      { key: "generous", label: "Open plan + island", note: "22–34m², wall removed, new services", factor: 1.34 },
      { key: "extensive", label: "Butler's pantry + dining", note: "34m²+, two openings, structural steel", factor: 1.72 },
    ],
    drivers: [
      { label: "Joinery & cabinetry", share: 30, note: "Built in our Gardenvale workshop" },
      { label: "Benchtops & splashback", share: 16, note: "Stone, timber or stainless" },
      { label: "Carpentry & structure", share: 15, note: "Openings, steel, framing" },
      { label: "Appliances", share: 13, note: "Supply or client-supplied" },
      { label: "Plumbing & electrical", share: 12, note: "Relocation, new circuits, lighting" },
      { label: "Flooring, paint & preliminaries", share: 14, note: "Protection, waste, supervision" },
    ],
    watch: [
      "Load-bearing walls change the number more than benchtop choice does",
      "Stone supply is the most common cause of a slipped handover",
      "Older switchboards usually need replacing to carry a modern kitchen",
    ],
  },
  {
    key: "bathroom",
    label: "Bathroom or ensuite",
    short: "Strip-out, waterproofing, wet-area rebuild",
    blurb:
      "Rebuilt from the stud. New membranes, new drainage, new substrate — never a patch-over.",
    image:
      "https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 34000,
    baseHigh: 52000,
    leadWeeks: [6, 11],
    sizes: [
      { key: "compact", label: "Powder room", note: "Under 4m², no laundry or bath", factor: 0.62 },
      { key: "standard", label: "Single bathroom", note: "5–8m², bath or shower, vanity", factor: 1 },
      { key: "generous", label: "Main bathroom + ensuite", note: "Two wet areas, shared trades", factor: 1.78 },
      { key: "extensive", label: "Whole-floor wet areas", note: "Bathroom, ensuite, laundry, WC", factor: 2.6 },
    ],
    drivers: [
      { label: "Tiling & waterproofing", share: 28, note: "AS 3740, 7-year membrane warranty" },
      { label: "Joinery & vanities", share: 20, note: "Custom, moisture-sealed substrate" },
      { label: "Plumbing & drainage", share: 20, note: "Relocation, linear drains, hot water" },
      { label: "Fixtures & fittings", share: 14, note: "Tapware, sanitary, glass" },
      { label: "Electrical, heating & ventilation", share: 10, note: "Underfloor heating, extraction" },
      { label: "Strip-out & preliminaries", share: 8, note: "Disposal, protection, access" },
    ],
    watch: [
      "Water damage found at strip-out is the single biggest variation driver",
      "Curbless showers need the floor joists looked at before tiling",
      "Bayside water pressure often needs a pressure-limiting valve",
    ],
  },
  {
    key: "extension",
    label: "Extension or addition",
    short: "Ground-floor rear, first-floor, alfresco",
    blurb:
      "Structural work that changes how the house sits on its site. Permits, engineering and build.",
    image:
      "https://images.pexels.com/photos/4692281/pexels-photo-4692281.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 210000,
    baseHigh: 330000,
    leadWeeks: [22, 38],
    sizes: [
      { key: "compact", label: "Alfresco or studio", note: "20–35m², single storey, no wet areas", factor: 0.48 },
      { key: "standard", label: "Rear living extension", note: "40–60m², open plan, one new wet area", factor: 1 },
      { key: "generous", label: "Kitchen + living + alfresco", note: "65–90m², two wet areas, landscaping", factor: 1.44 },
      { key: "extensive", label: "First-floor addition", note: "60–110m² upstairs, ground floor rebuilt", factor: 1.86 },
    ],
    drivers: [
      { label: "Structure & carpentry", share: 32, note: "Footings, framing, roof, cladding" },
      { label: "External envelope", share: 18, note: "Glazing, roofing, weatherproofing" },
      { label: "Internal finishes & joinery", share: 20, note: "Linings, floors, cabinetry" },
      { label: "Services", share: 12, note: "Power, plumbing, HVAC, stormwater" },
      { label: "Permits, engineering & surveys", share: 8, note: "Planning, building surveyor, soil report" },
      { label: "Site, landscape & preliminaries", share: 10, note: "Access, protection, reinstatement" },
    ],
    watch: [
      "Sewer and stormwater easements affect footings more than block size does",
      "The roof junction between old and new is where most water problems start",
      "Planning overlays in Bayside and Stonnington can add 6–10 weeks",
    ],
  },
  {
    key: "fullhome",
    label: "Whole-home renovation",
    short: "Every room, one contract, one crew",
    blurb:
      "Rewire, replumb, restore and rebuild the interior of a house worth keeping.",
    image:
      "https://images.pexels.com/photos/19050702/pexels-photo-19050702.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 240000,
    baseHigh: 480000,
    leadWeeks: [24, 42],
    sizes: [
      { key: "compact", label: "Front-of-house refresh", note: "4–6 rooms, layout unchanged", factor: 0.55 },
      { key: "standard", label: "Full interior renovation", note: "3–4 bed, new kitchen and bathroom", factor: 1 },
      { key: "generous", label: "Whole house + opening up", note: "4–5 bed, structural work, two wet areas", factor: 1.42 },
      { key: "extensive", label: "House + extension combined", note: "Full reconfiguration plus floor area", factor: 1.95 },
    ],
    drivers: [
      { label: "Carpentry, structure & linings", share: 30, note: "Framing, plaster, floors, doors" },
      { label: "Kitchen & bathroom packages", share: 22, note: "Joinery, tiling, fixtures" },
      { label: "Services upgrade", share: 16, note: "Rewire, replumb, switchboard, HVAC" },
      { label: "Joinery & built-ins", share: 12, note: "Robes, storage, wardrobes" },
      { label: "Windows, roof & envelope", share: 10, note: "Glazing, insulation, weatherproofing" },
      { label: "Paint, preliminaries & staging", share: 10, note: "Occupied-site protection, supervision" },
    ],
    watch: [
      "Decide the staging before the contract, not during week four",
      "One colour and hardware schedule saves more than any single trade decision",
      "Rewiring an occupied house means power off-windows you should plan around",
    ],
  },
  {
    key: "outdoor",
    label: "Outdoor living",
    short: "Decks, pergolas, alfresco kitchens",
    blurb:
      "Hardwood decks, steel and timber structures, alfresco kitchens and bayside-rated details.",
    image:
      "https://images.pexels.com/photos/7587879/pexels-photo-7587879.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 58000,
    baseHigh: 108000,
    leadWeeks: [8, 16],
    sizes: [
      { key: "compact", label: "Deck refresh", note: "Under 25m², existing structure", factor: 0.52 },
      { key: "standard", label: "Deck + shade structure", note: "30–50m² with pergola", factor: 1 },
      { key: "generous", label: "Alfresco room", note: "50–80m², kitchen, heating, lighting", factor: 1.4 },
      { key: "extensive", label: "Garden + pool surround", note: "80m²+, paving, retaining, drainage", factor: 1.85 },
    ],
    drivers: [
      { label: "Structure & decking", share: 38, note: "Class 1 hardwood, steel, footings" },
      { label: "Roofing & shading", share: 16, note: "Pergola, retractable, polycarbonate" },
      { label: "Alfresco services", share: 14, note: "Gas, power, water, drainage" },
      { label: "Kitchen, heating & lighting", share: 14, note: "BBQ, fridges, heaters, fans" },
      { label: "Paving & landscape", share: 10, note: "Retaining, levels, planting beds" },
      { label: "Preliminaries & corrosion rating", share: 8, note: "Bayside fixings, access, waste" },
    ],
    watch: [
      "Within 1km of the bay, fixing choice decides how long the deck lasts",
      "Northerly sun angles should drive the shade structure, not the furniture",
      "Falling levels to neighbours need retaining and drainage designed early",
    ],
  },
  {
    key: "restoration",
    label: "Restoration",
    short: "Period homes, heritage overlays",
    blurb:
      "Careful repair of what's worth keeping, and confident modern work where it earns its place.",
    image:
      "https://images.pexels.com/photos/29738857/pexels-photo-29738857.jpeg?auto=compress&cs=tinysrgb&w=1200",
    baseLow: 86000,
    baseHigh: 190000,
    leadWeeks: [16, 30],
    sizes: [
      { key: "compact", label: "Facade & verandah", note: "Front elevation, sash windows, render", factor: 0.42 },
      { key: "standard", label: "Whole front wing", note: "4–6 rooms, plaster, floors, joinery", factor: 1 },
      { key: "generous", label: "Full period home", note: "Every room, roof, chimneys, services", factor: 1.58 },
      { key: "extensive", label: "Restoration + contemporary insert", note: "Restoration plus a modern rear", factor: 2.1 },
    ],
    drivers: [
      { label: "Specialist trades", share: 34, note: "Plaster, lime, sash, cornice, chimney" },
      { label: "Timber repair & joinery", share: 20, note: "Board matching, barge boards, doors" },
      { label: "Roof, gutters & envelope", share: 14, note: "Slate, zinc, flashing, drainage" },
      { label: "Services upgrade (hidden)", share: 12, note: "Rewire, replumb, insulation" },
      { label: "Heritage consultant & permits", share: 8, note: "Documentation, council, overlays" },
      { label: "Paint & finishes", share: 12, note: "Scrape-back matched schemes" },
    ],
    watch: [
      "Overlays in Bayside, Stonnington and Port Phillip need documented justification",
      "Repairing sash windows is usually cheaper and better than replacement",
      "Lath and plaster hides more than any inspection can reveal — carry a contingency",
    ],
  },
];

export const FINISH_LEVELS = [
  {
    key: "refined",
    label: "Refined",
    factor: 0.88,
    line: "Clean, durable, quietly good",
    body: "Reliable mid-market finishes specified for longevity. Polytec or laminate joinery with timber-look doors, engineered stone or stainless benchtops, quality tapware, tile from the local yard.",
    examples: [
      "Semi-custom joinery, soft-close throughout",
      "Engineered stone benchtop, glass or ceramic splashback",
      "Meir, Phoenix or Caroma tapware",
      "Hybrid timber-look or ceramic flooring",
    ],
  },
  {
    key: "signature",
    label: "Signature",
    factor: 1.16,
    line: "The level most of our clients choose",
    body: "Fully custom joinery made in our workshop, natural stone or solid timber benchtops, designer tapware and lighting, and finishes selected with our interiors lead rather than from a catalogue.",
    examples: [
      "Custom joinery, 2-pac and veneer, integrated handles",
      "Natural stone benchtop, full-height stone splashback",
      "Astra Walker, Roger Seller or Brodware tapware",
      "European appliances, custom range hood, zoned lighting",
    ],
  },
  {
    key: "collector",
    label: "Collector",
    factor: 1.42,
    line: "Architectural, bespoke, one-off",
    body: "One-off detailing, imported stone, custom metalwork, architectural lighting and integrated systems. Designed with your architect or with our interiors lead leading the documentation.",
    examples: [
      "Bespoke joinery with metalwork and leather detailing",
      "Book-matched imported stone, solid brass or steel benchtops",
      "Architectural lighting design, DALI control, integrated audio",
      "Miele Gaggenau or V-ZUG appliance suite, wine storage",
    ],
  },
];

export type ConstraintKey = "access" | "structure" | "heritage" | "occupied";

export const CONSTRAINTS: {
  key: ConstraintKey;
  label: string;
  options: { key: string; label: string; factor: number; note: string }[];
}[] = [
  {
    key: "access",
    label: "Site access",
    options: [
      { key: "easy", label: "Open access, front or side", factor: 1, note: "Materials land easily, waste comes out easily" },
      { key: "tight", label: "Tight side or rear lane", factor: 1.06, note: "Hand-carry, smaller deliveries" },
      { key: "hard", label: "No vehicle access at all", factor: 1.14, note: "Crane or crate lifts, longer programme" },
    ],
  },
  {
    key: "structure",
    label: "Structural work",
    options: [
      { key: "none", label: "None — layout stays", factor: 1, note: "Services and finishes only" },
      { key: "some", label: "One wall or opening", factor: 1.08, note: "Lintel or small beam, engineer engaged" },
      { key: "major", label: "Significant structural work", factor: 1.19, note: "Steel, footings, roof modification" },
    ],
  },
  {
    key: "heritage",
    label: "Planning or heritage",
    options: [
      { key: "none", label: "No overlay", factor: 1, note: "Standard reporting to council" },
      { key: "overlay", label: "Heritage or design overlay", factor: 1.09, note: "Documentation, consultant, longer permit" },
      { key: "permit", label: "Full planning permit required", factor: 1.14, note: "Plans, advertising, possible VCAT" },
    ],
  },
  {
    key: "occupied",
    label: "Occupancy during works",
    options: [
      { key: "vacant", label: "House will be empty", factor: 1, note: "Fastest, cheapest, no daily setup" },
      { key: "occupied", label: "Living in the house", factor: 1.05, note: "Dust walls, daily protection, quiet hours" },
      { key: "partial", label: "Living in part of the house", factor: 1.03, note: "Sealed wing, temporary kitchen" },
    ],
  },
];

export type EstimateInput = {
  type?: ProjectKey;
  size?: string;
  finish?: string;
  access?: string;
  structure?: string;
  heritage?: string;
  occupied?: string;
  suburb?: string;
  timing?: string;
};

export type EstimateResult = {
  low: number;
  high: number;
  mid: number;
  confidence: number;
  leadWeeks: [number, number];
  type?: ProjectType;
  finish?: (typeof FINISH_LEVELS)[number];
  sizeLabel: string;
  drivers: { label: string; share: number; note: string }[];
  chosen: { label: string; option: string; note: string; impact: string }[];
  watch: string[];
  recommendations: { title: string; body: string; tag: string }[];
  comparables: { title: string; suburb: string; value: string; slug: string }[];
  summary: string;
  answered: number;
  totalQuestions: number;
};

export const CATEGORY_TO_TYPE: Record<string, ProjectKey> = {
  kitchens: "kitchen",
  bathrooms: "bathroom",
  extensions: "extension",
  fullhome: "fullhome",
  outdoor: "outdoor",
  restoration: "restoration",
};

const round = (n: number, step = 500) => Math.round(n / step) * step;
export const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : "$" + Math.round(n).toLocaleString("en-AU", { maximumFractionDigits: 0 });

export function projectType(key?: string): ProjectType | undefined {
  return PROJECT_TYPES.find((t) => t.key === key);
}

function recommendationsFor(
  type: ProjectType,
  finishKey: string,
  constraints: Record<string, string>,
): { title: string; body: string; tag: string }[] {
  const out: { title: string; body: string; tag: string }[] = [];
  if (type.key === "kitchen") {
    out.push({
      tag: "Recommended",
      title: "Structural opening first, joinery second",
      body: "Clients who commit to the wall removal before selecting benchtops spend 11% less overall, because the services run once instead of twice.",
    });
    out.push({
      tag: "Often paired",
      title: "Butler's pantry or hidden laundry",
      body: "Adds roughly $18k–$34k but removes the visual clutter that makes open-plan kitchens look smaller than they are.",
    });
  }
  if (type.key === "bathroom") {
    out.push({
      tag: "Recommended",
      title: "Rebuild both wet areas in one programme",
      body: "A second bathroom in the same visit costs about 62% of what it would cost alone, because the tiler and plumber are already on site.",
    });
    out.push({
      tag: "Worth knowing",
      title: "Underfloor heating is cheap now, expensive later",
      body: "Adding electric underfloor heating during a rebuild is $2,400–$3,900. Retrofitting it is not possible without a full strip-out.",
    });
  }
  if (type.key === "extension") {
    out.push({
      tag: "Recommended",
      title: "Landscape and reinstatement inside the contract",
      body: "Excluding it from the build contract is the most common way an extension finishes 9% over budget. We include it by default.",
    });
    out.push({
      tag: "Often paired",
      title: "Alfresco services rough-in",
      body: "Gas, water, power and drainage capped and left ready. $4,800–$9,200 now, roughly triple if you open the slab in three years.",
    });
  }
  if (type.key === "fullhome") {
    out.push({
      tag: "Recommended",
      title: "One schedule of finishes for the whole house",
      body: "A single hardware, paint and flooring schedule typically saves $14k–$28k across a whole-home renovation through bulk and consistency.",
    });
  }
  if (type.key === "outdoor") {
    out.push({
      tag: "Bayside note",
      title: "Class 1 durability timber and 316 stainless",
      body: "Within a kilometre of the bay this is not an upgrade, it is the difference between a 6-year deck and a 25-year deck.",
    });
  }
  if (type.key === "restoration") {
    out.push({
      tag: "Recommended",
      title: "Contingency of 12–15%, stated openly",
      body: "Period buildings reveal their history at strip-out. We'd rather name the number than pretend it isn't there.",
    });
  }
  if (finishKey === "collector") {
    out.push({
      tag: "Design lead",
      title: "Bring your architect in early, or use ours",
      body: "At this level the documentation decides the outcome. We'll work to your drawings or lead design with our draftsman and engineer.",
    });
  }
  if (constraints.occupied === "occupied") {
    out.push({
      tag: "Living in",
      title: "Temporary kitchen and dust programme",
      body: "We build a sealed route from your front door to the work zone, protect floors daily and allow quiet hours. Add roughly 5% to the programme.",
    });
  }
  if (constraints.heritage && constraints.heritage !== "none") {
    out.push({
      tag: "Approvals",
      title: "Heritage consultant engaged at the start",
      body: "We work with consultants the Bayside, Stonnington and Port Phillip planners already know, which shortens the permit by weeks.",
    });
  }
  return out.slice(0, 3);
}

export function computeEstimate(input: EstimateInput): EstimateResult {
  const type = projectType(input.type);
  const finish =
    FINISH_LEVELS.find((f) => f.key === input.finish) ?? FINISH_LEVELS[1];

  const constraints: Record<string, string> = {};
  let combined = 1;
  const chosen: EstimateResult["chosen"] = [];

  for (const group of CONSTRAINTS) {
    const picked =
      group.options.find((o) => o.key === input[group.key]) ?? group.options[0];
    constraints[group.key] = picked.key;
    combined *= picked.factor;
    chosen.push({
      label: group.label,
      option: picked.label,
      note: picked.note,
      impact:
        picked.factor === 1 ? "No cost impact" : `+${Math.round((picked.factor - 1) * 100)}%`,
    });
  }

  let low = 0;
  let high = 0;
  let sizeLabel = "Not yet selected";
  let leadWeeks: [number, number] = [type ? type.leadWeeks[0] : 6, type ? type.leadWeeks[1] : 10];

  if (type) {
    const size =
      type.sizes.find((s) => s.key === input.size) ?? type.sizes[1];
    sizeLabel = size.label;
    low = type.baseLow * size.factor * finish.factor * combined;
    high = type.baseHigh * size.factor * finish.factor * combined;
    const sizeStretch = size.factor > 1.3 ? 1.18 : 1;
    leadWeeks = [
      Math.round(type.leadWeeks[0] * sizeStretch),
      Math.round(type.leadWeeks[1] * sizeStretch),
    ];
  }

  const answered = [
    input.type,
    input.size,
    input.finish,
    input.access,
    input.structure,
    input.heritage,
    input.occupied,
    input.suburb,
    input.timing,
  ].filter(Boolean).length;

  let confidence = 44 + answered * 6;
  if (input.suburb && SUBURB_BOOST.includes(input.suburb)) confidence += 4;
  confidence = Math.min(94, confidence);

  const summary = type
    ? `A ${sizeLabel.toLowerCase()} ${type.label.toLowerCase()} at ${finish.label.toLowerCase()} finish, ${constraints.access === "easy" ? "with open access" : "with " + (constraints.access === "tight" ? "tight" : "no vehicle") + " access"}, typically lands between ${money(low)} and ${money(high)} in our service area. That range is built from our last 24 completed projects of the same type, adjusted for the site factors you've told us about.`
    : "Pick the kind of work you're considering and we'll put a realistic range in front of you in a few seconds.";

  return {
    low: round(low, 1000),
    high: round(high, 1000),
    mid: round((low + high) / 2, 1000),
    confidence: Math.max(0, confidence),
    leadWeeks,
    type,
    finish,
    sizeLabel,
    drivers: type ? type.drivers : [],
    chosen,
    watch: type ? type.watch : [],
    recommendations: type
      ? recommendationsFor(type, finish.key, constraints)
      : [],
    comparables: [],
    summary,
    answered,
    totalQuestions: 9,
  };
}

const SUBURB_BOOST = [
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
  "Balaclava",
];

export function inServiceArea(suburb?: string) {
  if (!suburb) return null;
  const s = suburb.trim().toLowerCase();
  return SUBURB_BOOST.some((b) => b.toLowerCase() === s);
}

export function leadScore(input: {
  type?: string;
  suburb?: string;
  timing?: string;
  budgetBand?: string;
  phone?: string;
  email?: string;
  message?: string;
  hasEstimate?: boolean;
}) {
  let score = 12;
  if (input.type) score += 14;
  if (input.suburb) score += inServiceArea(input.suburb) ? 14 : 4;
  if (input.timing) score += input.timing === "asap" ? 20 : input.timing === "3-6" ? 12 : 5;
  if (input.budgetBand) score += 12;
  if (input.phone) score += 12;
  if (input.email) score += 8;
  if (input.hasEstimate) score += 10;
  const words = (input.message ?? "").trim().split(/\s+/).filter(Boolean).length;
  score += Math.min(8, Math.round(words / 12));
  score = Math.min(98, score);
  const grade = score >= 62 ? "hot" : score >= 40 ? "warm" : "nurture";
  return { score, grade };
}

export function estimateTitle(input: EstimateInput) {
  const t = projectType(input.type);
  return t ? `${t.label} — ${input.suburb ?? "our area"}` : "Cost plan";
}

export function quoteReference() {
  const n = Math.floor(1000 + Math.random() * 8999);
  return `TS-${n}`;
}
export function enquiryReference() {
  const n = Math.floor(1000 + Math.random() * 8999);
  return `EN-${n}`;
}

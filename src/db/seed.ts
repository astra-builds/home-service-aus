import { sql } from "drizzle-orm";
import { db } from "@/db";
import { commsLog, enquiryEvents, enquiries, projects } from "@/db/schema";
import { px } from "@/lib/site";

type SeedProject = typeof projects.$inferInsert;

export const PROJECT_SEED: SeedProject[] = [
  {
    slug: "roslyn-street-hampton",
    title: "Roslyn Street, Hampton",
    suburb: "Hampton",
    category: "kitchens",
    year: 2025,
    durationWeeks: 11,
    budgetBand: "$128k – $164k",
    investment: "$151,000",
    blurb:
      "A 1968 brick home with a kitchen that had been patched four times. We took the wall out, moved the services once, and built the joinery in our own workshop.",
    brief:
      "Ellie and Tom had drawn up a wish list on the back of a school note: an island you could sit at, somewhere for the dog, a laundry that wasn't in the hallway, and no more of the 1970s corridor that separated the kitchen from where the family actually lived. The house had good bones and terrible circulation, plus a load-bearing brick wall that four previous owners had been politely working around.",
    approach:
      "We ran the structural opening first and made the joinery decisions second, so the services were routed once and only once. A 4.9 metre steel beam replaced the wall; the hot water, gas and power all relocated to the same wall cavity. Joinery was documented by Cait and built in Gardenvale so the stone templates came off the actual cabinets rather than a drawing. The laundry moved into the old kitchen footprint with a stacked pair and a hidden dog wash in the base.",
    outcome:
      "Eleven weeks on site, occupied throughout, with a variation total of 2.1% of contract value. The kitchen came in under the cost plan because the client chose to keep the existing oven wall rather than relocate it. Weekly Thursday photo reports went out at 4:15pm without a single client chasing.",
    heroImage: px(6908558, 1800),
    gallery: [px(19955741, 1400), px(5502219, 1400), px(32471853, 1400), px(7851865, 1400)],
    specs: [
      { label: "Built", value: "2025" },
      { label: "Duration", value: "11 weeks on site" },
      { label: "Investment", value: "$151,000" },
      { label: "Variations", value: "2.1% of contract" },
      { label: "Structure", value: "4.9m steel beam" },
      { label: "Joinery", value: "Built in-house, Gardenvale" },
    ],
    features: [
      "Load-bearing wall removed and replaced with a 4.9m steel beam",
      "Services rerouted once, inside the new wall cavity",
      "Full-height stone splashback with a shadow-gap reveal",
      "Hidden laundry with stacked appliances and dog wash",
      "Zoned lighting on DALI control with three scenes",
      "Existing oven wall retained, saving $9,400",
    ],
    materials: [
      "Joinery: 2-pac cabinetry, blackbutt veneer island",
      "Benchtops: 20mm Calacatta Nuvo with mitred edge",
      "Flooring: existing Tasmanian oak, repaired and refinished",
      "Tapware: Astra Walker Icon, brushed brass",
      "Splashback: full-height stone, no upstand",
      "Lighting: Inlite track + surface-mounted pendants",
    ],
    clientName: "Eleanor & Tom Whitfield",
    quote:
      "We'd been quoted by five builders and every number was different. Tallow & Stone were the only ones who sat us down and showed us what the cheap number was leaving out.",
    sortOrder: 1,
  },
  {
    slug: "wellington-street-brighton",
    title: "Wellington Street, Brighton",
    suburb: "Brighton",
    category: "extensions",
    year: 2025,
    durationWeeks: 26,
    budgetBand: "$280k – $340k",
    investment: "$312,000",
    blurb:
      "A rear extension that turned a dark north-facing kitchen into a 62m² living, dining and alfresco room — built around an existing lemon tree nobody would let us remove.",
    brief:
      "A double-fronted Victorian on a 612m² block with a 1990s rear kitchen tacked on badly. The clients wanted a genuine open-plan rear zone and an alfresco that wasn't a separate building. Constraints: a sewer easement down the eastern boundary, a protected lemon tree, and two children under four living in the house for the entire build.",
    approach:
      "The easement pushed footings to piers rather than a raft slab, which we flagged at the site visit before anyone paid for engineering. The lemon tree became the organising idea: the alfresco wraps it, and the pergola sits on a line that keeps summer shade off the glass. We built a sealed dust corridor from the front door to the bedrooms so the family could live in the front half for six months, and the site was swept and photographed every Friday.",
    outcome:
      "Twenty-six weeks, two weeks inside programme. Neighbour advertising ran without objection after a 20-minute conversation we initiated before the permit went in. The landscape and reinstatement was inside the contract, which is the single biggest reason extensions finish over budget — and this one finished 1.4% over.",
    heroImage: px(4692281, 1800),
    gallery: [px(7587879, 1400), px(7587884, 1400), px(33287942, 1400), px(11731740, 1400)],
    specs: [
      { label: "Built", value: "2025" },
      { label: "Duration", value: "26 weeks on site" },
      { label: "Investment", value: "$312,000" },
      { label: "Floor area", value: "62m² + 28m² alfresco" },
      { label: "Permits", value: "Planning + building permit" },
      { label: "Variations", value: "1.4% of contract" },
    ],
    features: [
      "Pier footings designed around a sewer easement",
      "Alfresco wrapped around a protected lemon tree",
      "North-facing glazing with a deep eave for summer shade",
      "Sealed dust corridor for an occupied build",
      "Landscape and reinstatement inside the contract",
      "Pre-permit neighbour conversation, zero objections",
    ],
    materials: [
      "Structure: concrete piers, timber frame, steel lintels",
      "Cladding: painted weatherboard matched to existing profile",
      "Glazing: thermally broken aluminium, low-E, double glazed",
      "Flooring: 240mm engineered oak, plank-matched",
      "Alfresco: spotted gum decking, 316 stainless fixings",
      "Roof: Colorbond trimdeck with a custom box gutter",
    ],
    clientName: "Daniel Okafor",
    quote:
      "Lived in the house the whole time with two kids. Dust walls went up properly, the crew swept every Friday, and we got a photo report every Thursday afternoon without ever chasing it.",
    sortOrder: 2,
  },
  {
    slug: "beach-street-middle-park",
    title: "Beach Street, Middle Park",
    suburb: "Middle Park",
    category: "restoration",
    year: 2024,
    durationWeeks: 21,
    budgetBand: "$175k – $215k",
    investment: "$196,000",
    blurb:
      "An 1889 Victorian in a Heritage Overlay 3, restored over 21 weeks — including a verandah detail recovered from a 1908 photograph.",
    brief:
      "A terrace house with a verandah that had been reconstructed badly in the 1970s, lath and plaster ceilings failing in three rooms, and a Heritage Overlay that meant every visible change needed justification. The clients wanted the house to look like itself again without making it a museum.",
    approach:
      "We engaged the heritage consultant before the drawings were finished rather than after, which saved six weeks. Paint scrape-backs identified the original scheme; the verandah fretwork was redrawn from a State Library photograph and milled to match. Lath and plaster was repaired rather than replaced wherever the substrate held, and the sash windows were overhauled with new cords and weights instead of replaced.",
    outcome:
      "Twenty-one weeks. The Bayside Design Awards heritage citation described the verandah detail as 'better than what was there in 1908'. Roughly 40% of the original plaster was retained, which is far higher than the sector norm, and the client's contingency came back unspent.",
    heroImage: px(29738857, 1800),
    gallery: [px(8143715, 1400), px(19050702, 1400), px(3334699, 1400), px(15093231, 1400)],
    specs: [
      { label: "Built", value: "2024" },
      { label: "Duration", value: "21 weeks on site" },
      { label: "Investment", value: "$196,000" },
      { label: "Overlay", value: "Heritage Overlay 3" },
      { label: "Plaster retained", value: "40% of original" },
      { label: "Award", value: "Bayside Design Awards — Heritage" },
    ],
    features: [
      "Verandah fretwork redrawn from a 1908 photograph",
      "Lath and plaster repaired rather than replaced",
      "Eleven double-hung sash windows overhauled",
      "Paint scrape-back to recover the original scheme",
      "Chimneys rebuilt with lime mortar",
      "Heritage consultant engaged before drawings finished",
    ],
    materials: [
      "Render: traditional lime mortar, no cement",
      "Timber: western red cedar milled to match profiles",
      "Windows: existing sashes, new cords and weights",
      "Roof: original slate, repaired and re-flashed",
      "Joinery: recycled rimu and baltic pine patching",
      "Paint: mineral silicate, colour-matched to scrapes",
    ],
    clientName: "Marguerite Lewis",
    quote:
      "It's a heritage overlay and the council was difficult. Tom handled the whole thing, including the neighbour who objected to everything. The verandah detail they recovered is better than what was there in 1908.",
    sortOrder: 3,
  },
  {
    slug: "alma-road-elsternwick",
    title: "Alma Road, Elsternwick",
    suburb: "Elsternwick",
    category: "bathrooms",
    year: 2026,
    durationWeeks: 7,
    budgetBand: "$82k – $104k",
    investment: "$94,000",
    blurb:
      "Two wet areas rebuilt in one seven-week programme — because the tiler and plumber were already on site, the second bathroom cost 62% of what it would have alone.",
    brief:
      "A 1930s California bungalow with a main bathroom and an ensuite that had both been re-tiled over failed membranes. Water was tracking into the hallway skirting. The clients had budgeted for one bathroom and were going to do the second the following year.",
    approach:
      "We showed them the numbers: doing both at once saved $28,400 and six weeks of separate mobilisation. Both rooms were stripped to stud, joists checked and sistered under the curbless shower, and new membranes installed with independent inspection at each stage. A pressure-limiting valve was added after we measured 720kPa at the tap — bayside mains pressure is often the reason new tapware fails early.",
    outcome:
      "Seven weeks, one week ahead of programme. The client's WhatsApp thread with our studio desk is one of our favourites: she got her cost range before she finished her second coffee. Variations were zero.",
    heroImage: px(7195883, 1800),
    gallery: [px(6580405, 1400), px(10827349, 1400), px(35618223, 1400), px(7546284, 1400)],
    specs: [
      { label: "Built", value: "2026" },
      { label: "Duration", value: "7 weeks on site" },
      { label: "Investment", value: "$94,000" },
      { label: "Wet areas", value: "Bathroom + ensuite" },
      { label: "Variations", value: "Zero" },
      { label: "Waterproofing", value: "AS 3740, 7-year warranty" },
    ],
    features: [
      "Both wet areas stripped and rebuilt in one programme",
      "Floor joists sistered under a curbless shower",
      "Membrane inspections at every stage, photographed",
      "Pressure-limiting valve installed after 720kPa reading",
      "Electric underfloor heating added during rebuild",
      "Zero variations across the entire contract",
    ],
    materials: [
      "Tiling: 600×1200 porcelain, full-height, epoxy grout",
      "Vanity: custom oak with moisture-sealed substrate",
      "Benchtop: porcelain slab with integrated basin",
      "Tapware: Brodware Yokato, brushed nickel",
      "Sanitary: Toto wall-faced pan, in-wall cistern",
      "Heating: electric underfloor, 180W/m²",
    ],
    clientName: "Priya & Arun Sunder",
    quote:
      "The studio desk sent a WhatsApp with our cost range before we'd even finished the second coffee. Felt like dealing with a big practice without losing the person who actually builds it.",
    sortOrder: 4,
  },
  {
    slug: "harbour-street-black-rock",
    title: "Harbour Street, Black Rock",
    suburb: "Black Rock",
    category: "outdoor",
    year: 2025,
    durationWeeks: 9,
    budgetBand: "$74k – $96k",
    investment: "$86,000",
    blurb:
      "420 metres from the bay. Class 1 timber, 316 stainless everywhere, and a shade structure driven by the sun's angle in April rather than January.",
    brief:
      "A north-west facing backyard with no shade, a deck that had rotted through in nine years, and owners who use the garden from October to April. The brief was blunt: build something that will still be standing in 25 years.",
    approach:
      "We plotted the sun's altitude across the year and set the pergola blade angle to block January's sun while letting April's warmth through. Decking is spotted gum with hidden 316 stainless clips; the sub-frame is galvanised steel with isolating washers so the timber and steel never touch. Everything is Detailed for salt wind: no exposed fasteners, no horizontal surfaces that hold water.",
    outcome:
      "Nine weeks, finished in October before the first weekend of real weather. The previous deck lasted nine years; we're comfortable warranting the structure for fifteen. Two neighbours on the street have since booked site visits.",
    heroImage: px(7587884, 1800),
    gallery: [px(13871249, 1400), px(16607042, 1400), px(28235893, 1400), px(33287942, 1400)],
    specs: [
      { label: "Built", value: "2025" },
      { label: "Duration", value: "9 weeks on site" },
      { label: "Investment", value: "$86,000" },
      { label: "Deck area", value: "48m² + 22m² covered" },
      { label: "Timber", value: "Class 1 spotted gum" },
      { label: "Distance to bay", value: "420 metres" },
    ],
    features: [
      "Pergola blade angle set from the April sun altitude",
      "316 stainless hidden clips, no exposed fasteners",
      "Galvanised sub-frame with isolating washers",
      "Alfresco kitchen rough-in capped for a future stage",
      "Retaining and drainage resolved before levels set",
      "Two neighbours on the same street have since booked",
    ],
    materials: [
      "Decking: Class 1 spotted gum, 140×19 hidden fix",
      "Structure: galvanised steel, powdercoated",
      "Bench: recycled ironbark, 200mm thick",
      "Cladding: painted fibre cement, marine-rated",
      "Lighting: low-voltage garden LEDs, 3000K",
      "Heating: electric radiant panels on a timer",
    ],
    clientName: "Helen & Martin Driscoll",
    quote:
      "They talked us out of a bigger deck and into a better one. Nobody else mentioned how the sun moves in April. It's the detail that makes us use the garden every week.",
    sortOrder: 5,
  },
  {
    slug: "mayfield-avenue-malvern",
    title: "Mayfield Avenue, Malvern",
    suburb: "Malvern",
    category: "fullhome",
    year: 2025,
    durationWeeks: 31,
    budgetBand: "$420k – $520k",
    investment: "$486,000",
    blurb:
      "A five-bedroom house rebuilt room by room under one contract, one crew and one schedule of finishes — with a rewire that meant planning power-off windows around school pickup.",
    brief:
      "A 1970s brick house with original wiring, original plumbing, a kitchen that had never worked and six rooms that had been decorated six different times. The clients wanted one coherent house and needed to live in it for the whole build with three teenagers.",
    approach:
      "One schedule of finishes was written before construction began — a single hardware, paint and flooring specification across every room. That single decision saved $22,000 in bulk and removed six separate trade decisions. The rewire was staged into school-hours windows with a generator for the periods the mains were off. The house was divided into a sealed front wing for living and a rear work zone.",
    outcome:
      "Thirty-one weeks. Twelve months after handover we returned unannounced with our own punch list — a dropped door and a re-caulked shower — and closed it in a week. Variations ran at 3.4%, entirely client-initiated.",
    heroImage: px(18108651, 1800),
    gallery: [px(19050702, 1400), px(39529309, 1400), px(26546549, 1400), px(10243880, 1400)],
    specs: [
      { label: "Built", value: "2025" },
      { label: "Duration", value: "31 weeks on site" },
      { label: "Investment", value: "$486,000" },
      { label: "Rooms", value: "9 rooms + kitchen + 2 baths" },
      { label: "Services", value: "Full rewire and replumb" },
      { label: "Variations", value: "3.4% of contract" },
    ],
    features: [
      "One schedule of finishes across all nine rooms",
      "Full rewire staged around school hours",
      "Sealed front wing so the family lived on site",
      "Original brick shell retained and repaired",
      "Switchboard replaced with a safety switch upgrade",
      "12-month care visit with our own punch list",
    ],
    materials: [
      "Flooring: European oak throughout, 220mm plank",
      "Joinery: custom wardrobe and robe systems",
      "Kitchen: matte 2-pac, brass hardware, stone bench",
      "Bathrooms: zellige tiles, in-wall cisterns",
      "Paint: low-VOC, single warm-white scheme",
      "Hardware: unlacquered brass, aged in place",
    ],
    clientName: "Con Karamalikis",
    quote:
      "Twelve months after handover they turned up unannounced with a punch list of their own. Fixed a door that had dropped and re-caulked the shower. Nobody does that.",
    sortOrder: 6,
  },
  {
    slug: "north-road-ormond",
    title: "North Road, Ormond",
    suburb: "Ormond",
    category: "extensions",
    year: 2024,
    durationWeeks: 24,
    budgetBand: "$480k – $560k",
    investment: "$528,000",
    blurb:
      "A first-floor addition on a narrow block. We told the clients at the site visit that their budget and their plan didn't agree, then showed them how to get 80% of the plan for 60% of the money.",
    brief:
      "A 9.6-metre-wide block with a growing family and nowhere to go but up. The initial drawings had a full second storey with four bedrooms, two bathrooms and a void stair. Budget and drawings were about $180,000 apart when we arrived.",
    approach:
      "Rather than value-engineer at week twelve, we reworked the plan at the site visit: three bedrooms instead of four, one bathroom instead of two, the void stair replaced with a straight run that recovered 8m² of floor, and the study moved into the existing roof space. The upper floor became lighter and simpler, and the money went into the two rooms that matter — the main bedroom and the bathroom.",
    outcome:
      "Twenty-four weeks. The clients kept $180,000 in their pocket, got a house that works for four more years than they'd planned, and spent the difference on the landscape and the joinery. It's the project we show people who think a builder's job is to say yes to everything.",
    heroImage: px(11731740, 1800),
    gallery: [px(4626277, 1400), px(7587467, 1400), px(14257340, 1400), px(28885519, 1400)],
    specs: [
      { label: "Built", value: "2024" },
      { label: "Duration", value: "24 weeks on site" },
      { label: "Investment", value: "$528,000" },
      { label: "Floor area", value: "86m² first floor" },
      { label: "Block width", value: "9.6 metres" },
      { label: "Saved at briefing", value: "$180,000" },
    ],
    features: [
      "Plan reworked at site visit, not value-engineered later",
      "Three bedrooms instead of four, one bathroom instead of two",
      "Void stair replaced with a straight run, 8m² recovered",
      "Study built into the existing roof space",
      "Budget redirected to main bedroom and bathroom",
      "Narrow-block access managed with a crate lift",
    ],
    materials: [
      "Structure: timber frame on new steel beams",
      "Cladding: vertical shiplap, painted",
      "Glazing: double-glazed, thermally broken frames",
      "Stair: spotted gum tread, steel stringer",
      "Roof: low-profile metal deck, concealed gutter",
      "Flooring: oak to upper level, carpet to bedrooms",
    ],
    clientName: "Sally Anagnostou",
    quote:
      "They told us at the site visit that our budget and our plan didn't agree, and showed us how to get 80% of what we wanted for 60% of the money. Honest to a fault.",
    sortOrder: 7,
  },
];

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const existing = await db.execute<{ count: string }>(
    sql`select count(*)::text as count from projects`,
  );
  const rows = (existing as unknown as { rows?: { count: string }[] }).rows ?? [];
  const count = Number(rows[0]?.count ?? "0");
  if (count > 0) return;
  await db.insert(projects).values(PROJECT_SEED).onConflictDoNothing();

  const enquiryCount = await db.execute<{ count: string }>(
    sql`select count(*)::text as count from enquiries`,
  );
  const eq = (enquiryCount as unknown as { rows?: { count: string }[] }).rows ?? [];
  if (Number(eq[0]?.count ?? "0") > 0) return;

  const hoursAgo = (h: number) => new Date(Date.now() - h * 3600 * 1000);
  const demo: { enq: typeof enquiries.$inferInsert; ev: { kind: string; label: string; detail: string; actor: string; channel: string; minutesAfter: number }[] }[] = [
    {
      enq: {
        reference: "EN-2841",
        name: "Amelia Vance",
        email: "amelia.vance@example.com",
        phone: "0412 884 610",
        suburb: "Sandringham",
        projectType: "kitchen",
        scope: "Open plan + island",
        budgetBand: "$128k – $164k",
        timing: "asap",
        message: "Want to remove the wall between the kitchen and dining. Two kids, would stay living here.",
        source: "cost planner",
        score: 86,
        grade: "hot",
        estimateLow: 132000,
        estimateHigh: 168000,
        confidence: 78,
        quoteRef: "CP-4402",
        status: "planning",
        stage: "Cost plan in progress",
        owner: "Priya Raman",
        createdAt: hoursAgo(3),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Cost planner · Sandringham", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Acknowledged by SMS + email", detail: "Reference EN-2841 issued.", actor: "Studio desk", channel: "sms", minutesAfter: 1 },
        { kind: "human", label: "First human reply", detail: "Jess asked about the wall: load-bearing or partition?", actor: "Jess Navarro", channel: "whatsapp", minutesAfter: 4 },
        { kind: "auto", label: "Qualification scored", detail: "HOT at 86/100, routed to Priya Raman.", actor: "Studio desk", channel: "system", minutesAfter: 19 },
        { kind: "auto", label: "Indicative range issued", detail: "$132k–$168k at 78% confidence.", actor: "Studio desk", channel: "email", minutesAfter: 92 },
      ],
    },
    {
      enq: {
        reference: "EN-2838",
        name: "Dean & Marcus Iliopoulos",
        email: "d.iliopoulos@example.com",
        phone: "0438 220 199",
        suburb: "Brighton",
        projectType: "extension",
        scope: "Kitchen + living + alfresco",
        budgetBand: "$300k – $360k",
        timing: "3-6",
        message: "Rear extension, want an alfresco that wraps around the existing deck.",
        source: "work page",
        score: 74,
        grade: "hot",
        estimateLow: 302000,
        estimateHigh: 352000,
        confidence: 72,
        quoteRef: "CP-4398",
        status: "issued",
        stage: "Cost plan issued",
        owner: "Priya Raman",
        createdAt: hoursAgo(31),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Work page · Brighton", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Acknowledged by SMS + email", detail: "Reference EN-2838 issued.", actor: "Studio desk", channel: "sms", minutesAfter: 1 },
        { kind: "human", label: "First human reply", detail: "Jess flagged the sewer easement question straight away.", actor: "Jess Navarro", channel: "whatsapp", minutesAfter: 6 },
        { kind: "auto", label: "Cost plan issued", detail: "Three options, priced with quantities.", actor: "Priya Raman", channel: "email", minutesAfter: 1440 },
      ],
    },
    {
      enq: {
        reference: "EN-2835",
        name: "Fiona Harkin",
        email: "fiona.harkin@example.com",
        phone: "",
        suburb: "Elwood",
        projectType: "bathroom",
        scope: "Main bathroom + ensuite",
        budgetBand: "$88k – $106k",
        timing: "3-6",
        message: "Both bathrooms leak into the hallway. Had a quote for $54k that felt too good.",
        source: "cost planner",
        score: 61,
        grade: "hot",
        estimateLow: 91000,
        estimateHigh: 108000,
        confidence: 74,
        quoteRef: "CP-4391",
        status: "booked",
        stage: "Site visit booked",
        owner: "Jess Navarro",
        createdAt: hoursAgo(52),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Cost planner · Elwood", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Qualification scored", detail: "HOT at 61/100.", actor: "Studio desk", channel: "system", minutesAfter: 3 },
        { kind: "human", label: "Site visit booked", detail: "Thursday 9:30am — held automatically for 24 hours.", actor: "Fiona Harkin", channel: "web", minutesAfter: 188 },
      ],
    },
    {
      enq: {
        reference: "EN-2831",
        name: "Peter Ntalianis",
        email: "p.ntalianis@example.com",
        phone: "0466 901 442",
        suburb: "Kew",
        projectType: "restoration",
        scope: "Whole front wing",
        budgetBand: "$170k – $220k",
        timing: "idea",
        message: "1880s verandah is failing. Heritage overlay. Just want to understand the number.",
        source: "chat",
        score: 48,
        grade: "warm",
        estimateLow: 176000,
        estimateHigh: 214000,
        confidence: 62,
        status: "qualifying",
        stage: "Qualifying",
        owner: "Jess Navarro",
        createdAt: hoursAgo(9),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Studio desk chat · Kew", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Qualification scored", detail: "WARM at 48/100 — early idea stage, nurture sequence set.", actor: "Studio desk", channel: "system", minutesAfter: 3 },
        { kind: "human", label: "First human reply", detail: "Jess sent two comparable heritage projects with real costs.", actor: "Jess Navarro", channel: "whatsapp", minutesAfter: 7 },
      ],
    },
    {
      enq: {
        reference: "EN-2829",
        name: "Sarah Whitlock",
        email: "sarah.whitlock@example.com",
        suburb: "Camberwell",
        projectType: "outdoor",
        scope: "Deck + shade structure",
        budgetBand: "$64k – $92k",
        timing: "idea",
        message: "Deck rotted through after nine years. Two neighbours have used you.",
        source: "referral",
        score: 44,
        grade: "warm",
        estimateLow: 68000,
        estimateHigh: 96000,
        confidence: 64,
        status: "new",
        stage: "New enquiry",
        owner: "Jess Navarro",
        createdAt: hoursAgo(1),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Referral from Harbour Street client", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Acknowledged by SMS + email", detail: "Reference EN-2829 issued.", actor: "Studio desk", channel: "sms", minutesAfter: 1 },
      ],
    },
    {
      enq: {
        reference: "EN-2822",
        name: "Jamil Rahman",
        email: "jamil.rahman@example.com",
        phone: "0411 772 633",
        suburb: "Malvern",
        projectType: "fullhome",
        scope: "Whole house + opening up",
        budgetBand: "$440k – $520k",
        timing: "asap",
        message: "Five bedrooms, original wiring, three teenagers. Contracted and scheduled.",
        source: "cost planner",
        score: 94,
        grade: "hot",
        estimateLow: 448000,
        estimateHigh: 524000,
        confidence: 81,
        quoteRef: "CP-4377",
        status: "contracted",
        stage: "Contracted",
        owner: "Priya Raman",
        createdAt: hoursAgo(240),
      },
      ev: [
        { kind: "received", label: "Enquiry received", detail: "Cost planner · Malvern", actor: "Website", channel: "web", minutesAfter: 0 },
        { kind: "auto", label: "Indicative range issued", detail: "$448k–$524k at 81% confidence.", actor: "Studio desk", channel: "email", minutesAfter: 78 },
        { kind: "human", label: "Contract signed", detail: "One schedule of finishes locked before construction.", actor: "Priya Raman", channel: "email", minutesAfter: 5760 },
      ],
    },
  ];

  for (const d of demo) {
    const [row] = await db.insert(enquiries).values(d.enq).returning();
    await db.insert(enquiryEvents).values(
      d.ev.map((e) => ({
        enquiryId: row.id,
        kind: e.kind,
        label: e.label,
        detail: e.detail,
        actor: e.actor,
        channel: e.channel,
        minutesAfter: e.minutesAfter,
        createdAt: new Date(row.createdAt.getTime() + e.minutesAfter * 60000),
      })),
    );
  }

  await db.insert(commsLog).values([
    {
      reference: "EN-2841",
      channel: "whatsapp",
      subject: "Cost plan sent",
      body: "Hi Amelia — Jess here. Your range is $132k–$168k at 78% confidence. Two things would move it: whether the wall is load-bearing, and whether you want the laundry in it.",
    },
    {
      reference: "EN-2838",
      channel: "email",
      subject: "Cost plan — three options",
      body: "Three ways to run this: keep the deck and extend north, rebuild the deck with the extension, or phase the alfresco to next year. Quantities and unit rates on every line.",
    },
    {
      reference: "EN-2835",
      channel: "sms",
      subject: "Site visit reminder",
      body: "Thursday 9:30am with Dean. Prep pack attached — what to have ready, and a 90-second video on how we measure a failing bathroom.",
    },
  ]);
}

export function ensureSeed() {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

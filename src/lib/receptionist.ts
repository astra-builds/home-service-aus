import { computeEstimate, inServiceArea, money, PROJECT_TYPES, type ProjectKey } from "./estimate";
import { BRAND, SUBURBS } from "./site";

export type ChatSlots = {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  type?: string;
  timing?: string;
  budget?: string;
  scope?: string;
};

export type ChatCtx = {
  slots: ChatSlots;
  turns: { role: "user" | "assistant"; content: string }[];
  asked?: string[];
};

export type ChatCard = { title: string; body: string; href?: string; label?: string };

export type ChatReply = {
  reply: string;
  intent: string;
  chips: string[];
  slots: ChatSlots;
  cards?: ChatCard[];
  estimate?: { low: number; high: number; confidence: number; title: string; leadWeeks: [number, number] };
  score?: number;
  grade?: string;
  handoff?: { channel: "whatsapp" | "email" | "phone"; label: string; href: string }[];
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9$&'’ .,-]/g, " ").replace(/\s+/g, " ").trim();

const hit = (text: string, words: string[]) =>
  words.reduce((n, w) => (text.includes(w) ? n + (w.includes(" ") ? 2.4 : 1) : n), 0);

function extractEmail(t: string) {
  const m = t.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return m ? m[0] : undefined;
}
function extractPhone(t: string) {
  const raw = t.replace(/[^0-9+]/g, "");
  if (raw.length >= 9 && raw.length <= 12) return raw;
  return undefined;
}
function extractBudget(t: string) {
  const m = t.match(/\$\s?(\d+(?:\.\d+)?)\s?(k|thousand)?/);
  if (!m) return undefined;
  const n = Number(m[1]) * (m[2] ? 1000 : 1);
  if (n > 2000) return money(n);
  return undefined;
}
function extractSuburb(t: string) {
  const found = SUBURBS.find((s) => t.includes(s.toLowerCase()));
  if (found) return found;
  const m = t.match(/\b(?:in|near|around|over in)\s+([a-z]{3,}(?:\s[a-z]{3,})?)/);
  if (m) {
    const guess = m[1].replace(/\b(south east|melbourne|victoria|vic)\b.*/, "").trim();
    if (guess.length > 2) return guess.replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return undefined;
}

const TYPE_WORDS: { key: ProjectKey; words: string[] }[] = [
  { key: "kitchen", words: ["kitchen", "benchtop", "splashback", "pantry", "island", "cooking", "oven"] },
  { key: "bathroom", words: ["bathroom", "ensuite", "en suite", "shower", "toilet", "vanity", "tiles", "tiled", "wet area", "powder room", "laundry", "leak", "waterproof"] },
  { key: "extension", words: ["extension", "extend", "addition", "extra room", "add a room", "second storey", "first floor", " alfresco", "granny", "studio out the back", "rear extension"] },
  { key: "fullhome", words: ["whole house", "entire house", "whole home", "renovate the house", "full reno", "everything needs", "every room", "redo the whole", "renovating"] },
  { key: "outdoor", words: ["deck", "pergola", "outdoor", "backyard", "garden", "landscap", "pool", "verandah", "carport"] },
  { key: "restoration", words: ["restoration", "restore", "heritage", "period", "victorian", "edwardian", "california bungalow", "federation", "cornice", "sash", "lath"] },
];

function extractType(t: string): ProjectKey | undefined {
  let best: { key: ProjectKey; score: number } | undefined;
  for (const tw of TYPE_WORDS) {
    const s = hit(t, tw.words);
    if (s > 0 && (!best || s > best.score)) best = { key: tw.key, score: s };
  }
  return best?.key;
}

const TIMINGS: { key: string; words: string[]; label: string }[] = [
  { key: "asap", words: ["asap", "as soon as", "urgently", "next month", "straight away", "immediately", "now", "this month", "ready to go"], label: "Ready to start" },
  { key: "3-6", words: ["in a few months", "couple of months", "next quarter", "spring", "autumn", "in 3", "in 4", "in 6", "mid year"], label: "3–6 months away" },
  { key: "idea", words: ["just looking", "just exploring", "no idea", "idea stage", "thinking about", "early", "curious", "researching", "dreaming"], label: "Early idea stage" },
];

const KB: { intent: string; words: string[]; min?: number }[] = [
  { intent: "greeting", words: ["hi ", "hello", "hey ", "good morning", "good afternoon", "good evening", "howdy"] },
  { intent: "cost", words: ["cost", "how much", "price", "pricing", "quote", "estimate", "budget", "ballpark", "range", "$", "expensive", "afford", "charge"] },
  { intent: "availability", words: ["when can you", "availability", "book", "start date", "lead time", "how long", "timeline", "waitlist", "slot", "appointment", "site visit"] },
  { intent: "area", words: ["do you cover", "do you work in", "service area", "suburbs", "would you come to", "travel", "area do you"] },
  { intent: "credential", words: ["licensed", "licence", "registered", "insurance", "insured", "qualified", "builder registration", "vba", "cdb"] },
  { intent: "process", words: ["how does it work", "process", "what happens next", "first step", "where do we start", "how do we start", "steps"] },
  { intent: "warranty", words: ["warranty", "guarantee", "aftercare", "defect", "maintenance", "come back", "fix problems", "care visit"] },
  { intent: "occupied", words: ["stay in the house", "live in", "while you build", "move out", "rent somewhere", "dust", "kids", "occupied"] },
  { intent: "materials", words: ["stone", "timber", "joinery", "cabinet", "benchtop material", "caesarstone", "spotted gum", "hardwood", "plywood", "veneer", "2pac", "tile"] },
  { intent: "permits", words: ["permit", "planning", "council", "heritage overlay", "building surveyor", "approval", "vcat", "neighbour", "party wall"] },
  { intent: "payments", words: ["deposit", "payment", "pay you", "instalments", "progress payment", "invoice", "staged payments", "when do i pay"] },
  { intent: "variations", words: ["over budget", "blow out", "variation", "change my mind", "extra costs", "hidden costs", "surprise", "contingency", "provisional"] },
  { intent: "smalljob", words: ["small job", "minor", "just a repair", "fix a", "handyman", "odd job", "leaky tap", "hole in the wall", "one day job", "door won't"] },
  { intent: "emergency", words: ["burst pipe", "flooding", "flooded", "no power", "emergency", "water everywhere", "leaking everywhere", "urgent leak"] },
  { intent: "reviews", words: ["review", "testimonial", "reference", "past clients", "can i speak to", "rating", "google review", "who else"] },
  { intent: "team", words: ["who are you", "who will be", "who does the work", "your team", "site manager", "who builds", "subcontract", "about you", "history", "how long have you"] },
  { intent: "design", words: ["architect", "designer", "drawings", "plans", "draftsman", "do i need", "already have plans", "sketches", "concept"] },
  { intent: "compare", words: ["another quote", "other builders", "competitor", "cheaper quote", "comparison", "why you", "different quote", "other quote was"] },
  { intent: "commercial", words: ["commercial", "office fitout", "shop fitout", "cafe", "restaurant", "warehouse", "strata", "apartment building"] },
  { intent: "human", words: ["speak to someone", "talk to a person", "call me", "phone me", "real person", "can i call", "leave my number", "get someone to ring"] },
  { intent: "thanks", words: ["thank", "thanks", "cheers", "appreciate", "legend", "brilliant", "perfect"] },
  { intent: "whatsapp", words: ["whatsapp", "text me", "sms", "message me"] },
];

const OPENING =
  "Good morning — Jess here, from the Tallow & Stone studio desk. Ask me anything about your place, what things cost, or when we could start. If I can't answer it properly I'll say so and find the person who can.";

function personFor(type?: string) {
  if (!type) return "Jess Navarro";
  if (type === "extension" || type === "fullhome" || type === "restoration") return "Priya Raman";
  return "Dean Whitford";
}

function buildEstimate(slots: ChatSlots) {
  if (!slots.type) return undefined;
  return computeEstimate({
    type: slots.type as ProjectKey,
    size: "standard",
    finish: "signature",
    suburb: slots.suburb,
    timing: slots.timing,
  });
}

function chipsFor(intent: string, slots: ChatSlots): string[] {
  const next: string[] = [];
  if (!slots.type) next.push("A kitchen", "Two bathrooms", "Rear extension", "Outdoor deck");
  if (slots.type && !slots.suburb) next.push("I'm in Hampton", "I'm in Elwood", "Do you cover Malvern?");
  if (slots.type && slots.suburb && !slots.timing)
    next.push("Ready to start", "A few months away", "Just exploring");
  if (slots.type && slots.suburb && slots.timing && !slots.email)
    next.push("Send me the cost plan", "Book a site visit", "Talk to a real person");
  next.push("What things actually cost", "Can we stay in the house?");
  if (intent === "emergency") next.push("Call me now");
  return next.slice(0, 4);
}

const handoffLinks = (summary: string) => [
  {
    channel: "whatsapp" as const,
    label: "Continue on WhatsApp",
    href: `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(summary.slice(0, 900))}`,
  },
  {
    channel: "email" as const,
    label: "Email the studio",
    href: `mailto:${BRAND.email}?subject=${encodeURIComponent("Studio enquiry")}&body=${encodeURIComponent(summary.slice(0, 900))}`,
  },
  {
    channel: "phone" as const,
    label: `Call ${BRAND.phoneDisplay}`,
    href: BRAND.phoneHref,
  },
];

export function receptionist(ctx: ChatCtx, rawMessage: string): ChatReply {
  const message = rawMessage.trim();
  const text = norm(message);
  const slots: ChatSlots = { ...ctx.slots };
  const asked = new Set(ctx.asked ?? []);

  // ---- extraction ----
  const email = extractEmail(text);
  if (email && !slots.email) slots.email = email;
  const phone = extractPhone(text);
  if (phone && !slots.phone) slots.phone = phone;
  const suburb = extractSuburb(text);
  if (suburb && !slots.suburb) slots.suburb = suburb;
  const budget = extractBudget(text);
  if (budget && !slots.budget) slots.budget = budget;
  const type = extractType(text);
  if (type && !slots.type) slots.type = type;
  const timing = TIMINGS.find((t) => hit(text, t.words) > 0);
  if (timing && !slots.timing) slots.timing = timing.key;

  // name capture
  const nameMatch = message.match(/(?:i'?m|i am|my name'?s|this is|it'?s)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/);
  if (nameMatch && !slots.name) slots.name = nameMatch[1];

  const filled = [slots.type, slots.suburb, slots.timing, slots.name, slots.email ?? slots.phone].filter(Boolean).length;
  const qualified = filled >= 4;
  const est = buildEstimate(slots);
  const typeLabel = slots.type
    ? PROJECT_TYPES.find((t) => t.key === slots.type)?.label ?? "project"
    : "";
  const area = slots.suburb
    ? inServiceArea(slots.suburb)
    : null;
  const handoffSummary = `Studio enquiry — ${slots.name ?? "a website visitor"}${slots.suburb ? `, ${slots.suburb}` : ""}${typeLabel ? ` — ${typeLabel}` : ""}${slots.budget ? `, budget around ${slots.budget}` : ""}${slots.timing ? `, timing: ${TIMINGS.find((t) => t.key === slots.timing)?.label}` : ""}.`;

  const score = 12 + filled * 12 + (budget ? 12 : 0);
  const grade = score >= 60 ? "hot" : score >= 40 ? "warm" : "nurture";

  // ---- intent scoring ----
  let intent = "fallback";
  let bestScore = 0;
  for (const row of KB) {
    const s = hit(text, row.words);
    if (s > bestScore) {
      bestScore = s;
      intent = row.intent;
    }
  }
  if (bestScore < 1) intent = "fallback";
  if (qualified && ["greeting", "fallback"].includes(intent) && !asked.has("offer")) {
    intent = "offer";
  }

  const reply = (body: string, extra?: Partial<ChatReply>): ChatReply => ({
    reply: body,
    intent,
    chips: extra?.chips ?? chipsFor(intent, slots),
    slots,
    score,
    grade,
    ...extra,
  });

  switch (intent) {
    case "greeting":
      return reply(
        ctx.turns.length === 0
          ? OPENING
          : `Hi${slots.name ? " " + slots.name : ""} — still here. What's going on at the place?`,
      );

    case "cost": {
      if (est) {
        return reply(
          `Based on what you've told me — ${typeLabel.toLowerCase()}${slots.suburb ? ` in ${slots.suburb}` : ""} — the realistic range is **${money(est.low)} to ${money(est.high)}**. That's at ${est.confidence}% confidence, built from our last two dozen finished jobs of the same type rather than a formula.\n\nThe three things that move it most: how much structural work is involved, the finish level you want, and whether you're living in the house while we build. Tell me any of those and I'll tighten the number.`,
          {
            estimate: {
              low: est.low,
              high: est.high,
              confidence: est.confidence,
              title: `${typeLabel} — ${slots.suburb ?? "our area"}`,
              leadWeeks: est.leadWeeks,
            },
            cards: [
              {
                title: "Open the full cost planner",
                body: "Nine questions, two minutes, and you get the range plus the cost drivers behind it.",
                href: `/estimate?type=${slots.type}&suburb=${encodeURIComponent(slots.suburb ?? "")}`,
                label: "Build my cost plan",
              },
            ],
          },
        );
      }
      if (!slots.type) {
        asked.add("type");
        return reply(
          `Happy to put a real number in front of you — I just need to know what kind of work we're talking about, because a bathroom and a rear extension are different conversations entirely.\n\nWhat's happening at the place?`,
          { chips: ["A kitchen", "Two bathrooms", "Rear extension", "Whole-house reno"] },
        );
      }
      return reply(
        `A ${typeLabel.toLowerCase()}${slots.suburb ? ` in ${slots.suburb}` : ""} usually lands between ${money((PROJECT_TYPES.find((t) => t.key === slots.type)?.baseLow ?? 50000))} and ${money((PROJECT_TYPES.find((t) => t.key === slots.type)?.baseHigh ?? 90000))} — that's the honest middle of our recent work, before we know your site. Two things tighten it fast: how much of the layout you want to change, and the finish level.`,
        {
          cards: [
            {
              title: "Get your specific range",
              body: "Nine questions. Two minutes. You'll see the cost drivers, not just a number.",
              href: `/estimate?type=${slots.type}&suburb=${encodeURIComponent(slots.suburb ?? "")}`,
              label: "Open the cost planner",
            },
          ],
        },
      );
    }

    case "availability":
      return reply(
        `The next free site-visit slots are **Thursday morning and Saturday morning** — those go first, they're 90 minutes, and there's no charge for the first one.\n\nOn build starts: we take on a limited number of projects a year so the same crew stays with your job. Kitchens and bathrooms are typically 8–14 weeks from deposit to handover. Extensions and whole-home work run 22–42 weeks including permits. There's usually a 4–10 week gap before we start on site, which is the useful window to finish selections.`,
        {
          cards: [
            {
              title: "Book a site visit",
              body: "Pick a real slot from our calendar. You'll get a confirmation, a prep note, and a reminder the evening before.",
              href: "/book",
              label: "Choose a time",
            },
          ],
        },
      );

    case "area":
      return reply(
        area === false
          ? `We work across bayside and inner south-east Melbourne — ${BRAND.region.split(" ").slice(0, 6).join(" ")} and about 26 suburbs around it. ${slots.suburb ? `${slots.suburb} is a little outside that, but send the address anyway; we occasionally take a project we believe in further out.` : ""}`
          : `Yes — ${slots.suburb ? `${slots.suburb} is right in our patch` : "we cover about 26 suburbs across bayside and inner south-east Melbourne"}. Brighton, Hampton, Sandringham, Beaumaris, Elwood, Elsternwick, St Kilda, Malvern, Kew and everything in between. We're based at ${BRAND.address}, so site visits are quick.`,
        area === false
          ? {
              chips: ["Send the address anyway", "What things cost", "Book a site visit"],
            }
          : undefined,
      );

    case "credential":
      return reply(
        `Yes, all of it, and it's on every contract we issue.\n\n• Registered building practitioner — **${BRAND.licence}**\n• Domestic building insurance on every project\n• $20M public liability\n• **${BRAND.warranty}**\n• Waterproofing to AS 3740 with a 7-year membrane warranty\n\nCertificates are sent with the contract, not on request.`,
      );

    case "process":
      return reply(
        `Five steps, and you can stop after any of them.\n\n**1.** A 20-minute conversation — no forms.\n**2.** A free 90-minute site visit and measure. Written summary and a realistic range within 48 hours.\n**3.** Cost plan and scope lock, priced three ways so you can see what each decision costs.\n**4.** Build — named site manager, weekly photo reports, payments tied to real completion.\n**5.** Handover pack, then we come back at month 12 and fix the defects before you have to ask.`,
        {
          cards: [
            { title: "Book step two", body: "Free site visit, 90 minutes, no obligation.", href: "/book", label: "Pick a slot" },
          ],
        },
      );

    case "warranty":
      return reply(
        `${BRAND.warranty}.\n\nConcretely: six-year structural warranty, a 12-month care visit we put in the diary at handover, and defects closed within 21 days — our rolling average close-out is 11 days. You also get an operations pack at handover: warranties, care instructions, paint colours, and a marked-up record of what's inside your walls.`,
      );

    case "occupied":
      return reply(
        `About 60% of our clients stay in the house. For a bathroom or kitchen that's entirely manageable — dust walls, floor protection laid each morning, a sealed route from the front door to the work zone, and quiet hours you set.\n\nFor whole-home work we'd usually stage it so you live in a sealed wing with a working kitchen, or move out for the dusty four weeks. We'll show you both options with real numbers so you can choose rather than guess. It adds about 5% to the programme, which we say up front.`,
      );

    case "materials":
      return reply(
        `The joinery is built in our own workshop in Gardenvale, which is why our cabinet tolerances are 2mm rather than 6mm and why nothing arrives from interstate warped.\n\nOn materials: engineered stone is now restricted in Victoria, so we work with natural stone, porcelain slab, stainless and solid timber. Benchtops are usually the cheapest thing to get right and the most expensive to get wrong — Cait, our interiors lead, will put samples in your hand rather than a PDF in your inbox.`,
      );

    case "permits":
      return reply(
        `We run the whole approvals pathway — planning permit or VicSmart, structural engineering, soil report, energy report, building surveyor permit and the occupancy stage gates.\n\nHeritage overlays in Bayside, Stonnington and Port Phillip add roughly 6–10 weeks and we work with consultants those planners already know. If the project needs a party wall notice or neighbour advertising, we handle that too, including the neighbour who objects to everything.`,
      );

    case "payments":
      return reply(
        `Staged payments tied to real completion, never calendar dates. Typically 5% deposit, then frame, lock-up, fix and completion stages — and nothing is invoiced before the work that stage covers is finished and inspected.\n\nThe full schedule is printed in your contract. If a builder ever asks you for a large sum before work starts, that's a question worth asking out loud.`,
      );

    case "variations":
      return reply(
        `Our variations average **under 4% of contract value** across the last three years, and that figure is printed in every cost plan.\n\nHow: every provisional sum carries a stated quantity and a unit rate, every variation is priced in writing with a 48-hour window before it's actioned, and we carry a named contingency rather than pretending it isn't there. If the budget and the plan disagree, we tell you at the site visit — not at week nine.`,
      );

    case "smalljob":
      return reply(
        `We keep two days a month open for small work — mostly for existing clients, but we don't turn away a good door that won't close.\n\nTruthfully, a one-day repair through a builder isn't the cheapest route. If it's a tap washer, a leaking shower rose or a power point, a good sole-trader plumber or electrician will be faster and cheaper and we're happy to name one near you. If it's anything involving waterproofing, structure or something we built, we'll take it on properly.`,
        { chips: ["It's waterproofing", "It's structural", "Send me a plumber instead", "Book the care crew"] },
      );

    case "emergency":
      return reply(
        `If water is running or the power is out, stop reading this.\n\nTurn off the water at the meter out the front, or the mains switch in the switchboard. Then call a 24-hour plumber or electrician — we're a building firm, not an emergency service, and you need someone who can be there tonight.\n\nOnce it's under control: we do the rebuild after the emergency, and we're good at it. Send me photos of the damage and I'll give you a range and the first available slot.`,
        { chips: ["Send photos of the damage", "What does the rebuild cost", "Book the earliest slot"] },
      );

    case "reviews":
      return reply(
        `4.9 out of 5 across 63 verified reviews, and 96% of clients have referred us or come back. You can read six of them on the site in full — no edited highlights.\n\nBetter than that, we'll put you on the phone with someone whose project looks like yours, in your suburb. It's a 15-minute call with a past client, not a prepared testimonial. Say the word and Jess will set it up.`,
        { chips: ["Set up a call with a past client", "Show me recent work", "What things cost"] },
      );

    case "team":
      return reply(
        `Five of us in the studio, 14 years, 214 projects. Tom Ellery founded it as a carpenter and still walks every site fortnightly. Priya runs the programme and writes the cost plans. Dean manages sites. Cait designs and builds the joinery. Jess — me — keeps the desk moving.\n\nThe crew on your site is the crew you meet before you sign. No rotating cast of subcontractors, and no site manager you've never spoken to.`,
      );

    case "design":
      return reply(
        `About half our work arrives with drawings already done, and we're very happy pricing to an architect's documentation — we'll review it and flag anything that will blow the budget before you sign.\n\nIf you don't have drawings: don't pay for them yet. Come to a free site visit first, get a realistic range, then spend the money on documentation that fits the budget you actually have. We'll lead design with our draftsman, engineer and Cait's joinery documentation when that's the better route.`,
      );

    case "compare":
      return reply(
        `Good — you should be comparing.\n\nThree questions worth asking any builder, us included: what's inside every provisional sum, who exactly is on site every day, and what happens at month 12. If a quote is dramatically lower than ours, it's almost always missing scope rather than efficiency, and we'll happily sit down with both documents and show you where the gap is. We do that often enough that we've stopped finding it awkward.`,
        { chips: ["Compare my other quote", "What's in your scope", "What things cost"] },
      );

    case "commercial":
      return reply(
        `We're residential only — homes, extensions, restorations and the occasional boutique mixed-use. Commercial fitouts are a different insurance, contract and programme regime and we'd rather be excellent at one thing.\n\nIf you've got a commercial job, I can suggest two firms in Melbourne who are genuinely good at it. Happy to help.`,
      );

    case "human":
      return reply(
        `Of course. Jess here — I'm the studio desk, and I'm a real person. The quickest routes:\n\n• Call **${BRAND.phoneDisplay}** — answered 7:30am to 5:30pm\n• WhatsApp **${BRAND.mobileDisplay}** — I answer between site visits\n• Or leave a time and I'll ring you`,
        { handoff: handoffSlots(slots) },
      );

    case "thanks":
      return reply(
        `Pleasure${slots.name ? `, ${slots.name}` : ""}. I'll keep everything you've told me on file so you don't have to repeat it. Anything else, or shall I put a cost plan together for you?`,
        { chips: ["Put the cost plan together", "Book a site visit", "That's all, thanks"] },
      );

    case "whatsapp":
      return reply(
        `Easier — here's the WhatsApp link with everything you've told me already filled in. Send it whenever you like; I usually reply within a few minutes during the day.`,
        { handoff: handoffSlots(slots) },
      );

    case "offer": {
      const parts: string[] = [];
      if (!slots.suburb) parts.push("which suburb you're in");
      if (!slots.timing) parts.push("whether you're looking to start soon or just working it out");
      if (!slots.name) parts.push("your name");
      if (!slots.email && !slots.phone) parts.push("the best email or mobile to send it to");
      const need = parts.slice(0, 2).join(" and ");
      const withName = slots.name ? `${slots.name}, ` : "";
      if (est && need) {
        return reply(
          `${withName}here's what I've got so far: ${typeLabel.toLowerCase()}${slots.suburb ? ` in ${slots.suburb}` : ""}, indicatively **${money(est.low)}–${money(est.high)}** at ${est.confidence}% confidence.\n\nTo turn that into a written cost plan I'd still need ${need}. Two details and it's done.`,
          {
            estimate: {
              low: est.low,
              high: est.high,
              confidence: est.confidence,
              title: `${typeLabel} — ${slots.suburb ?? "our area"}`,
              leadWeeks: est.leadWeeks,
            },
          },
        );
      }
      if (!need) {
        return reply(
          `${withName}I have everything I need. Here's the plan: I'll write up a proper cost plan for the ${typeLabel.toLowerCase()} and send it to ${slots.email ?? slots.phone} within one working day, and Priya will call to walk through the two or three things that could move the number.\n\nOr, if it's easier, book the free site visit now and we'll do it in person.`,
          {
            cards: [
              {
                title: "Send my cost plan",
                body: `Written cost plan to ${slots.email ?? slots.phone} within one working day.`,
                href: `/estimate?type=${slots.type}&suburb=${encodeURIComponent(slots.suburb ?? "")}&timing=${slots.timing ?? ""}`,
                label: "Send it through",
              },
              {
                title: "Book the site visit",
                body: "90 minutes on site, free, and you get a written summary either way.",
                href: "/book",
                label: "Choose a time",
              },
            ],
          },
        );
      }
      return reply(
        `${withName}good. To turn this into something useful I still need ${need}.`,
      );
    }

    default: {
      if (qualified || (est && filled >= 3)) {
        return reply(
          `${slots.name ? `${slots.name}, ` : ""}I've got the shape of it — ${typeLabel.toLowerCase()}${slots.suburb ? ` in ${slots.suburb}` : ""}, indicatively **${money(est!.low)}–${money(est!.high)}**.\n\nI'm not certain I've understood the last part properly though, so I'd rather not guess. Tell me again in your own words, or if it's easier, I'll have ${personFor(slots.type)} ring you — they're better at this than I am.`,
          {
            estimate: {
              low: est!.low,
              high: est!.high,
              confidence: est!.confidence,
              title: `${typeLabel} — ${slots.suburb ?? "our area"}`,
              leadWeeks: est!.leadWeeks,
            },
            handoff: handoffSlots(slots),
          },
        );
      }
      return reply(
        `I want to answer that properly rather than pretend.\n\nI can tell you what things realistically cost, whether we work in your suburb, how the build would run, what happens at handover, or when we could start. If it's something more specific about your house, describe it however you like — or I'll have ${personFor(slots.type)} ring you and answer it directly.`,
        { chips: ["What things actually cost", "Do you work in my suburb?", "How does the build run?", "Have someone ring me"] },
      );
    }
  }
}

function handoffSlots(slots: ChatSlots) {
  const summary = `Studio enquiry — ${slots.name ?? "a website visitor"}${slots.suburb ? `, ${slots.suburb}` : ""}${slots.type ? ` — ${slots.type}` : ""}${slots.budget ? `, budget around ${slots.budget}` : ""}${slots.timing ? `, timing: ${TIMINGS.find((t) => t.key === slots.timing)?.label}` : ""}.`;
  return handoffLinks(summary);
}

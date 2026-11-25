import type { Project } from "@/db/schema";
import { PROJECT_SEED } from "@/db/seed";

export type MemoryEnquiry = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  suburb: string;
  projectType: string;
  scope: string;
  budgetBand: string;
  timing: string;
  message: string;
  channel: string;
  source: string;
  score: number;
  grade: string;
  estimateLow: number | null;
  estimateHigh: number | null;
  confidence: number | null;
  quoteRef: string | null;
  status: string;
  stage: string;
  owner: string;
  nextActionAt: Date | null;
  createdAt: Date;
};

export type MemoryEvent = {
  id: number;
  enquiryId: number;
  kind: string;
  label: string;
  detail: string;
  actor: string;
  channel: string;
  minutesAfter: number;
  createdAt: Date;
};

export type MemoryBooking = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  suburb: string;
  visitType: string;
  slotIso: string;
  durationMinutes: number;
  notes: string;
  status: string;
  createdAt: Date;
};

export type MemoryComms = {
  id: number;
  reference: string;
  channel: string;
  direction: string;
  subject: string;
  body: string;
  createdAt: Date;
};

type MemoryStore = {
  projects: Project[];
  enquiries: MemoryEnquiry[];
  events: MemoryEvent[];
  bookings: MemoryBooking[];
  comms: MemoryComms[];
  nextId: number;
};

const globalForMemory = globalThis as typeof globalThis & {
  __tallowMemoryStore?: MemoryStore;
};

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3600000);
}

function createInitialStore(): MemoryStore {
  const projects: Project[] = PROJECT_SEED.map((p, idx) => ({
    id: idx + 1,
    slug: p.slug,
    title: p.title,
    suburb: p.suburb,
    category: p.category,
    year: p.year,
    durationWeeks: p.durationWeeks,
    budgetBand: p.budgetBand,
    investment: p.investment,
    blurb: p.blurb,
    brief: p.brief,
    approach: p.approach,
    outcome: p.outcome,
    heroImage: p.heroImage,
    gallery: p.gallery,
    specs: p.specs,
    features: p.features,
    materials: p.materials,
    clientName: p.clientName,
    quote: p.quote,
    sortOrder: p.sortOrder ?? idx + 1,
  }));

  const enquiries: MemoryEnquiry[] = [
    {
      id: 1,
      reference: "EN-2841",
      name: "Amelia & Jack Mercer",
      email: "amelia.mercer@example.com",
      phone: "0412 884 190",
      suburb: "Sandringham",
      projectType: "kitchen",
      scope: "Load-bearing wall + joinery",
      budgetBand: "$130k – $170k",
      timing: "next-quarter",
      message: "1974 brick home, want to open the kitchen into the dining room and hide the laundry.",
      channel: "web",
      source: "cost planner",
      score: 88,
      grade: "hot",
      estimateLow: 132000,
      estimateHigh: 168000,
      confidence: 78,
      quoteRef: "CP-4418",
      status: "planning",
      stage: "Cost plan in progress",
      owner: "Priya Raman",
      nextActionAt: hoursAgo(-2),
      createdAt: hoursAgo(6),
    },
    {
      id: 2,
      reference: "EN-2838",
      name: "Claire & Ben Hynes",
      email: "claire.hynes@example.com",
      phone: "0421 553 019",
      suburb: "Bentleigh East",
      projectType: "extension",
      scope: "Rear pavilion + deck",
      budgetBand: "$290k – $360k",
      timing: "this-year",
      message: "Three-bedroom weatherboard, looking to add 42m2 north-facing living and an ensuite.",
      channel: "web",
      source: "website",
      score: 82,
      grade: "hot",
      estimateLow: 298000,
      estimateHigh: 356000,
      confidence: 74,
      quoteRef: "CP-4412",
      status: "issued",
      stage: "Cost plan issued",
      owner: "Jess Navarro",
      nextActionAt: hoursAgo(-12),
      createdAt: hoursAgo(28),
    },
    {
      id: 3,
      reference: "EN-2835",
      name: "David & Sarah Chen",
      email: "david.chen@example.com",
      phone: "0433 109 442",
      suburb: "Hampton",
      projectType: "bathroom",
      scope: "Main + ensuite",
      budgetBand: "$85k – $110k",
      timing: "asap",
      message: "Leaking shower in the main bathroom; want to do both bathrooms together.",
      channel: "web",
      source: "booking",
      score: 79,
      grade: "warm",
      estimateLow: 86000,
      estimateHigh: 108000,
      confidence: 80,
      quoteRef: "CP-4405",
      status: "booked",
      stage: "Site visit booked",
      owner: "Dean Kowalski",
      nextActionAt: hoursAgo(-24),
      createdAt: hoursAgo(46),
    },
  ];

  const events: MemoryEvent[] = [
    {
      id: 1,
      enquiryId: 1,
      kind: "received",
      label: "Enquiry received",
      detail: "Submitted from cost planner · Sandringham",
      actor: "Website",
      channel: "web",
      minutesAfter: 0,
      createdAt: hoursAgo(6),
    },
    {
      id: 2,
      enquiryId: 1,
      kind: "auto",
      label: "Acknowledged by SMS + email",
      detail: "Reference EN-2841 issued with reply time.",
      actor: "Studio desk",
      channel: "sms",
      minutesAfter: 1,
      createdAt: hoursAgo(5.9),
    },
    {
      id: 3,
      enquiryId: 2,
      kind: "human",
      label: "Three-option cost plan sent",
      detail: "Quantities and unit rates on every line.",
      actor: "Priya Raman",
      channel: "email",
      minutesAfter: 240,
      createdAt: hoursAgo(24),
    },
  ];

  const comms: MemoryComms[] = [
    {
      id: 1,
      reference: "EN-2841",
      channel: "whatsapp",
      direction: "outbound",
      subject: "Cost plan sent",
      body: "Hi Amelia — Jess here. Your range is $132k–$168k at 78% confidence. Two things would move it: whether the wall is load-bearing, and whether you want the laundry in it.",
      createdAt: hoursAgo(4),
    },
    {
      id: 2,
      reference: "EN-2838",
      channel: "email",
      direction: "outbound",
      subject: "Cost plan — three options",
      body: "Three ways to run this: keep the deck and extend north, rebuild the deck with the extension, or phase the alfresco to next year. Quantities and unit rates on every line.",
      createdAt: hoursAgo(24),
    },
    {
      id: 3,
      reference: "EN-2835",
      channel: "sms",
      direction: "outbound",
      subject: "Site visit reminder",
      body: "Thursday 9:30am with Dean. Prep pack attached — what to have ready, and a 90-second video on how we measure a failing bathroom.",
      createdAt: hoursAgo(12),
    },
  ];

  return {
    projects,
    enquiries,
    events,
    bookings: [],
    comms,
    nextId: 100,
  };
}

export function getMemoryStore(): MemoryStore {
  if (!globalForMemory.__tallowMemoryStore) {
    globalForMemory.__tallowMemoryStore = createInitialStore();
  }
  return globalForMemory.__tallowMemoryStore;
}

import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import {
  bookings,
  commsLog,
  enquiryEvents,
  enquiries,
  chatTurns,
  projects,
  type Project,
} from "@/db/schema";
import { ensureSeed } from "@/db/seed";
import { enquiryReference, leadScore } from "./estimate";
import { getMemoryStore } from "./memory-store";

export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase) {
    return [...getMemoryStore().projects].sort((a, b) => a.sortOrder - b.sortOrder);
  }
  try {
    await ensureSeed();
    return await db.select().from(projects).orderBy(asc(projects.sortOrder));
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  if (!hasDatabase) {
    return getMemoryStore().projects.find((p) => p.slug === slug);
  }
  try {
    await ensureSeed();
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return rows[0];
  } catch {
    return undefined;
  }
}

export async function getRelated(category: string, slug: string, limit = 3) {
  const all = await getProjects();
  const same = all.filter((p) => p.slug !== slug && p.category === category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== category);
  return [...same, ...rest].slice(0, limit);
}

export type EnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  suburb?: string;
  projectType?: string;
  scope?: string;
  budgetBand?: string;
  timing?: string;
  message?: string;
  channel?: string;
  source?: string;
  estimateLow?: number | null;
  estimateHigh?: number | null;
  confidence?: number | null;
  quoteRef?: string | null;
};

const NEXT_ACTIONS: Record<string, number> = {
  new: 4,
  qualifying: 30,
  planning: 2880,
  issued: 1440,
  booked: 720,
  contracted: 0,
};

export async function createEnquiry(input: EnquiryInput) {
  const reference = enquiryReference();
  const { score, grade } = leadScore({
    type: input.projectType,
    suburb: input.suburb,
    timing: input.timing,
    budgetBand: input.budgetBand,
    phone: input.phone,
    email: input.email,
    message: input.message,
    hasEstimate: Boolean(input.estimateLow),
  });

  const status = input.estimateLow ? "planning" : "new";
  const stage = input.estimateLow ? "Cost plan in progress" : "New enquiry";

  if (!hasDatabase) {
    const store = getMemoryStore();
    const id = ++store.nextId;
    const now = new Date();
    const row = {
      id,
      reference,
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      suburb: input.suburb ?? "",
      projectType: input.projectType ?? "",
      scope: input.scope ?? "",
      budgetBand: input.budgetBand ?? "",
      timing: input.timing ?? "",
      message: input.message ?? "",
      channel: input.channel ?? "web",
      source: input.source ?? "website",
      score,
      grade,
      estimateLow: input.estimateLow ?? null,
      estimateHigh: input.estimateHigh ?? null,
      confidence: input.confidence ?? null,
      quoteRef: input.quoteRef ?? null,
      status,
      stage,
      owner: grade === "hot" ? "Priya Raman" : "Jess Navarro",
      nextActionAt: new Date(Date.now() + (NEXT_ACTIONS[status] ?? 60) * 60000),
      createdAt: now,
    };
    store.enquiries.unshift(row);
    store.events.unshift(
      {
        id: ++store.nextId,
        enquiryId: id,
        kind: "received",
        label: "Enquiry received",
        detail: `Submitted from the ${input.source ?? "website"}${input.suburb ? ` · ${input.suburb}` : ""}.`,
        actor: "Website",
        channel: "web",
        minutesAfter: 0,
        createdAt: now,
      },
      {
        id: ++store.nextId,
        enquiryId: id,
        kind: "auto",
        label: "Acknowledged by SMS + email",
        detail: `Reference ${reference} issued with an expected reply time and what happens next.`,
        actor: "Studio desk",
        channel: "sms",
        minutesAfter: 1,
        createdAt: now,
      },
    );
    store.comms.unshift({
      id: ++store.nextId,
      reference,
      channel: "email",
      direction: "outbound",
      subject: `Your cost plan — ${reference}`,
      body: `Hi ${input.name.split(" ")[0]}, thanks for the detail. Here's your indicative range and what drives it. I'll follow up within one working day. — Jess`,
      createdAt: now,
    });
    return row;
  }

  const [row] = await db
    .insert(enquiries)
    .values({
      reference,
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      suburb: input.suburb ?? "",
      projectType: input.projectType ?? "",
      scope: input.scope ?? "",
      budgetBand: input.budgetBand ?? "",
      timing: input.timing ?? "",
      message: input.message ?? "",
      channel: input.channel ?? "web",
      source: input.source ?? "website",
      score,
      grade,
      estimateLow: input.estimateLow ?? null,
      estimateHigh: input.estimateHigh ?? null,
      confidence: input.confidence ?? null,
      quoteRef: input.quoteRef ?? null,
      status,
      stage,
      nextActionAt: new Date(Date.now() + (NEXT_ACTIONS[status] ?? 60) * 60000),
    })
    .returning();

  await db.insert(enquiryEvents).values([
    {
      enquiryId: row.id,
      kind: "received",
      label: "Enquiry received",
      detail: `Submitted from the ${input.source ?? "website"}${input.suburb ? ` · ${input.suburb}` : ""}.`,
      actor: "Website",
      channel: "web",
      minutesAfter: 0,
    },
    {
      enquiryId: row.id,
      kind: "auto",
      label: "Acknowledged by SMS + email",
      detail: `Reference ${reference} issued with an expected reply time and what happens next.`,
      actor: "Studio desk",
      channel: "sms",
      minutesAfter: 1,
    },
    {
      enquiryId: row.id,
      kind: "auto",
      label: "Qualification scored",
      detail: `Graded ${grade.toUpperCase()} at ${score}/100 and routed to ${grade === "hot" ? "Priya Raman for the cost plan" : "Jess Navarro for follow-up"}.`,
      actor: "Studio desk",
      channel: "system",
      minutesAfter: 3,
    },
  ]);

  if (input.estimateLow) {
    await db.insert(enquiryEvents).values({
      enquiryId: row.id,
      kind: "auto",
      label: "Indicative range issued",
      detail: `Range issued with ${input.confidence ?? 0}% confidence and three named cost drivers.`,
      actor: "Studio desk",
      channel: "email",
      minutesAfter: 12,
    });
  }

  await db.insert(commsLog).values({
    reference,
    channel: "email",
    direction: "outbound",
    subject: `Your cost plan — ${reference}`,
    body: `Hi ${input.name.split(" ")[0]}, thanks for the detail. Here's your indicative range and what drives it. I'll follow up within one working day. — Jess`,
  });

  return row;
}

export async function createEnquiryEvent(
  enquiryId: number,
  ev: { kind: string; label: string; detail?: string; actor?: string; channel?: string; minutesAfter?: number },
) {
  if (!hasDatabase) {
    const store = getMemoryStore();
    store.events.unshift({
      id: ++store.nextId,
      enquiryId,
      kind: ev.kind,
      label: ev.label,
      detail: ev.detail ?? "",
      actor: ev.actor ?? "Studio desk",
      channel: ev.channel ?? "system",
      minutesAfter: ev.minutesAfter ?? 0,
      createdAt: new Date(),
    });
    return;
  }
  await db.insert(enquiryEvents).values({
    enquiryId,
    kind: ev.kind,
    label: ev.label,
    detail: ev.detail ?? "",
    actor: ev.actor ?? "Studio desk",
    channel: ev.channel ?? "system",
    minutesAfter: ev.minutesAfter ?? 0,
  });
}

export async function getEnquiries(limit = 12) {
  if (!hasDatabase) {
    return getMemoryStore().enquiries.slice(0, limit);
  }
  try {
    return await db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(limit);
  } catch {
    return [];
  }
}

export async function getDeskStats() {
  if (!hasDatabase) {
    const rows = getMemoryStore().enquiries.map((e) => ({
      stage: e.stage,
      status: e.status,
      score: e.score,
      grade: e.grade,
    }));
    const avg = rows.length > 0 ? Math.round(rows.reduce((n, r) => n + r.score, 0) / rows.length) : 0;
    return { rows, avg };
  }
  try {
    const rows = await db
      .select({ stage: enquiries.stage, status: enquiries.status, score: enquiries.score, grade: enquiries.grade })
      .from(enquiries);
    const avg =
      rows.length > 0
        ? Math.round(rows.reduce((n, r) => n + r.score, 0) / rows.length)
        : 0;
    return { rows, avg };
  } catch {
    return { rows: [] as { stage: string; status: string; score: number; grade: string }[], avg: 0 };
  }
}

export async function getRecentEvents(limit = 8) {
  if (!hasDatabase) {
    const store = getMemoryStore();
    return store.events.slice(0, limit).map((ev) => {
      const enq = store.enquiries.find((e) => e.id === ev.enquiryId);
      return {
        id: ev.id,
        kind: ev.kind,
        label: ev.label,
        detail: ev.detail,
        actor: ev.actor,
        channel: ev.channel,
        minutesAfter: ev.minutesAfter,
        createdAt: ev.createdAt,
        reference: enq?.reference ?? null,
        suburb: enq?.suburb ?? null,
        projectType: enq?.projectType ?? null,
      };
    });
  }
  try {
    const rows = await db
      .select({
        id: enquiryEvents.id,
        kind: enquiryEvents.kind,
        label: enquiryEvents.label,
        detail: enquiryEvents.detail,
        actor: enquiryEvents.actor,
        channel: enquiryEvents.channel,
        minutesAfter: enquiryEvents.minutesAfter,
        createdAt: enquiryEvents.createdAt,
        reference: enquiries.reference,
        suburb: enquiries.suburb,
        projectType: enquiries.projectType,
      })
      .from(enquiryEvents)
      .leftJoin(enquiries, eq(enquiryEvents.enquiryId, enquiries.id))
      .orderBy(desc(enquiryEvents.id))
      .limit(limit);
    return rows;
  } catch {
    return [];
  }
}

export async function createBooking(input: {
  name: string;
  email: string;
  phone?: string;
  suburb?: string;
  visitType?: string;
  slotIso: string;
  notes?: string;
}) {
  const reference = `SV-${Math.floor(1000 + Math.random() * 8999)}`;
  if (!hasDatabase) {
    const store = getMemoryStore();
    const now = new Date();
    const row = {
      id: ++store.nextId,
      reference,
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      suburb: input.suburb ?? "",
      visitType: input.visitType ?? "Site visit",
      slotIso: input.slotIso,
      durationMinutes: 90,
      notes: input.notes ?? "",
      status: "confirmed",
      createdAt: now,
    };
    store.bookings.push(row);
    store.events.unshift({
      id: ++store.nextId,
      enquiryId: 0,
      kind: "human",
      label: `Site visit booked — ${row.slotIso.slice(0, 10)}`,
      detail: `${input.name} booked a ${input.visitType ?? "site visit"}. Confirmation, prep pack and reminder scheduled.`,
      actor: input.name,
      channel: "web",
      minutesAfter: 0,
      createdAt: now,
    });
    store.comms.unshift({
      id: ++store.nextId,
      reference,
      channel: "email",
      direction: "outbound",
      subject: `Confirmed — ${input.visitType ?? "Site visit"} on ${new Date(input.slotIso).toLocaleDateString("en-AU")}`,
      body: `You're locked in for 90 minutes. Here's what we'll look at together and what to have ready.`,
      createdAt: now,
    });
    return row;
  }
  const [row] = await db
    .insert(bookings)
    .values({
      reference,
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      suburb: input.suburb ?? "",
      visitType: input.visitType ?? "Site visit",
      slotIso: input.slotIso,
      durationMinutes: 90,
      notes: input.notes ?? "",
    })
    .returning();

  await db.insert(enquiryEvents).values({
    enquiryId: 0,
    kind: "human",
    label: `Site visit booked — ${row.slotIso.slice(0, 10)}`,
    detail: `${input.name} booked a ${input.visitType ?? "site visit"}. Confirmation, prep pack and reminder scheduled.`,
    actor: input.name,
    channel: "web",
    minutesAfter: 0,
  });

  await db.insert(commsLog).values([
    {
      reference,
      channel: "email",
      direction: "outbound",
      subject: `Confirmed — ${input.visitType ?? "Site visit"} on ${new Date(input.slotIso).toLocaleDateString("en-AU")}`,
      body: `You're locked in for 90 minutes. Here's what we'll look at together and what to have ready.`,
    },
    {
      reference,
      channel: "whatsapp",
      direction: "outbound",
      subject: "Reminder",
      body: `Evening-before reminder with the prep pack and a 90-second video on how we measure.`,
    },
  ]);

  return row;
}

export async function getBookings() {
  if (!hasDatabase) {
    return [...getMemoryStore().bookings].sort((a, b) => a.slotIso.localeCompare(b.slotIso));
  }
  try {
    return await db.select().from(bookings).orderBy(asc(bookings.slotIso));
  } catch {
    return [];
  }
}

export async function slotTaken(slotIso: string) {
  if (!hasDatabase) {
    return getMemoryStore().bookings.some((b) => b.slotIso === slotIso && b.status === "confirmed");
  }
  try {
    const rows = await db
      .select({ id: bookings.id })
      .from(bookings)
      .where(and(eq(bookings.slotIso, slotIso), eq(bookings.status, "confirmed")))
      .limit(1);
    return rows.length > 0;
  } catch {
    return false;
  }
}

export async function logChat(sessionId: string, role: string, content: string, intent = "") {
  if (!hasDatabase) return;
  try {
    await db.insert(chatTurns).values({ sessionId, role, content, intent });
  } catch {
    /* non-blocking */
  }
}

export async function logComms(entry: {
  reference?: string;
  channel: string;
  direction?: string;
  subject?: string;
  body?: string;
}) {
  if (!hasDatabase) {
    const store = getMemoryStore();
    store.comms.unshift({
      id: ++store.nextId,
      reference: entry.reference ?? "",
      channel: entry.channel,
      direction: entry.direction ?? "outbound",
      subject: entry.subject ?? "",
      body: entry.body ?? "",
      createdAt: new Date(),
    });
    return;
  }
  try {
    await db.insert(commsLog).values({
      reference: entry.reference ?? "",
      channel: entry.channel,
      direction: entry.direction ?? "outbound",
      subject: entry.subject ?? "",
      body: entry.body ?? "",
    });
  } catch {
    /* non-blocking */
  }
}

export async function getComms(limit = 6) {
  if (!hasDatabase) {
    return getMemoryStore().comms.slice(0, limit);
  }
  try {
    return await db.select().from(commsLog).orderBy(desc(commsLog.id)).limit(limit);
  } catch {
    return [];
  }
}

export async function countProjects() {
  if (!hasDatabase) {
    return getMemoryStore().projects.length;
  }
  try {
    const rows = await db.execute<{ count: string }>(sql`select count(*)::text as count from projects`);
    const list = (rows as unknown as { rows?: { count: string }[] }).rows ?? [];
    return Number(list[0]?.count ?? "0");
  } catch {
    return 0;
  }
}

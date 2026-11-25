import {
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  suburb: varchar("suburb", { length: 80 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  year: integer("year").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  budgetBand: varchar("budget_band", { length: 40 }).notNull(),
  investment: varchar("investment", { length: 60 }).notNull(),
  blurb: text("blurb").notNull(),
  brief: text("brief").notNull(),
  approach: text("approach").notNull(),
  outcome: text("outcome").notNull(),
  heroImage: text("hero_image").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  specs: jsonb("specs").$type<{ label: string; value: string }[]>()
    .notNull()
    .default([]),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  materials: jsonb("materials").$type<string[]>().notNull().default([]),
  clientName: varchar("client_name", { length: 90 }).notNull(),
  quote: text("quote").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  suburb: varchar("suburb", { length: 90 }).notNull().default(""),
  projectType: varchar("project_type", { length: 70 }).notNull().default(""),
  scope: text("scope").notNull().default(""),
  budgetBand: varchar("budget_band", { length: 50 }).notNull().default(""),
  timing: varchar("timing", { length: 50 }).notNull().default(""),
  message: text("message").notNull().default(""),
  channel: varchar("channel", { length: 30 }).notNull().default("web"),
  source: varchar("source", { length: 60 }).notNull().default("website"),
  score: integer("score").notNull().default(0),
  grade: varchar("grade", { length: 8 }).notNull().default("warm"),
  estimateLow: integer("estimate_low"),
  estimateHigh: integer("estimate_high"),
  confidence: integer("confidence"),
  quoteRef: varchar("quote_ref", { length: 24 }),
  owner: varchar("owner", { length: 90 }).notNull().default("Jess Navarro"),
  status: varchar("status", { length: 30 }).notNull().default("new"),
  stage: varchar("stage", { length: 40 }).notNull().default("Received"),
  nextActionAt: timestamp("next_action_at", { withTimezone: true }),
  meta: jsonb("meta").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const enquiryEvents = pgTable("enquiry_events", {
  id: serial("id").primaryKey(),
  enquiryId: integer("enquiry_id").notNull(),
  kind: varchar("kind", { length: 40 }).notNull(),
  label: varchar("label", { length: 160 }).notNull(),
  detail: text("detail").notNull().default(""),
  actor: varchar("actor", { length: 90 }).notNull().default("Studio"),
  channel: varchar("channel", { length: 30 }).notNull().default("system"),
  minutesAfter: integer("minutes_after").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  suburb: varchar("suburb", { length: 90 }).notNull().default(""),
  visitType: varchar("visit_type", { length: 60 }).notNull().default("Site visit"),
  slotIso: varchar("slot_iso", { length: 60 }).notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  notes: text("notes").notNull().default(""),
  status: varchar("status", { length: 30 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const chatTurns = pgTable("chat_turns", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  role: varchar("role", { length: 16 }).notNull(),
  content: text("content").notNull(),
  intent: varchar("intent", { length: 60 }).notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const commsLog = pgTable("comms_log", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().default(""),
  channel: varchar("channel", { length: 30 }).notNull(),
  direction: varchar("direction", { length: 16 }).notNull().default("outbound"),
  subject: varchar("subject", { length: 180 }).notNull().default(""),
  body: text("body").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const priceSignals = pgTable("price_signals", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 80 }).notNull(),
  label: varchar("label", { length: 120 }).notNull(),
  baseLow: numeric("base_low").notNull(),
  baseHigh: numeric("base_high").notNull(),
  unit: varchar("unit", { length: 30 }).notNull().default("project"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
export type EnquiryEvent = typeof enquiryEvents.$inferSelect;
export type Booking = typeof bookings.$inferSelect;

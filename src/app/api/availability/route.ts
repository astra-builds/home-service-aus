import { NextResponse } from "next/server";
import { getBookings } from "@/lib/data";
import { generateSlots, groupByDay } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const bookings = await getBookings();
  const taken = bookings
    .filter((b) => b.status === "confirmed")
    .map((b) => new Date(b.slotIso).toISOString());
  const slots = generateSlots(taken);
  return NextResponse.json({
    days: groupByDay(slots),
    total: slots.filter((s) => !s.busy).length,
    leadTime: "36 hours",
  });
}

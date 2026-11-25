import { NextResponse } from "next/server";
import { createBooking, slotTaken } from "@/lib/data";
import { formatSlot } from "@/lib/availability";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      suburb?: string;
      visitType?: string;
      slotIso?: string;
      notes?: string;
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.slotIso) {
      return NextResponse.json(
        { error: "Name, email and a time slot are all required." },
        { status: 400 },
      );
    }

    if (await slotTaken(body.slotIso)) {
      return NextResponse.json(
        { error: "That slot was just taken. Pick another and we'll hold it for you." },
        { status: 409 },
      );
    }

    const row = await createBooking({
      name: body.name.trim().slice(0, 120),
      email: body.email.trim().slice(0, 160),
      phone: body.phone?.slice(0, 40) ?? "",
      suburb: body.suburb ?? "",
      visitType: body.visitType ?? "Site visit",
      slotIso: body.slotIso,
      notes: body.notes?.slice(0, 1500) ?? "",
    });

    const when = formatSlot(row.slotIso);
    return NextResponse.json({
      reference: row.reference,
      when,
      visitType: row.visitType,
      durationMinutes: row.durationMinutes,
    });
  } catch (err) {
    console.error("booking error", err);
    return NextResponse.json(
      { error: "Booking failed on our side. Call the studio and we'll do it by hand." },
      { status: 500 },
    );
  }
}

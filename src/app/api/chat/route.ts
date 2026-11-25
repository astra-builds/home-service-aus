import { NextResponse } from "next/server";
import { receptionist, type ChatCtx } from "@/lib/receptionist";
import { logChat } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      sessionId?: string;
      message?: string;
      slots?: ChatCtx["slots"];
      turns?: { role: "user" | "assistant"; content: string }[];
    };
    const message = (body.message ?? "").slice(0, 1200);
    if (!message) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }
    const ctx: ChatCtx = {
      slots: body.slots ?? {},
      turns: body.turns ?? [],
      asked: [],
    };
    const reply = receptionist(ctx, message);
    if (body.sessionId) {
      void logChat(body.sessionId, "user", message, reply.intent);
      void logChat(body.sessionId, "assistant", reply.reply, reply.intent);
    }
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat error", err);
    return NextResponse.json(
      {
        reply: {
          reply:
            "Something hiccuped on the studio desk. Ask me again — or call the studio and a person will pick it up.",
          intent: "error",
          chips: ["What things cost", "Book a site visit"],
          slots: {},
        },
      },
      { status: 200 },
    );
  }
}

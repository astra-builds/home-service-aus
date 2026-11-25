import { NextResponse } from "next/server";
import { createEnquiry, getProjects, logComms } from "@/lib/data";
import { CATEGORY_TO_TYPE, computeEstimate, type EstimateInput } from "@/lib/estimate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      suburb?: string;
      projectType?: string;
      scope?: string;
      budgetBand?: string;
      timing?: string;
      message?: string;
      channel?: string;
      source?: string;
      estimate?: EstimateInput;
    };

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "We need a name and an email to send anything back." },
        { status: 400 },
      );
    }

    let estimate: ReturnType<typeof computeEstimate> | null = null;
    if (body.estimate?.type) {
      estimate = computeEstimate(body.estimate);
    }

    const row = await createEnquiry({
      name: body.name.trim().slice(0, 120),
      email: body.email.trim().slice(0, 160),
      phone: body.phone?.slice(0, 40) ?? "",
      suburb: body.suburb ?? "",
      projectType: body.projectType ?? "",
      scope: body.scope ?? "",
      budgetBand: body.budgetBand ?? "",
      timing: body.timing ?? "",
      message: body.message?.slice(0, 2000) ?? "",
      channel: body.channel ?? "web",
      source: body.source ?? "website",
      estimateLow: estimate?.low ?? null,
      estimateHigh: estimate?.high ?? null,
      confidence: estimate?.confidence ?? null,
      quoteRef: estimate ? "CP-" + Math.floor(1000 + Math.random() * 8999) : null,
    });

    let comparables: { title: string; suburb: string; value: string; slug: string }[] = [];
    if (estimate?.type) {
      const projects = await getProjects();
      const cat = CATEGORY_TO_TYPE[estimate.type.key];
      comparables = projects
        .filter((p) => p.category === cat)
        .slice(0, 2)
        .map((p) => ({ title: p.title, suburb: p.suburb, value: p.investment, slug: p.slug }));
    }

    await logComms({
      reference: row.reference,
      channel: "whatsapp",
      subject: "Cost plan sent",
      body: `Hi ${row.name.split(" ")[0]} — Jess here from Tallow & Stone. Your cost plan reference is ${row.reference}. ${
        estimate
          ? `Indicative range $${estimate.low.toLocaleString()}–$${estimate.high.toLocaleString()} at ${estimate.confidence}% confidence.`
          : ""
      } Reply here any time.`,
    });

    return NextResponse.json({
      reference: row.reference,
      score: row.score,
      grade: row.grade,
      estimate: estimate
        ? {
            low: estimate.low,
            high: estimate.high,
            confidence: estimate.confidence,
            comparables,
          }
        : null,
    });
  } catch (err) {
    console.error("enquiry error", err);
    return NextResponse.json(
      { error: "That didn't go through on our side. Try again, or email the studio." },
      { status: 500 },
    );
  }
}

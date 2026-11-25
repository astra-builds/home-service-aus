import { NextResponse } from "next/server";
import { computeEstimate, type EstimateInput } from "@/lib/estimate";
import { getProjects } from "@/lib/data";

export const runtime = "nodejs";

const CATEGORY_MAP: Record<string, string> = {
  kitchen: "kitchens",
  bathroom: "bathrooms",
  extension: "extensions",
  fullhome: "fullhome",
  outdoor: "outdoor",
  restoration: "restoration",
};

export async function POST(req: Request) {
  const body = (await req.json()) as EstimateInput;
  const result = computeEstimate(body);
  const projects = await getProjects();
  const cat = body.type ? CATEGORY_MAP[body.type] : undefined;
  const comparables = (cat ? projects.filter((p) => p.category === cat) : projects)
    .slice(0, 2)
    .map((p) => ({ title: p.title, suburb: p.suburb, value: p.investment, slug: p.slug }));
  return NextResponse.json({ result: { ...result, comparables } });
}

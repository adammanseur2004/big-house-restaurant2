import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import type { Review } from "@/types";

export async function GET() {
  const reviews = readJsonFile<Review[]>("reviews.json");
  const approved = reviews.filter((r) => r.approved);
  return NextResponse.json(approved);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const reviews = readJsonFile<Review[]>("reviews.json");
    const newReview: Review = {
      id: Date.now().toString(),
      name,
      rating: parseInt(rating),
      text,
      date: new Date().toISOString().split("T")[0],
      approved: false,
    };
    reviews.push(newReview);
    writeJsonFile("reviews.json", reviews);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import type { GalleryItem } from "@/types";

export async function GET() {
  const gallery = readJsonFile<GalleryItem[]>("gallery.json");
  return NextResponse.json(gallery);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    writeJsonFile("gallery.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

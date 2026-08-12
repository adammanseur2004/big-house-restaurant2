import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import type { MenuItem } from "@/types";

export async function GET() {
  const menu = readJsonFile<MenuItem[]>("menu.json");
  return NextResponse.json(menu);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    writeJsonFile("menu.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

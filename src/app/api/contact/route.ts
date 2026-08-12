import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import type { ContactMessage } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const contacts = readJsonFile<ContactMessage[]>("contacts.json");
    const newContact: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    writeJsonFile("contacts.json", contacts);

    await sendContactNotification(newContact);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  const contacts = readJsonFile<ContactMessage[]>("contacts.json");
  return NextResponse.json(contacts);
}

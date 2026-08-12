import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import { sendReservationNotification, sendClientConfirmation, sendReservationAccepted, sendReservationRejected } from "@/lib/email";
import type { Reservation } from "@/types";

export async function GET() {
  const reservations = readJsonFile<Reservation[]>("reservations.json");
  return NextResponse.json(reservations.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, guests, notes } = body;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 }
      );
    }

    const reservations = readJsonFile<Reservation[]>("reservations.json");
    const newReservation: Reservation = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      date,
      time,
      guests: parseInt(guests),
      notes,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    reservations.push(newReservation);
    writeJsonFile("reservations.json", reservations);

    // Send emails asynchronously (don't block response)
    sendReservationNotification(newReservation).catch(console.error);
    if (email) {
      sendClientConfirmation(newReservation).catch(console.error);
    }

    return NextResponse.json({ success: true, reservation: newReservation });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const reservations = readJsonFile<Reservation[]>("reservations.json");
    const index = reservations.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Réservation non trouvée" }, { status: 404 });
    }

    const oldStatus = reservations[index].status;
    reservations[index].status = status;
    writeJsonFile("reservations.json", reservations);

    // Send acceptance/rejection email if status changed and client has email
    const reservation = reservations[index];
    if (reservation.email && oldStatus !== status) {
      if (status === "confirmed") {
        sendReservationAccepted(reservation).catch(console.error);
      } else if (status === "cancelled") {
        sendReservationRejected(reservation).catch(console.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const reservations = readJsonFile<Reservation[]>("reservations.json");
    const filtered = reservations.filter((r) => r.id !== id);
    writeJsonFile("reservations.json", filtered);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return { success: false, error: "No API key" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export async function sendReservationNotification(reservation: any) {
  if (!ADMIN_EMAIL) return { success: false, error: "No admin email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;background:#0c0c0c;color:#f5f0e8;padding:40px;border-radius:16px;border:1px solid #c9a227">
      <h1 style="color:#c9a227;text-align:center;margin-bottom:30px;font-size:28px">🍽️ Big House Restaurant</h1>
      <h2 style="color:#f5f0e8;margin-bottom:20px">Nouvelle Réservation Reçue</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0;width:140px"><strong>Nom</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.name}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Email</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.email || "Non fourni"}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Téléphone</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.phone}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Date</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.date}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Heure</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.time}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Personnes</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${reservation.guests}</td></tr>
        <tr><td style="padding:10px;color:#c8c0b0"><strong>Notes</strong></td><td style="padding:10px">${reservation.notes || "Aucune"}</td></tr>
      </table>
      <div style="text-align:center;margin-top:30px">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || ""}/admin" style="background:#c9a227;color:#0c0c0c;padding:12px 30px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">Gérer dans l'admin</a>
      </div>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: "Nouvelle Réservation - Big House", html });
}

export async function sendClientConfirmation(reservation: any) {
  if (!reservation.email) return { success: false, error: "No client email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;background:#0c0c0c;color:#f5f0e8;padding:40px;border-radius:16px;border:1px solid #c9a227">
      <h1 style="color:#c9a227;text-align:center;margin-bottom:30px;font-size:28px">🍽️ Big House Restaurant</h1>
      <h2 style="color:#f5f0e8;margin-bottom:20px">Votre demande de réservation est enregistrée</h2>
      <p style="color:#c8c0b0;margin-bottom:20px">Bonjour ${reservation.name},</p>
      <p style="color:#c8c0b0;margin-bottom:20px">Nous avons bien reçu votre demande de réservation. Notre équipe l'examine actuellement et vous recevrez une confirmation sous peu.</p>
      <table style="width:100%;border-collapse:collapse;margin:30px 0;background:#141414;border-radius:12px;overflow:hidden">
        <tr><td style="padding:12px 20px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Date</strong></td><td style="padding:12px 20px;border-bottom:1px solid #1a1a1a">${reservation.date}</td></tr>
        <tr><td style="padding:12px 20px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Heure</strong></td><td style="padding:12px 20px;border-bottom:1px solid #1a1a1a">${reservation.time}</td></tr>
        <tr><td style="padding:12px 20px;color:#c8c0b0"><strong>Personnes</strong></td><td style="padding:12px 20px">${reservation.guests}</td></tr>
      </table>
      <p style="color:#c8c0b0;margin-bottom:10px">À très bientôt,</p>
      <p style="color:#c9a227;font-weight:bold">L'équipe Big House Restaurant</p>
      <p style="color:#666;font-size:12px;margin-top:30px;text-align:center">123 Boulevard Mohamed VI, Alger Centre | +213 793 39 30 30</p>
    </div>
  `;

  return sendEmail({ to: reservation.email, subject: "Demande de réservation reçue - Big House", html });
}

export async function sendReservationAccepted(reservation: any) {
  if (!reservation.email) return { success: false, error: "No client email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;background:#0c0c0c;color:#f5f0e8;padding:40px;border-radius:16px;border:2px solid #22c55e">
      <h1 style="color:#22c55e;text-align:center;margin-bottom:30px;font-size:28px">✅ Réservation Confirmée</h1>
      <h2 style="color:#f5f0e8;margin-bottom:20px">Bonjour ${reservation.name},</h2>
      <p style="color:#c8c0b0;margin-bottom:20px;font-size:16px;line-height:1.6">Nous avons le plaisir de vous confirmer votre réservation au <strong style="color:#c9a227">Big House Restaurant</strong>. Nous vous attendons avec impatience !</p>
      <table style="width:100%;border-collapse:collapse;margin:30px 0;background:#141414;border-radius:12px;overflow:hidden">
        <tr><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#c8c0b0;width:140px"><strong>📅 Date</strong></td><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;font-size:16px">${reservation.date}</td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>🕐 Heure</strong></td><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;font-size:16px">${reservation.time}</td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>👥 Personnes</strong></td><td style="padding:14px 20px;border-bottom:1px solid #1a1a1a;font-size:16px">${reservation.guests}</td></tr>
        <tr><td style="padding:14px 20px;color:#c8c0b0"><strong>📍 Adresse</strong></td><td style="padding:14px 20px;font-size:16px">123 Boulevard Mohamed VI, Alger Centre</td></tr>
      </table>
      <div style="background:#22c55e10;border:1px solid #22c55e30;border-radius:12px;padding:20px;margin:20px 0">
        <p style="color:#22c55e;margin:0;font-size:15px">✓ Votre table est réservée. En cas d'empêchement, merci de nous prévenir au moins 2h à l'avance.</p>
      </div>
      <p style="color:#c8c0b0;margin-bottom:10px">À très bientôt,</p>
      <p style="color:#c9a227;font-weight:bold;font-size:16px">L'équipe Big House Restaurant</p>
      <p style="color:#666;font-size:12px;margin-top:30px;text-align:center">Tél: +213 793 39 30 30 | contact@bighouse.dz</p>
    </div>
  `;

  return sendEmail({ to: reservation.email, subject: "Votre réservation est confirmée - Big House Restaurant", html });
}

export async function sendReservationRejected(reservation: any) {
  if (!reservation.email) return { success: false, error: "No client email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;background:#0c0c0c;color:#f5f0e8;padding:40px;border-radius:16px;border:2px solid #ef4444">
      <h1 style="color:#ef4444;text-align:center;margin-bottom:30px;font-size:28px">❌ Réservation Non Disponible</h1>
      <h2 style="color:#f5f0e8;margin-bottom:20px">Bonjour ${reservation.name},</h2>
      <p style="color:#c8c0b0;margin-bottom:20px;font-size:16px;line-height:1.6">Nous sommes désolés, mais nous ne pouvons pas honorer votre demande de réservation pour le <strong style="color:#c9a227">${reservation.date}</strong> à <strong style="color:#c9a227">${reservation.time}</strong>.</p>
      <div style="background:#ef444410;border:1px solid #ef444430;border-radius:12px;padding:20px;margin:20px 0">
        <p style="color:#ef4444;margin:0;font-size:15px">Cela peut être dû à un manque de disponibilité à cette date et heure. Nous vous invitons à choisir un autre créneau.</p>
      </div>
      <p style="color:#c8c0b0;margin-bottom:20px">N'hésitez pas à nous contacter directement pour trouver une autre date qui vous conviendrait :</p>
      <div style="text-align:center;margin:30px 0">
        <a href="tel:+213793393030" style="background:#c9a227;color:#0c0c0c;padding:14px 30px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:16px">📞 Nous appeler: +213 793 39 30 30</a>
      </div>
      <p style="color:#c8c0b0;margin-bottom:10px">Cordialement,</p>
      <p style="color:#c9a227;font-weight:bold;font-size:16px">L'équipe Big House Restaurant</p>
      <p style="color:#666;font-size:12px;margin-top:30px;text-align:center">123 Boulevard Mohamed VI, Alger Centre | contact@bighouse.dz</p>
    </div>
  `;

  return sendEmail({ to: reservation.email, subject: "Votre réservation - Big House Restaurant", html });
}

export async function sendContactNotification(contact: any) {
  if (!ADMIN_EMAIL) return { success: false, error: "No admin email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;background:#0c0c0c;color:#f5f0e8;padding:40px;border-radius:16px;border:1px solid #c9a227">
      <h1 style="color:#c9a227;text-align:center;margin-bottom:30px;font-size:28px">🍽️ Big House Restaurant</h1>
      <h2 style="color:#f5f0e8;margin-bottom:20px">Nouveau Message de Contact</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0;width:100px"><strong>Nom</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${contact.name}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #1a1a1a;color:#c8c0b0"><strong>Email</strong></td><td style="padding:10px;border-bottom:1px solid #1a1a1a">${contact.email}</td></tr>
        <tr><td style="padding:10px;color:#c8c0b0;vertical-align:top"><strong>Message</strong></td><td style="padding:10px">${contact.message}</td></tr>
      </table>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: "Nouveau Contact - Big House", html });
}

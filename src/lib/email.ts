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
    <h2>Nouvelle Réservation - Big House Restaurant</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.email || "Non fourni"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Téléphone</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Date</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.date}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Heure</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.time}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Personnes</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.guests}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Notes</strong></td><td style="padding:8px;border:1px solid #ddd">${reservation.notes || "Aucune"}</td></tr>
    </table>
    <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin">Voir dans l'admin</a></p>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: "Nouvelle Réservation", html });
}

export async function sendClientConfirmation(reservation: any) {
  if (!reservation.email) return { success: false, error: "No client email" };

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif">
      <h1 style="color:#c9a227">Big House Restaurant</h1>
      <h2>Votre réservation est confirmée</h2>
      <p>Bonjour ${reservation.name},</p>
      <p>Nous avons bien reçu votre demande de réservation :</p>
      <ul>
        <li><strong>Date :</strong> ${reservation.date}</li>
        <li><strong>Heure :</strong> ${reservation.time}</li>
        <li><strong>Personnes :</strong> ${reservation.guests}</li>
      </ul>
      <p>À très bientôt !</p>
      <p style="color:#666;font-size:12px">Big House Restaurant - 123 Boulevard Mohamed VI, Alger</p>
    </div>
  `;

  return sendEmail({ to: reservation.email, subject: "Confirmation de réservation", html });
}

export async function sendContactNotification(contact: any) {
  if (!ADMIN_EMAIL) return { success: false, error: "No admin email" };

  const html = `
    <h2>Nouveau Message de Contact</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd">${contact.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${contact.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${contact.message}</td></tr>
    </table>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: "Nouveau Contact", html });
}

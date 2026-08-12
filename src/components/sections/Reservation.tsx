"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

export default function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });
        setTimeout(() => setSubmitted(false), 8000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00",
  ];

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Réservez
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif mb-4">
            Votre table <span className="text-gold">vous attend</span>
          </h2>
          <p className="text-cream-dim max-w-2xl mx-auto">
            Réservez en quelques clics et profitez d'une expérience gastronomique unique.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal border border-green-800 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif mb-2">Réservation confirmée !</h3>
              <p className="text-cream-dim mb-2">
                Nous avons bien reçu votre demande. Un email de confirmation vous a été envoyé.
              </p>
              <p className="text-sm text-cream-dim">
                À très bientôt au Big House Restaurant !
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-charcoal border border-charcoal-lighter rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-cream-dim mb-2">Nom complet *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none"
                      placeholder="0555 12 34 56"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Nombre de personnes *</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none appearance-none"
                      required
                    >
                      {Array.from({ length: 20 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} personne{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Heure *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none appearance-none"
                      required
                    >
                      <option value="">Choisir une heure</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-cream-dim mb-2">Notes spéciales</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-cream-dim" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full bg-charcoal-light border border-charcoal-lighter rounded-lg pl-10 pr-4 py-3 text-cream focus:border-gold focus:outline-none resize-none"
                    placeholder="Allergies, occasion spéciale..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 text-lg"
              >
                {submitting ? "Confirmation en cours..." : "Confirmer ma réservation"}
              </button>

              <p className="text-xs text-cream-dim text-center">
                * Champs obligatoires. Vous recevrez une confirmation par email si fourni.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

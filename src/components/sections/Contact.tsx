"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Instagram } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const contactInfo = [
    { icon: MapPin, label: "Adresse", value: "123 Boulevard Mohamed VI, Alger Centre" },
    { icon: Phone, label: "Téléphone", value: "+213 793 39 30 30" },
    { icon: Mail, label: "Email", value: "contact@bighouse.dz" },
    { icon: Clock, label: "Horaires", value: "Lun-Dim: 11h - 23h" },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif mb-4">
            Restons en <span className="text-gold">contact</span>
          </h2>
          <p className="text-cream-dim max-w-2xl mx-auto">
            Une question, une suggestion ou une réservation de groupe ? Nous sommes à votre écoute.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-charcoal-light border border-charcoal-lighter rounded-xl p-5"
              >
                <div className="p-3 bg-gold/10 rounded-lg">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{item.label}</h4>
                  <p className="text-cream-dim">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com/bighouse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-charcoal-light border border-charcoal-lighter rounded-lg hover:border-gold/50 hover:text-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/bighouse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-charcoal-light border border-charcoal-lighter rounded-lg hover:border-gold/50 hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video bg-charcoal-light border border-charcoal-lighter rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-gold mx-auto mb-2" />
                <p className="text-cream-dim text-sm">Carte interactive</p>
                <p className="text-xs text-cream-dim/60 mt-1">
                  Configurez NEXT_PUBLIC_GOOGLE_MAPS_URL pour afficher la carte
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className="bg-charcoal-light border border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Message envoyé !</h3>
                <p className="text-cream-dim">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-charcoal-light border border-charcoal-lighter rounded-2xl p-8 space-y-5"
              >
                <div>
                  <label className="block text-sm text-cream-dim mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none resize-none"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? "Envoi..." : "Envoyer le message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

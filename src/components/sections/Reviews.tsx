"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";

const initialReviews = [
  {
    id: "1",
    name: "Karim B.",
    rating: 5,
    text: "Un des meilleurs restaurants d'Alger. Le couscous royal est exceptionnel et le service est impeccable.",
    date: "2026-07-15",
  },
  {
    id: "2",
    name: "Amel D.",
    rating: 5,
    text: "Ambiance chaleureuse, décor magnifique. Parfait pour un dîner en famille.",
    date: "2026-07-10",
  },
  {
    id: "3",
    name: "Youssef M.",
    rating: 4,
    text: "Très bon rapport qualité-prix. Les desserts sont à tomber !",
    date: "2026-06-28",
  },
  {
    id: "4",
    name: "Lyna S.",
    rating: 5,
    text: "Le chakhchoukha est authentique, tout comme à Biskra. Bravo au chef !",
    date: "2026-06-20",
  },
  {
    id: "5",
    name: "Ahmed T.",
    rating: 5,
    text: "Service rapide, personnel accueillant. Je recommande vivement.",
    date: "2026-06-15",
  },
];

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", rating: 5, text: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="avis" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif mb-4">
            Ce que disent nos <span className="text-gold">clients</span>
          </h2>
          <p className="text-cream-dim max-w-2xl mx-auto">
            La satisfaction de nos clients est notre plus grande récompense.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Reviews list */}
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                className="bg-charcoal-light border border-charcoal-lighter rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{review.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${
                            j < review.rating ? "text-gold fill-gold" : "text-charcoal-lighter"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-cream-dim">{review.date}</span>
                </div>
                <p className="text-sm text-cream-dim">{review.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Review form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-charcoal-light border border-charcoal-lighter rounded-2xl p-8"
          >
            <h3 className="text-xl font-serif mb-6">Partagez votre expérience</h3>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <p className="text-center text-cream-dim">
                  Merci pour votre avis ! Il sera publié après validation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-cream-dim mb-2">Votre nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Note</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            i < formData.rating ? "text-gold fill-gold" : "text-charcoal-lighter"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-cream-dim mb-2">Votre avis</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? "Envoi..." : "Envoyer mon avis"}
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

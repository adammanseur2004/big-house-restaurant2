"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryItems = [
  { id: "1", src: "/images/gallery-1.jpg", alt: "Salle principale", category: "Intérieur" },
  { id: "2", src: "/images/gallery-2.jpg", alt: "Terrasse", category: "Extérieur" },
  { id: "3", src: "/images/gallery-3.jpg", alt: "Plat signature", category: "Plats" },
  { id: "4", src: "/images/gallery-4.jpg", alt: "Bar", category: "Intérieur" },
  { id: "5", src: "/images/gallery-5.jpg", alt: "Dessert", category: "Plats" },
  { id: "6", src: "/images/gallery-6.jpg", alt: "Événement", category: "Événements" },
];

const categories = ["Tous", "Intérieur", "Extérieur", "Plats", "Événements"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "Tous"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Galerie
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif mb-4">
            L'ambiance <span className="text-gold">Big House</span>
          </h2>
          <p className="text-cream-dim max-w-2xl mx-auto">
            Un décor élégant et chaleureux pour des moments inoubliables.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? "bg-gold text-charcoal font-semibold"
                  : "bg-charcoal border border-charcoal-lighter text-cream-dim hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i }}
              onClick={() => setLightbox(item.id)}
              className="aspect-square bg-charcoal border border-charcoal-lighter rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                {item.category === "Intérieur" && "🏛️"}
                {item.category === "Extérieur" && "🌿"}
                {item.category === "Plats" && "🍽️"}
                {item.category === "Événements" && "🎉"}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-semibold">{item.alt}</p>
                <p className="text-xs text-cream-dim">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 text-cream hover:text-gold"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full aspect-video bg-charcoal-lighter rounded-2xl flex items-center justify-center text-8xl"
            >
              🖼️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone, Clock } from "lucide-react";
import dynamic from "next/dynamic";

const HeroPlate = dynamic(() => import("@/components/3d/HeroPlate"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gold/20 to-brown border-2 border-gold/30 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-sm">Ouvert aujourd'hui</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-tight mb-6">
              L'authenticité{" "}
              <span className="text-gold">algérienne</span>{" "}
              à chaque bouchée
            </h1>

            <p className="text-lg text-cream-dim mb-8 max-w-lg">
              Découvrez une cuisine raffinée où les saveurs traditionnelles algériennes 
              rencontrent l'élégance moderne. Une expérience gastronomique unique à Alger.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#reservation"
                className="bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                Réserver une table
              </a>
              <a
                href="#menu"
                className="border border-cream-dim/30 hover:border-gold text-cream hover:text-gold px-8 py-3.5 rounded-lg transition-colors"
              >
                Voir le menu
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-cream-dim">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                Alger Centre
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                +213 793 39 30 30
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                11h - 23h
              </div>
            </div>
          </motion.div>

          {/* 3D Plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block"
          >
            <HeroPlate />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#a-propos" className="text-cream-dim hover:text-gold transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}

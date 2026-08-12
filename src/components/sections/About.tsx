"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, ChefHat, Wine } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Années d'expérience" },
  { icon: Users, value: "50K+", label: "Clients satisfaits" },
  { icon: ChefHat, value: "12", label: "Chefs étoilés" },
  { icon: Wine, value: "200+", label: "Vins sélectionnés" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="a-propos" className="py-24 lg:py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
              Notre Histoire
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif mb-6">
              Une tradition de <span className="text-gold">excellence</span> depuis 2009
            </h2>
            <p className="text-cream-dim text-lg leading-relaxed mb-6">
              Big House Restaurant est né d'une passion profonde pour la cuisine algérienne authentique. 
              Fondé par une famille d'Amizour, nous avons apporté les recettes transmises de génération 
              en génération au cœur d'Alger.
            </p>
            <p className="text-cream-dim leading-relaxed mb-8">
              Chaque plat est préparé avec des ingrédients frais et locaux, dans le respect des 
              traditions culinaires du pays. Notre chef exécutive, formée aux plus grandes tables 
              de Paris et Alger, sublime ces saveurs avec une touche contemporaine.
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold transition-colors"
            >
              Découvrir notre menu
              <span className="text-lg">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-charcoal border border-charcoal-lighter rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="text-3xl font-serif text-cream mb-1">{stat.value}</div>
                <div className="text-sm text-cream-dim">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

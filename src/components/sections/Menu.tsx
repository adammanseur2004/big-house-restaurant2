"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame } from "lucide-react";
import type { MenuItem } from "@/types";

const categories = [
  "Tous",
  "Entrées",
  "Plats Traditionnels",
  "Plats Principaux",
  "Pizzas",
  "Desserts",
  "Boissons",
];

const initialMenu: MenuItem[] = [
  {
    id: "1",
    name: "Couscous Royal",
    description: "Semoule fine aux légumes, agneau, poulet et merguez",
    price: 1200,
    category: "Plats Traditionnels",
    image: "/images/couscous.jpg",
    popular: true,
  },
  {
    id: "2",
    name: "Chakhchoukha Biskria",
    description: "Pâtes traditionnelles à la sauce tomate et viande",
    price: 1100,
    category: "Plats Traditionnels",
    image: "/images/chakhchoukha.jpg",
    popular: true,
  },
  {
    id: "3",
    name: "Carpaccio de Boeuf",
    description: "Fines tranches de bœuf, roquette, parmesan, huile d'olive",
    price: 950,
    category: "Entrées",
    image: "/images/carpaccio.jpg",
    popular: false,
  },
  {
    id: "4",
    name: "Salade César",
    description: "Poulet grillé, croûtons, parmesan, sauce César maison",
    price: 750,
    category: "Entrées",
    image: "/images/salad.jpg",
    popular: false,
  },
  {
    id: "5",
    name: "Filet de Boeuf",
    description: "Filet grillé, sauce au poivre, purée maison",
    price: 1800,
    category: "Plats Principaux",
    image: "/images/filet.jpg",
    popular: true,
  },
  {
    id: "6",
    name: "Riz aux Fruits de Mer",
    description: "Riz crémeux aux crevettes, calamars et moules",
    price: 1400,
    category: "Plats Principaux",
    image: "/images/riz-mer.jpg",
    popular: false,
  },
  {
    id: "7",
    name: "Pizza Margherita",
    description: "Tomate, mozzarella di bufala, basilic frais",
    price: 800,
    category: "Pizzas",
    image: "/images/pizza.jpg",
    popular: false,
  },
  {
    id: "8",
    name: "Tiramisu Maison",
    description: "Mascarpone, café, cacao, biscuits à la cuillère",
    price: 550,
    category: "Desserts",
    image: "/images/tiramisu.jpg",
    popular: true,
  },
  {
    id: "9",
    name: "Crème Brûlée",
    description: "Vanille de Madagascar, caramel croustillant",
    price: 500,
    category: "Desserts",
    image: "/images/creme-brulee.jpg",
    popular: false,
  },
  {
    id: "10",
    name: "Thé à la Menthe",
    description: "Thé vert, menthe fraîche, pignons de pin",
    price: 250,
    category: "Boissons",
    image: "/images/the-menthe.jpg",
    popular: false,
  },
  {
    id: "11",
    name: "Jus d'Orange Frais",
    description: "Oranges pressées à la commande",
    price: 350,
    category: "Boissons",
    image: "/images/jus-orange.jpg",
    popular: false,
  },
  {
    id: "12",
    name: "Café Algérois",
    description: "Café fort aux épices, servi dans un dallah",
    price: 200,
    category: "Boissons",
    image: "/images/cafe.jpg",
    popular: true,
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "Tous"
      ? initialMenu
      : initialMenu.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Notre Carte
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif mb-4">
            Un voyage <span className="text-gold">gastronomique</span>
          </h2>
          <p className="text-cream-dim max-w-2xl mx-auto">
            Des entrées raffinées aux desserts gourmands, chaque plat raconte une histoire 
            de passion et de tradition.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? "bg-gold text-charcoal font-semibold"
                  : "bg-charcoal-light border border-charcoal-lighter text-cream-dim hover:text-cream hover:border-gold/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="group bg-charcoal-light border border-charcoal-lighter rounded-2xl overflow-hidden hover:border-gold/30 transition-all"
            >
              <div className="aspect-[4/3] bg-charcoal-lighter flex items-center justify-center text-5xl relative overflow-hidden">
                <span className="group-hover:scale-110 transition-transform duration-500">
                  {item.category === "Plats Traditionnels" && "🍲"}
                  {item.category === "Entrées" && "🥗"}
                  {item.category === "Plats Principaux" && "🥩"}
                  {item.category === "Pizzas" && "🍕"}
                  {item.category === "Desserts" && "🍰"}
                  {item.category === "Boissons" && "☕"}
                </span>
                {item.popular && (
                  <div className="absolute top-3 right-3 bg-gold text-charcoal text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Populaire
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-gold font-bold">{item.price} DA</span>
                </div>
                <p className="text-sm text-cream-dim">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

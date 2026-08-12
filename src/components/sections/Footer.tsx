"use client";

import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-light border-t border-charcoal-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif text-gold mb-4">Big House</h3>
            <p className="text-sm text-cream-dim leading-relaxed">
              L'authenticité algérienne à chaque bouchée. Une expérience gastronomique 
              unique au cœur d'Alger.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li><a href="#accueil" className="hover:text-gold transition-colors">Accueil</a></li>
              <li><a href="#a-propos" className="hover:text-gold transition-colors">À Propos</a></li>
              <li><a href="#menu" className="hover:text-gold transition-colors">Menu</a></li>
              <li><a href="#galerie" className="hover:text-gold transition-colors">Galerie</a></li>
              <li><a href="#reservation" className="hover:text-gold transition-colors">Réservation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream-dim">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                123 Blvd Mohamed VI, Alger
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                +213 793 39 30 30
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                contact@bighouse.dz
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                Lun-Dim: 11h - 23h
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/bighouse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-charcoal border border-charcoal-lighter rounded-lg hover:border-gold/50 hover:text-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/bighouse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-charcoal border border-charcoal-lighter rounded-lg hover:border-gold/50 hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <a
                href="/admin"
                className="text-xs text-cream-dim/50 hover:text-cream-dim transition-colors"
              >
                Administration
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-lighter mt-12 pt-8 text-center text-sm text-cream-dim/60">
          <p>© 2026 Big House Restaurant. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

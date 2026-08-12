"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Calendar,
  Utensils,
  Image,
  Star,
  Settings,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Check,
  X,
  Menu,
  ChevronDown,
  Send,
  Bell,
} from "lucide-react";
import type { Reservation, MenuItem, GalleryItem, Review, ContactMessage, Settings as SettingsType } from "@/types";

type Tab = "reservations" | "menu" | "gallery" | "reviews" | "contacts" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("reservations");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function fetchAllData() {
    try {
      const [res, menuRes, galRes, revRes, conRes, setRes] = await Promise.all([
        fetch("/api/reservations"),
        fetch("/api/menu"),
        fetch("/api/gallery"),
        fetch("/api/reviews"),
        fetch("/api/contact"),
        fetch("/api/settings"),
      ]);

      setReservations(await res.json());
      setMenu(await menuRes.json());
      setGallery(await galRes.json());
      const allReviews = await revRes.json();
      setReviews(allReviews);
      setContacts(await conRes.json());
      setSettings(await setRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function updateReservationStatus(id: string, status: Reservation["status"]) {
    try {
      const res = await fetch("/api/reservations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        const reservation = reservations.find((r) => r.id === id);
        if (status === "confirmed") {
          setToast({ message: `Réservation de ${reservation?.name} acceptée ! Email envoyé au client.`, type: "success" });
        } else if (status === "cancelled") {
          setToast({ message: `Réservation de ${reservation?.name} rejetée. Email envoyé au client.`, type: "success" });
        }
        fetchAllData();
      } else {
        setToast({ message: "Erreur lors de la mise à jour", type: "error" });
      }
    } catch {
      setToast({ message: "Erreur de connexion", type: "error" });
    }
  }

  async function deleteReservation(id: string) {
    if (!confirm("Supprimer cette réservation ?")) return;
    try {
      const res = await fetch("/api/reservations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setToast({ message: "Réservation supprimée", type: "success" });
        fetchAllData();
      }
    } catch {
      setToast({ message: "Erreur lors de la suppression", type: "error" });
    }
  }

  async function approveReview(id: string) {
    try {
      const allReviews = await fetch("/api/reviews").then((r) => r.json());
      const updated = allReviews.map((rev: Review) =>
        rev.id === id ? { ...rev, approved: true } : rev
      );
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setToast({ message: "Avis approuvé et publié !", type: "success" });
      fetchAllData();
    } catch {
      setToast({ message: "Erreur", type: "error" });
    }
  }

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: "reservations", label: "Réservations", icon: Calendar, count: reservations.filter((r) => r.status === "pending").length },
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "gallery", label: "Galerie", icon: Image },
    { id: "reviews", label: "Avis", icon: Star },
    { id: "contacts", label: "Messages", icon: MessageSquare, count: contacts.length },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-0 left-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${
              toast.type === "success" ? "bg-green-900/90 border border-green-700 text-green-100" : "bg-red-900/90 border border-red-700 text-red-100"
            }`}
          >
            {toast.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-charcoal-light border-b border-charcoal-lighter sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-charcoal-lighter rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-serif text-gold">Big House Admin</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-cream-dim hover:text-gold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:block w-64 bg-charcoal-light border-r border-charcoal-lighter min-h-[calc(100vh-65px)] lg:sticky lg:top-[65px]`}
        >
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-gold/10 text-gold"
                    : "text-cream-dim hover:bg-charcoal-lighter hover:text-cream"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.count ? (
                  <span className="bg-gold text-charcoal text-xs font-bold px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {activeTab === "reservations" && (
                <ReservationsTab reservations={reservations} onUpdate={updateReservationStatus} onDelete={deleteReservation} />
              )}
              {activeTab === "menu" && <MenuTab menu={menu} />}
              {activeTab === "gallery" && <GalleryTab gallery={gallery} />}
              {activeTab === "reviews" && <ReviewsTab reviews={reviews} onApprove={approveReview} />}
              {activeTab === "contacts" && <ContactsTab contacts={contacts} />}
              {activeTab === "settings" && settings && <SettingsTab settings={settings} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function ReservationsTab({
  reservations,
  onUpdate,
  onDelete,
}: {
  reservations: Reservation[];
  onUpdate: (id: string, status: Reservation["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  const statusColors = {
    pending: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
    confirmed: "bg-green-900/30 text-green-400 border-green-800",
    cancelled: "bg-red-900/30 text-red-400 border-red-800",
  };

  const statusLabels = {
    pending: "En attente",
    confirmed: "Acceptée",
    cancelled: "Rejetée",
  };

  const pendingCount = reservations.filter((r) => r.status === "pending").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-serif">Réservations</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-yellow-400 mt-1 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              {pendingCount} réservation{pendingCount > 1 ? "s" : ""} en attente de réponse
            </p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                filter === f ? "bg-gold text-charcoal" : "bg-charcoal-lighter text-cream-dim hover:text-cream"
              }`}
            >
              {f === "all" ? "Toutes" : statusLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-cream-dim">Aucune réservation</div>
        )}
        {filtered.map((res) => (
          <div key={res.id} className={`bg-charcoal-light border rounded-xl p-5 transition-all ${
            res.status === "pending" ? "border-yellow-800/50 shadow-lg shadow-yellow-900/10" : "border-charcoal-lighter"
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-lg">{res.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[res.status]}`}>
                    {statusLabels[res.status]}
                  </span>
                  {res.status === "pending" && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full animate-pulse">
                      Nouveau
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-cream-dim">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {res.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {res.time}
                  </div>
                  <div>{res.guests} personne{res.guests > 1 ? "s" : ""}</div>
                  <div>{res.phone}</div>
                </div>
                {res.email && (
                  <div className="text-sm text-cream-dim mt-1 flex items-center gap-1.5">
                    <Send className="w-3 h-3" />
                    {res.email}
                    {res.status === "pending" && <span className="text-xs text-yellow-400/70">(recevra une notification)</span>}
                  </div>
                )}
                {res.notes && <div className="text-sm text-cream-dim mt-1 italic bg-charcoal/50 p-2 rounded-lg">{res.notes}</div>}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {res.status === "pending" && (
                  <>
                    <button
                      onClick={() => onUpdate(res.id, "confirmed")}
                      className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm font-semibold"
                      title="Accepter la réservation et notifier le client par email"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Accepter</span>
                    </button>
                    <button
                      onClick={() => onUpdate(res.id, "cancelled")}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-semibold"
                      title="Rejeter la réservation et notifier le client par email"
                    >
                      <XCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Rejeter</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDelete(res.id)}
                  className="p-2.5 bg-charcoal border border-charcoal-lighter text-red-400 rounded-lg hover:bg-red-900/20 hover:border-red-800 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuTab({ menu }: { menu: MenuItem[] }) {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Menu ({menu.length} plats)</h2>
      <div className="grid gap-3">
        {menu.map((item) => (
          <div key={item.id} className="bg-charcoal-light border border-charcoal-lighter rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-charcoal-lighter rounded-lg flex items-center justify-center text-2xl">
              🍽️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{item.name}</h3>
                {item.popular && (
                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">Populaire</span>
                )}
              </div>
              <p className="text-sm text-cream-dim">{item.description}</p>
              <div className="flex items-center gap-3 mt-1 text-sm">
                <span className="text-gold font-semibold">{item.price} DA</span>
                <span className="text-cream-dim">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryTab({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Galerie ({gallery.length} photos)</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-charcoal-light border border-charcoal-lighter rounded-xl overflow-hidden">
            <div className="aspect-square bg-charcoal-lighter flex items-center justify-center text-4xl">
              🖼️
            </div>
            <div className="p-3">
              <p className="text-sm font-medium">{item.alt}</p>
              <p className="text-xs text-cream-dim">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab({
  reviews,
  onApprove,
}: {
  reviews: Review[];
  onApprove: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Avis clients</h2>
      <div className="space-y-3">
        {reviews.length === 0 && <div className="text-center py-12 text-cream-dim">Aucun avis</div>}
        {reviews.map((review) => (
          <div key={review.id} className="bg-charcoal-light border border-charcoal-lighter rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? "text-gold fill-gold" : "text-charcoal-lighter"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-cream-dim mb-2">{review.date}</p>
                <p className="text-sm">{review.text}</p>
              </div>
              {!review.approved && (
                <button
                  onClick={() => onApprove(review.id)}
                  className="px-3 py-1.5 bg-gold/20 text-gold text-sm rounded-lg hover:bg-gold/30 transition-colors"
                >
                  Approuver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsTab({ contacts }: { contacts: ContactMessage[] }) {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Messages ({contacts.length})</h2>
      <div className="space-y-3">
        {contacts.length === 0 && <div className="text-center py-12 text-cream-dim">Aucun message</div>}
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-charcoal-light border border-charcoal-lighter rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{contact.name}</h3>
              <span className="text-xs text-cream-dim">{new Date(contact.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
            <p className="text-sm text-gold mb-2">{contact.email}</p>
            <p className="text-sm">{contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({ settings }: { settings: SettingsType }) {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Paramètres</h2>
      <div className="bg-charcoal-light border border-charcoal-lighter rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm text-cream-dim mb-2">Nom du restaurant</label>
          <input type="text" defaultValue={settings.restaurantName} className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-2 text-cream" readOnly />
        </div>
        <div>
          <label className="block text-sm text-cream-dim mb-2">Téléphone</label>
          <input type="text" defaultValue={settings.phone} className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-2 text-cream" readOnly />
        </div>
        <div>
          <label className="block text-sm text-cream-dim mb-2">Email</label>
          <input type="text" defaultValue={settings.email} className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-2 text-cream" readOnly />
        </div>
        <div>
          <label className="block text-sm text-cream-dim mb-2">Adresse</label>
          <input type="text" defaultValue={settings.address} className="w-full bg-charcoal border border-charcoal-lighter rounded-lg px-4 py-2 text-cream" readOnly />
        </div>
        <div className="pt-4 border-t border-charcoal-lighter">
          <p className="text-sm text-cream-dim">
            Les paramètres sont stockés dans <code className="bg-charcoal px-2 py-1 rounded">src/data/settings.json</code>.
            Modifiez ce fichier et redéployez pour mettre à jour.
          </p>
        </div>
      </div>
    </div>
  );
}

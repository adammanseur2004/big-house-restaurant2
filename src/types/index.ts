export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email?: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface Settings {
  restaurantName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  openingHours: Record<string, string>;
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Big House Restaurant - Cuisine Algérienne & Internationale",
  description: "Découvrez l'authenticité algérienne à chaque bouchée. Restaurant premium à Alger.",
  keywords: ["restaurant", "alger", "cuisine algérienne", "couscous", "chakhchoukha"],
  openGraph: {
    title: "Big House Restaurant",
    description: "Cuisine Algérienne & Internationale à Alger",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}

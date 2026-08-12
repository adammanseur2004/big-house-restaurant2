import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Reservation from "@/components/sections/Reservation";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Navigation from "@/components/sections/Navigation";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <Reservation />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

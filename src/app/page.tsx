import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoServices from "@/components/BentoServices";
import Showcase from "@/components/Showcase";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BentoServices />
        <Showcase />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}

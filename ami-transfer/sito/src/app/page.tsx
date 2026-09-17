import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Cycle from "@/components/sections/Cycle";
import Pitch from "@/components/sections/Pitch";
import Departments from "@/components/sections/Departments";
import Sectors from "@/components/sections/Sectors";
import Service from "@/components/sections/Service";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Facts />
      <Cycle />
      <Pitch />
      <Departments />
      <Sectors />
      <Service />
      <Contact />
      <Footer />
    </>
  );
}

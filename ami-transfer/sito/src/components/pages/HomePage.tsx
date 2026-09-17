import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Cycle from "@/components/sections/Cycle";
import Pitch from "@/components/sections/Pitch";
import Departments from "@/components/sections/Departments";
import Sectors from "@/components/sections/Sectors";
import Service from "@/components/sections/Service";
import CtaBand from "@/components/sections/CtaBand";
import type { Dictionary } from "@/i18n";

export default function HomePage({ d }: { d: Dictionary }) {
  return (
    <>
      <Hero d={d} />
      <Facts d={d} />
      <Cycle d={d} />
      <Pitch />
      <Departments d={d} />
      <Sectors d={d} />
      <Service d={d} />
      <CtaBand d={d} />
    </>
  );
}

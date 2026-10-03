import { AdminPreview } from "@/components/landing/AdminPreview";
import { Benefits } from "@/components/landing/Benefits";
import { Catalog } from "@/components/landing/Catalog";
import { Effects } from "@/components/landing/Effects";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { getVehicles } from "@/lib/supabase";

export const revalidate = 60;

export default async function Home() {
  const vehicles = await getVehicles();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalog vehicles={vehicles} />
        <HowItWorks />
        <Benefits vehicles={vehicles} />
        <AdminPreview initialVehicles={vehicles} />
        <FinalCta />
      </main>
      <Footer />
      <Effects />
    </>
  );
}

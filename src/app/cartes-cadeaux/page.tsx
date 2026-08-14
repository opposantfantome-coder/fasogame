import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = {
  title: "Cartes cadeaux",
  openGraph: {
    title: "Cartes cadeaux — FasoGame",
    description: "Cartes cadeaux PlayStation, Xbox, Nintendo et Steam chez FasoGame.",
    images: [{ url: "/logo-fasogame.png", width: 512, height: 512, alt: "FasoGame" }],
  },
};

export default function PageCartesCadeaux() {
  return <VitrineCategorie categorie="Cartes cadeaux" titre="Cartes cadeaux" />;
}

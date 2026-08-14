import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = {
  title: "Manettes",
  openGraph: {
    title: "Manettes — FasoGame",
    description: "Manettes PlayStation, Xbox et Nintendo chez FasoGame.",
    images: [{ url: "/logo-fasogame.png", width: 512, height: 512, alt: "FasoGame" }],
  },
};

export default function PageManettes() {
  return <VitrineCategorie categorie="Manettes" titre="Manettes" />;
}

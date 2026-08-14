import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = {
  title: "Accessoires",
  openGraph: {
    title: "Accessoires — FasoGame",
    description: "Accessoires gaming chez FasoGame.",
    images: [{ url: "/logo-fasogame.png", width: 512, height: 512, alt: "FasoGame" }],
  },
};

export default function PageAccessoires() {
  return <VitrineCategorie categorie="Accessoires" titre="Accessoires" />;
}

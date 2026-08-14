import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = {
  title: "Consoles",
  openGraph: {
    title: "Consoles — FasoGame",
    description: "Consoles PlayStation, Xbox et Nintendo chez FasoGame.",
    images: [{ url: "/logo-fasogame.png", width: 512, height: 512, alt: "FasoGame" }],
  },
};

export default function PageConsoles() {
  return <VitrineCategorie categorie="Consoles" titre="Consoles" />;
}

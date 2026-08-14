import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = {
  title: "Jeux",
  openGraph: {
    title: "Jeux — FasoGame",
    description: "Jeux PlayStation, Xbox et Nintendo chez FasoGame.",
    images: [{ url: "/logo-fasogame.png", width: 512, height: 512, alt: "FasoGame" }],
  },
};

export default function PageJeux() {
  return <VitrineCategorie categorie="Jeux" titre="Jeux" />;
}

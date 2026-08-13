import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = { title: "Jeux" };

export default function PageJeux() {
  return <VitrineCategorie categorie="Jeux" titre="Jeux" />;
}

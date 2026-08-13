import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = { title: "Cartes cadeaux" };

export default function PageCartesCadeaux() {
  return <VitrineCategorie categorie="Cartes cadeaux" titre="Cartes cadeaux" />;
}

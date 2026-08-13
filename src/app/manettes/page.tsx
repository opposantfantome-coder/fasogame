import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = { title: "Manettes" };

export default function PageManettes() {
  return <VitrineCategorie categorie="Manettes" titre="Manettes" />;
}

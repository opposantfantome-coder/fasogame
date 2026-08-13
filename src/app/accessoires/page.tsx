import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = { title: "Accessoires" };

export default function PageAccessoires() {
  return <VitrineCategorie categorie="Accessoires" titre="Accessoires" />;
}

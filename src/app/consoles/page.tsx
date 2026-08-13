import type { Metadata } from "next";
import VitrineCategorie from "@/components/VitrineCategorie";

export const metadata: Metadata = { title: "Consoles" };

export default function PageConsoles() {
  return <VitrineCategorie categorie="Consoles" titre="Consoles" />;
}

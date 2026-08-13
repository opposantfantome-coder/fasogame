import type { Metadata } from "next";
import CommandeClient from "@/components/CommandeClient";

export const metadata: Metadata = { title: "Commande" };

export default function PageCommande() {
  return <CommandeClient />;
}

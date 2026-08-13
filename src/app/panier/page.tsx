import type { Metadata } from "next";
import PanierClient from "@/components/PanierClient";

export const metadata: Metadata = { title: "Mon panier" };

export default function PagePanier() {
  return <PanierClient />;
}

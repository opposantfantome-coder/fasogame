import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogueClient from "@/components/CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Tous les produits FasoGame, filtrables par catégorie, plateforme et genre.",
};

export default function PageCatalogue() {
  return (
    <Suspense fallback={null}>
      <CatalogueClient />
    </Suspense>
  );
}

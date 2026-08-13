import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUITS, produitParId } from "@/lib/data";
import FicheProduitClient from "@/components/FicheProduitClient";

export function generateStaticParams() {
  return PRODUITS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const produit = produitParId(id);
  if (!produit) return {};
  return {
    title: produit.nom,
    description: `${produit.nom} — ${produit.categorie} disponible chez FasoGame. [Description à fournir]`,
    openGraph: {
      title: produit.nom,
      description: "[Description à fournir]",
      type: "website",
    },
  };
}

export default async function PageProduit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produit = produitParId(id);
  if (!produit) notFound();

  return (
    <Suspense fallback={null}>
      <FicheProduitClient produit={produit} />
    </Suspense>
  );
}

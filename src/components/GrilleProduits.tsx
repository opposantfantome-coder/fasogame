import CarteProduit from "./CarteProduit";
import type { Produit } from "@/lib/types";

export default function GrilleProduits({
  produits,
  messageVide = "Aucun produit ne correspond à ces filtres.",
}: {
  produits: Produit[];
  messageVide?: string;
}) {
  if (produits.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-card-border bg-bg-alt py-16 text-center">
        <p className="text-text-muted">{messageVide}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {produits.map((p) => (
        <CarteProduit key={p.id} produit={p} />
      ))}
    </div>
  );
}

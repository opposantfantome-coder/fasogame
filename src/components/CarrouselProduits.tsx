import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CarteProduit from "./CarteProduit";
import type { Produit } from "@/lib/types";

export default function CarrouselProduits({
  titre,
  produits,
  lienTout,
  sombre = false,
}: {
  titre: string;
  produits: Produit[];
  lienTout: string;
  sombre?: boolean;
}) {
  if (produits.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2
          className={`font-display text-[22px] font-bold mt-8 mb-4 ${sombre ? "text-white" : "text-marine"}`}
        >
          {titre}
        </h2>
        <Link
          href={lienTout}
          className={`flex items-center gap-0.5 text-sm font-medium transition-colors ${
            sombre ? "text-text-secondary hover:text-white" : "text-text-muted hover:text-text"
          }`}
        >
          Tout <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
        {produits.map((p) => (
          <div key={p.id} className="w-[42vw] shrink-0 snap-start sm:w-[220px]">
            <CarteProduit produit={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

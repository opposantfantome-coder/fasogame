import Link from "next/link";
import ImageProduit from "./ImageProduit";
import PastillePlateforme from "./PastillePlateforme";
import { estMulti, famillesDuProduit } from "@/lib/familles";
import type { Produit } from "@/lib/types";

function etatStock(produit: Produit): "en-stock" | "sur-commande" | "epuise" {
  if (produit.variantes.some((v) => v.disponibilite === "En stock")) return "en-stock";
  if (produit.variantes.some((v) => v.disponibilite === "Sur commande")) return "sur-commande";
  return "epuise";
}

export default function CarteProduit({ produit }: { produit: Produit }) {
  const familles = famillesDuProduit(produit);
  const multi = estMulti(produit);
  const etat = etatStock(produit);

  return (
    <Link
      href={`/produit/${produit.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-card-border bg-card-bg card-shadow transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <ImageProduit
          id={produit.id}
          nom={produit.nom}
          categorie={produit.categorie}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        {etat !== "en-stock" && (
          <span className="absolute left-2 top-2 rounded-full border border-card-border bg-card-bg/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
            {etat === "sur-commande" ? "Sur commande" : "Épuisé"}
          </span>
        )}
        {produit.miseEnAvant && (
          <span className="absolute right-2 top-2 rounded-full bg-red px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            À la une
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-card-bg p-3">
        <p className="line-clamp-2 min-h-[2.5em] text-[15px] font-medium leading-tight text-text">
          {produit.nom}
        </p>
        <div className="mt-auto flex items-center gap-1.5">
          {multi ? (
            <span className="text-[10px] uppercase tracking-wide text-text-muted">
              Multi-plateformes
            </span>
          ) : (
            familles.map((f) => <PastillePlateforme key={f} famille={f} />)
          )}
        </div>
      </div>
    </Link>
  );
}

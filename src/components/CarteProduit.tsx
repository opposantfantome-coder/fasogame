"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import ImageProduit from "./ImageProduit";
import PastillePlateforme from "./PastillePlateforme";
import EtiquetteDisponibilite from "./EtiquetteDisponibilite";
import Notification from "./Notification";
import VoletVariantes from "./VoletVariantes";
import { usePanier } from "./PanierProvider";
import { estMonoVariante, famillesDuProduit, formaterPrix, prixMinimum } from "@/lib/familles";
import type { Disponibilite, Produit, Variante } from "@/lib/types";

function disponibiliteCarte(produit: Produit): Disponibilite {
  if (produit.variantes.some((v) => v.disponibilite === "En stock")) return "En stock";
  if (produit.variantes.some((v) => v.disponibilite === "Sur commande")) return "Sur commande";
  return "Épuisé";
}

/** Prix exact si mono-variante, "À partir de X FCFA" si multi, [Prix à fournir] si tout est à null (spec §6.2). */
function prixAffiche(produit: Produit): string {
  if (estMonoVariante(produit)) return formaterPrix(produit.variantes[0].prix);
  const min = prixMinimum(produit);
  return min === null ? formaterPrix(null) : `À partir de ${formaterPrix(min)}`;
}

export default function CarteProduit({ produit }: { produit: Produit }) {
  const { ajouter } = usePanier();
  const familles = famillesDuProduit(produit);
  const mono = estMonoVariante(produit);

  const [voletOuvert, setVoletOuvert] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  function ajouterEtConfirmer(variante: Variante) {
    ajouter(produit.id, variante.id);
    setNotification(`${produit.nom} ajouté au panier`);
  }

  function clicAjout(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (mono) {
      ajouterEtConfirmer(produit.variantes[0]);
    } else {
      setVoletOuvert(true);
    }
  }

  return (
    <>
      <Link
        href={`/produit/${produit.id}`}
        className="group flex flex-col overflow-hidden rounded-md border border-card-border bg-card-bg card-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        {/* 1. Étiquette de disponibilité + 2. Image carrée 1:1 */}
        <div className="relative aspect-square w-full overflow-hidden">
          <ImageProduit
            images={produit.images}
            nom={produit.nom}
            categorie={produit.categorie}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <EtiquetteDisponibilite disponibilite={disponibiliteCarte(produit)} />
          {produit.miseEnAvant && (
            <span className="absolute right-2 top-2 rounded-full bg-red px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              À la une
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 bg-card-bg p-3">
          {/* 3. Catégorie, petites capitales rouges */}
          <p className="text-[10px] font-semibold uppercase tracking-wide text-red">
            {produit.categorie}
          </p>

          {/* 4. Nom, deux lignes maximum, troncature en fin de mot */}
          <p className="line-clamp-2 min-h-[2.5em] text-[15px] font-medium leading-tight text-text">
            {produit.nom}
          </p>

          {/* 5. Rangée de pastilles de plateforme */}
          <div className="flex items-center gap-1.5">
            {familles.map((f) => (
              <PastillePlateforme key={f} famille={f} />
            ))}
          </div>

          {/* 6. Prix + 7. Bouton d'ajout, en bas à droite */}
          <div className="mt-auto flex items-end justify-between gap-2 pt-1">
            <span className="font-display text-[18px] font-bold leading-none text-text">
              {prixAffiche(produit)}
            </span>
            <button
              onClick={clicAjout}
              aria-label={`Ajouter ${produit.nom} au panier`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-red-dark"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>

      {!mono && (
        <VoletVariantes
          open={voletOuvert}
          variantes={produit.variantes}
          onClose={() => setVoletOuvert(false)}
          onChoisir={(variante) => {
            if (variante.disponibilite === "Épuisé") return;
            ajouterEtConfirmer(variante);
            setVoletOuvert(false);
          }}
        />
      )}

      <Notification
        message={notification ?? ""}
        visible={notification !== null}
        onHide={() => setNotification(null)}
      />
    </>
  );
}

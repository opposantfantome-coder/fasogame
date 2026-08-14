"use client";

import Link from "next/link";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Container from "./Container";
import ImageProduit from "./ImageProduit";
import { usePanier } from "./PanierProvider";
import { PRODUITS } from "@/lib/data";
import { QUANTITE_MAX, QUANTITE_MIN, lignesResolues } from "@/lib/panier";
import { formaterPrix } from "@/lib/familles";

export default function PanierClient() {
  const { lignes, totaux, modifierQuantite, supprimer } = usePanier();
  const resolues = lignesResolues(lignes, PRODUITS);

  if (resolues.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-placeholder-icon" strokeWidth={1.25} />
        <p className="text-text-muted">Votre panier est vide.</p>
        <Link
          href="/catalogue"
          className="rounded-pill bg-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
        >
          Voir le catalogue
        </Link>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-4 py-5 pb-12">
      <p className="text-xs text-text-muted">
        <Link href="/" className="hover:text-text">
          Accueil
        </Link>{" "}
        › Mon panier
      </p>

      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-[22px] font-bold text-marine">Mon Panier</h1>
        <span className="text-sm text-text-muted">
          {totaux.nombreArticles} article{totaux.nombreArticles > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {resolues.map(({ ligne, produit, variante }) => {
          const lignePrix = variante.prix === null ? null : variante.prix * ligne.quantite;
          const auMinimum = ligne.quantite <= QUANTITE_MIN;
          return (
            <div
              key={`${ligne.produitId}-${ligne.varianteId}`}
              className="flex gap-3 rounded-md border border-card-border bg-card-bg p-3 card-shadow"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded">
                <ImageProduit
                  images={produit.images}
                  nom={produit.nom}
                  categorie={produit.categorie}
                  className="h-full w-full"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-text">{produit.nom}</p>
                    {/* La plateforme s'affiche sous le nom, sans exception (spec §4.4). */}
                    <p className="text-xs text-text-muted">
                      {variante.plateforme} · {produit.categorie}
                    </p>
                  </div>
                  <button
                    onClick={() => supprimer(ligne.produitId, ligne.varianteId)}
                    aria-label={`Retirer ${produit.nom} du panier`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-text-muted transition-colors hover:text-red"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        auMinimum
                          ? supprimer(ligne.produitId, ligne.varianteId)
                          : modifierQuantite(ligne.produitId, ligne.varianteId, ligne.quantite - 1)
                      }
                      aria-label={auMinimum ? "Retirer l'article" : "Diminuer la quantité"}
                      className="flex h-11 w-11 items-center justify-center rounded border border-card-border text-text transition-colors hover:bg-bg-alt"
                    >
                      {auMinimum ? (
                        <Trash2 className="h-3.5 w-3.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5" />
                      )}
                    </button>
                    {/* Quantité : un entier brut, jamais formaté avec séparateur de milliers. */}
                    <span className="w-6 text-center text-sm tabular-nums">{ligne.quantite}</span>
                    <button
                      onClick={() => modifierQuantite(ligne.produitId, ligne.varianteId, ligne.quantite + 1)}
                      disabled={ligne.quantite >= QUANTITE_MAX}
                      aria-label="Augmenter la quantité"
                      className="flex h-11 w-11 items-center justify-center rounded border border-card-border text-text transition-colors hover:bg-bg-alt disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display text-sm font-semibold text-text">
                    {formaterPrix(lignePrix)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 border-t border-card-border pt-4 text-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-text-muted">
            Sous-total
            {totaux.articlesSansPrix > 0 && (
              <span className="ml-1 text-xs">(hors articles sans prix)</span>
            )}
          </span>
          <span className="font-display font-semibold text-text">
            {formaterPrix(totaux.sousTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Livraison</span>
          <span className="text-text-muted">[À confirmer]</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Link
          href="/commande"
          className="rounded-md bg-red py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-dark"
        >
          Passer la commande →
        </Link>
        <Link
          href="/catalogue"
          className="flex items-center justify-center gap-1 py-2 text-center text-sm text-text-muted transition-colors hover:text-text"
        >
          <ChevronLeft className="h-4 w-4" /> Continuer mes achats
        </Link>
      </div>
    </Container>
  );
}

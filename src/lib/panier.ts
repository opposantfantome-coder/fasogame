import { PRODUITS } from "./data";
import type { LignePanier, Produit, Variante } from "./types";

export const PANIER_STORAGE_KEY = "fasogame.panier";
export const QUANTITE_MIN = 1;
export const QUANTITE_MAX = 20;

function clamperQuantite(quantite: number): number {
  return Math.min(QUANTITE_MAX, Math.max(QUANTITE_MIN, Math.round(quantite)));
}

export function estLignePanierValide(x: unknown): x is LignePanier {
  if (typeof x !== "object" || x === null) return false;
  const l = x as Record<string, unknown>;
  return (
    typeof l.produitId === "string" &&
    typeof l.varianteId === "string" &&
    typeof l.quantite === "number"
  );
}

export function resoudreLigne(
  ligne: LignePanier,
  catalogue: Produit[]
): { produit: Produit; variante: Variante } | null {
  const produit = catalogue.find((p) => p.id === ligne.produitId);
  if (!produit) return null;
  const variante = produit.variantes.find((v) => v.id === ligne.varianteId);
  if (!variante) return null;
  return { produit, variante };
}

export interface LigneResolue {
  ligne: LignePanier;
  produit: Produit;
  variante: Variante;
}

/** Résout chaque ligne contre le catalogue ; écarte celles qui ne s'y trouvent plus. */
export function lignesResolues(
  lignes: LignePanier[],
  catalogue: Produit[] = PRODUITS
): LigneResolue[] {
  const resultat: LigneResolue[] = [];
  for (const ligne of lignes) {
    const resolue = resoudreLigne(ligne, catalogue);
    if (resolue) resultat.push({ ligne, produit: resolue.produit, variante: resolue.variante });
  }
  return resultat;
}

/** Écarte silencieusement les lignes dont le produit ou la variante n'existe plus (spec §4.1). */
export function nettoyerLignes(
  lignes: LignePanier[],
  catalogue: Produit[] = PRODUITS
): LignePanier[] {
  return lignes.filter((ligne) => resoudreLigne(ligne, catalogue) !== null);
}

/** Ajoute une ligne, ou incrémente la quantité existante (bornée) si la variante est déjà dans le panier. */
export function ajouterLigne(
  lignes: LignePanier[],
  produitId: string,
  varianteId: string,
  quantite = 1
): LignePanier[] {
  const existante = lignes.find(
    (l) => l.produitId === produitId && l.varianteId === varianteId
  );
  if (existante) {
    return lignes.map((l) =>
      l === existante ? { ...l, quantite: clamperQuantite(l.quantite + quantite) } : l
    );
  }
  return [...lignes, { produitId, varianteId, quantite: clamperQuantite(quantite) }];
}

export function modifierQuantiteLigne(
  lignes: LignePanier[],
  produitId: string,
  varianteId: string,
  quantite: number
): LignePanier[] {
  return lignes.map((l) =>
    l.produitId === produitId && l.varianteId === varianteId
      ? { ...l, quantite: clamperQuantite(quantite) }
      : l
  );
}

export function supprimerLigne(
  lignes: LignePanier[],
  produitId: string,
  varianteId: string
): LignePanier[] {
  return lignes.filter((l) => !(l.produitId === produitId && l.varianteId === varianteId));
}

export interface TotauxPanier {
  sousTotal: number;
  /** Somme des quantités de toutes les lignes, pas le nombre de lignes. */
  nombreArticles: number;
  /** Somme des quantités des lignes dont le prix résolu est `null`. */
  articlesSansPrix: number;
}

/**
 * Spec §2.5 : totalPanier(lignes, catalogue) → { sousTotal, nombreArticles }.
 * `articlesSansPrix` est l'ajout demandé au Prompt 2 : les articles à prix
 * `null` n'entrent pas dans `sousTotal`, mais leur nombre reste visible.
 */
export function totalPanier(
  lignes: LignePanier[],
  catalogue: Produit[] = PRODUITS
): TotauxPanier {
  let sousTotal = 0;
  let nombreArticles = 0;
  let articlesSansPrix = 0;

  for (const ligne of lignes) {
    const resolue = resoudreLigne(ligne, catalogue);
    if (!resolue) continue;
    nombreArticles += ligne.quantite;
    if (resolue.variante.prix === null) {
      articlesSansPrix += ligne.quantite;
    } else {
      sousTotal += resolue.variante.prix * ligne.quantite;
    }
  }

  return { sousTotal, nombreArticles, articlesSansPrix };
}

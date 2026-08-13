import { PRODUITS } from "./data";
import {
  ajouterLigne,
  estLignePanierValide,
  modifierQuantiteLigne,
  nettoyerLignes,
  PANIER_STORAGE_KEY,
  supprimerLigne,
} from "./panier";
import type { LignePanier } from "./types";

/**
 * Magasin externe minimal pour le panier (spec §4.1), consommé via
 * `useSyncExternalStore` dans PanierProvider. Pas de `setState` dans un
 * effet : c'est la façon propre de synchroniser React avec `localStorage`
 * sans provoquer d'écart d'hydratation ni de rendu en cascade.
 */

const VIDE: LignePanier[] = [];

let lignes: LignePanier[] = VIDE;
let hydrate = false;
let stockageDisponible = true;
const listeners = new Set<() => void>();

function notifier() {
  listeners.forEach((l) => l());
}

function persister() {
  if (!stockageDisponible) return;
  try {
    window.localStorage.setItem(PANIER_STORAGE_KEY, JSON.stringify(lignes));
  } catch {
    // Stockage indisponible (navigation privée stricte, quota, etc.) :
    // le panier continue de fonctionner en mémoire pour la session.
    stockageDisponible = false;
  }
}

function assurerHydratation() {
  if (hydrate || typeof window === "undefined") return;
  hydrate = true;
  try {
    const brut = window.localStorage.getItem(PANIER_STORAGE_KEY);
    if (brut) {
      const parsees: unknown = JSON.parse(brut);
      const valides = Array.isArray(parsees) ? parsees.filter(estLignePanierValide) : [];
      lignes = nettoyerLignes(valides, PRODUITS);
    }
  } catch {
    stockageDisponible = false;
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): LignePanier[] {
  assurerHydratation();
  return lignes;
}

/** Référence stable pour le rendu serveur et le tout premier rendu client (avant hydratation). */
export function getServerSnapshot(): LignePanier[] {
  return VIDE;
}

export function ajouter(produitId: string, varianteId: string, quantite = 1) {
  assurerHydratation();
  lignes = ajouterLigne(lignes, produitId, varianteId, quantite);
  persister();
  notifier();
}

export function modifierQuantite(produitId: string, varianteId: string, quantite: number) {
  assurerHydratation();
  lignes = modifierQuantiteLigne(lignes, produitId, varianteId, quantite);
  persister();
  notifier();
}

export function supprimer(produitId: string, varianteId: string) {
  assurerHydratation();
  lignes = supprimerLigne(lignes, produitId, varianteId);
  persister();
  notifier();
}

export function vider() {
  assurerHydratation();
  lignes = VIDE;
  persister();
  notifier();
}

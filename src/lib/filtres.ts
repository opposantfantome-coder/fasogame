import { estMulti, famillesDuProduit, prixMinimum } from "./familles";
import type { Categorie, Disponibilite, Famille, Genre, Produit } from "./types";

export type PlatFiltre = Famille | "Multi";
export type Tri = "recent" | "nom" | "prix-asc" | "prix-desc";

export interface FiltresEtat {
  q: string;
  cats: Set<Categorie>;
  plats: Set<PlatFiltre>;
  genres: Set<Genre>;
  dispo: Set<Disponibilite>;
  tri: Tri;
}

export function filtresVides(): FiltresEtat {
  return {
    q: "",
    cats: new Set(),
    plats: new Set(),
    genres: new Set(),
    dispo: new Set(),
    tri: "recent",
  };
}

function normaliser(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

function listeDepuisParam(params: URLSearchParams, cle: string): string[] {
  const v = params.get(cle);
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function triDepuisParam(valeur: string | null): Tri {
  if (valeur === "nom" || valeur === "prix-asc" || valeur === "prix-desc") return valeur;
  return "recent";
}

export function filtresDepuisParams(params: URLSearchParams): FiltresEtat {
  return {
    q: params.get("q") ?? "",
    cats: new Set(listeDepuisParam(params, "cat") as Categorie[]),
    plats: new Set(listeDepuisParam(params, "plat") as PlatFiltre[]),
    genres: new Set(listeDepuisParam(params, "genre") as Genre[]),
    dispo: new Set(listeDepuisParam(params, "dispo") as Disponibilite[]),
    tri: triDepuisParam(params.get("tri")),
  };
}

export function paramsDepuisFiltres(filtres: FiltresEtat): URLSearchParams {
  const params = new URLSearchParams();
  if (filtres.q) params.set("q", filtres.q);
  if (filtres.cats.size) params.set("cat", Array.from(filtres.cats).join(","));
  if (filtres.plats.size) params.set("plat", Array.from(filtres.plats).join(","));
  if (filtres.genres.size) params.set("genre", Array.from(filtres.genres).join(","));
  if (filtres.dispo.size) params.set("dispo", Array.from(filtres.dispo).join(","));
  if (filtres.tri !== "recent") params.set("tri", filtres.tri);
  return params;
}

export function produitCorrespondPlat(produit: Produit, plat: PlatFiltre): boolean {
  if (plat === "Multi") return estMulti(produit);
  return famillesDuProduit(produit).includes(plat);
}

export function appliquerFiltres(produits: Produit[], filtres: FiltresEtat): Produit[] {
  const q = normaliser(filtres.q);

  let resultat = produits.filter((p) => {
    if (q && !normaliser(p.nom).includes(q)) return false;
    if (filtres.cats.size && !filtres.cats.has(p.categorie)) return false;
    if (filtres.plats.size && !Array.from(filtres.plats).some((f) => produitCorrespondPlat(p, f)))
      return false;
    if (filtres.genres.size) {
      if (!p.genres || !p.genres.some((g) => filtres.genres.has(g))) return false;
    }
    if (filtres.dispo.size) {
      if (!p.variantes.some((v) => filtres.dispo.has(v.disponibilite))) return false;
    }
    return true;
  });

  resultat = [...resultat].sort((a, b) => {
    if (filtres.tri === "nom") return a.nom.localeCompare(b.nom, "fr");

    if (filtres.tri === "prix-asc" || filtres.tri === "prix-desc") {
      const prixA = prixMinimum(a);
      const prixB = prixMinimum(b);
      // Les produits sans prix se rangent toujours en fin de liste,
      // quel que soit le sens du tri (spec §6.3).
      if (prixA === null && prixB === null) return 0;
      if (prixA === null) return 1;
      if (prixB === null) return -1;
      return filtres.tri === "prix-asc" ? prixA - prixB : prixB - prixA;
    }

    return b.dateAjout.localeCompare(a.dateAjout);
  });

  return resultat;
}

export function genreVisible(filtres: FiltresEtat): boolean {
  return filtres.cats.size === 0 || filtres.cats.has("Jeux");
}

export function compterFiltresActifs(filtres: FiltresEtat): number {
  return (
    filtres.cats.size +
    filtres.plats.size +
    filtres.genres.size +
    filtres.dispo.size +
    (filtres.q ? 1 : 0)
  );
}

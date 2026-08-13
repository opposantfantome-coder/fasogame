import type { Famille, Plateforme, Produit } from "./types";

export const PLATEFORME_VERS_FAMILLE: Record<Plateforme, Famille | null> = {
  PS5: "PlayStation",
  PS4: "PlayStation",
  PS3: "PlayStation",
  "Xbox Series": "Xbox",
  "Xbox One": "Xbox",
  "Xbox 360": "Xbox",
  "Nintendo Switch": "Nintendo",
  Rétro: "Rétro",
  Multi: null,
};

export const FAMILLE_PLATEFORMES: Record<Famille, Plateforme[]> = {
  PlayStation: ["PS5", "PS4", "PS3"],
  Xbox: ["Xbox Series", "Xbox One", "Xbox 360"],
  Nintendo: ["Nintendo Switch"],
  Rétro: ["Rétro"],
};

export const FAMILLE_COULEUR: Record<Famille, string> = {
  PlayStation: "var(--fam-playstation)",
  Xbox: "var(--fam-xbox)",
  Nintendo: "var(--fam-nintendo)",
  Rétro: "var(--fam-retro)",
};

export const FAMILLE_LABEL_COURT: Record<Famille, string> = {
  PlayStation: "PS",
  Xbox: "Xbox",
  Nintendo: "Switch",
  Rétro: "Rétro",
};

/** Familles réellement disponibles pour un produit (déduites de ses variantes, "Multi" exclu). */
export function famillesDuProduit(produit: Produit): Famille[] {
  const vues = new Set<Famille>();
  for (const v of produit.variantes) {
    const f = PLATEFORME_VERS_FAMILLE[v.plateforme];
    if (f) vues.add(f);
  }
  return Array.from(vues);
}

export function estMulti(produit: Produit): boolean {
  return produit.variantes.some((v) => v.plateforme === "Multi");
}

export function variantesDeFamille(produit: Produit, famille: Famille): Produit["variantes"] {
  return produit.variantes.filter(
    (v) => PLATEFORME_VERS_FAMILLE[v.plateforme] === famille
  );
}

export function auMoinsUneVarianteEnStock(produit: Produit): boolean {
  return produit.variantes.some((v) => v.disponibilite === "En stock");
}

export function formatPrix(prix: number | null): string {
  if (prix === null) return "[Prix à fournir]";
  return `${prix.toLocaleString("fr-FR")} FCFA`;
}

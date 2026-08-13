import type { Famille, Plateforme, Produit } from "./types";

export const PLATEFORME_VERS_FAMILLE: Record<Plateforme, Famille> = {
  PS5: "PlayStation",
  PS4: "PlayStation",
  PS3: "PlayStation",
  "Xbox Series": "Xbox",
  "Xbox One": "Xbox",
  "Xbox 360": "Xbox",
  "Nintendo Switch": "Nintendo",
  Rétro: "Rétro",
  Multi: "Multi-plateformes",
};

export const FAMILLE_PLATEFORMES: Record<Famille, Plateforme[]> = {
  PlayStation: ["PS5", "PS4", "PS3"],
  Xbox: ["Xbox Series", "Xbox One", "Xbox 360"],
  Nintendo: ["Nintendo Switch"],
  Rétro: ["Rétro"],
  "Multi-plateformes": ["Multi"],
};

export const FAMILLE_COULEUR: Record<Famille, string> = {
  PlayStation: "var(--fam-playstation)",
  Xbox: "var(--fam-xbox)",
  Nintendo: "var(--fam-nintendo)",
  Rétro: "var(--fam-retro)",
  "Multi-plateformes": "var(--fam-multi)",
};

export const FAMILLE_LABEL_COURT: Record<Famille, string> = {
  PlayStation: "PS",
  Xbox: "Xbox",
  Nintendo: "Switch",
  Rétro: "Rétro",
  "Multi-plateformes": "Multi",
};

/** Déclinaisons pré-calculées de la couleur de famille (spec §9 : color-mix() proscrit). */
export interface AccentFamille {
  solide: string;
  doux: string;
  bordure: string;
  actif: string;
}

export const FAMILLE_ACCENT: Record<Famille, AccentFamille> = {
  PlayStation: {
    solide: "var(--fam-playstation)",
    doux: "var(--fam-playstation-soft)",
    bordure: "var(--fam-playstation-border)",
    actif: "var(--fam-playstation-active)",
  },
  Xbox: {
    solide: "var(--fam-xbox)",
    doux: "var(--fam-xbox-soft)",
    bordure: "var(--fam-xbox-border)",
    actif: "var(--fam-xbox-active)",
  },
  Nintendo: {
    solide: "var(--fam-nintendo)",
    doux: "var(--fam-nintendo-soft)",
    bordure: "var(--fam-nintendo-border)",
    actif: "var(--fam-nintendo-active)",
  },
  Rétro: {
    solide: "var(--fam-retro)",
    doux: "var(--fam-retro-soft)",
    bordure: "var(--fam-retro-border)",
    actif: "var(--fam-retro-active)",
  },
  "Multi-plateformes": {
    solide: "var(--fam-multi)",
    doux: "var(--fam-multi-soft)",
    bordure: "var(--fam-multi-border)",
    actif: "var(--fam-multi-active)",
  },
};

/** Familles réellement disponibles pour un produit (déduites de ses variantes). */
export function famillesDuProduit(produit: Produit): Famille[] {
  const vues = new Set<Famille>();
  for (const v of produit.variantes) {
    vues.add(PLATEFORME_VERS_FAMILLE[v.plateforme]);
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

export function estMonoVariante(produit: Produit): boolean {
  return produit.variantes.length === 1;
}

/** Plus petit prix non nul parmi les variantes, ou null si toutes sont inconnues. */
export function prixMinimum(produit: Produit): number | null {
  const prix = produit.variantes
    .map((v) => v.prix)
    .filter((p): p is number => p !== null);
  return prix.length === 0 ? null : Math.min(...prix);
}

export function formaterPrix(prix: number | null): string {
  if (prix === null) return "[Prix à fournir]";
  return `${prix.toLocaleString("fr-FR")} FCFA`;
}

export type Categorie =
  | "Jeux"
  | "Consoles"
  | "Manettes"
  | "Accessoires"
  | "Cartes cadeaux";

export const CATEGORIES: Categorie[] = [
  "Jeux",
  "Consoles",
  "Manettes",
  "Accessoires",
  "Cartes cadeaux",
];

export type Plateforme =
  | "PS5"
  | "PS4"
  | "PS3"
  | "Xbox Series"
  | "Xbox One"
  | "Xbox 360"
  | "Nintendo Switch"
  | "Rétro"
  | "Multi";

export type Famille = "PlayStation" | "Xbox" | "Nintendo" | "Rétro" | "Multi-plateformes";

export const FAMILLES: Famille[] = [
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Rétro",
  "Multi-plateformes",
];

export type Genre =
  | "Action"
  | "Aventure"
  | "Sport"
  | "Course"
  | "Combat"
  | "Tir"
  | "Famille"
  | "Rôle";

export const GENRES: Genre[] = [
  "Action",
  "Aventure",
  "Sport",
  "Course",
  "Combat",
  "Tir",
  "Famille",
  "Rôle",
];

export type Disponibilite = "En stock" | "Sur commande" | "Épuisé";

export interface Variante {
  /** Identifiant stable, unique dans le produit — identifie une ligne de panier (spec §2.2). */
  id: string;
  plateforme: Plateforme;
  prix: number | null;
  disponibilite: Disponibilite;
}

export interface Produit {
  id: string;
  nom: string;
  categorie: Categorie;
  images: string[];
  /** Bannière paysage 16:9, distincte de la vignette carrée (fiche produit, bloc héros). */
  imageBanniere: string;
  description: string;
  genres?: Genre[];
  variantes: Variante[];
  miseEnAvant: boolean;
  dateAjout: string;
}

export type TypeArticle = "Offre" | "Événement" | "Annonce";

export interface Article {
  id: string;
  titre: string;
  image: string;
  resume: string;
  contenu: string;
  date: string;
  type: TypeArticle;
}

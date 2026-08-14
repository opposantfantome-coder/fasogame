import type { Article, Produit } from "./types";

/**
 * Jeu de données d'essai (spec §2.6) : 22 produits alignés sur les visuels
 * réels disponibles dans `public/produits/` (voir
 * fasogame-images-correspondance.md à la racine du projet).
 *
 * [À CONFIRMER] Les plateformes assignées à chaque jeu et console sont des
 * suggestions reprises de ce document, pas des données validées par le
 * gérant — à confirmer avant mise en production, au même titre que les prix.
 *
 * Prix connus (section « Informations non fournies ») : Manette DualSense
 * 70 000, Manette Xbox blanche 50 000, Manette Xbox noire 50 000, Manette
 * Switch Pro 40 000, Manette DualSense camo 80 000, CD de jeu PS4 à partir
 * de 10 000 — appliqué à la seule variante PS4 des jeux multi-plateformes
 * qui existent réellement sur PS4 (gta-v, elden-ring, mxgp-2020,
 * assassins-creed-odyssey, ea-sports-fc-26) ; leurs autres variantes (PS5,
 * Xbox, Switch) restent à `null`, prix nouvelle génération inconnu. Ce sont
 * ces jeux qui démontrent le cas « À partir de X FCFA » de la carte
 * produit (spec §1.1). Tout le reste est à `null`. Aucun prix inventé.
 *
 * Manette Switch Pro et Manette DualSense camo n'ont pas de visuel fourni :
 * elles restent sur le placeholder neutre (`images: []`).
 */
export const PRODUITS: Produit[] = [
  // ── Jeux ──────────────────────────────────────────────────────────────
  {
    id: "ea-sports-fc-26",
    nom: "EA Sports FC 26",
    categorie: "Jeux",
    images: ["/produits/ea-sports-fc-26.jpg"],
    imageBanniere: "/produits/ea-sports-fc-26-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Sport"],
    variantes: [
      { id: "ea-sports-fc-26-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "ea-sports-fc-26-ps4", plateforme: "PS4", prix: 10000, disponibilite: "En stock" },
      { id: "ea-sports-fc-26-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "En stock" },
      { id: "ea-sports-fc-26-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "Sur commande" },
    ],
    miseEnAvant: true,
    dateAjout: "2026-08-10",
  },
  {
    id: "ghost-of-yotei",
    nom: "Ghost of Yōtei",
    categorie: "Jeux",
    images: ["/produits/ghost-of-yotei.jpg"],
    imageBanniere: "/produits/ghost-of-yotei-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Action", "Aventure"],
    variantes: [{ id: "ghost-of-yotei-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" }],
    miseEnAvant: true,
    dateAjout: "2026-08-09",
  },
  {
    id: "resident-evil-requiem",
    nom: "Resident Evil Requiem",
    categorie: "Jeux",
    images: ["/produits/resident-evil-requiem.jpg"],
    imageBanniere: "/produits/resident-evil-requiem-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Action"],
    variantes: [
      { id: "resident-evil-requiem-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "resident-evil-requiem-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-08-01",
  },
  {
    id: "spider-man-2",
    nom: "Marvel's Spider-Man 2",
    categorie: "Jeux",
    images: ["/produits/spider-man-2.jpg"],
    imageBanniere: "/produits/spider-man-2-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Action", "Aventure"],
    variantes: [{ id: "spider-man-2-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" }],
    miseEnAvant: false,
    dateAjout: "2026-07-20",
  },
  {
    id: "elden-ring",
    nom: "Elden Ring",
    categorie: "Jeux",
    images: ["/produits/elden-ring.jpg"],
    imageBanniere: "/produits/elden-ring-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Rôle", "Action"],
    variantes: [
      { id: "elden-ring-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "elden-ring-ps4", plateforme: "PS4", prix: 10000, disponibilite: "En stock" },
      { id: "elden-ring-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "En stock" },
      { id: "elden-ring-xbox-one", plateforme: "Xbox One", prix: null, disponibilite: "Épuisé" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-06-12",
  },
  {
    id: "gta-v",
    nom: "Grand Theft Auto V",
    categorie: "Jeux",
    images: ["/produits/gta-v.jpg"],
    imageBanniere: "/produits/gta-v-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Action"],
    variantes: [
      { id: "gta-v-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "gta-v-ps4", plateforme: "PS4", prix: 10000, disponibilite: "En stock" },
      { id: "gta-v-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "En stock" },
      { id: "gta-v-xbox-one", plateforme: "Xbox One", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: true,
    dateAjout: "2026-05-30",
  },
  {
    id: "cod-black-ops-7",
    nom: "Call of Duty: Black Ops 7",
    categorie: "Jeux",
    images: ["/produits/cod-black-ops-7.jpg"],
    imageBanniere: "/produits/cod-black-ops-7-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Tir"],
    variantes: [
      { id: "cod-black-ops-7-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "cod-black-ops-7-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "Sur commande" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-08-07",
  },
  {
    id: "mario-party-jamboree",
    nom: "Super Mario Party Jamboree",
    categorie: "Jeux",
    images: ["/produits/mario-party-jamboree.jpg"],
    imageBanniere: "/produits/mario-party-jamboree-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Famille"],
    variantes: [
      { id: "mario-party-jamboree-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-04-18",
  },
  {
    id: "nba-2k26",
    nom: "NBA 2K26",
    categorie: "Jeux",
    images: ["/produits/nba-2k26.jpg"],
    imageBanniere: "/produits/nba-2k26-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Sport"],
    variantes: [
      { id: "nba-2k26-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" },
      { id: "nba-2k26-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "En stock" },
      { id: "nba-2k26-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-07-02",
  },
  {
    id: "mxgp-2020",
    nom: "MXGP 2020",
    categorie: "Jeux",
    images: ["/produits/mxgp-2020.jpg"],
    imageBanniere: "/produits/mxgp-2020-banniere.jpg",
    description: "[Description à fournir]",
    genres: ["Course"],
    variantes: [
      { id: "mxgp-2020-ps4", plateforme: "PS4", prix: 10000, disponibilite: "En stock" },
      { id: "mxgp-2020-xbox-one", plateforme: "Xbox One", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-03-15",
  },
  {
    id: "assassins-creed-odyssey",
    nom: "Assassin's Creed Odyssey",
    categorie: "Jeux",
    images: ["/produits/assassins-creed-odyssey.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    genres: ["Action", "Aventure", "Rôle"],
    variantes: [
      { id: "assassins-creed-odyssey-ps4", plateforme: "PS4", prix: 10000, disponibilite: "En stock" },
      { id: "assassins-creed-odyssey-xbox-one", plateforme: "Xbox One", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-02-10",
  },

  // ── Consoles (vignette seule, aucune bannière fournie) ──────────────────
  {
    id: "ps5-digital",
    nom: "Console PlayStation 5 Digital",
    categorie: "Consoles",
    images: ["/produits/ps5-digital.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [{ id: "ps5-digital-ps5", plateforme: "PS5", prix: null, disponibilite: "En stock" }],
    miseEnAvant: true,
    dateAjout: "2026-08-03",
  },
  {
    id: "xbox-series-x",
    nom: "Console Xbox Series X",
    categorie: "Consoles",
    images: ["/produits/xbox-series-x.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "xbox-series-x-xbox-series", plateforme: "Xbox Series", prix: null, disponibilite: "Sur commande" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-07-11",
  },
  {
    id: "ps-portal",
    nom: "PlayStation Portal",
    categorie: "Consoles",
    images: ["/produits/ps-portal.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [{ id: "ps-portal-ps5", plateforme: "PS5", prix: null, disponibilite: "Sur commande" }],
    miseEnAvant: false,
    dateAjout: "2026-06-25",
  },
  {
    id: "switch-lite",
    nom: "Nintendo Switch Lite",
    categorie: "Consoles",
    images: ["/produits/switch-lite.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "switch-lite-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-05-14",
  },
  {
    id: "switch-neon",
    nom: "Nintendo Switch (édition néon)",
    categorie: "Consoles",
    images: ["/produits/switch-neon.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "switch-neon-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-04-02",
  },
  {
    id: "switch-oled",
    nom: "Nintendo Switch OLED",
    categorie: "Consoles",
    images: ["/produits/switch-oled.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "switch-oled-switch", plateforme: "Nintendo Switch", prix: null, disponibilite: "Sur commande" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-06-25",
  },

  // ── Manettes ─────────────────────────────────────────────────────────
  {
    id: "manette-dualsense",
    nom: "Manette DualSense",
    categorie: "Manettes",
    images: ["/produits/manette-dualsense.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [{ id: "manette-dualsense-ps5", plateforme: "PS5", prix: 70000, disponibilite: "En stock" }],
    miseEnAvant: false,
    dateAjout: "2026-07-02",
  },
  {
    id: "manette-xbox-blanche",
    nom: "Manette Xbox blanche",
    categorie: "Manettes",
    images: ["/produits/manette-xbox-blanche.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "manette-xbox-blanche-xbox-series", plateforme: "Xbox Series", prix: 50000, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-06-18",
  },
  {
    id: "manette-xbox-noire",
    nom: "Manette Xbox noire",
    categorie: "Manettes",
    images: ["/produits/manette-xbox-noire.jpg"],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "manette-xbox-noire-xbox-series", plateforme: "Xbox Series", prix: 50000, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-06-18",
  },
  {
    id: "manette-switch-pro",
    nom: "Manette Switch Pro",
    categorie: "Manettes",
    images: [],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [
      { id: "manette-switch-pro-switch", plateforme: "Nintendo Switch", prix: 40000, disponibilite: "En stock" },
    ],
    miseEnAvant: false,
    dateAjout: "2026-06-30",
  },
  {
    id: "manette-dualsense-camo",
    nom: "Manette DualSense camo",
    categorie: "Manettes",
    images: [],
    imageBanniere: null,
    description: "[Description à fournir]",
    variantes: [{ id: "manette-dualsense-camo-ps5", plateforme: "PS5", prix: 80000, disponibilite: "En stock" }],
    miseEnAvant: false,
    dateAjout: "2026-07-28",
  },
];

/** Trois articles de substitution pour /nouvelles (spec §6.7). */
export const ARTICLES: Article[] = [
  {
    id: "article-1",
    titre: "[Titre à fournir]",
    image: "article-1",
    resume: "[Contenu à fournir]",
    contenu: "[Contenu à fournir]",
    date: "2026-08-05",
    type: "Offre",
  },
  {
    id: "article-2",
    titre: "[Titre à fournir]",
    image: "article-2",
    resume: "[Contenu à fournir]",
    contenu: "[Contenu à fournir]",
    date: "2026-07-22",
    type: "Événement",
  },
  {
    id: "article-3",
    titre: "[Titre à fournir]",
    image: "article-3",
    resume: "[Contenu à fournir]",
    contenu: "[Contenu à fournir]",
    date: "2026-06-30",
    type: "Annonce",
  },
];

export function produitParId(id: string): Produit | undefined {
  return PRODUITS.find((p) => p.id === id);
}

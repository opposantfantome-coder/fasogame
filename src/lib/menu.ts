export interface VignetteMenu {
  label: string;
  href: string;
}

export interface RubriqueMenu {
  id: string;
  label: string;
  href: string;
  vignettes: VignetteMenu[];
  liensSecondaires: VignetteMenu[];
}

export const RUBRIQUES_MENU: RubriqueMenu[] = [
  {
    id: "magasin",
    label: "Magasin",
    href: "/catalogue",
    vignettes: [
      { label: "Tout le catalogue", href: "/catalogue" },
      { label: "Nouveautés", href: "/catalogue?tri=recent" },
    ],
    liensSecondaires: [
      { label: "Offres du moment", href: "/nouvelles?type=Offre" },
      { label: "Collections", href: "/catalogue" },
    ],
  },
  {
    id: "consoles",
    label: "Consoles",
    href: "/consoles",
    vignettes: [
      { label: "PlayStation", href: "/catalogue?cat=Consoles&plat=PlayStation" },
      { label: "Xbox", href: "/catalogue?cat=Consoles&plat=Xbox" },
      { label: "Nintendo", href: "/catalogue?cat=Consoles&plat=Nintendo" },
      { label: "Rétro", href: "/catalogue?cat=Consoles&plat=Rétro" },
    ],
    liensSecondaires: [{ label: "Toutes les consoles", href: "/catalogue?cat=Consoles" }],
  },
  {
    id: "jeux",
    label: "Jeux",
    href: "/jeux",
    vignettes: [
      { label: "PlayStation", href: "/catalogue?cat=Jeux&plat=PlayStation" },
      { label: "Xbox", href: "/catalogue?cat=Jeux&plat=Xbox" },
      { label: "Nintendo", href: "/catalogue?cat=Jeux&plat=Nintendo" },
      { label: "Rétro", href: "/catalogue?cat=Jeux&plat=Rétro" },
    ],
    liensSecondaires: [
      { label: "Parcourir par genre", href: "/catalogue?cat=Jeux" },
      { label: "Tous les jeux", href: "/catalogue?cat=Jeux" },
    ],
  },
  {
    id: "manettes",
    label: "Manettes",
    href: "/manettes",
    vignettes: [
      { label: "PlayStation", href: "/catalogue?cat=Manettes&plat=PlayStation" },
      { label: "Xbox", href: "/catalogue?cat=Manettes&plat=Xbox" },
      { label: "Nintendo", href: "/catalogue?cat=Manettes&plat=Nintendo" },
    ],
    liensSecondaires: [{ label: "Toutes les manettes", href: "/catalogue?cat=Manettes" }],
  },
  {
    id: "accessoires",
    label: "Accessoires",
    href: "/accessoires",
    vignettes: [
      { label: "Casques", href: "/catalogue?cat=Accessoires" },
      { label: "Câbles", href: "/catalogue?cat=Accessoires" },
      { label: "Housses", href: "/catalogue?cat=Accessoires" },
      { label: "Volants", href: "/catalogue?cat=Accessoires" },
    ],
    liensSecondaires: [{ label: "Tous les accessoires", href: "/catalogue?cat=Accessoires" }],
  },
  {
    id: "cartes-cadeaux",
    label: "Cartes cadeaux",
    href: "/cartes-cadeaux",
    vignettes: [
      { label: "PlayStation", href: "/catalogue?cat=Cartes cadeaux&plat=PlayStation" },
      { label: "Xbox", href: "/catalogue?cat=Cartes cadeaux&plat=Xbox" },
      { label: "Nintendo", href: "/catalogue?cat=Cartes cadeaux&plat=Nintendo" },
      { label: "Steam", href: "/catalogue?cat=Cartes cadeaux&plat=Multi" },
    ],
    liensSecondaires: [{ label: "Toutes les cartes", href: "/catalogue?cat=Cartes cadeaux" }],
  },
  {
    id: "nouvelles",
    label: "Nouvelles",
    href: "/nouvelles",
    vignettes: [
      { label: "Offres en cours", href: "/nouvelles?type=Offre" },
      { label: "Événements", href: "/nouvelles?type=Événement" },
    ],
    liensSecondaires: [],
  },
  {
    id: "a-propos",
    label: "À propos",
    href: "/a-propos",
    vignettes: [
      { label: "Nos boutiques", href: "/a-propos#boutiques" },
      { label: "Nous contacter", href: "/a-propos#contact" },
    ],
    liensSecondaires: [{ label: "Réseaux sociaux", href: "/a-propos#reseaux" }],
  },
];

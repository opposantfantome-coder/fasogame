# FasoGame — Spécification d'architecture (v3)

Document destiné à l'agent de développement.

**Objectif : produire une maquette navigable pour juger de l'allure et du parcours.** Pas un site de production. Les contenus réels seront fournis plus tard.

Références de structure : le PlayStation Store pour la fiche produit et la navigation ; les boutiques en ligne ouest-africaines pour la densité commerciale et le parcours de commande.

---

## ⚠️ Ce qui change depuis la v2

Trois décisions ont été révisées. Si vous connaissez la v2, lisez d'abord ce tableau.

| Point | v2 | v3 | Raison |
|---|---|---|---|
| Prix dans les grilles | Interdit | **Toujours affiché** | En contexte burkinabè, un prix caché derrière un clic est lu comme un prix qu'on cache |
| Panier | Aucun | **Panier complet** | Permet de commander plusieurs articles en un message |
| Fin de parcours | WhatsApp depuis la fiche | **Panier → formulaire → WhatsApp** | Le gérant reçoit une commande structurée au lieu d'une question |
| Favoris | Prévus | **Supprimés** | Sans compte, un favori disparaît au vidage du navigateur : il promet ce qu'il ne tient pas |
| Compte utilisateur | Aucun | **Aucun (inchangé)** | Pas de transaction en ligne |

Ce qui ne change pas : l'identité visuelle, la règle d'accent des couleurs de marque, le fond clair, la structure de la fiche produit, la primauté du mobile.

---

## ⚠️ Informations non fournies

Ne rien inventer. Laisser le marqueur visible dans le code.

- Prix réels de la plupart des articles et paliers de filtrage
- Adresses, numéros de téléphone, horaires des boutiques
- Modalités de retrait, de livraison, de garantie
- Zones de livraison et frais éventuels
- Conditions de vente
- Contenu de la page À propos et textes de présentation
- Nombre d'avis clients, note moyenne

Remplir ces zones avec `[Texte à fournir]`, `[Prix à fournir]`, `[À confirmer]` — jamais avec une valeur plausible qui pourrait être prise pour vraie.

**Prix connus** (relevés sur les publications de la boutique, à confirmer) :

| Article | Prix |
|---|---|
| Manette Switch Pro | 40 000 FCFA |
| Manette Xbox (noire, blanche, rouge, bleue) | 50 000 FCFA |
| Manette DualSense PS5 | 70 000 FCFA |
| Manette DualSense camo | 80 000 FCFA |
| CD de jeu PS4 | à partir de 10 000 FCFA |

Ces cinq prix suffisent à peupler une démonstration crédible. Tout autre prix reste à `null`.

---

## 1. Principes directeurs

**1.1 — Le prix est toujours visible, mais il appartient à la variante.**
Un même jeu existe en PS5, Xbox et Switch à trois prix différents. La carte affiche donc :
- un prix exact quand le produit n'a qu'une variante ;
- « À partir de X FCFA » quand il en a plusieurs.

Le client voit un chiffre immédiatement dans tous les cas. Le détail par plateforme apparaît sur la fiche.

**1.2 — Une ligne de panier porte toujours une plateforme.**
Sans cela, le gérant reçoit « EA FC 26 » sans savoir quelle version préparer. C'est la contrainte qui structure tout le parcours d'ajout.

**1.3 — La plateforme est l'axe de navigation principal.**
Le client ne pense pas « je veux un jeu », il pense « je veux un jeu pour ma PS4 ».

**1.4 — Le parcours se termine sur WhatsApp.**
Pas de compte, pas de paiement en ligne. Le panier prépare un message, il ne déclenche pas de transaction.

**1.5 — Mobile d'abord.**
Concevoir pour 360 px de large sur Android d'entrée de gamme en 3G. Le bureau est une adaptation.

**1.6 — Petit catalogue.**
Quelques dizaines de produits, chargés intégralement côté client. Recherche et filtres instantanés, sans appel serveur.

---

## 2. Modèle de données

### 2.1 Produit

```
Produit {
  id            : slug unique
  nom           : texte
  categorie     : Jeux | Consoles | Manettes | Accessoires | Cartes cadeaux
  images        : [url]        // 1 à 5, carrées
  imageBanniere : url          // 16:9, pour le bloc héros de la fiche
  description   : texte court
  genres        : [texte]      // uniquement si categorie = Jeux
  variantes     : [Variante]   // au moins une
  miseEnAvant   : booléen
  dateAjout     : date
}
```

### 2.2 Variante

```
Variante {
  id            : identifiant stable, unique dans le produit
  plateforme    : PS5 | PS4 | PS3 | Xbox Series | Xbox One | Xbox 360
                | Nintendo Switch | Rétro | Multi
  prix          : nombre en FCFA, ou null si inconnu
  disponibilite : En stock | Sur commande | Épuisé
}
```

Le champ `id` de la variante est nouveau en v3 : c'est lui qui identifie une ligne de panier.

`Multi` sert aux produits sans console associée (cartes Steam, câbles universels) : ils n'ont qu'une variante et s'ajoutent au panier sans choix préalable.

### 2.3 Ligne de panier

```
LignePanier {
  produitId     : slug
  varianteId    : identifiant de variante
  quantite      : entier ≥ 1
}
```

Le panier ne stocke que des identifiants et une quantité. Le nom, l'image et le prix sont relus depuis le catalogue à l'affichage — ainsi un changement de prix ne laisse jamais un panier périmé.

### 2.4 Familles de plateformes

Les filtres et la signalétique fonctionnent par famille, pas par modèle.

| Famille | Modèles | Couleur |
|---|---|---|
| PlayStation | PS5, PS4, PS3 | `#0070D1` |
| Xbox | Xbox Series, Xbox One, Xbox 360 | `#107C10` |
| Nintendo | Nintendo Switch | `#E60012` |
| Rétro | consoles anciennes | `#6B7280` |
| Multi-plateformes | Multi | `#6B7280` |

**Multi-plateformes** est une cinquième famille, ajoutée en v3 pour les produits sans console associée (plateforme `Multi`, voir 2.2). Elle partage la teinte de Rétro (`#6B7280`) mais porte un libellé propre pour ne pas être confondue avec elle. Elle apparaît dans le filtre plateforme, en dernière position — un produit invisible dans les filtres serait un produit introuvable — mais n'apparaît pas dans le bloc « Quelle est votre console ? » de l'accueil (6.1), qui reste à quatre consoles.

### 2.5 Fonctions utilitaires attendues

```
famillesDuProduit(produit)      → liste des familles disponibles
prixMinimum(produit)            → plus petit prix non nul, ou null
estMonoVariante(produit)        → vrai si une seule variante
formaterPrix(nombre)            → "40 000 FCFA", espace insécable fine
totalPanier(lignes, catalogue)  → { sousTotal, nombreArticles }
```

`prixMinimum` ignore les variantes à `null`. Si toutes valent `null`, la carte affiche `[Prix à fournir]`.

`famillesDuProduit` retourne `["Multi"]` pour un produit dont l'unique variante porte la plateforme `Multi` (famille Multi-plateformes, voir 2.4).

`nombreArticles` est la **somme des quantités** des lignes de panier, pas le nombre de lignes : une ligne à quantité 3 compte pour 3, pas pour 1. C'est cette valeur qu'affichent le badge de l'en-tête (4.3) et le compteur de la page panier (4.4). Accord en nombre : « 1 article » au singulier, « N articles » au pluriel.

### 2.6 Jeu de données d'essai

22 produits alignés sur les visuels réels disponibles dans `public/produits/` (voir `fasogame-images-correspondance.md` à la racine). Trois catégories sur cinq sont couvertes — Jeux, Consoles, Manettes — car aucun visuel réel n'existe encore pour Accessoires et Cartes cadeaux : ces catégories restent vides plutôt que peuplées de produits fictifs, en cohérence avec le principe de sincérité commerciale (§«Provenance» du document de correspondance). De même, seules trois familles sur cinq sont représentées (PlayStation, Xbox, Nintendo) ; aucun produit Rétro ni Multi-plateformes dans ce jeu de données pour l'instant.

Six prix connus : cinq manettes (toutes mono-variantes, donc prix exact sur leur carte) et le CD de jeu PS4 à 10 000 FCFA, appliqué à la seule variante PS4 de cinq jeux multi-plateformes existant réellement sur PS4 (`gta-v`, `elden-ring`, `mxgp-2020`, `assassins-creed-odyssey`, `ea-sports-fc-26`) — leurs autres variantes restent à `null`, le prix des versions nouvelle génération n'étant pas connu. Ce sont ces cinq jeux qui démontrent le cas « À partir de 10 000 FCFA » de la carte produit (§1.1), mécanisme central de la v3. Les plateformes des jeux et consoles sont des suggestions non validées, à confirmer comme les prix ; laisser tout le reste à `null`, ne rien inventer.

---

## 3. Routes

```
/                          Accueil
/catalogue                 Tous les produits, filtrables
/catalogue?cat=…&plat=…    Catalogue pré-filtré
/produit/[id]              Fiche produit
/panier                    Panier
/commande                  Formulaire puis redirection WhatsApp
/consoles                  Vitrine consoles
/jeux                      Vitrine jeux
/manettes                  Vitrine manettes
/accessoires               Vitrine accessoires
/cartes-cadeaux            Vitrine cartes cadeaux
/nouvelles                 Offres et événements
/a-propos                  Présentation et contact
```

Les filtres vivent dans l'URL, pour que l'état du catalogue soit partageable sur WhatsApp.

---

## 4. Panier et commande — cœur de la v3

### 4.1 Stockage

`localStorage`, clé `fasogame.panier`, contenu `LignePanier[]` sérialisé.

- Lecture au montage de l'application, dans un contexte React partagé
- Écriture à chaque modification
- Si le stockage est indisponible (navigation privée stricte), le panier fonctionne en mémoire pour la session : ne jamais faire planter la page pour ça
- À la lecture, écarter silencieusement les lignes dont le produit ou la variante n'existe plus

### 4.2 Ajout depuis une carte de grille

C'est le point le plus délicat de la v3.

**Produit mono-variante** — le bouton `+` ajoute directement. Une notification de confirmation apparaît en bas de l'écran pendant 3 secondes, puis **disparaît**.

> Note : sur le site qui sert de référence, cette notification reste collée en bas de tous les écrans indéfiniment. C'est un défaut, pas un modèle. Elle doit se retirer toute seule et ne jamais recouvrir un bouton.

**Produit multi-variantes** — le bouton `+` ouvre un volet remontant du bas :

```
┌──────────────────────────────┐
│ Choisissez votre plateforme ✕│
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ PS5      25 000 FCFA   › │ │
│ │ ● En stock               │ │
│ ├──────────────────────────┤ │
│ │ PS4      20 000 FCFA   › │ │
│ │ ● En stock               │ │
│ ├──────────────────────────┤ │
│ │ Xbox Series  25 000 FCFA │ │
│ │ ● Sur commande           │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

Un seul appui sur une ligne ajoute au panier et referme le volet. Les variantes `Épuisé` sont grisées et non cliquables.

### 4.3 En-tête

Une icône panier avec un badge portant le nombre d'articles. Le badge n'apparaît que si le panier n'est pas vide.

### 4.4 Page panier

```
┌──────────────────────────────┐
│ Accueil › Mon panier         │
│ Mon Panier      (2 articles) │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ [img] EA SPORTS FC 26    │ │
│ │       PS5 · Jeux         │ │
│ │  ⊖  1  ⊕     25 000 FCFA │ │
│ │                       🗑  │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ [img] Manette DualSense  │ │
│ │       PS5 · Manettes     │ │
│ │  ⊖  1  ⊕     70 000 FCFA │ │
│ └──────────────────────────┘ │
├──────────────────────────────┤
│ Sous-total      95 000 FCFA  │
│ Livraison       [À confirmer]│
├──────────────────────────────┤
│ [   Passer la commande  →  ] │
│ [ ← Continuer mes achats   ] │
└──────────────────────────────┘
```

Règles :

- La plateforme s'affiche **sous le nom**, sans exception. Une ligne sans plateforme visible est un bug.
- Le sélecteur de quantité est borné entre 1 et 20. À 1, le bouton `⊖` se transforme en suppression.
- **Le champ de quantité n'accepte que des entiers.** Sur le site de référence, il affiche « 1.000 » au lieu de « 1 » — c'est un formatage de milliers appliqué par erreur à une quantité. Ne jamais formater une quantité.
- Un article dont le prix vaut `null` affiche `[Prix à fournir]` et **n'entre pas dans le sous-total** ; le total porte alors la mention « hors articles sans prix ».
- La livraison est marquée `[À confirmer]` et n'entre dans aucun calcul.
- Panier vide : illustration, phrase courte, bouton vers le catalogue. Pas de page blanche.

### 4.5 Page commande

Formulaire volontairement court. Chaque champ ajouté fait chuter le taux de complétion, et le gérant confirmera tout sur WhatsApp.

| Champ | Type | Obligatoire |
|---|---|---|
| Nom complet | texte | oui |
| Téléphone | tel, format burkinabè 8 chiffres | oui |
| Mode | choix : retrait boutique / livraison | oui |
| Ville | choix : Ouagadougou, Bobo-Dioulasso, Banfora, autre | si livraison |
| Quartier | texte | si livraison |
| Note | texte libre, 200 caractères | non |

Validation en direct, message d'erreur sous le champ concerné. Le bouton reste actif : au clic, il fait défiler jusqu'au premier champ invalide plutôt que de rester grisé sans explication.

Sous le formulaire, un rappel replié du contenu du panier et du total.

### 4.6 Envoi

**Tout l'envoi passe par une seule fonction, `envoyerCommande(commande)`.** Aucun autre endroit du code ne construit d'URL WhatsApp pour une commande. C'est ce qui permettra de basculer plus tard vers un enregistrement en base sans toucher au reste.

Implémentation v3 : composition du message, encodage, ouverture de `https://wa.me/<numéro>?text=<message>`.

Message généré :

```
Bonjour FasoGame, je souhaite commander :

• EA SPORTS FC 26 (PS5) — 1 × 25 000 FCFA
• Manette DualSense (PS5) — 1 × 70 000 FCFA

Total : 95 000 FCFA

Nom : Issaka Ouédraogo
Téléphone : 70 00 00 00
Livraison : Ouagadougou, Tanghin
```

Points d'attention :

- Encoder avec `encodeURIComponent`, sauts de ligne compris
- Le numéro WhatsApp est une constante unique dans le code, marquée `[Numéro à confirmer]`
- Un article sans prix apparaît comme `— prix à confirmer` et le total porte la mention correspondante
- Après ouverture de WhatsApp, afficher une page de confirmation avec un lien de repli si l'ouverture a échoué. **Ne pas vider le panier automatiquement** : proposer un bouton « J'ai envoyé ma commande » qui le vide.

### 4.7 Bouton WhatsApp direct sur la fiche produit

Il reste, à côté du bouton d'ajout au panier. Certains clients ne veulent qu'une chose et n'ont pas envie de passer par un panier. Ce bouton envoie un message ne portant que ce produit et cette plateforme, sans toucher au panier.

---

## 5. Navigation

### 5.1 Bandeau de réassurance

Repris de la référence. Pleine largeur, fond rouge FasoGame, texte blanc, au-dessus de l'en-tête.

```
┌──────────────────────────────────────────┐
│  Livraison [délai à confirmer]           │
│  Nous appeler [numéro à confirmer]       │
└──────────────────────────────────────────┘
```

Défilement horizontal lent si le contenu dépasse sur mobile. Le numéro est un lien `tel:`.

### 5.2 Barre supérieure — toutes les pages

Fixe, hauteur 60 px, fond marine, flou au défilement.

```
┌──────────────────────────────────────────┐
│  ☰    🔍     [LOGO]      🛒(2)   Contact  │
└──────────────────────────────────────────┘
```

- **☰** ouvre le menu tiroir
- **🔍** déploie le champ de recherche en pleine largeur
- **Logo** centré, ramène à l'accueil
- **🛒** panier avec badge de comptage
- **Contact** — bouton rouge arrondi, ouvre WhatsApp

Aucune icône de compte, aucune icône de favoris.

### 5.3 Barre d'onglets — accueil et catalogue

Défilement horizontal sous la barre principale.

```
  Dernier   Collections   Offres   Boutiques   ›
```

### 5.4 Menu tiroir

```
┌──────────────────────────────┐
│ ✕   🔍    [LOGO]   Contact   │
├──────────────────────────────┤
│ 🛍  Magasin               ›  │
│ 🎮  Consoles              ›  │
│ 💿  Jeux                  ›  │
│ 🕹  Manettes              ›  │
│ 🎧  Accessoires           ›  │
│ 🎁  Cartes cadeaux        ›  │
│ 📰  Nouvelles             ›  │
│ ℹ️  À propos              ›  │
├──────────────────────────────┤
│ ACCÈS RAPIDE                 │
│ Nouveautés                   │
│ Mon panier                   │
│ Commander via WhatsApp       │
└──────────────────────────────┘
```

Au clic sur une rubrique, le tiroir passe en **deux colonnes** : la bande d'icônes reste à gauche, le contenu s'affiche à droite. Comportement du PlayStation Store.

| Rubrique | Vignettes | Liens secondaires |
|---|---|---|
| **Magasin** | Tout le catalogue · Nouveautés | Offres du moment · Collections |
| **Consoles** | PlayStation · Xbox · Nintendo · Rétro | Toutes les consoles |
| **Jeux** | PlayStation · Xbox · Nintendo · Rétro | Parcourir par genre · Tous les jeux |
| **Manettes** | PlayStation · Xbox · Nintendo | Toutes les manettes |
| **Accessoires** | Casques · Câbles · Housses · Volants | Tous les accessoires |
| **Cartes cadeaux** | PlayStation · Xbox · Nintendo · Steam | Toutes les cartes |
| **Nouvelles** | Offres en cours · Événements | — |
| **À propos** | Nos boutiques · Nous contacter | Réseaux sociaux |

Les icônes viennent de `lucide-react`. Aucun emoji dans l'interface : sur Android d'entrée de gamme, le rendu est incohérent et daté.

### 5.5 Pied de page

Fond marine foncé, trois colonnes sur bureau, empilées sur mobile.

```
┌──────────────────────────────┐
│ FASOGAME                     │
│ [Texte de présentation       │
│  à fournir]                  │
├──────────────────────────────┤
│ CATÉGORIES                   │
│ Jeux · Consoles · Manettes   │
│ Accessoires · Cartes cadeaux │
├──────────────────────────────┤
│ BOUTIQUES                    │
│ [Informations à fournir]     │
├──────────────────────────────┤
│ NOUS SUIVRE                  │
│ Facebook · Instagram         │
│ TikTok · WhatsApp            │
├──────────────────────────────┤
│ © 2026 FasoGame              │
└──────────────────────────────┘
```

Les logos de réseaux viennent de `simple-icons`, pas de `lucide-react` : ce sont de vraies marques, elles ont de vrais logos.

**Pas de bloc newsletter.** Il n'y a aucune infrastructure d'envoi derrière, et un champ qui ne mène nulle part détruit la confiance.

---

## 6. Écrans

### 6.1 Accueil

```
┌──────────────────────────────┐
│ bandeau réassurance          │
│ ☰  🔍  [LOGO]  🛒  Contact   │
├──────────────────────────────┤
│ Dernier Collections Offres › │
├──────────────────────────────┤
│   [ bannière, 220 px ]       │
│   [Accroche à fournir]       │
│   [ Voir le catalogue ]      │
├──────────────────────────────┤
│ Quelle est votre console ?   │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│ │ PS │ │XBOX│ │ NSW│ │RÉTRO│ │
│ └────┘ └────┘ └────┘ └────┘  │
├──────────────────────────────┤
│ — BOUTIQUE                   │
│ Explorer les catégories      │
│ ┌──────────┐  ┌──────────┐   │
│ │  image   │  │  image   │   │
│ │ Jeux     │  │ Consoles │   │
│ │ 12 réf.  │  │ 4 réf.   │   │
│ └──────────┘  └──────────┘   │
├──────────────────────────────┤
│ — VIENT D'ARRIVER            │
│ Nouveautés            Tout › │
│ ┌────┐ ┌────┐ ┌────┐         │
│ │ img│ │ img│ │ img│  →      │
│ │ nom│ │ nom│ │ nom│         │
│ │PRIX│ │PRIX│ │PRIX│    ⊕    │
│ └────┘ └────┘ └────┘         │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ bannière promo           │ │
│ │ [Contenu à fournir]      │ │
│ └──────────────────────────┘ │
├──────────────────────────────┤
│ Manettes              Tout › │
│ Cartes cadeaux        Tout › │
├──────────────────────────────┤
│ pied de page                 │
└──────────────────────────────┘
```

Le bloc « Quelle est votre console ? » reste l'élément le plus important de l'accueil : il matérialise le principe 1.3. Ses quatre pastilles utilisent les vrais logos de marque via `simple-icons`.

Les bannières promotionnelles reprennent le principe de la référence : bloc arrondi, dégradé, illustration à gauche, titre et bouton à droite. Contenu `[À fournir]` — ne pas inventer de promotion.

**Pas de bloc d'avis clients.** Aucune note ni nombre d'avis n'est connu, et en inventer serait un mensonge affiché en page d'accueil.

### 6.2 Catalogue

```
┌──────────────────────────────┐
│ 🔍 Chercher un produit       │
├──────────────────────────────┤
│ (Tout)(Jeux)(Consoles)(Man…)›│
│ (Toutes)(PS)(Xbox)(Nintendo)›│
├──────────────────────────────┤
│ 32 produits      [⇅ Filtrer] │
├──────────────────────────────┤
│ ┌────────┐  ┌────────┐       │
│ │EN STOCK│  │EN STOCK│       │
│ │  img   │  │  img   │       │
│ ├────────┤  ├────────┤       │
│ │ JEUX   │  │MANETTES│       │
│ │ nom du │  │ nom du │       │
│ │ produit│  │ produit│       │
│ │ ●● ●   │  │ ●      │       │
│ │À partir│  │ 70 000 │   ⊕   │
│ │ 20 000 │  │  CFA   │       │
│ └────────┘  └────────┘       │
└──────────────────────────────┘
```

**Carte produit — contenu exact**

1. Étiquette de disponibilité en haut à gauche : `EN STOCK` / `SUR COMMANDE` / `ÉPUISÉ`
2. Image carrée 1:1, recadrée en couverture
3. Catégorie en petites capitales rouges
4. Nom sur deux lignes maximum, **troncature en fin de mot avec `…`** — jamais une coupure au milieu d'un mot
5. Rangée de pastilles de plateforme
6. **Prix** : exact si mono-variante, `À partir de X FCFA` si multi-variantes, `[Prix à fournir]` si tout est à `null`
7. Bouton `⊕` d'ajout au panier, en bas à droite

Le prix est en Space Grotesk gras, plus gros que le nom. C'est l'information que l'œil doit trouver en premier.

Grille : 2 colonnes mobile, 3 tablette, 4 bureau.

### 6.3 Panneau de filtres

Glissant depuis le bas sur mobile, colonne fixe à gauche sur bureau.

```
┌──────────────────────────────┐
│         Trier et filtrer  ✕  │
├──────────────────────────────┤
│ Trier                     ⌄  │
│   ○ Plus récent              │
│   ○ Prix croissant           │
│   ○ Prix décroissant         │
│   ○ Nom A→Z                  │
├──────────────────────────────┤
│ Catégorie                 ⌃  │
├──────────────────────────────┤
│ Plateforme                ⌃  │
├──────────────────────────────┤
│ Prix                      ⌃  │
│   [Paliers à définir]        │
├──────────────────────────────┤
│ Genre                     ⌃  │
├──────────────────────────────┤
│ Disponibilité             ⌃  │
├──────────────────────────────┤
│  [ Afficher les 32 résultats]│
│  Tout effacer                │
└──────────────────────────────┘
```

Changement v3 : **le tri par prix est activé**, puisque des prix existent. Il s'appuie sur `prixMinimum`. Les produits sans prix se rangent toujours en fin de liste, quel que soit le sens du tri.

Le **filtre par tranche de prix reste désactivé** et marqué `[Paliers à définir]` : les tranches dépendent de l'étendue réelle du catalogue, encore inconnue.

Règles inchangées : sélection multiple par groupe, compteur en direct, groupe Genre visible seulement si la catégorie Jeux est active ou si aucune catégorie n'est sélectionnée, état complet synchronisé avec l'URL.

### 6.4 Fiche produit

Structure validée en v2, conservée telle quelle. Trois bandes successives.

**Bande 1 — bloc héros, pleine largeur, sombre**

- Bannière 16:9 alignée à droite
- Dégradé sombre de gauche à droite par-dessus
- Bouton retour flottant translucide en haut à gauche
- Panneau sombre translucide (`rgba(26,26,26,.92)`, largeur ~620 px) posé en bas à gauche, aligné sur le bord du conteneur de 1200 px
- Hauteur : 50 vh sur mobile, 70 vh sur bureau

Contenu du panneau, dans cet ordre :

```
┌────────────────────────────────┐
│ NOM DU PRODUIT                 │  44 px
│ JEUX · SPORT                   │  petites capitales
│ [PS5] [PS4] [Xbox Series]      │  étiquettes fines
│                                │
│ Choisissez votre plateforme    │
│ ┌────────┐┌────────┐┌────────┐ │
│ │PlaySta.││  Xbox  ││ Switch │ │
│ └────────┘└────────┘└────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ PS5    25 000 FCFA         │ │
│ │        ● En stock          │ │
│ │ PS4    20 000 FCFA         │ │
│ │        ● En stock          │ │
│ └────────────────────────────┘ │
│                                │
│ [ ⊕ Ajouter au panier        ] │
│ [ Commander sur WhatsApp     ] │
└────────────────────────────────┘
```

Changement v3 : deux boutons au lieu d'un. **Ajouter au panier** est l'action principale, en rouge FasoGame. **Commander sur WhatsApp** est secondaire, en contour vert. Le cœur des favoris a disparu.

Sur mobile, le panneau sort du positionnement absolu et se place sous la bannière, en pleine largeur de contenu.

**Bande 2 — informations pratiques, fond carbone `#1A1A1A`, pleine largeur**

Grille de quatre colonnes, icône plus intitulé : disponibilité, plateformes compatibles, garantie, mode de retrait. Tout `[À fournir]`.

**Bande 3 — fond clair, conteneur 1200 px**

Description, puis produits similaires.

### 6.5 Sélecteur de plateforme

**Comportement**

1. Seules les plateformes réellement disponibles apparaissent.
2. Produit mono-variante : aucun bouton, le bloc de prix est ouvert d'emblée. Cela inclut les produits de la famille Multi-plateformes (2.4), toujours mono-variante.
3. Au clic, le bouton actif passe en plein, les autres restent en contour.
4. Le bloc de prix liste **toutes les variantes de la famille choisie**. PlayStation sélectionné affiche PS5 et PS4 séparément, chacune avec son prix et sa disponibilité.
5. Chaque ligne du bloc est cliquable et devient la variante retenue pour l'ajout au panier. Une variante est toujours sélectionnée par défaut : la première en stock, sinon la première de la liste.
6. Le message WhatsApp direct se recompose avec la variante retenue.
7. Le choix s'inscrit dans l'URL : `?plat=PlayStation`.

**Variantes épuisées**

- Une variante `Épuisé` reste **visible** dans le bloc de prix : ligne grisée, non sélectionnable, mention « Épuisé » en rouge. Le client doit savoir que la version existe, même indisponible.
- Si toutes les variantes de la famille choisie sont épuisées, le bouton de famille reste cliquable et affiche le bloc avec toutes les lignes grisées ; le bouton « Ajouter au panier » est alors remplacé par « Prévenez-moi — `[À définir]` », inactif.
- La sélection par défaut (point 5) ne retient jamais une variante épuisée s'il existe une variante disponible dans la famille.

**Transition** — 220 ms `ease-out`, bloc de prix en fondu ascendant (opacité 0→1, translation 8 px). Sous `prefers-reduced-motion`, changement instantané sans translation.

**Contrainte à respecter absolument**

Ces couleurs appartiennent à Sony, Microsoft et Nintendo. Si elles envahissent la page, l'identité FasoGame disparaît.

**La couleur de plateforme est un accent local, jamais un thème.** Elle colore le bouton actif, le fond du bloc de prix et un liseré. L'en-tête, le pied de page, la navigation et les fonds de page restent aux couleurs FasoGame en toutes circonstances. Le rouge de la marque reste réservé aux actions du site lui-même.

### 6.6 Pages vitrines de catégorie

`/consoles`, `/jeux`, `/manettes`, `/accessoires`, `/cartes-cadeaux` partagent un gabarit commun : titre, cartes par famille avec nombre de références, puis grille complète de la catégorie.

### 6.7 Nouvelles

```
Article { titre, image, resume, contenu, date, type: Offre | Événement | Annonce }
```

Liste chronologique inverse, filtrable par type. Trois articles de substitution marqués `[Contenu à fournir]`.

### 6.8 À propos

Structure seulement : présentation · nos boutiques · nous contacter · réseaux sociaux. Chaque bloc porte `[Contenu à fournir]`.

---

## 7. Composants

| Composant | Rôle | Attention |
|---|---|---|
| `BandeauReassurance` | bande rouge supérieure | contenu à fournir |
| `BarreSuperieure` | navigation fixe | recherche déployable, badge panier |
| `MenuTiroir` | menu deux colonnes | comportement PS Store |
| `CarteProduit` | vignette | **avec prix**, pastilles, bouton d'ajout |
| `VoletVariantes` | choix de plateforme à l'ajout | remonte du bas, un seul appui |
| `PastillePlateforme` | rond coloré | 8 px, infobulle au survol |
| `EtiquetteDisponibilite` | badge de stock | coin haut gauche |
| `GrilleProduits` | grille responsive | 2/3/4 colonnes |
| `BarreFiltres` | puces horizontales | visible au défilement |
| `PanneauFiltres` | panneau complet | glissant bas / colonne |
| `ChampRecherche` | recherche | filtrage immédiat |
| `SelecteurPlateforme` | boutons de famille | pilote l'accent local |
| `BlocPrix` | prix par variante | lignes cliquables |
| `BoutonAjouterPanier` | action principale | rouge FasoGame |
| `BoutonWhatsApp` | action secondaire | contour vert |
| `Notification` | confirmation d'ajout | **disparaît après 3 s** |
| `LignePanier` | article du panier | plateforme toujours visible |
| `RecapPanier` | totaux | exclut les articles sans prix |
| `FormulaireCommande` | coordonnées client | validation en direct |
| `BanniereProm` | encart promotionnel | contenu à fournir |
| `CarrouselProduits` | rangée horizontale | défilement tactile |
| `PiedDePage` | pied commun | logos simple-icons |

Composants supprimés depuis la v2 : `BoutonFavori`, `ListeFavoris`.

---

## 8. Couleurs et typographie

Deux jeux coexistent. Ne jamais les mélanger.

**Identité FasoGame** — structure, navigation, fonds, actions du site.

| Rôle | Hex |
|---|---|
| Marine | `#1E2464` |
| Marine foncé | `#141838` |
| Marine clair | `#262C6E` |
| Bordure marine | `#343A82` |
| Rouge accent | `#E12B3C` |
| Texte secondaire sombre | `#A8ADD4` |
| Carbone (bandes sombres) | `#1A1A1A` |
| Fond page | `#FFFFFF` |
| Fond alterné | `#F4F5FA` |
| Texte principal | `#141838` |

Le fond général est **clair**. Le marine est réservé à l'en-tête, au pied de page et aux titres. Le carbone est réservé au bloc héros et à la bande d'informations de la fiche produit.

**Signalétique des plateformes** — uniquement pastilles, bouton de famille actif, bloc de prix, cartes de famille.

| Famille | Hex |
|---|---|
| PlayStation | `#0070D1` |
| Xbox | `#107C10` |
| Nintendo | `#E60012` |
| Rétro | `#6B7280` |

**Vert WhatsApp `#25D366`** — exclusivement le bouton de commande WhatsApp.

**Typographies** — Space Grotesk pour les titres, noms de produits et prix ; Inter pour le texte et l'interface.

**Icônes** — `lucide-react` pour l'interface, `simple-icons` pour les logos de marque (PlayStation, Xbox, Nintendo, Steam, WhatsApp, réseaux sociaux). Aucun emoji.

---

## 9. Contraintes techniques

- Première page utile sous 300 Ko. Images WebP, chargement différé, vignettes 400 px maximum.
- Affichage du contenu principal sous 3 secondes en 3G simulée.
- Recherche côté client, tolérante aux accents et à la casse.
- Contraste 4,5:1 minimum, focus clavier visible, cibles tactiles 44 px, `prefers-reduced-motion` respecté.
- Métadonnées et Open Graph par page — c'est l'aperçu qui s'affiche quand un lien circule sur WhatsApp.
- **Éviter `color-mix()`** : non pris en charge par les navigateurs Android anciens, encore répandus sur le marché visé. Utiliser des variables CSS aux valeurs pré-calculées.
- PWA reportée à plus tard.

---

## 10. Ordre de construction

1. **Jetons de conception** — variables CSS des deux jeux de couleurs, typographies, espacements, rayons. Aucune valeur en dur ensuite.
2. **Modèle de données** — types, 15 produits d'essai, cinq prix connus renseignés, fonctions utilitaires de la section 2.5.
3. **Contexte panier** — état partagé, persistance `localStorage`, fonctions d'ajout, modification, suppression, totaux. Sans interface, testé en console.
4. **Composants isolés** — `CarteProduit` avec prix, `PastillePlateforme`, `EtiquetteDisponibilite`, `GrilleProduits`, `Notification`.
5. **Volet de variantes** — ajout depuis une carte, avec les deux cas mono et multi.
6. **Catalogue** — grille, recherche, filtres par puces, tri par prix, synchronisation URL.
7. **Panneau de filtres** — tri, catégorie, plateforme, genre, disponibilité. Tranches de prix désactivées.
8. **Fiche produit** — bloc héros, sélecteur, bloc de prix, double bouton, bande carbone.
9. **Navigation** — bandeau de réassurance, barre supérieure avec badge, menu tiroir, pied de page.
10. **Page panier** — lignes, quantités, totaux, état vide.
11. **Page commande** — formulaire, validation, `envoyerCommande`, page de confirmation.
12. **Accueil** — bannière, sélecteur de console, grille de catégories, carrousels, bannières promo.
13. **Pages vitrines** — les cinq catégories sur gabarit commun.
14. **Nouvelles et À propos** — structure seule.
15. **Optimisation et métadonnées.**

---

## 11. Erreurs à ne pas reproduire

Relevées sur le site qui sert de référence commerciale. Elles sont listées ici parce qu'elles sont faciles à répéter par inadvertance.

| Défaut observé | Règle |
|---|---|
| Quantité affichée « 1.000 » | Une quantité est un entier, jamais formaté avec séparateur de milliers |
| Notification d'ajout collée en bas de tous les écrans | Elle disparaît après 3 secondes et ne recouvre jamais un bouton |
| Titres tronqués en plein milieu d'un mot | Troncature en fin de mot, avec `…` |
| Emoji en guise d'icônes | `lucide-react` et `simple-icons` uniquement |
| Photos génériques sans rapport avec le stock | Placeholder neutre assumé plutôt qu'une image d'illustration trompeuse |
| Champ newsletter sans service derrière | Pas de champ newsletter |

---

## 12. Écarts assumés avec le PlayStation Store

| PlayStation Store | FasoGame | Raison |
|---|---|---|
| Une plateforme | Quatre familles | Boutique multi-marques |
| Compte utilisateur | Aucun compte | Pas de transaction en ligne |
| Paiement intégré | Panier puis WhatsApp | Habitude d'achat locale, pas d'infrastructure de paiement |
| Milliers de résultats paginés | Catalogue chargé en entier | Volume réel bien plus faible |
| Produits dématérialisés | Produits physiques | Notion de stock |
| Bleu Sony partout | Identité FasoGame, marques en accent local | L'identité reste celle de la boutique |

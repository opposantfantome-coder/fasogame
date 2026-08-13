# FasoGame — Suite de prompts pour Claude Code (v3)

## Préparation

1. Créer un dossier de projet à un endroit dont tu te souviendras. Suggestion : `~\fasogame` — à côté de `~\foudrore`.
2. Déposer `fasogame-architecture-v3.md` à la racine de ce dossier.
3. Ouvrir Claude Code depuis ce dossier.

**Note l'emplacement quelque part hors de l'ordinateur** (message WhatsApp à toi-même, carnet). C'est ce qui a manqué la dernière fois.

---

## Prompt 0 — Cadrage

```
Lis le fichier fasogame-architecture-v3.md à la racine du projet.

C'est la spécification complète du site que nous allons construire ensemble.
Ne code rien pour l'instant.

Confirme-moi en quelques lignes :
1. Ce que tu as compris de la règle d'affichage du prix sur une carte
   (cas mono-variante, cas multi-variantes, cas prix inconnu)
2. Pourquoi une ligne de panier doit obligatoirement porter une plateforme
3. La différence entre les deux jeux de couleurs de la section 8
4. Ce que fait la fonction envoyerCommande et pourquoi elle est isolée

Signale-moi tout point du document qui te semble ambigu ou contradictoire
avant qu'on commence.
```

Cette étape coûte deux minutes et évite de découvrir au prompt 6 que l'agent a mal compris le point central.

---

## Prompt 1 — Fondations

```
Étapes 1 et 2 de la section 10 du document.

Crée un projet Next.js avec App Router et TypeScript, en français.

1. Les jetons de conception : variables CSS pour les deux jeux de couleurs
   de la section 8, les typographies Space Grotesk et Inter, une échelle
   d'espacement en multiples de 4 px, les rayons de bordure.
   Aucune couleur ni taille en dur ailleurs dans le projet, jamais.
   N'utilise pas color-mix() : pré-calcule les valeurs.

2. Les types TypeScript Produit, Variante et LignePanier exactement
   comme en section 2.

3. Un fichier de données d'essai avec 15 produits fictifs couvrant les cinq
   catégories et les quatre familles de plateformes, dont au moins trois
   produits multi-plateformes.
   Renseigne uniquement les cinq prix listés dans la section
   "Informations non fournies". Tous les autres prix à null.
   N'invente aucun prix.

4. Les fonctions utilitaires de la section 2.5.

Pas encore de page ni de composant visuel. Montre-moi la structure des
fichiers quand tu as fini.
```

---

## Prompt 2 — Contexte panier

```
Étape 3 de la section 10.

Construis l'état du panier, sans aucune interface.

- Un contexte React partagé, monté à la racine de l'application
- Persistance dans localStorage sous la clé fasogame.panier
- Si localStorage est indisponible, bascule en mémoire pour la session
  sans faire planter la page
- À la lecture, écarte silencieusement les lignes dont le produit ou
  la variante n'existe plus dans le catalogue
- Fonctions : ajouter, modifierQuantite, supprimer, vider, totaux
- La quantité est bornée entre 1 et 20
- Les articles à prix null n'entrent pas dans le sous-total, mais le
  résultat des totaux indique combien d'articles sont dans ce cas

Ajoute une page /test-panier temporaire avec quelques boutons bruts pour
que je puisse vérifier le comportement, y compris après rechargement.
```

À vérifier avant de continuer : ajouter, recharger la page, l'article est toujours là.

---

## Prompt 3 — Composants de base

```
Étape 4 de la section 10.

Construis les composants isolés, avec une page /demo qui les affiche
côte à côte :

1. PastillePlateforme — rond de 8 px coloré selon la famille, infobulle
   au survol.

2. EtiquetteDisponibilite — badge EN STOCK / SUR COMMANDE / ÉPUISÉ.

3. CarteProduit selon la section 6.2, dans l'ordre exact des sept
   éléments listés.
   Le prix suit la règle : exact si mono-variante, "À partir de X FCFA"
   si multi-variantes, [Prix à fournir] si tout est à null.
   Le prix est en Space Grotesk gras, plus gros que le nom.
   Le nom se tronque en fin de mot avec …, jamais au milieu d'un mot.

4. GrilleProduits — 2 colonnes mobile, 3 tablette, 4 bureau.

5. Notification — confirmation d'ajout, disparaît d'elle-même après
   3 secondes, ne recouvre jamais un bouton.

Utilise uniquement les variables CSS de l'étape 1 et les icônes
lucide-react. Aucun emoji.
```

Vérifier visuellement avant de continuer : c'est le composant le plus répété du site.

---

## Prompt 4 — Volet de variantes

```
Étape 5 de la section 10, section 4.2 du document.

Le bouton ⊕ de CarteProduit :

- Produit mono-variante : ajout direct au panier, Notification affichée.
- Produit multi-variantes : ouvre VoletVariantes, un panneau remontant
  du bas, listant chaque variante avec sa plateforme, son prix et sa
  disponibilité. Un seul appui sur une ligne ajoute au panier et referme
  le volet. Les variantes Épuisé sont grisées et non cliquables.

Sur la page /demo, mets côte à côte un produit mono et un produit multi
pour que je puisse tester les deux cas.
```

---

## Prompt 5 — Catalogue et filtres

```
Étapes 6 et 7 de la section 10, sections 6.2 et 6.3 du document.

- Champ de recherche en haut, filtrage immédiat sans validation,
  tolérant aux accents et à la casse
- Deux rangées de puces horizontales : catégorie puis plateforme,
  défilement horizontal, restent visibles au défilement de la page
- Compteur de résultats
- Bouton Filtrer ouvrant le panneau complet : glissant depuis le bas sur
  mobile, colonne fixe à gauche sur bureau
- Le tri par prix est ACTIF et s'appuie sur prixMinimum. Les produits
  sans prix se rangent toujours en fin de liste, quel que soit le sens.
- Le filtre par tranche de prix reste désactivé, marqué [Paliers à définir]
- Le groupe Genre n'apparaît que si la catégorie Jeux est active ou si
  aucune catégorie n'est sélectionnée
- Sélection multiple dans chaque groupe
- Tout l'état des filtres est synchronisé avec l'URL
```

---

## Prompt 6 — Fiche produit

```
Étape 8 de la section 10. C'est l'écran le plus important du site.
Lis attentivement les sections 6.4 et 6.5 du document.

Construis /produit/[id] avec ses trois bandes :

BANDE 1 — bloc héros, pleine largeur, sortant du conteneur 1200 px.
Hauteur 50vh mobile / 70vh bureau. Bannière 16:9 alignée à droite,
dégradé sombre de gauche à droite par-dessus, bouton retour flottant
translucide en haut à gauche.
Panneau sombre rgba(26,26,26,.92), largeur ~620 px, posé en bas à gauche,
aligné sur le bord du conteneur de 1200 px.
Contenu du panneau dans l'ordre : titre 44 px, catégorie et genres en
petites capitales, étiquettes de plateformes en contour fin (une par
variante réelle), sélecteur de plateforme, bloc de prix, puis DEUX
boutons — "Ajouter au panier" en rouge FasoGame en action principale,
"Commander sur WhatsApp" en contour vert en action secondaire.
Sur mobile, le panneau sort du positionnement absolu et se place sous
la bannière, en pleine largeur de contenu.

BANDE 2 — bande pleine largeur fond carbone #1A1A1A, grille de quatre
colonnes icône + intitulé, tout [À fournir].

BANDE 3 — fond clair, conteneur 1200 px : description puis produits
similaires.

Chaque ligne du bloc de prix est cliquable et devient la variante
retenue pour l'ajout au panier. Une variante est toujours sélectionnée
par défaut : la première en stock, sinon la première de la liste.

Cas particulier : produit mono-variante, aucun bouton de plateforme,
bloc de prix ouvert d'emblée.

CONTRAINTE ESSENTIELLE — relis le dernier paragraphe de la section 6.5.
La couleur de la famille colore uniquement le bouton actif, le fond du
bloc de prix et un liseré. L'en-tête, le pied de page, la navigation et
les fonds de page restent aux couleurs FasoGame en toutes circonstances.
Ne thème jamais la page entière.

Respecte prefers-reduced-motion : changement instantané, sans translation.
```

C'est le prompt à vérifier le plus attentivement. Tester les trois familles.

---

## Prompt 7 — Navigation

```
Étape 9 de la section 10, sections 5.1 à 5.5.

1. BandeauReassurance — bande rouge pleine largeur au-dessus de l'en-tête,
   contenu [À confirmer], numéro en lien tel:.

2. BarreSuperieure — fixe, 60 px, fond marine, flou au défilement.
   Menu, loupe déployant la recherche, logo centré, icône panier avec
   badge de comptage, bouton Contact rouge ouvrant WhatsApp.
   AUCUNE icône de compte, AUCUNE icône de favoris.

3. MenuTiroir — les huit rubriques du tableau, plus le bloc ACCÈS RAPIDE.
   Comportement à deux colonnes : au clic sur une rubrique, la bande
   d'icônes reste à gauche et le contenu s'affiche à droite.
   C'est le comportement du menu du PlayStation Store.
   Chaque vignette mène au catalogue pré-filtré.

4. BarreOnglets — Dernier, Collections, Offres, Boutiques.

5. PiedDePage — fond marine foncé, quatre blocs.
   Les logos de réseaux sociaux viennent de simple-icons, pas de
   lucide-react. Installe le paquet si besoin.
   PAS de bloc newsletter.
```

---

## Prompt 8 — Panier et commande

```
Étapes 10 et 11 de la section 10, sections 4.4 à 4.6.

1. Page /panier selon le schéma 4.4.
   La plateforme s'affiche sous le nom de chaque article, sans exception.
   Sélecteur de quantité borné 1 à 20 ; à 1, le bouton ⊖ devient une
   suppression.
   ATTENTION : la quantité est un entier, jamais formatée avec séparateur
   de milliers. Elle doit afficher "1", pas "1.000".
   Un article à prix null affiche [Prix à fournir] et n'entre pas dans le
   sous-total ; le total porte la mention "hors articles sans prix".
   Livraison marquée [À confirmer], hors de tout calcul.
   État vide : illustration, phrase courte, bouton vers le catalogue.

2. Page /commande selon le tableau 4.5.
   Six champs seulement. Validation en direct, message d'erreur sous le
   champ. Le bouton reste actif et fait défiler jusqu'au premier champ
   invalide au lieu de rester grisé sans explication.
   Rappel replié du panier et du total sous le formulaire.

3. La fonction envoyerCommande(commande), dans un fichier dédié.
   C'est le SEUL endroit du code qui construit une URL WhatsApp de
   commande. Format du message exactement comme en section 4.6.
   Encode avec encodeURIComponent, sauts de ligne compris.
   Le numéro WhatsApp est une constante unique marquée [Numéro à confirmer].

4. Page de confirmation après envoi, avec lien de repli si l'ouverture
   de WhatsApp a échoué, et un bouton "J'ai envoyé ma commande" qui vide
   le panier. Ne vide jamais le panier automatiquement.
```

---

## Prompt 9 — Accueil

```
Étape 12 de la section 10, schéma 6.1.

- Bannière de 220 px avec [Accroche à fournir] et bouton
  "Voir le catalogue"
- Bloc "Quelle est votre console ?" : quatre grandes pastilles utilisant
  les VRAIS logos PlayStation, Xbox, Nintendo via simple-icons, menant
  chacune au catalogue pré-filtré.
  C'est l'élément le plus important de la page, traite-le comme tel.
- Bloc "Explorer les catégories" : cartes avec image, nom et nombre de
  références, calculé depuis les données.
- Carrousels à défilement horizontal tactile : Nouveautés, Manettes,
  Cartes cadeaux. Chacun avec un lien "Tout" vers le catalogue pré-filtré.
  Les cartes affichent leur prix et leur bouton d'ajout.
- Deux bannières promotionnelles : bloc arrondi, dégradé, illustration à
  gauche, titre et bouton à droite. Contenu [À fournir].
  N'invente aucune promotion, aucun pourcentage de remise.

PAS de bloc d'avis clients : aucune note n'est connue.
```

---

## Prompt 10 — Pages restantes

```
Étapes 13 et 14 de la section 10.

1. Un gabarit commun pour /consoles, /jeux, /manettes, /accessoires et
   /cartes-cadeaux, selon la section 6.6.

2. /nouvelles : liste chronologique inverse, filtrable par type, avec
   trois articles de substitution marqués [Contenu à fournir].

3. /a-propos : la structure des quatre blocs, chacun portant
   [Contenu à fournir]. Aucun texte inventé.

Supprime la page /test-panier et la page /demo.
```

---

## Prompt de contrôle — à utiliser à tout moment

```
Vérifie le projet contre fasogame-architecture-v3.md et liste :

1. Les écarts par rapport à la spécification
2. Les valeurs de couleur ou de taille écrites en dur au lieu des variables
3. Tout endroit où une ligne de panier n'affiche pas sa plateforme
4. Tout endroit où une quantité est formatée avec un séparateur de milliers
5. Tout endroit où une couleur de plateforme déborde de son rôle d'accent
6. Tout usage de color-mix() ou d'emoji
7. Toute donnée inventée là où le document dit [À fournir] ou [À confirmer]
8. Tout endroit hors de envoyerCommande qui construit une URL WhatsApp
   de commande
```

Le plus utile de tous. Le lancer après les prompts 5, 6 et 8.

---

## Rappel de méthode

- `npm run build` avant chaque étape suivante
- Vérifier visuellement après chaque prompt, pas à la fin
- Si le rendu est décevant, c'est probablement l'absence de vraies photos.
  Découper les captures de la boutique et remplacer les placeholders dès
  que possible : c'est le seul vrai test de l'allure du site.

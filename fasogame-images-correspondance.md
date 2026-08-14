# FasoGame — Images produits

30 fichiers, 3 Mo. À décompresser dans `public/produits/`.

Convention : `<slug>.jpg` pour la vignette carrée, `<slug>-banniere.jpg` pour la bannière 16:9 du bloc héros.

---

## Ce qu'il faut décider avant d'intégrer

Le catalogue actuel contient des produits fictifs (God of War Ragnarök, Forza Horizon 5, Zelda TOTK, Mario Kart 8, Mortal Kombat 1) **pour lesquels il n'y a pas d'image**. Inversement, les images couvrent des titres qui ne sont pas au catalogue.

**Il faut aligner le catalogue sur les images**, pas l'inverse. Ces titres-là correspondent d'ailleurs mieux à ce que la boutique vend réellement (FC 26, GTA V et Call of Duty apparaissent dans leurs publications).

Deux produits tarifés perdent leur image au passage :

| Produit | Prix | Image |
|---|---|---|
| Manette Switch Pro | 40 000 FCFA | aucune |
| Manette DualSense camo | 80 000 FCFA | aucune |

Ils gardent le placeholder neutre. C'est acceptable : le placeholder existe pour ça.

En revanche il y a désormais **deux manettes Xbox** (blanche et noire), toutes deux à 50 000 FCFA — ce qui correspond aux quatre coloris annoncés par la boutique.

---

## Jeux — vignette + bannière

| Slug | Vignette | Bannière | Plateformes suggérées |
|---|---|---|---|
| `ea-sports-fc-26` | 444 px | oui | PS5, PS4, Xbox Series, Switch |
| `ghost-of-yotei` | 444 px | oui | PS5 |
| `resident-evil-requiem` | 764 px | oui | PS5, Xbox Series |
| `spider-man-2` | 444 px | oui | PS5 |
| `elden-ring` | 281 px | oui | PS5, PS4, Xbox Series, Xbox One |
| `gta-v` | 309 px | oui | PS5, PS4, Xbox Series, Xbox One |
| `cod-black-ops-7` | 554 px | oui | PS5, Xbox Series |
| `mario-party-jamboree` | 800 px | oui | Nintendo Switch |
| `nba-2k26` | 678 px | oui | PS5, Xbox Series, Switch |
| `mxgp-2020` | 554 px | oui | PS4, Xbox One |
| `assassins-creed-odyssey` | 361 px | **non** | PS4, Xbox One |

Les plateformes sont des suggestions plausibles — à confirmer avec le gérant, comme les prix.

## Consoles — vignette seule

| Slug | Vignette | Remarque |
|---|---|---|
| `ps5-digital` | 800 px | |
| `xbox-series-x` | 800 px | |
| `ps-portal` | 800 px | |
| `switch-lite` | 450 px | |
| `switch-neon` | 326 px | source de faible qualité |
| `switch-oled` | 218 px | **source très faible, à remplacer** |

## Manettes — vignette seule

| Slug | Vignette | Prix connu |
|---|---|---|
| `manette-dualsense` | 800 px | 70 000 FCFA |
| `manette-xbox-blanche` | 800 px | 50 000 FCFA |
| `manette-xbox-noire` | 800 px | 50 000 FCFA |

---

## Qualité des sources

Aucune image n'a été agrandie : une jaquette fournie en 444 px reste en 444 px. Un agrandissement aurait produit du flou, ce qui est pire qu'une image petite mais nette. Les vignettes s'affichent entre 300 et 400 px sur mobile, donc la plupart passent sans problème.

Trois sont réellement trop petites et se verront à l'usage : `switch-oled` (218 px), `elden-ring` (281 px), `switch-neon` (326 px). À remplacer par de meilleures sources quand l'occasion se présente.

Les bannières sont toutes en 1600 × 900, recadrées depuis des visuels 1920 × 1080 ou 3840 × 2160. Elles sont de bonne qualité.

---

## Provenance

Ce sont les visuels officiels des éditeurs et des fabricants — jaquettes et images de presse. C'est ce qu'utilisent tous les revendeurs de jeux, y compris les boutiques physiques pour leurs vitrines en ligne.

Deux réserves à garder en tête pour la version définitive :

Les visuels de presse s'utilisent pour présenter le produit que l'on vend réellement. Si la boutique n'a pas le jeu en stock, la fiche ne devrait pas exister — c'est une question de sincérité commerciale autant que de droit.

Pour la démonstration, aucun problème. Quand la boutique validera le projet, le gérant confirmera son stock réel et pourra fournir ses propres photos pour les articles d'occasion, où la photo réelle vaut mieux que la jaquette officielle.

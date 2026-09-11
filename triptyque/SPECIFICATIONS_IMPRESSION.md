# Dossier VISAP 3 volets — spécifications d'impression

Deux fichiers, deux usages.

| Fichier | Usage |
|---|---|
| `TRIPTYQUE_VISAP_PLI_ROULE.pdf` | À remettre à l'imprimeur. 2 pages (extérieur / intérieur), fond perdu, traits de coupe et de pliage. |
| `VISAP_A4_TERRAIN.pdf` | Impression de dépannage au bureau. 4 pages A4 : couverture + les 3 fiches. |

---

## 1. Fichier imprimeur

**Format fini déplié** : 624 × 297 mm
**Format fichier (avec fond perdu)** : 630 × 303 mm — soit 3 mm de débord sur les quatre côtés
**Format fini plié** : 210 × 297 mm (rentre dans une pochette A4)
**Pliage** : pli roulé, 2 plis
**Impression** : recto-verso, quadri
**Support conseillé** : 300 g couché mat, pelliculage mat 1 face (extérieur) pour la tenue en chantier

### Largeurs de volets — c'est le point important

Les volets ne sont **pas** égaux, et c'est volontaire :

| Volet | Largeur | Rôle |
|---|---|---|
| Volet 1 (gauche sur l'extérieur) | **206 mm** | Rabat intérieur — se glisse en premier |
| Volet 2 (centre) | **208 mm** | Volet intermédiaire |
| Volet 3 (droite sur l'extérieur) | **210 mm** | Couverture — enveloppe les deux autres |

Dans un pli roulé, chaque volet vient se loger à l'intérieur du suivant. Si les trois
faisaient 210 mm, le rabat intérieur buterait contre le pli et le dépliant ne fermerait
pas à plat : il bâillerait et gondolerait. Le dégressif de 2 mm par volet lui laisse la
place de rentrer.

**Positions des plis** (depuis le bord gauche du format fini, sur l'extérieur) :
pli 1 à **206 mm**, pli 2 à **414 mm**.

Sur la face intérieure, les largeurs sont miroir : 210 | 208 | 206.

> Si vous préférez finalement un **pli accordéon** (en zigzag, les volets restent
> visibles en éventail), il faut au contraire trois volets **égaux à 210 mm** —
> c'est-à-dire le fichier d'origine, pas celui-ci. Le pli roulé est le choix
> habituel pour un document de chantier, parce qu'il ferme à plat et protège
> l'intérieur.

### Rainage

**Obligatoire sur ce grammage.** À demander explicitement : *2 rainages verticaux,
pleine hauteur, aux positions de pli.*

---

## 2. Fichier A4 de dépannage

4 pages A4 portrait, à imprimer en recto simple :

1. Couverture (bénéficiaire / bailleur / date)
2. Fiche terrain — Relevé avant travaux
3. Fiche terrain — Croquis et observations
4. Fiche produit — Produits à commander

Les deux volets purement décoratifs du dépliant ne sont pas repris : ils n'ont aucun
contenu à remplir, et une imprimante de bureau ne sait pas imprimer à fond perdu — ils
sortiraient avec une marge blanche disgracieuse tout autour.

Pour une VISAP en urgence, **les pages 2 à 4 suffisent**.

---

## 3. Réserves sur cette reconstruction

Ce fichier est une **reconstruction vectorielle**, pas le fichier source d'origine
(qui n'était plus disponible). Conséquences :

- **Typographies** : le document d'origine utilisait Arial et Georgia. Cette version
  utilise Liberation Sans (métriquement identique à Arial) et DejaVu Serif à la place
  de Georgia. Les titres de fiches ont donc un dessin légèrement différent.
- **Photo de couverture** : environ 185 dpi à la taille où elle est placée, contre
  300 dpi recommandés en offset. Visuellement correct, mais si vous disposez du
  fichier original de cette photo en haute définition, remplacez
  `generateur/assets/photo_douche_hero.png` et régénérez.
- **Volets décoratifs** : reconstruits d'après le rendu basse définition, les formes
  sont fidèles dans l'esprit mais pas au millimètre près.
- **Révision** : passée en **Rév. E** pour la distinguer de la Rév. D d'origine.

## 4. Régénérer

```bash
cd triptyque
python3 triptyque.py TRIPTYQUE_VISAP_PLI_ROULE.pdf VISAP_A4_TERRAIN.pdf
```

Les largeurs de volets se règlent en tête de fichier (`W_COUV`, `W_CENTRE`, `W_RABAT`),
le fond perdu avec `BLEED`.

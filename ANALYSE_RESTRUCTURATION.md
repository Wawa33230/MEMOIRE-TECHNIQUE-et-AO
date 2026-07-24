# Analyse et restructuration — ADOM SENIOR / Morbihan Habitat

## 1. Diagnostic des deux documents existants

### Le document ADOM SENIOR (« Mémoire technique de continuité » — 10 pages)

**Ce qu'il est réellement** : un dossier de continuité de marché, pas un mémoire technique.
Environ 60 % du contenu parle d'ASH, de la liquidation, du cadre juridique de la
substitution (CJUE Advania, R. 2194-6/7…) et de ce que le bailleur « évite » ou
« conserve ». ADOM SENIOR n'y existe qu'en creux, comme « l'organisation qui
sous-traitait pour ASH ».

**Points forts à conserver** :
- La charte graphique est excellente : vert canard `#073E47` / teal `#0F6470` /
  orange doré `#DB982D`, titres Georgia, corps Arial, encadrés à liseré, chips de
  section, bandeau KPI, en-tête/pied de page structurés.
- Le contenu opérationnel est bon (VISAP, INTERFAST, LT Showertec, CEDEO, SS4,
  jalons de délais) mais il est comprimé et mélangé à l'argumentaire juridique.
- L'argumentaire juridique de substitution est solide et sourcé.

**Faiblesse principale** : en mélangeant les deux sujets, le document n'est ni un
mémoire technique crédible (trop court, pas de sections moyens humains / déchets /
RSE / garanties attendues dans un AO), ni une proposition de reprise percutante
(l'essentiel se noie dans le détail technique).

### Le mémoire ASH / ERILIA (ancien document, ~60 pages)

**Ce qu'il est** : un vrai mémoire technique d'appel d'offres, avec la structure
canonique attendue par un acheteur public :
1. Présentation de l'entreprise → 2. Votre marché → 3. Moyens humains →
4. Méthodologie → 5. Moyens techniques → 6. Chronologie/délais → 7. Moyens
matériels → 8. Déchets → 9. RSE → 10. Cas pratiques.

**Ce qui est réutilisable** (et a été réutilisé, adapté à ADOM SENIOR) :
la trame des sections, la charte de bonne conduite en logement occupé, la
sensibilisation au public fragile, le processus de prise en charge (contact 24 h,
relances, avis de passage), la journée type de pose, l'autocontrôle d'étanchéité,
le protocole SS4 (pose par rails sans colle, gel de protection), la gestion des
déchets, la continuité de service 365 j.

**Ce qui ne devait PAS être repris tel quel** : tout ce qui est propre à ASH —
labels HS2/Handibat/Qualibat/Silverbat, ASH PLANNER, 200 poses/mois, 100 bailleurs
nationaux, plateformes logistiques Bègles/Limoges, GEODIS, effectifs ASH. Reprendre
ces éléments exposerait ADOM SENIOR à une non-conformité (capacités déclarées non
justifiables).

## 2. La restructuration : deux documents séparés

### Document 1 — `MEMOIRE_TECHNIQUE_ADOM_SENIOR_MORBIHAN_HABITAT.docx` (18 pages)

Un vrai mémoire technique, où ADOM SENIOR existe par ses propres moyens :

| Section | Contenu |
|---|---|
| 1. Présentation | Fiche identité (SIRET 849 109 558 00023), CA 2023-2025, ancrage breton, histoire (reprise ASH), valeurs |
| 2. Votre marché | Morbihan Habitat (33 230 logements, 215 communes), enjeux maintien à domicile, lecture des priorités |
| 3. Moyens humains | Équipe nominative, interlocuteur unique, continuité 365 j, charte de bonne conduite, formations SS4/SST |
| 4. Méthodologie | Parcours de la demande en 7 étapes, VISAP 3 volets, journée type de pose, autocontrôle étanchéité, réception |
| 5. Moyens techniques | LT Showertec (DESIGN/SLIM), réseau CEDEO Morbihan, véhicules (2 IVECO Daily + VW Crafter), outillage |
| 6. Suivi INTERFAST | Portail client, statuts, accès bailleur, indicateurs |
| 7. Chronologie | Jalons : 24 h / ≤15 j / +10 j / pose 1 journée / SAV 48 h |
| 8. Qualité & garanties | Points de contrôle, GPA, décennale, circuit SAV |
| 9. Sécurité & amiante | Prévention générale, mode opératoire SS4 complet |
| 10. Déchets | 4 catégories, tri, filières locales, bordereaux |
| 11. RSE | Sobre et vérifiable : proximité, économie d'eau, emploi local |
| 12. Références & annexes | Expérience Morbihan Habitat, sources, liste des annexes |

L'argumentaire « continuité ASH » n'y apparaît plus que comme un **atout de
référence** (105 chantiers 2025), pas comme la raison d'être du document. Le
mémoire reste utilisable pour d'autres consultations en changeant la section 2.

### Document 2 — `PROPOSITION_REPRISE_MARCHE_ASH_MORBIHAN_HABITAT.docx` (5 pages)

Dossier compact, orienté décision, qui répond point par point à la demande :

1. **Page de garde** : marché 24S0049, titulaire initial ASH, candidat ADOM SENIOR + « l'essentiel » en un paragraphe
2. **Qui sommes-nous ?** : fiche identité complète avec SIRET, et le positionnement **Bretagne** (choix assumé, pas une limite — vs opérateurs nationaux dispersés)
3. **Reprise des actifs et salariés ASH** : Loyk Duporge (ancien salarié ASH, encadrant SS4, direction) et Charles de Lestrange (ancien commercial Bretagne ASH, interlocuteur unique), équipes terrain, socle technique, tableau avant/après
4. **Nos chiffres** : bandeau KPI 185 K€ (2023) → 630 K€ (2024) → 700 K€ (2025), dont **150 K€ / 105 chantiers en sous-traitance d'ASH pour Morbihan Habitat**
5. **Cadre de la reprise + proposition de démarrage** : tableau juridique condensé, phase transitoire, plan de démarrage en 4 points, contacts

## 3. Charte graphique

La charte du document ADOM SENIOR d'origine est reproduite dans les deux documents
(module partagé `generateur/charte.js`) : logo texte Adom/senior Georgia bicolore,
chips de section orange, encadrés gris-bleu à liseré teal, tableaux à en-tête teal,
bandeaux KPI teal/orange alternés, en-tête et pied de page identiques à l'original.

## 4. Régénération

```bash
cd generateur
npm install docx
node memoire.js ../documents/MEMOIRE_TECHNIQUE_ADOM_SENIOR_MORBIHAN_HABITAT.docx
node proposition.js ../documents/PROPOSITION_REPRISE_MARCHE_ASH_MORBIHAN_HABITAT.docx
```

Les `.docx` restent bien sûr éditables directement dans Word — les scripts ne sont
utiles que pour regénérer une version propre après modification de fond.

## 5. Points de vigilance avant envoi

- **Sommaire** : les numéros de page du sommaire sont statiques (vérifiés sur la
  version générée). Si vous ajoutez du contenu dans Word, mettez-les à jour.
- **Annexes** : les annexes A1–A9 listées (attestations SS4, VISAP, PV, notice,
  assurances, Kbis) doivent être jointes au dossier final.
- **Coordonnées** : ajouter téléphone / e-mail de Charles de Lestrange dans le
  tableau contact de la proposition (volontairement laissés vides, non fournis).
- **Chiffres** : CA 2025 (700 K€) présenté comme réalisé ; si l'exercice n'est pas
  clos, préciser « estimé » ou « en cours de clôture ».

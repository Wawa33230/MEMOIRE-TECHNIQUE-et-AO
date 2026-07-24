// PROPOSITION DE REPRISE DU MARCHÉ ASH — dossier compact
// Charte graphique ADOM SENIOR
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
} = require('docx');
const fs = require('fs');
const K = require('./charte');
const { C, SANS, SERIF } = K;

const D = [];

// =====================================================================
// PAGE DE GARDE
// =====================================================================
D.push(
  new Paragraph({ spacing: { before: 1400, after: 0 }, children: [] }),
  new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'Adom', font: SERIF, size: 60, bold: true, color: C.ENCRE }),
      new TextRun({ text: 'senior', font: SERIF, size: 60, bold: true, color: C.OR }),
    ],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: 'PROPOSITION DE REPRISE', font: SERIF, size: 52, bold: true, color: C.ENCRE })],
  }),
  new Paragraph({
    spacing: { after: 400 },
    children: [new TextRun({ text: 'Continuité du marché ASH — travaux d’adaptation PMR', font: SERIF, size: 30, italics: true, color: C.OR })],
  }),
  K.table(null, [
    ['CLIENT / BAILLEUR', 'MORBIHAN HABITAT'],
    ['MARCHÉ CONCERNÉ', '24S0049 — plomberie / sanitaire pour logements adaptés PMR, secteurs Est et Ouest'],
    ['TITULAIRE INITIAL', 'ASH — Aménagement Séniors Habitat (en liquidation)'],
    ['CANDIDAT À LA REPRISE', 'ADOM SENIOR — SIRET 849 109 558 00023'],
    ['INTERLOCUTEUR UNIQUE', 'Charles de Lestrange'],
  ], [3000, 6360], { boldFirstCol: true }),
  K.spacer(240),
  K.callout('L’ESSENTIEL', 'ADOM SENIOR, entreprise bretonne qui exécutait déjà les chantiers du marché en sous-traitance d’ASH (105 chantiers réalisés en 2025 pour Morbihan Habitat), a repris les actifs et les hommes clés d’ASH en Bretagne. Nous proposons de poursuivre le marché sans rupture : mêmes équipes, même interlocuteur, mêmes produits, même niveau de service.'),
  K.spacer(120),
  K.note('Document de proposition — toute modification du marché reste soumise à l’analyse et à l’accord de l’acheteur.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 1. QUI SOMMES-NOUS ?
// =====================================================================
D.push(
  K.chip('Qui sommes-nous ?'),
  K.spacer(60),
  K.h1('1. Qui sommes-nous ?'),
  K.body('ADOM SENIOR est une entreprise spécialisée dans l’adaptation de salles de bains, la plomberie sanitaire et le maintien à domicile des personnes âgées et à mobilité réduite. Notre cœur de métier : le remplacement de baignoire par une douche sécurisée sur mesure, posé en une journée, en logement occupé.'),
  K.table(['Repère', 'Donnée'], [
    ['Raison sociale', 'ADOM SENIOR'],
    ['SIRET', '849 109 558 00023'],
    ['Siège', '2 impasse Joliot-Curie, 64110 Jurançon'],
    ['Site internet', 'adomsenior.fr'],
    ['Gérant', 'Lyes Ouhaddad'],
    ['Direction', 'Loyk Duporge — encadrant technique et chantier SS4'],
    ['Interlocuteur bailleurs', 'Charles de Lestrange'],
    ['Assurances', 'Responsabilité civile et décennale plomberie / sanitaire et maintenance — période 2026'],
    ['Expérience', 'Plus de 3 000 installations ; capacité d’environ 50 poses par mois'],
    ['Moyens', 'Deux IVECO Daily et un Volkswagen Crafter aménagés ; outillage complet ; portail de suivi INTERFAST'],
  ], [3000, 6360], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Une entreprise bretonne, pour les bailleurs bretons'),
  K.body('ADOM SENIOR intervient principalement en Bretagne — c’est un choix assumé, pas une limite. Là où les opérateurs nationaux dispersent leurs équipes sur tout le territoire, nous concentrons les nôtres sur le grand Ouest : tournées courtes, réactivité SAV réelle, approvisionnement local via le réseau CEDEO du Morbihan (Lorient, Lanester, Auray, Theix–Vannes, Vannes Ouest, Ploërmel, Saint-Thuriau) et connaissance fine du patrimoine des bailleurs du territoire.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 2. REPRISE DES ACTIFS ET SALARIÉS ASH
// =====================================================================
D.push(
  K.chip('Reprise ASH'),
  K.spacer(60),
  K.h1('2. La reprise des actifs et des salariés d’ASH'),
  K.body('ADOM SENIOR n’est pas un opérateur qui découvre les prestations du marché : la société s’est structurée autour de l’organisation qui réalisait déjà, en sous-traitance d’ASH, la majorité des poses sur le périmètre breton. À la suite de la liquidation d’ASH, ADOM SENIOR a repris les actifs et intégré les hommes clés de cette organisation.'),
  K.spacer(60),
  K.table(['Continuité', 'Ce qui est repris chez ADOM SENIOR'], [
    ['Les hommes', 'Loyk Duporge, ancien salarié d’ASH (encadrant technique et chantier SS4), assure la direction. Charles de Lestrange, ancien commercial Bretagne d’ASH, demeure l’interlocuteur unique des bailleurs.'],
    ['Les équipes terrain', 'Les équipes de pose qui exécutaient environ 80 % des interventions du périmètre breton sont aujourd’hui réunies chez ADOM SENIOR.'],
    ['Le socle technique', 'Panneaux LT Showertec, approvisionnement CEDEO, méthode de pose en une journée, dossier VISAP trois volets, PV de réception, notice d’entretien, organisation SS4.'],
    ['Les outils', 'Véhicules ateliers, outillage, suivi de chantier documenté et portail client INTERFAST.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.callout('CE QUE CELA CHANGE POUR LE BAILLEUR', 'Rien sur le terrain — et c’est précisément l’intérêt. Les gestes techniques, les produits, les contrôles et la relation avec les locataires en logement occupé restent ceux que Morbihan Habitat connaît déjà. Ce qui change : l’organisation qui exécutait devient l’opérateur directement responsable, visible et pilotable.'),
  K.spacer(120),
  K.h2('Avant / après'),
  K.table(['Avant (organisation ASH)', 'Continuité proposée (ADOM SENIOR)'], [
    ['ASH titulaire et interface contractuelle', 'ADOM SENIOR opérateur responsable, sous réserve de l’acte de substitution.'],
    ['Équipes ADOM SENIOR en sous-traitance', 'Mêmes compétences terrain, mobilisées directement.'],
    ['Charles de Lestrange chez ASH', 'Même interlocuteur unique, au sein d’ADOM SENIOR.'],
    ['LT Showertec et CEDEO', 'Références, techniques de pose et chaîne d’approvisionnement conservées.'],
  ], [4680, 4680]),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 3. NOS CHIFFRES
// =====================================================================
D.push(
  K.chip('Nos chiffres'),
  K.spacer(60),
  K.h1('3. Une croissance qui prouve la solidité'),
  K.body('ADOM SENIOR connaît une croissance forte et régulière, démontrant sa capacité à absorber le volume du marché :'),
  K.kpiStrip([
    { valeur: '185 K€', libelle: 'CA 2023' },
    { valeur: '630 K€', libelle: 'CA 2024' },
    { valeur: '700 K€', libelle: 'CA 2025' },
  ]),
  K.spacer(120),
  K.callout('DÉJÀ SUR VOTRE PATRIMOINE', 'Sur le chiffre d’affaires 2025, 150 K€ correspondent à 105 chantiers réalisés en sous-traitance d’ASH pour Morbihan Habitat. Les équipes qui reprendraient le marché sont celles qui l’exécutent déjà.'),
  K.spacer(120),
  K.h2('Ce que ces chiffres démontrent'),
  K.bullet('Une entreprise en croissance (× 3,8 entre 2023 et 2025), financièrement saine et structurée ;'),
  K.bullet('Une expérience directe et récente du patrimoine et des attendus de Morbihan Habitat ;'),
  K.bullet('Une capacité de production éprouvée : environ 50 poses par mois, plus de 3 000 installations réalisées ;'),
  K.bullet('Un dimensionnement cohérent avec le périmètre du marché — ni sous-capacité, ni dispersion nationale.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 4. CADRE JURIDIQUE + PROPOSITION
// =====================================================================
D.push(
  K.chip('Cadre de la reprise'),
  K.spacer(60),
  K.h1('4. Le cadre de la reprise'),
  K.body('La liquidation du titulaire ne permet pas au bailleur de choisir librement un remplaçant, mais le Code de la commande publique prévoit une substitution du titulaire dans des hypothèses encadrées (articles R. 2194-6 et R. 2194-7 ; directive 2014/24/UE, art. 72 ; CJUE, 3 février 2022, C-461/20, Advania Sverige). La situation doit être instruite contrat par contrat, en lien avec le liquidateur.'),
  K.table(['Condition', 'Application proposée'], [
    ['Marché encore en cours', 'Vérifier que le contrat n’est ni achevé ni définitivement résilié.'],
    ['Base de substitution', 'Succession partielle à la suite d’une restructuration (insolvabilité), portant sur les droits et obligations du marché.'],
    ['Rôle du liquidateur', 'Formaliser, si juridiquement possible, la cession des droits et obligations à ADOM SENIOR.'],
    ['Capacités du repreneur', 'ADOM SENIOR satisfait aux critères qualitatifs et capacités initialement exigés (moyens, assurances, références détaillés dans le mémoire technique joint).'],
    ['Marché inchangé', 'Objet, périmètre, économie, prix et obligations conservés, sans modification substantielle.'],
    ['Décision du bailleur', 'Accord préalable de l’acheteur et formalisation par l’acte adapté.'],
  ], [2800, 6560], { boldFirstCol: true }),
  K.spacer(100),
  K.callout('PHASE TRANSITOIRE', 'Pendant l’instruction, des interventions ponctuelles peuvent être confiées à ADOM SENIOR sur devis ou bon de commande, dans un cadre d’achat autonome défini par Morbihan Habitat. Nos moyens sont mobilisables immédiatement.'),
  K.spacer(160),
  K.h1('5. Notre proposition de démarrage'),
  K.numbered('Réunion de lancement : validation des dossiers en cours, contacts, accès INTERFAST, indicateurs et calendrier des premières poses ;', 'nums'),
  K.numbered('Inventaire conjoint du stock de demandes : visites réalisées, devis en attente, commandes, poses planifiées et réserves ;', 'nums'),
  K.numbered('Reprise des dossiers exploitables sans nouvelle visite inutile ; signalement séparé des dossiers incomplets ;', 'nums'),
  K.numbered('Tableau de bord partagé dès la première semaine d’exécution.', 'nums'),
  K.spacer(120),
  K.table(['Contact', ''], [
    ['Interlocuteur unique', 'Charles de Lestrange'],
    ['Site internet', 'adomsenior.fr'],
    ['Entreprise', 'ADOM SENIOR — SIRET 849 109 558 00023'],
  ], [3000, 6360], { boldFirstCol: true }),
  K.spacer(120),
  K.note('Ce dossier constitue une proposition de continuité. La qualification juridique et l’acte de substitution relèvent du bailleur, en lien avec son conseil et le liquidateur d’ASH. Il est complété par le mémoire technique ADOM SENIOR remis séparément.'),
);

// =====================================================================
// ASSEMBLAGE
// =====================================================================
const doc = new Document({
  creator: 'ADOM SENIOR',
  title: 'Proposition de reprise du marché ASH — Morbihan Habitat',
  numbering: K.numberingConfig,
  styles: {
    default: {
      document: { run: { font: SANS, size: 19, color: C.TEXTE } },
      heading1: { run: { font: SANS, size: 30, bold: true, color: C.ENCRE } },
      heading2: { run: { font: SANS, size: 22, bold: true, color: C.TEAL } },
      heading3: { run: { font: SANS, size: 20, bold: true, color: C.ENCRE } },
    },
  },
  sections: [{
    properties: { page: { margin: K.pageMargins } },
    headers: { default: K.pageHeader('Proposition de reprise', 'MORBIHAN HABITAT  •  adomsenior.fr') },
    footers: { default: K.pageFooter() },
    children: D,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2] || 'PROPOSITION_REPRISE_MARCHE_ASH.docx', buf);
  console.log('OK proposition');
});

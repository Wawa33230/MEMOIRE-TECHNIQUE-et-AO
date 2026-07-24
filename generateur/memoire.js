// MÉMOIRE TECHNIQUE ADOM SENIOR — Morbihan Habitat
// Document long et complet, charte graphique ADOM SENIOR
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  TabStopType, TabStopPosition, LeaderType,
} = require('docx');
const fs = require('fs');
const K = require('./charte');
const { C, SANS, SERIF } = K;

const D = []; // corps du document

// =====================================================================
// PAGE DE GARDE
// =====================================================================
D.push(
  new Paragraph({ spacing: { before: 1200, after: 0 }, children: [] }),
  new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'Adom', font: SERIF, size: 60, bold: true, color: C.ENCRE }),
      new TextRun({ text: 'senior', font: SERIF, size: 60, bold: true, color: C.OR }),
    ],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: 'MÉMOIRE TECHNIQUE', font: SERIF, size: 56, bold: true, color: C.ENCRE })],
  }),
  new Paragraph({
    spacing: { after: 400 },
    children: [new TextRun({ text: 'Travaux d’adaptation de salles de bains PMR en logement occupé', font: SERIF, size: 30, italics: true, color: C.OR })],
  }),
  K.h3('Adaptation de logements pour le maintien à domicile des locataires seniors et PMR — plomberie, sanitaire, douches sécurisées'),
  K.spacer(200),
  K.table(null, [
    ['CLIENT / BAILLEUR', 'MORBIHAN HABITAT'],
    ['OBJET', 'Travaux de plomberie / sanitaire pour logements adaptés PMR — secteurs Est et Ouest'],
    ['PÉRIMÈTRE', 'Département du Morbihan'],
    ['CANDIDAT', 'ADOM SENIOR — SIRET 849 109 558 00023'],
    ['INTERLOCUTEUR UNIQUE', 'Charles de Lestrange'],
    ['ZONE D’INTERVENTION', 'Bretagne — entreprise implantée et opérant principalement sur le territoire breton'],
  ], [2800, 6560], { boldFirstCol: true }),
  K.spacer(240),
  K.callout('NOTRE ENGAGEMENT', 'Une entreprise à taille humaine, spécialiste de l’adaptation de salles de bains en logement occupé, qui réalise déjà les interventions sur le patrimoine de Morbihan Habitat : 105 chantiers réalisés en 2025 en sous-traitance sur le département.'),
  K.spacer(120),
  K.note('Document établi par ADOM SENIOR — adomsenior.fr. Les engagements de délais sont des engagements opérationnels proposés, sous réserve des stipulations contractuelles du marché.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// SOMMAIRE (statique, avec points de conduite)
// =====================================================================
const tocLine = (titre, page) => new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: 9360, leader: LeaderType.DOT }],
  spacing: { after: 140, line: 276 },
  children: [
    new TextRun({ text: titre, font: SANS, size: 21, bold: true, color: C.ENCRE }),
    new TextRun({ text: '\t' + page, font: SANS, size: 21, bold: true, color: C.TEAL }),
  ],
});
D.push(
  K.h1('Sommaire'),
  K.spacer(120),
  tocLine('1. Présentation d’ADOM SENIOR', '3'),
  tocLine('2. Notre compréhension de votre marché', '5'),
  tocLine('3. Moyens humains', '6'),
  tocLine('4. Méthodologie d’exécution des travaux', '8'),
  tocLine('5. Moyens techniques et matériels', '10'),
  tocLine('6. Suivi des chantiers : le portail INTERFAST', '12'),
  tocLine('7. Chronologie et délais de traitement', '13'),
  tocLine('8. Qualité, garanties et service après-vente', '14'),
  tocLine('9. Sécurité, prévention et maîtrise du risque amiante', '15'),
  tocLine('10. Gestion des déchets et valorisation', '16'),
  tocLine('11. Notre démarche responsable', '17'),
  tocLine('12. Références, sources et annexes', '18'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 1) PRÉSENTATION D'ADOM SENIOR
// =====================================================================
D.push(
  K.chip('Présentation'),
  K.spacer(60),
  K.h1('1. Présentation d’ADOM SENIOR'),
  K.h2('ADOM SENIOR en bref'),
  K.body('ADOM SENIOR est une entreprise spécialisée dans l’adaptation de salles de bains, la plomberie sanitaire et le maintien à domicile des personnes âgées et à mobilité réduite (PMR). Nous accompagnons les bailleurs sociaux dans leur stratégie de maintien à domicile en intervenant en site occupé, dans le cadre de marchés à bons de commande et d’opérations d’adaptation du patrimoine.'),
  K.body('Notre savoir-faire emblématique est le remplacement de baignoire par une douche sécurisée sur mesure, réalisé en une journée, avec des produits non stigmatisants adaptés aux besoins des locataires seniors et PMR.'),
  K.spacer(60),
  K.table(['Repère', 'Donnée'], [
    ['Raison sociale', 'ADOM SENIOR'],
    ['SIRET', '849 109 558 00023'],
    ['Siège', '2 impasse Joliot-Curie, 64110 Jurançon'],
    ['Site internet', 'adomsenior.fr'],
    ['Activité', 'Adaptation de salles de bains, plomberie sanitaire, maintien à domicile'],
    ['Zone d’intervention', 'Principalement la Bretagne (choix assumé de proximité — nous n’intervenons pas sur toute la France)'],
    ['Assurances', 'Responsabilité civile et décennale plomberie / sanitaire et maintenance — période 2026'],
    ['Expérience', 'Plus de 3 000 installations réalisées ; capacité habituelle d’environ 50 poses par mois'],
  ], [2800, 6560], { boldFirstCol: true }),
  K.spacer(160),
  K.h2('Une croissance maîtrisée et régulière'),
  K.body('ADOM SENIOR connaît une croissance forte et continue, portée par la qualité de ses interventions et la fidélité de ses partenaires bailleurs :'),
  K.kpiStrip([
    { valeur: '185 K€', libelle: 'Chiffre d’affaires 2023' },
    { valeur: '630 K€', libelle: 'Chiffre d’affaires 2024' },
    { valeur: '700 K€', libelle: 'Chiffre d’affaires 2025' },
    { valeur: '105', libelle: 'chantiers Morbihan Habitat en 2025' },
  ]),
  K.spacer(100),
  K.callout('RÉFÉRENCE MORBIHAN HABITAT', 'En 2025, ADOM SENIOR a réalisé 150 K€ de chiffre d’affaires pour 105 chantiers exécutés en sous-traitance d’ASH sur le patrimoine de Morbihan Habitat. Les équipes qui interviendront sur ce marché connaissent donc déjà le parc, les locataires, les circuits de validation et les attendus du bailleur.'),
  K.spacer(120),
  K.h2('Un ancrage breton assumé'),
  K.body('Contrairement aux opérateurs nationaux, ADOM SENIOR concentre son activité sur la Bretagne. Ce choix de proximité est un engagement de service : des équipes locales, des délais de déplacement courts, une connaissance fine du tissu territorial (agences de proximité, fournisseurs locaux, entreprises partenaires) et une réactivité réelle en cas de SAV ou d’urgence.'),
  K.bullet('Des tournées optimisées à l’échelle du département — pas de poseurs « détachés » venant de l’autre bout de la France ;'),
  K.bullet('Un approvisionnement de proximité via le réseau CEDEO du Morbihan (Lorient, Lanester, Auray, Theix–Vannes, Vannes Ouest, Ploërmel, Saint-Thuriau) ;'),
  K.bullet('Une capacité à se rendre sur site sous 48 h pour toute situation urgente ou visite complémentaire.'),
  K.spacer(60),
  K.h2('Notre histoire : l’organisation qui réalisait déjà les poses'),
  K.body('ADOM SENIOR s’est structurée autour du savoir-faire des équipes qui exécutaient la majorité des interventions d’adaptation PMR réalisées en Bretagne en sous-traitance d’ASH (Aménagement Séniors Habitat). À la suite de la liquidation d’ASH, ADOM SENIOR a repris les actifs et intégré les hommes clés de cette organisation :'),
  K.bullet('Loyk Duporge, ancien salarié d’ASH, encadrant technique et chantier SS4, assure la direction et la supervision des engagements de l’entreprise ;'),
  K.bullet('Charles de Lestrange, ancien commercial Bretagne d’ASH, demeure l’interlocuteur unique des bailleurs sur le territoire breton ;'),
  K.bullet('Les équipes de pose expérimentées, formées aux produits, aux méthodes et à l’intervention en logement occupé.'),
  K.body('Cette continuité humaine et technique signifie qu’ADOM SENIOR n’a pas de « phase de rodage » : les gestes techniques, les produits, les contrôles et la relation avec les locataires en logement occupé sont éprouvés.'),
  K.h2('Nos valeurs'),
  K.bullet('Le respect du locataire : intervenir chez une personne âgée ou fragile exige écoute, douceur et rigueur ;'),
  K.bullet('La qualité d’exécution : des finitions soignées, contrôlées et documentées à chaque étape ;'),
  K.bullet('La transparence : un suivi partagé avec le bailleur, des preuves photographiques et des documents structurés ;'),
  K.bullet('La proximité : une entreprise bretonne, au service des bailleurs bretons.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 2) COMPRÉHENSION DU MARCHÉ
// =====================================================================
D.push(
  K.chip('Votre marché'),
  K.spacer(60),
  K.h1('2. Notre compréhension de votre marché'),
  K.h2('Morbihan Habitat, un acteur territorial de premier plan'),
  K.body('Morbihan Habitat déploie une offre de logement social à l’échelle départementale et articule les adaptations PMR entre le Pôle Social, le Pôle Travaux, huit agences et plus de trente points de proximité. Le bailleur conduit une politique volontariste d’adaptation de son patrimoine au vieillissement : 312 logements adaptés PMR en 2023 et un référentiel de logements adaptables et évolutifs.'),
  K.kpiStrip([
    { valeur: '33 230', libelle: 'logements' },
    { valeur: '215', libelle: 'communes' },
    { valeur: '8', libelle: 'agences' },
    { valeur: '> 30', libelle: 'points de proximité' },
  ]),
  K.note('Données publiques du bailleur — sources officielles détaillées en fin de document.'),
  K.h2('Les enjeux du maintien à domicile'),
  K.body('Face au vieillissement de la population, les bailleurs sociaux développent des offres de logements et de services adaptés. Aujourd’hui, environ 30 % des locataires du parc social ont plus de 60 ans, et 11 % plus de 75 ans. La grande majorité d’entre eux souhaite rester à domicile dans des conditions de sécurité et de confort optimales. L’adaptation de la salle de bains — remplacement de la baignoire par une douche de plain-pied sécurisée — est l’intervention la plus déterminante pour prévenir les chutes et prolonger l’autonomie.'),
  K.h2('Notre lecture de vos priorités'),
  K.bullet('Traiter les demandes d’adaptation qualifiées par le Pôle Social sans délais d’attente excessifs pour les locataires ;'),
  K.bullet('Garantir une intervention respectueuse en logement occupé, sans relogement ni immobilisation longue de la salle d’eau ;'),
  K.bullet('Maintenir la coordination entre les agences, le Pôle Travaux, les locataires et l’entreprise ;'),
  K.bullet('Disposer d’une traçabilité complète : visite, devis, validation, pose, réception, SAV ;'),
  K.bullet('Couvrir de façon homogène les secteurs Est et Ouest du département, sur 215 communes.'),
  K.spacer(60),
  K.callout('NOTRE ATOUT', 'ADOM SENIOR connaît déjà ce marché pour y avoir réalisé 105 chantiers en 2025. Nous connaissons les configurations du patrimoine, les produits posés, les circuits de validation et les attentes des équipes de Morbihan Habitat.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 3) MOYENS HUMAINS
// =====================================================================
D.push(
  K.chip('Moyens humains'),
  K.spacer(60),
  K.h1('3. Moyens humains'),
  K.h2('L’équipe dédiée à votre marché'),
  K.body('ADOM SENIOR met à disposition du marché une équipe resserrée, expérimentée et polyvalente, de la direction aux poseurs. Chaque intervenant connaît les exigences de l’intervention en logement occupé auprès d’un public fragile.'),
  K.table(['Acteur', 'Rôle sur votre marché'], [
    ['Charles de Lestrange', 'Interlocuteur unique du bailleur : demandes, arbitrages, priorités, reporting et coordination contractuelle. Ancien commercial Bretagne d’ASH, il connaît vos équipes et vos circuits de décision.'],
    ['Lyes Ouhaddad', 'Gérant : management, coordination terrain, contrôle qualité et prévention.'],
    ['Loyk Duporge', 'Direction et supervision des engagements de l’entreprise ; encadrant technique et chantier SS4 (amiante). Ancien salarié d’ASH.'],
    ['Équipes de pose', 'Visites techniques, plomberie, adaptations PMR, pose des panneaux LT Showertec, contrôles, réception et nettoyage.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Un interlocuteur unique, sans perte d’information'),
  K.body('Charles de Lestrange est le point d’entrée unique de Morbihan Habitat : un seul contact pour les demandes, les urgences, les validations et le reporting. Il dispose de la capacité de décision pour engager l’entreprise et se rend disponible sur convocation du bailleur.'),
  K.callout('AUCUNE PERTE D’INFORMATION', 'Une absence de l’interlocuteur ne bloque jamais un dossier : l’historique, les pièces et le statut de chaque chantier restent accessibles dans notre outil de suivi INTERFAST, et un accès nominatif peut être ouvert au référent de Morbihan Habitat.'),
  K.spacer(120),
  K.h2('Continuité de service toute l’année'),
  K.body('Nos effectifs sont organisés pour assurer une disponibilité toute l’année, y compris pendant les périodes de congés :'),
  K.bullet('Anticipation des absences : les périodes de congés sont annoncées en amont au bailleur et les suivis délégués au sein de l’équipe ;'),
  K.bullet('Rotation des équipes de pose pour compenser les absences et garantir le respect des délais annoncés ;'),
  K.bullet('Capacité de renfort : en cas de surcharge, nous mobilisons des poseurs partenaires formés à notre méthode de pose, garantissant une qualité d’exécution identique.'),
  K.h2('Des poseurs sensibilisés au public senior et PMR'),
  K.body('Nos équipes interviennent quotidiennement auprès de personnes âgées ou en situation de handicap. Elles sont formées et sensibilisées aux spécificités de ce public, qui peut être affecté par des troubles liés au vieillissement :'),
  K.bullet('Difficulté à réaliser des gestes simples, risque de perte d’équilibre ;'),
  K.bullet('Forte sensibilité au bruit, troubles du sommeil ;'),
  K.bullet('Altération de la vue et de l’audition ;'),
  K.bullet('Vulnérabilité au stress et aux changements de repères spatiaux et temporels.'),
  K.body('L’approche de nos poseurs est douce et rassurante : présentation systématique, explications simples, respect du rythme de la personne et attention portée à ses besoins essentiels pendant toute la durée du chantier.'),
  K.h2('Notre charte de bonne conduite en logement occupé'),
  K.table(['Engagement', 'Traduction concrète'], [
    ['Honnêteté et discrétion', 'Déplacements limités aux seules pièces concernées par l’intervention ; absolue discrétion dans le logement.'],
    ['Diplomatie et courtoisie', 'Attitude et tenue correctes, se présenter, frapper avant d’entrer, aucune familiarité, ne pas fumer, tenue identifiable ADOM SENIOR.'],
    ['Ponctualité et rigueur', 'Respect scrupuleux des dates et horaires fixés, en harmonie avec les contraintes du locataire (lever, coucher, passage des soins à domicile).'],
    ['Propreté et sécurité', 'Balisage si nécessaire, protection des sols et du mobilier, approvisionnement et nettoyage quotidiens du chantier.'],
    ['Prévention', 'S’assurer que le locataire garde l’accès aux toilettes dans la journée ; prévenir en amont de toute coupure d’eau ou d’électricité et vérifier les conséquences sur ses besoins essentiels (alimentation, hydratation, lit médicalisé, oxygène…).'],
    ['Communication', 'Vocabulaire simple, supports visuels et écrits privilégiés, notice d’utilisation et d’entretien remise en fin de chantier.'],
    ['Loyauté et neutralité', 'Réaliser les prestations commandées par le bailleur, sans formuler devant le locataire de jugement ou de préconisation sur l’état du logement.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Qualifications et formations'),
  K.body('Notre personnel possède les qualifications, habilitations et formations nécessaires aux prestations à accomplir, notamment :'),
  K.bullet('Formation amiante sous-section 4 (SS4) — opérateurs et encadrement (attestations à jour jointes en annexe) ;'),
  K.bullet('Habilitations électriques adaptées aux interventions ;'),
  K.bullet('Formation aux gestes de premiers secours (SST) ;'),
  K.bullet('Formation continue aux produits et systèmes posés (LT Showertec, robinetterie, parois).'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 4) MÉTHODOLOGIE D'EXÉCUTION
// =====================================================================
D.push(
  K.chip('Méthodologie'),
  K.spacer(60),
  K.h1('4. Méthodologie d’exécution des travaux'),
  K.h2('Le parcours de la demande : du besoin locataire à la réception documentée'),
  K.body('Notre circuit respecte la logique de Morbihan Habitat : besoin détecté et accompagné par le Pôle Social, validation technique, ordre de service, planification, travaux, puis retour documenté. Chaque étape produit une preuve, enregistrée dans notre outil de suivi INTERFAST.'),
  K.table(['Étape', 'Contenu et preuve produite'], [
    ['1. OUVERTURE', 'La demande, l’adresse, le contact, la priorité et les pièces disponibles sont enregistrés dès réception ; accusé de réception sous 24 h ouvrées.'],
    ['2. CONTACT', 'Le locataire est appelé sous 24 h pour fixer la visite. En cas de non-réponse : message vocal + SMS, nouvel essai à 24 h, puis avis de passage et carte de visite sous 48 h. Le bailleur est informé de toute difficulté de contact.'],
    ['3. VISITE VISAP', 'Visite avant-projet complète : usages, diagnostics, cotes, supports, réseaux, croquis et produits sont relevés (voir détail ci-dessous).'],
    ['4. VALIDATION', 'Devis et solution transmis au bailleur ; aucune commande n’est lancée sans validation écrite.'],
    ['5. COMMANDE', 'Dès réception du bon de commande, le matériel est commandé ; environ 10 jours de délai d’approvisionnement, le rendez-vous de pose est pris immédiatement.'],
    ['6. POSE', 'Protection, travaux, essais, nettoyage et explication du fonctionnement au locataire — en une journée dans la configuration standard.'],
    ['7. CLÔTURE', 'PV de réception signé, notice d’utilisation remise, photos finales et éventuelles réserves enregistrées ; documents mis à disposition du bailleur.'],
  ], [2200, 7160], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('La VISAP : transformer la visite en dossier d’exécution'),
  K.body('Le dossier VISAP (visite avant-projet) en trois volets est notre outil central de préparation. Rempli lors de la visite, il relie les besoins du bénéficiaire, les contraintes du logement et la commande. Cette préparation est décisive pour tenir une pose courte et éviter un second déplacement.'),
  K.table(['Volet', 'Contrôles et décisions'], [
    ['1. Usages et accès', 'Mobilité, transferts, appuis, présence d’un aidant, portes, circulations, étage, ascenseur, stationnement.'],
    ['2. État technique', 'Diagnostics (amiante, plomb), alimentation et évacuation d’eau, ventilation, état des murs, sols et désordres antérieurs.'],
    ['3. Implantation', 'Cotes complètes, croquis avant / après, hauteurs d’accessoires, sens d’accès, observations — minimum 10 photos.'],
    ['4. Commande', 'Receveur, paroi, robinetterie, barres de maintien, siège, panneaux LT Showertec, dimensions et teintes.'],
  ], [2200, 7160], { boldFirstCol: true }),
  K.spacer(80),
  K.bullet('Anticipation des imprévus : faisabilités techniques validées sur place, travaux supplémentaires signalés immédiatement au bailleur, besoins connexes détectés (coupure ou purge de chauffage, vannes défectueuses…) ;'),
  K.bullet('Gestion du mobilier : identification avec le locataire des meubles à vider et de ceux que les poseurs déplaceront ;'),
  K.bullet('Accessibilité : vérification du stationnement, demande d’arrêté temporaire à la commune si nécessaire.'),
  K.spacer(60),
  K.h2('L’intervention type : une douche posée en une journée'),
  K.body('Interventions réalisées entre 8 h et 18 h maximum, en tenant compte des demandes des locataires. Affichage préalable en cage d’escalier pour prévenir le voisinage des nuisances éventuelles et coupures d’eau nécessaires, en lien avec le gardien du site.'),
  K.h3('Matin'),
  K.numbered('Présentation de l’équipe au gardien puis au locataire ; explication du déroulement de la journée ;', 'num_matin'),
  K.numbered('Débarrassage des éléments de la salle de bains (aide au locataire pour ce qu’il ne peut pas faire seul) ;', 'num_matin'),
  K.numbered('Protection des lieux et installation de l’espace de travail ;', 'num_matin'),
  K.numbered('Dépose des sanitaires et mise à nu de la salle de bains ;', 'num_matin'),
  K.numbered('Modification des réseaux ECS, EF, EU et bouchonnage ;', 'num_matin'),
  K.numbered('Pose et raccordement EU du nouveau receveur avec étanchéité ;', 'num_matin'),
  K.numbered('Mise en pression des réseaux, test d’étanchéité ;', 'num_matin'),
  K.numbered('Prise des cotes, découpe des panneaux et profilés, pose des profilés supports.', 'num_matin'),
  K.h3('Après-midi'),
  K.numbered('Pose des panneaux muraux et étanchéité ; profilés U de finition ;', 'nums2'),
  K.numbered('Pose de la paroi de douche, des accessoires selon plan de pose, du siège et des barres de maintien ;', 'nums2'),
  K.numbered('Joints de finition, étanchéité, plinthes et finitions ;', 'nums2'),
  K.numbered('Repli du matériel et nettoyage complet du chantier ;', 'nums2'),
  K.numbered('Explication du fonctionnement de la douche au locataire ;', 'nums2'),
  K.numbered('Signature du PV de réception et remise de la notice d’utilisation et d’entretien.', 'nums2'),
  K.spacer(60),
  K.callout('TRAVAUX ANNEXES', 'Selon les besoins : WC, lavabo / miroir / réglette lumineuse, meuble, sol, dépose / pose de bidet, porte à glissement ou changement de sens de porte, rabotage de porte. Ces travaux peuvent porter l’intervention à 1 journée ½, voire 48 h. Le binôme de poseurs est alors constitué selon les qualifications requises (maçonnerie, peinture, électricité, menuiserie).'),
  K.spacer(120),
  K.h2('L’autocontrôle d’étanchéité'),
  K.body('ADOM SENIOR applique un procédé rigoureux d’autocontrôle pour garantir l’étanchéité des raccordements, conformément aux normes en vigueur (NF DTU 60.1) :'),
  K.numbered('Préparation et inspection initiale : vérification visuelle des raccordements et matériaux, nettoyage des surfaces d’assemblage ;', 'num_auto'),
  K.numbered('Montage et serrage contrôlé : installation conforme aux spécifications fabricants, couple de serrage recommandé ;', 'num_auto'),
  K.numbered('Test d’étanchéité : remplissage des canalisations sous pression et inspection visuelle ;', 'num_auto'),
  K.numbered('Mesures correctives : démontage, vérification et remplacement si nécessaire, répétition des tests jusqu’à résultat satisfaisant ;', 'num_auto'),
  K.numbered('Contrôle final après validation de tous les raccordements.', 'num_auto'),
  K.h2('Réception et contrôle de satisfaction'),
  K.bullet('Signature du PV de réception contradictoire avec le locataire présent ou le personnel de proximité, attestant de la bonne réalisation des travaux ;'),
  K.bullet('Check-list de contrôle remplie par nos techniciens pour garantir un chantier sans réserve ;'),
  K.bullet('Remise de la notice d’utilisation et d’entretien au locataire ;'),
  K.bullet('Appel de contrôle de satisfaction quelques jours après la pose ;'),
  K.bullet('Transmission au bailleur de l’ensemble des éléments (PV, photos, documents) au plus tard avec la facture.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 5) MOYENS TECHNIQUES ET MATÉRIELS
// =====================================================================
D.push(
  K.chip('Moyens techniques'),
  K.spacer(60),
  K.h1('5. Moyens techniques et matériels'),
  K.h2('La solution LT Showertec : une finition murale conçue pour la transformation rapide'),
  K.body('ADOM SENIOR met en œuvre les panneaux d’habillage mural LT Showertec, un système éprouvé sur des milliers d’installations. Cette solution de cabine de douche sur mesure et non stigmatisante présente des avantages décisifs pour le logement occupé :'),
  K.table(['Caractéristique', 'Bénéfice chantier'], [
    ['Panneau à âme XPS', 'Support léger, imputrescible et adapté aux environnements de douche.'],
    ['Parement de finition', 'Surface esthétique, lisse et simple à entretenir — pas de joints de faïence qui noircissent.'],
    ['Découpe sur mesure', 'Adaptation aux angles, murs irréguliers, robinetteries et passages de réseaux — sans reprise de sol.'],
    ['Gamme DESIGN', 'Épaisseurs et finitions adaptées à l’habillage et à la configuration relevée.'],
    ['Gamme SLIM 18 mm', 'Solution pertinente lorsque la conservation de l’espace est déterminante.'],
    ['Profilés et joints', 'Traitement continu des jonctions, angles et rives selon le système fabricant.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(80),
  K.bullet('Rénovation sans gros travaux : limitation maximale des nuisances (bruit, poussière) dans le logement occupé ;'),
  K.bullet('Une douche complètement sur mesure, posée en une journée au lieu de cinq habituellement ;'),
  K.bullet('Esthétique non stigmatisante, cohérente avec une adaptation destinée au maintien à domicile ;'),
  K.bullet('Compatibilité avec les interventions en SS4 (pose par rails sans percement direct des supports amiantés — voir section 9) ;'),
  K.bullet('Traçabilité de la gamme, de la teinte et des accessoires dans le dossier logement.'),
  K.note('Garantie, classement feu, épaisseur et composition : valeurs de la fiche fabricant en vigueur correspondant à la référence effectivement commandée.'),
  K.h2('Approvisionnement : le réseau CEDEO du Morbihan'),
  K.body('Notre approvisionnement s’appuie sur le maillage CEDEO du Morbihan : Lorient, Lanester, Auray, Theix–Vannes, Vannes Ouest, Ploërmel et Saint-Thuriau. Ce réseau de proximité sécurise la couverture de l’ensemble du territoire, le réassort et la gestion locale du SAV.'),
  K.table(['Avantage', 'Effet concret'], [
    ['Disponibilité', 'Réduction du risque de report de chantier pour une fourniture courante.'],
    ['Réassort', 'Solution de proximité en cas d’écart constaté à la pose.'],
    ['SAV', 'Recherche de référence et remplacement facilités.'],
    ['Homogénéité', 'Maintien des familles de produits déjà posées sur le patrimoine.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Véhicules et outillage'),
  K.table(['Moyen', 'Mise à disposition'], [
    ['Véhicules', 'Deux IVECO Daily et un Volkswagen Crafter, aménagés en ateliers mobiles : outillage, protections et fournitures embarqués.'],
    ['Outillage', 'Sertissage, découpe précise des panneaux, perçage maîtrisé, appareils de contrôle ; équipement électroportatif complet garantissant l’autonomie des équipes.'],
    ['Protection', 'Bâches, protections de sols et de mobilier, aspiration, nettoyage et tri des déchets.'],
    ['Sécurité', 'Trousse de premiers secours, signalisation, EPI complets contrôlés régulièrement.'],
    ['Numérique', 'INTERFAST, téléphones chantier, photos géolocalisées et documents standardisés.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(80),
  K.body('L’ensemble des outils et du matériel fait l’objet d’une surveillance permanente et d’un programme d’entretien régulier, garantissant leur bon fonctionnement et leur conformité aux normes de sécurité. Nos véhicules sont floqués aux couleurs d’ADOM SENIOR, assurant une identification claire de nos équipes par les locataires et les gardiens.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 6) SUIVI ET TRAÇABILITÉ — INTERFAST
// =====================================================================
D.push(
  K.chip('Suivi & traçabilité'),
  K.spacer(60),
  K.h1('6. Suivi des chantiers : le portail INTERFAST'),
  K.h2('Le bailleur suit ses chantiers sans relancer l’entreprise'),
  K.body('ADOM SENIOR propose d’ouvrir à Morbihan Habitat un accès nominatif à son portail client INTERFAST. Pour chaque chantier partagé, le référent du bailleur retrouve 24 h/24, sur ordinateur et mobile, les informations générales, les interventions terminées, les rapports et photographies ainsi que les documents sélectionnés.'),
  K.table(['Information suivie', 'Utilité pour le bailleur'], [
    ['Vue d’ensemble', 'État d’avancement général des chantiers partagés et interventions associées.'],
    ['Planning', 'Dates programmées, passages réalisés et historique des interventions terminées.'],
    ['Preuves terrain', 'Rapports d’intervention, photographies et commentaires publics.'],
    ['Documents', 'PV de réception, pièces administratives et documents sélectionnés pour le bailleur.'],
    ['Échanges', 'Commentaires centralisés dans le dossier, sans multiplier les chaînes d’e-mails.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(100),
  K.callout('UN ACCÈS CONTRÔLÉ', 'Morbihan Habitat ne voit que les chantiers et pièces qui lui sont partagés. L’accès est distinct de l’espace interne d’ADOM SENIOR et peut être révoqué à tout moment.'),
  K.spacer(120),
  K.h2('Une information qui survit aux personnes'),
  K.body('Chaque événement est rattaché au logement. Le bailleur retrouve la demande, le VISAP, la validation, les références, les photos, la réception et le SAV dans un même historique horodaté :'),
  K.table(['Statut', 'Informations disponibles'], [
    ['À contacter', 'Demande reçue, priorité, interlocuteurs et pièces initiales.'],
    ['Visite planifiée', 'Date, créneau, locataire, technicien et contraintes d’accès.'],
    ['À valider', 'VISAP, solution, devis, photos et observations.'],
    ['À poser', 'Commande, références, secteur géographique et date retenue.'],
    ['Réceptionné', 'PV, photos finales, notice remise et réserves éventuelles.'],
    ['SAV', 'Signalement, diagnostic, action, délai et preuve de clôture.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Indicateurs et reporting proposés'),
  K.bullet('Délai de premier contact et taux de locataires joints ;'),
  K.bullet('Délai visite–devis, délai commande–pose et taux de poses à la date convenue ;'),
  K.bullet('Taux de réception sans réserve, nombre et ancienneté des réserves ;'),
  K.bullet('SAV ouverts, délai de prise en charge et délai de clôture.'),
  K.body('Un tableau de bord unique rassemble toutes les demandes du département ; le secteur (Est / Ouest), l’agence, l’origine de la demande et la priorité sont de simples filtres de pilotage. Des réunions de suivi régulières (trimestrielles recommandées, en présentiel ou visioconférence) et un bilan annuel complètent ce dispositif.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 7) CHRONOLOGIE ET DÉLAIS
// =====================================================================
D.push(
  K.chip('Délais'),
  K.spacer(60),
  K.h1('7. Chronologie et délais de traitement'),
  K.body('Nos engagements de délais sont calibrés sur notre organisation réelle : des équipes locales, un approvisionnement de proximité et une préparation rigoureuse qui évite les seconds déplacements.'),
  K.table(['Jalon', 'Engagement cible'], [
    ['J0 — Demande', 'Demande intégrée dans le tableau de bord et accusée sous 24 h ouvrées.'],
    ['J0–J1 — Contact', 'Le locataire est contacté sous 24 h ; relances à 24 h puis avis de passage sous 48 h en cas de non-réponse.'],
    ['≤ 15 jours', 'Visite VISAP réalisée, chiffrage et proposition transmis au bailleur (sous réserve d’accès au logement).'],
    ['Validation + 10 jours', 'Réception du matériel commandé ; rendez-vous de pose fixé dès l’envoi de la commande.'],
    ['Pose standard', 'Transformation réalisée en une journée lorsque la configuration et le diagnostic le permettent ; 1 j ½ à 48 h avec travaux annexes.'],
    ['Après réception', 'PV, notice et photos partagés ; SAV qualifié sous 48 h ouvrées.'],
  ], [2800, 6560], { boldFirstCol: true }),
  K.spacer(80),
  K.body('La planification regroupe géographiquement les poses pour optimiser les tournées, sans jamais retarder les situations prioritaires signalées par le Pôle Social.'),
  K.note('Délais exprimés comme engagements opérationnels proposés, sous réserve des stipulations contractuelles, diagnostics, accès et validations du bailleur.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 8) QUALITÉ, GARANTIES ET SAV
// =====================================================================
D.push(
  K.chip('Qualité & garanties'),
  K.spacer(60),
  K.h1('8. Qualité, garanties et service après-vente'),
  K.h2('Les points de contrôle qualité'),
  K.table(['Point de contrôle', 'Dispositif'], [
    ['Avant pose', 'VISAP validé, références confirmées, diagnostics consultés et protections préparées.'],
    ['Pendant', 'Autocontrôles réseaux, supports, fixations, alignement, étanchéité et propreté.'],
    ['Fin de pose', 'Essais d’écoulement, fonctionnement, stabilité, joints et contrôle visuel.'],
    ['Réception', 'PV contradictoire signé, réserves décrites et photos finales.'],
    ['Entretien', 'Notice expliquée et remise au locataire, avec produits et gestes à éviter.'],
    ['SAV', 'Qualification sous 48 h ouvrées, historique et preuve de clôture dans INTERFAST.'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Les garanties'),
  K.bullet('Garantie de parfait achèvement (article 1792-6 du Code civil) : tous les désordres signalés à la réception ou dans l’année qui suit sont repris à nos frais ;'),
  K.bullet('Garantie décennale : assurance responsabilité civile et décennale plomberie / sanitaire et maintenance en cours de validité (attestations jointes) ;'),
  K.bullet('Garanties fabricant sur les produits posés (panneaux, receveurs, robinetterie, parois) selon les fiches en vigueur ;'),
  K.bullet('Modularité des systèmes posés : possibilité de remplacer uniquement la pièce défectueuse, sans changer l’ensemble de la cabine — une maintenance simplifiée, économique et durable.'),
  K.h2('Le circuit SAV'),
  K.numbered('Signalement par le locataire ou le bailleur, enregistré dans INTERFAST ;', 'num_sav'),
  K.numbered('Pré-diagnostic sous 48 h ouvrées, avec demande de photos si nécessaire ;', 'num_sav'),
  K.numbered('Intervention planifiée avec le locataire par un poseur qualifié ;', 'num_sav'),
  K.numbered('Clôture documentée : action réalisée, délai et preuve enregistrés, visibles par le bailleur.', 'num_sav'),
  K.callout('PROXIMITÉ SAV', 'Nos équipes étant basées en Bretagne, une intervention SAV ne dépend jamais de la disponibilité d’une équipe nationale de passage : le réassort s’appuie sur les agences CEDEO du Morbihan et le déplacement se fait en heures, pas en semaines.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 9) SÉCURITÉ — AMIANTE SS4
// =====================================================================
D.push(
  K.chip('Sécurité & amiante'),
  K.spacer(60),
  K.h1('9. Sécurité, prévention et maîtrise du risque amiante'),
  K.h2('Prévention générale'),
  K.body('Nos prestations respectent les prescriptions législatives et réglementaires en matière de sécurité, de santé des personnes et de préservation du voisinage. Zones d’intervention délimitées, absence de stockage permanent sur site, éclairage adapté, contrôle des nuisances sonores (arrêté du 3 mai 2002), limitation de l’usage des ascenseurs aux heures de forte affluence : chaque chantier est préparé pour protéger les locataires, les tiers et nos intervenants.'),
  K.body('Nos équipes utilisent systématiquement les équipements de protection individuelle (EPI) adaptés à chaque poste. Tous les EPI sont régulièrement inspectés et maintenus en bon état. Notre plan de prévention des risques et un extrait de notre DUER sont disponibles à la demande.'),
  K.h2('Amiante : intervention en sous-section 4 (SS4)'),
  K.body('Avant toute intervention susceptible d’affecter un matériau, l’équipe consulte les diagnostics et repérages avant travaux applicables. En présence d’un risque, ADOM SENIOR applique son mode opératoire SS4 : évaluation, processus adapté, protections, réduction de l’empoussièrement, décontamination, gestion des déchets et traçabilité complète.'),
  K.table(['Étape', 'Dispositif SS4'], [
    ['Repérage', 'Consultation systématique des diagnostics amiante et repérages avant travaux ; aucun percement sans analyse.'],
    ['Encadrement', 'Interventions supervisées par Loyk Duporge, encadrant technique et chantier SS4 ; opérateurs formés SS4 (attestations à jour en annexe).'],
    ['Pose par rails', 'Les panneaux LT Showertec sont installés par un système de profilés : aucune colle appliquée directement sur les supports amiantés.'],
    ['Percements protégés', 'Fixation mécanique des profilés uniquement après application d’une poche de gel de protection (type Easy Gel Protect) sur les surfaces amiantées.'],
    ['Empoussièrement', 'Modes opératoires visant l’émission de fibres la plus faible possible, sous les seuils du Code de la santé publique (5 fibres/litre d’air).'],
    ['Déchets amiantés', 'Conditionnement en sacs étanches étiquetés, transport sécurisé et élimination par des installations agréées, avec bordereaux de suivi (articles R. 4412-121 et R. 4412-122 du Code du travail).'],
  ], [2600, 6760], { boldFirstCol: true }),
  K.spacer(80),
  K.callout('LIMITER LES PERCEMENTS', 'Les solutions LT Showertec et leurs profilés peuvent, selon la configuration et les prescriptions du mode opératoire, contribuer à réduire les travaux sur le support existant. Elles ne remplacent jamais le repérage ni l’analyse de risque.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 10) DÉCHETS
// =====================================================================
D.push(
  K.chip('Déchets'),
  K.spacer(60),
  K.h1('10. Gestion des déchets et valorisation'),
  K.body('Nos interventions génèrent quatre catégories principales de déchets, triées à la source sur chaque chantier :'),
  K.table(['Catégorie', 'Exemples et traitement'], [
    ['Déchets inertes (DI)', 'Carrelages, faïences, gravats — orientés vers les filières de recyclage des matériaux inertes.'],
    ['Déchets industriels banals (DIB)', 'Revêtements plastiques, métaux ferreux et non ferreux, sanitaires déposés — tri et valorisation matière.'],
    ['Déchets d’emballage', 'Cartons, films, calages — collecte séparée et recyclage.'],
    ['Déchets dangereux (DD)', 'Dont déchets amiantés : filière dédiée, conditionnement réglementaire et bordereaux de suivi (voir section 9).'],
  ], [3200, 6160], { boldFirstCol: true }),
  K.spacer(120),
  K.h2('Nos principes'),
  K.bullet('Tri sélectif systématique sur site, dès la dépose ;'),
  K.bullet('Évacuation quotidienne : aucun stockage de déchets dans les parties communes ou le logement ;'),
  K.bullet('Dépôt en déchetteries professionnelles et centres agréés du Morbihan — bordereaux de suivi conservés dans le dossier chantier ;'),
  K.bullet('Réduction des volumes à la source : la méthode d’habillage LT Showertec limite les déposes lourdes et les gravats par rapport à une réfection complète en faïence ;'),
  K.bullet('Sensibilisation continue des équipes au geste de tri et à la traçabilité.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 11) RSE
// =====================================================================
D.push(
  K.chip('RSE'),
  K.spacer(60),
  K.h1('11. Notre démarche responsable'),
  K.body('ADOM SENIOR est une entreprise à taille humaine : notre démarche RSE est faite d’engagements concrets et vérifiables, à notre échelle, plutôt que de déclarations d’intention.'),
  K.h2('Environnement'),
  K.bullet('Proximité : des équipes et des fournisseurs bretons, des tournées optimisées par secteur géographique — moins de kilomètres, moins d’émissions ;'),
  K.bullet('Économie d’eau : proposition systématique de robinetteries et douchettes à débit maîtrisé, source d’économies de charges pour les locataires ;'),
  K.bullet('Méthode sobre : l’habillage sur mesure limite les déposes lourdes, les gravats et les nuisances par rapport à une réfection traditionnelle ;'),
  K.bullet('Tri et valorisation des déchets sur chaque chantier (voir section 10).'),
  K.h2('Social et territoire'),
  K.bullet('Emploi local : nos poseurs vivent et travaillent en Bretagne ; la croissance de l’entreprise crée de l’emploi qualifié sur le territoire ;'),
  K.bullet('Transmission : accueil de stagiaires et montée en compétences des équipes (formations SS4, habilitations, produits) ;'),
  K.bullet('Mission sociale de nos travaux : chaque salle de bains adaptée prévient les chutes, prolonge l’autonomie et permet le maintien à domicile de personnes âgées ou fragiles ;'),
  K.bullet('Respect du locataire : notre charte de bonne conduite (section 3) est notre premier engagement sociétal.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// =====================================================================
// 12) RÉFÉRENCES ET ANNEXES
// =====================================================================
D.push(
  K.chip('Références'),
  K.spacer(60),
  K.h1('12. Références, sources et annexes'),
  K.h2('Notre expérience sur le patrimoine de Morbihan Habitat'),
  K.body('En 2025, ADOM SENIOR a réalisé 105 chantiers d’adaptation sur le patrimoine de Morbihan Habitat (150 K€ de chiffre d’affaires), en sous-traitance du titulaire du marché 24S0049. Les configurations rencontrées, les produits posés et les circuits de validation du bailleur nous sont donc parfaitement connus.'),
  K.h2('Données publiques du bailleur'),
  K.bullet('Morbihan Habitat, « Qui sommes-nous ? » : 33 230 logements, 215 communes, 577 collaborateurs, 8 agences et plus de 30 points de proximité ;'),
  K.bullet('Morbihan Habitat, « Offre senior » : 312 logements adaptés PMR en 2023, processus associant Pôle Social et Pôle Travaux ;'),
  K.bullet('Morbihan Habitat, rapport d’activité 2025 : 60,2 M€ de travaux et 6 553 logements concernés par des travaux ;'),
  K.bullet('Morbihan Habitat, « Gestion du patrimoine » et référentiel de logements adaptables et évolutifs.'),
  K.h2('Produits et logistique'),
  K.bullet('LT Showertec — pages fabricant DESIGN, SLIM et profilés de montage ;'),
  K.bullet('CEDEO — réseau d’agences du Morbihan, services et disponibilité ;'),
  K.bullet('InterFast — documentation officielle du portail client : accès sécurisé, suivi des interventions, rapports, photos, documents partagés.'),
  K.h2('Annexes'),
  K.table(['Annexe', 'Pièce'], [
    ['A1–A2', 'Attestations de formation opérateur et encadrant SS4.'],
    ['A3–A4', 'Dossier VISAP trois volets — extraits opérationnels.'],
    ['A5', 'Procès-verbal de réception ADOM SENIOR.'],
    ['A6–A7', 'Notice d’utilisation et d’entretien de la douche.'],
    ['A8', 'Attestations d’assurance responsabilité civile et décennale — période 2026.'],
    ['A9', 'Extrait Kbis / avis de situation SIRENE — SIRET 849 109 558 00023.'],
  ], [1800, 7560], { boldFirstCol: true }),
  K.spacer(160),
  K.callout('PORTÉE DU DOCUMENT', 'Ce mémoire technique présente l’organisation, les moyens et les méthodes qu’ADOM SENIOR met à disposition du marché. Il est complété, le cas échéant, par le dossier de proposition de reprise du marché ASH remis séparément.'),
);

// =====================================================================
// ASSEMBLAGE
// =====================================================================
const doc = new Document({
  creator: 'ADOM SENIOR',
  title: 'Mémoire technique ADOM SENIOR — Morbihan Habitat',
  description: 'Travaux d’adaptation de salles de bains PMR en logement occupé',
  numbering: K.numberingConfig,
  styles: {
    default: {
      document: { run: { font: SANS, size: 19, color: C.TEXTE } },
      heading1: { run: { font: SANS, size: 30, bold: true, color: C.ENCRE } },
      heading2: { run: { font: SANS, size: 22, bold: true, color: C.TEAL } },
      heading3: { run: { font: SANS, size: 20, bold: true, color: C.ENCRE } },
    },
  },
  features: { updateFields: true },
  sections: [{
    properties: { page: { margin: K.pageMargins } },
    headers: { default: K.pageHeader('Mémoire technique', 'MORBIHAN HABITAT  •  adomsenior.fr') },
    footers: { default: K.pageFooter() },
    children: D,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2] || 'MEMOIRE_TECHNIQUE_ADOM_SENIOR.docx', buf);
  console.log('OK memoire');
});

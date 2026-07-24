// Charte graphique ADOM SENIOR — extraite du mémoire Morbihan Habitat
// Couleurs, typographies et composants réutilisables (docx-js)
const {
  Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, Header, Footer, PageNumber, TabStopType,
  VerticalAlign, HeadingLevel, LevelFormat, convertMillimetersToTwip,
} = require('docx');

const C = {
  ENCRE:  '073E47', // vert canard foncé — grands titres
  TEAL:   '0F6470', // teal moyen — en-têtes tableaux, accents
  OR:     'DB982D', // orange doré — accents, chips
  FOND:   'EAF2F3', // gris-bleu clair — encadrés
  TEXTE:  '243238', // corps de texte
  GRIS:   '66777C', // notes, légendes
  BLANC:  'FFFFFF',
  LIGNE:  'C9D8DB', // bordures fines de tableaux
};

const SANS = 'Arial';
const SERIF = 'Georgia';

// ---------- paragraphes ----------
const body = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 120, line: 264 },
  ...opts.para,
  children: [new TextRun({ text, font: SANS, size: 19, color: C.TEXTE, ...opts.run })],
});

// texte riche : segments [{text, bold, color, italics}]
const rich = (segments, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 120, line: 264 },
  ...opts,
  children: segments.map(s => new TextRun({ font: SANS, size: 19, color: C.TEXTE, ...s })),
});

const note = (text) => new Paragraph({
  spacing: { before: 40, after: 160 },
  children: [new TextRun({ text, font: SANS, size: 14, italics: true, color: C.GRIS })],
});

// chip de section (petit cartouche orange, texte blanc majuscules)
const chip = (text, fill = C.OR) => new Table({
  width: { size: 3600, type: WidthType.DXA },
  columnWidths: [3600],
  borders: noBorders(),
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: 3600, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill },
      margins: cellMargins(60, 100),
      children: [new Paragraph({
        children: [new TextRun({ text: text.toUpperCase(), font: SANS, size: 16, bold: true, color: C.BLANC })],
      })],
    })],
  })],
});

// titre principal de section (Arial bold 14pt encre) — style Heading pour la TOC
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 120, after: 120 },
  children: [new TextRun({ text, font: SANS, size: 30, bold: true, color: C.ENCRE })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 100 },
  children: [new TextRun({ text, font: SANS, size: 22, bold: true, color: C.TEAL })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 160, after: 80 },
  children: [new TextRun({ text, font: SANS, size: 20, bold: true, color: C.ENCRE })],
});

// encadré : fond gris-bleu, liseré teal à gauche ; premier mot-clé en gras encre
const callout = (label, text, fill = C.FOND) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  borders: {
    top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
    left: { style: BorderStyle.SINGLE, size: 24, color: C.TEAL },
    insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
  },
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill },
      margins: cellMargins(90, 140),
      children: [new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 252 },
        children: [
          ...(label ? [new TextRun({ text: label + '  ', font: SANS, size: 19, bold: true, color: C.ENCRE })] : []),
          new TextRun({ text, font: SANS, size: 19, color: C.TEXTE }),
        ],
      })],
    })],
  })],
});

// puce
const bullet = (text, opts = {}) => new Paragraph({
  numbering: { reference: 'puces', level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 60, line: 252 },
  children: [new TextRun({ text, font: SANS, size: 19, color: C.TEXTE, ...opts })],
});

const numbered = (text, ref = 'nums') => new Paragraph({
  numbering: { reference: ref, level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 60, line: 252 },
  children: [new TextRun({ text, font: SANS, size: 19, color: C.TEXTE })],
});

// ---------- tableaux ----------
function noBorders() {
  const n = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: n, bottom: n, left: n, right: n, insideHorizontal: n, insideVertical: n };
}
function thinBorders() {
  const t = { style: BorderStyle.SINGLE, size: 4, color: C.LIGNE };
  return { top: t, bottom: t, left: t, right: t, insideHorizontal: t, insideVertical: t };
}
function cellMargins(v = 60, h = 100) {
  return { top: v, bottom: v, left: h, right: h };
}

// tableau standard : 1re ligne en-tête teal / texte blanc
function table(headers, rows, widths, opts = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const headFill = opts.headFill || C.TEAL;
  const mkHead = (t, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: headFill },
    margins: cellMargins(),
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: opts.headAlign || AlignmentType.LEFT,
      children: [new TextRun({ text: t, font: SANS, size: 18, bold: true, color: C.BLANC })],
    })],
  });
  const mkCell = (t, i, bold) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    margins: cellMargins(),
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      spacing: { line: 240 },
      children: [new TextRun({ text: String(t), font: SANS, size: 18, bold: !!bold, color: C.TEXTE })],
    })],
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    borders: thinBorders(),
    rows: [
      ...(headers ? [new TableRow({ tableHeader: true, children: headers.map(mkHead) })] : []),
      ...rows.map(r => new TableRow({
        children: r.map((t, i) => mkCell(t, i, opts.boldFirstCol && i === 0)),
      })),
    ],
  });
}

// bandeau KPI : cellules alternées teal/orange, gros chiffres blancs + libellés dessous
function kpiStrip(items) {
  const n = items.length;
  const w = Math.floor(9360 / n);
  const widths = Array(n).fill(w);
  return new Table({
    width: { size: w * n, type: WidthType.DXA },
    columnWidths: widths,
    borders: thinBorders(),
    rows: [
      new TableRow({
        children: items.map((it, i) => new TableCell({
          width: { size: w, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: i % 2 === 0 ? C.TEAL : C.OR },
          margins: cellMargins(80, 60),
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: it.valeur, font: SANS, size: 26, bold: true, color: C.BLANC })],
          })],
        })),
      }),
      new TableRow({
        children: items.map(it => new TableCell({
          width: { size: w, type: WidthType.DXA },
          margins: cellMargins(50, 60),
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: it.libelle, font: SANS, size: 17, color: C.TEXTE })],
          })],
        })),
      }),
    ],
  });
}

// logo texte "Adomsenior"
const logoRuns = (size = 28) => ([
  new TextRun({ text: 'Adom', font: SERIF, size, bold: true, color: C.ENCRE }),
  new TextRun({ text: 'senior', font: SERIF, size, bold: true, color: C.OR }),
]);

// en-tête de page : logo à gauche, titre doc à droite, filet teal
function pageHeader(titreDoc, sousTitre) {
  return new Header({
    children: [
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
        spacing: { after: 20 },
        children: [
          ...logoRuns(24),
          new TextRun({ text: '\t' }),
          new TextRun({ text: titreDoc.toUpperCase(), font: SANS, size: 14, bold: true, color: C.ENCRE }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.ENCRE, space: 4 } },
        spacing: { after: 120 },
        children: [new TextRun({ text: sousTitre, font: SANS, size: 13, bold: true, color: C.TEAL })],
      }),
    ],
  });
}

function pageFooter() {
  return new Footer({
    children: [new Paragraph({
      tabStops: [
        { type: TabStopType.CENTER, position: 4680 },
        { type: TabStopType.RIGHT, position: 9360 },
      ],
      border: { top: { style: BorderStyle.SINGLE, size: 12, color: C.ENCRE, space: 4 } },
      children: [
        new TextRun({ text: 'ADOM SENIOR — BIEN CHEZ SOI', font: SANS, size: 13, bold: true, color: C.ENCRE }),
        new TextRun({ text: '\tadomsenior.fr  •  SIRET 849 109 558 00023\t', font: SANS, size: 13, color: C.GRIS }),
        new TextRun({ text: 'PAGE ', font: SANS, size: 13, bold: true, color: C.TEAL }),
        new TextRun({ children: [PageNumber.CURRENT], font: SANS, size: 13, bold: true, color: C.TEAL }),
      ],
    })],
  });
}

// chaque liste numérotée doit avoir sa propre référence, sinon la
// numérotation continue d'une liste à l'autre dans tout le document
const numRefs = ['nums', 'nums2', 'num_matin', 'num_apm', 'num_auto', 'num_sav', 'num_dem'];
const numberingConfig = {
  config: [
    {
      reference: 'puces',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '●', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } }, run: { color: C.TEAL, size: 14 } },
      }],
    },
    ...numRefs.map(reference => ({
      reference,
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 400, hanging: 280 } }, run: { bold: true, color: C.TEAL } },
      }],
    })),
  ],
};

const pageMargins = {
  top: convertMillimetersToTwip(22), bottom: convertMillimetersToTwip(20),
  left: convertMillimetersToTwip(18), right: convertMillimetersToTwip(18),
  header: convertMillimetersToTwip(8), footer: convertMillimetersToTwip(8),
};

const spacer = (after = 160) => new Paragraph({ spacing: { after }, children: [] });

// ---------- images ----------
const fs = require('fs');
const { ImageRun } = require('docx');

// lecture des dimensions PNG (IHDR) / JPEG (SOF)
function imgDims(path) {
  const b = fs.readFileSync(path);
  if (b[0] === 0x89 && b[1] === 0x50) {          // PNG
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), type: 'png' };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {          // JPEG
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7), type: 'jpg' };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  throw new Error('format image inconnu : ' + path);
}

// image centrée à largeur imposée (px à 96 dpi), légende optionnelle
function img(path, widthPx, caption) {
  const { w, h, type } = imgDims(path);
  const heightPx = Math.round(widthPx * h / w);
  const out = [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: caption ? 40 : 120 },
    children: [new ImageRun({
      data: fs.readFileSync(path), type,
      transformation: { width: widthPx, height: heightPx },
    })],
  })];
  if (caption) {
    out.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [new TextRun({ text: caption, font: SANS, size: 14, italics: true, color: C.GRIS })],
    }));
  }
  return out;
}

module.exports = {
  C, SANS, SERIF, body, rich, note, chip, h1, h2, h3, callout, bullet, numbered,
  table, kpiStrip, logoRuns, pageHeader, pageFooter, numberingConfig, pageMargins,
  spacer, noBorders, thinBorders, cellMargins, img, imgDims,
};

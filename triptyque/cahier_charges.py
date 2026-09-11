# Cahier des charges d'impression — triptyque VISAP ADOM SENIOR
# Document à remettre à l'imprimeur.
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ENCRE = HexColor('#073E47'); TEAL = HexColor('#0F6470'); OR = HexColor('#DB982D')
CREME = HexColor('#F1ECE1'); PALE = HexColor('#D9E4E4'); FOND = HexColor('#EAF2F3')
LIGNE = HexColor('#C9D8DB'); TEXTE = HexColor('#243238'); GRIS = HexColor('#66777C')
BLANC = HexColor('#FFFFFF')

L = '/usr/share/fonts/truetype/liberation/'; D = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('Sans',   L+'LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('SansB',  L+'LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SerifB', D+'DejaVuSerif-Bold.ttf'))
ASSETS = '/home/user/MEMOIRE-TECHNIQUE-et-AO/generateur/assets/'

W, H = 210*mm, 297*mm
M = 16*mm                      # marge
CW = W - 2*M                   # largeur utile

def txt(c, x, y, s, font='Sans', size=8.5, col=TEXTE, al='l'):
    c.setFont(font, size); c.setFillColor(col)
    (c.drawCentredString if al == 'c' else c.drawRightString if al == 'r' else c.drawString)(x, y, s)

def rect(c, x, y, w, h, fill=None, stroke=None, lw=0.6):
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(lw)
    c.rect(x, y, w, h, stroke=1 if stroke else 0, fill=1 if fill else 0)

def rr(c, x, y, w, h, r, fill=None, stroke=None, lw=0.6):
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(lw)
    c.roundRect(x, y, w, h, r, stroke=1 if stroke else 0, fill=1 if fill else 0)

def titre(c, y, s):
    c.setFillColor(OR); c.rect(M, y - 1.2*mm, 1.8*mm, 6*mm, stroke=0, fill=1)
    txt(c, M + 5*mm, y, s, 'SerifB', 12.5, ENCRE)
    return y - 8*mm

def duo(c, y, lignes, lab_w=52*mm, h=7*mm):
    """Lignes libellé / valeur en bandes alternées."""
    for i, (k, v) in enumerate(lignes):
        if i % 2 == 0: rect(c, M, y - h, CW, h, fill=FOND)
        txt(c, M + 2.5*mm, y - h + 2.2*mm, k, 'SansB', 8.2, TEAL)
        txt(c, M + lab_w, y - h + 2.2*mm, v, 'Sans', 8.2, TEXTE)
        y -= h
    return y

def schema_pliage(c, y):
    """Schéma coté du format déplié + séquence de pliage."""
    tot = 624.0
    sw = CW                          # largeur du schéma
    sc = sw / tot
    hh = 44*mm
    x0 = M
    volets = [('RABAT INTÉRIEUR', 206, PALE), ('VOLET CENTRE', 208, FOND), ('COUVERTURE', 210, CREME)]
    # panneaux
    cx = x0
    for nom, larg, coul in volets:
        w = larg * sc
        rect(c, cx, y - hh, w, hh, fill=coul)
        rect(c, cx, y - hh, w, hh, stroke=TEAL, lw=0.8)
        txt(c, cx + w/2, y - hh/2 + 2*mm, nom, 'SansB', 7.4, ENCRE, 'c')
        txt(c, cx + w/2, y - hh/2 - 4*mm, f'{larg} mm', 'SansB', 11, OR, 'c')
        cx += w
    # plis
    acc = 0
    for nom, larg, _ in volets[:-1]:
        acc += larg
        px = x0 + acc * sc
        c.setStrokeColor(OR); c.setLineWidth(1); c.setDash(2, 2)
        c.line(px, y - hh - 4*mm, px, y + 4*mm); c.setDash()
        txt(c, px, y + 6*mm, f'PLI à {acc} mm', 'SansB', 6.8, OR, 'c')
    # cote totale
    yy = y - hh - 10*mm
    c.setStrokeColor(ENCRE); c.setLineWidth(0.6)
    c.line(x0, yy, x0 + sw, yy)
    for px in (x0, x0 + sw):
        c.line(px, yy - 1.6*mm, px, yy + 1.6*mm)
    c.setFillColor(CREME); c.rect(x0 + sw/2 - 26*mm, yy - 2.4*mm, 52*mm, 5*mm, stroke=0, fill=1)
    txt(c, x0 + sw/2, yy - 1.2*mm, '624 mm — format fini déplié', 'SansB', 8, ENCRE, 'c')
    txt(c, x0, y - hh - 16*mm, 'Face EXTÉRIEURE. Sur la face intérieure, les largeurs sont en miroir : 210 | 208 | 206.',
        'Sans', 7.4, GRIS)
    return y - hh - 22*mm

def sequence_pliage(c, y):
    """Trois vignettes : déplié → 1er pli → fermé."""
    bw = (CW - 2*10*mm) / 3
    etapes = [
        ('1 — À plat', 3),
        ('2 — Le rabat rentre', 2),
        ('3 — Fermé, 210 mm', 1),
    ]
    for i, (lab, n) in enumerate(etapes):
        bx = M + i * (bw + 10*mm)
        rr(c, bx, y - 30*mm, bw, 30*mm, 2*mm, fill=BLANC, stroke=LIGNE)
        # petit dessin
        ph = 17*mm
        uw = (bw - 16*mm) / 3
        py = y - 24*mm
        for k in range(n):
            col = [PALE, FOND, CREME][k]
            rect(c, bx + 8*mm + k*uw, py, uw, ph, fill=col)
            rect(c, bx + 8*mm + k*uw, py, uw, ph, stroke=TEAL, lw=0.6)
        if n < 3:
            c.setStrokeColor(OR); c.setLineWidth(0.9)
            ax = bx + 8*mm + n*uw + 3*mm
            c.line(ax + 6*mm, py + ph/2, ax, py + ph/2)
            c.setFillColor(OR)
            p = c.beginPath(); p.moveTo(ax, py + ph/2 + 1.6*mm)
            p.lineTo(ax, py + ph/2 - 1.6*mm); p.lineTo(ax - 2.6*mm, py + ph/2); p.close()
            c.drawPath(p, stroke=0, fill=1)
        txt(c, bx + bw/2, y - 28.4*mm, lab, 'SansB', 7.2, ENCRE, 'c')
    return y - 36*mm

def encadre(c, y, label, corps, h=None, fill=FOND):
    lignes = corps.split('\n')
    hh = h or (len(lignes) * 4.4*mm + 9*mm)
    rect(c, M, y - hh, CW, hh, fill=fill)
    c.setStrokeColor(TEAL); c.setLineWidth(2.2)
    c.line(M + 1.1, y - hh, M + 1.1, y)
    txt(c, M + 5*mm, y - 5.4*mm, label, 'SansB', 8.4, ENCRE)
    yy = y - 10.4*mm
    for l in lignes:
        txt(c, M + 5*mm, yy, l, 'Sans', 8.2, TEXTE); yy -= 4.4*mm
    return y - hh - 5*mm

# =====================================================================
def entete(c, sous=''):
    try:
        img = ImageReader(ASSETS + 'logo_adomsenior.png')
        lw = 40*mm
        c.drawImage(img, M, H - 26*mm, width=lw, height=lw*256/1360, mask='auto')
    except Exception:
        txt(c, M, H - 22*mm, 'Adomsenior', 'SerifB', 14, ENCRE)
    txt(c, W - M, H - 18*mm, "CAHIER DES CHARGES D'IMPRESSION", 'SansB', 9, ENCRE, 'r')
    txt(c, W - M, H - 22.4*mm, 'TEC-VISAP-TRIPTYQUE-01 · Rév. E', 'Sans', 7.6, GRIS, 'r')
    c.setStrokeColor(OR); c.setLineWidth(1.2)
    c.line(M, H - 30*mm, W - M, H - 30*mm)
    if sous:
        txt(c, M, H - 38*mm, sous, 'SerifB', 13, ENCRE)
        return H - 48*mm
    return H - 40*mm

def pied(c, n):
    c.setStrokeColor(ENCRE); c.setLineWidth(1)
    c.line(M, 22*mm, W - M, 22*mm)
    txt(c, M, 17*mm, 'ADOM SENIOR — BIEN CHEZ SOI', 'SansB', 8, ENCRE)
    txt(c, M, 13*mm, '2 impasse Joliot-Curie, 64110 Jurançon · SIRET 849 109 558 00023', 'Sans', 7.2, GRIS)
    txt(c, W - M, 17*mm, 'Contact : Loyk Duporge · 07 43 72 07 64', 'SansB', 8, ENCRE, 'r')
    txt(c, W - M, 13*mm, 'loyk.duporge@adomsenior.fr · adomsenior.fr', 'Sans', 7.2, GRIS, 'r')
    txt(c, W/2, 8*mm, f'Page {n} / 2', 'Sans', 7, GRIS, 'c')

import sys
out = sys.argv[1] if len(sys.argv) > 1 else 'CAHIER_DES_CHARGES_IMPRESSION.pdf'
c = canvas.Canvas(out, pagesize=(W, H))
c.setTitle("Cahier des charges d'impression — Dossier VISAP 3 volets — ADOM SENIOR")
c.setAuthor('ADOM SENIOR')

# ================= PAGE 1 =================
y = entete(c)
txt(c, M, y, 'Dossier VISAP — dépliant 3 volets', 'SerifB', 17, ENCRE)
y -= 7*mm
txt(c, M, y, "Document de chantier destiné aux équipes de pose. Manipulé quotidiennement.", 'Sans', 9, GRIS)
y -= 12*mm

y = titre(c, y, '1. Le document')
y = duo(c, y, [
    ('Format fini déplié',  '624 × 297 mm'),
    ('Format du fichier',   '630 × 303 mm  (fond perdu 3 mm sur les 4 côtés)'),
    ('Format fini plié',    '210 × 297 mm  — doit rentrer dans une pochette A4'),
    ('Pliage',              'Pli roulé, 2 plis  (volets dégressifs — voir schéma)'),
    ('Impression',          'Recto-verso, quadri'),
    ('Pages du fichier',    'Page 1 = extérieur · Page 2 = intérieur'),
])
y -= 12*mm

y = titre(c, y, '2. Schéma de pliage et cotes des volets')
y -= 7*mm
y = schema_pliage(c, y)
y -= 2*mm
y = sequence_pliage(c, y)
y = encadre(c, y, 'POURQUOI DES VOLETS INÉGAUX',
    "Dans un pli roulé, chaque volet se loge à l'intérieur du suivant. À trois volets égaux,\n"
    "le rabat intérieur bute contre le pli : le dépliant bâille et gondole au lieu de fermer à plat.\n"
    "Le dégressif de 2 mm par volet lui laisse la place de rentrer. Merci de respecter ces cotes.")
pied(c, 1); c.showPage()

# ================= PAGE 2 =================
y = entete(c)
y -= 2*mm
y = titre(c, y, '3. Support et façonnage')
y = duo(c, y, [
    ('Support conseillé', '300 g couché mat'),
    ('Pelliculage',       'Mat, 1 face (extérieur) — tenue en chantier'),
    ('Rainage',           '2 rainages verticaux pleine hauteur, aux positions de pli (206 et 414 mm)'),
])
y -= 8*mm
y = encadre(c, y, 'RAINAGE — MERCI DE LE CHIFFRER EXPLICITEMENT',
    "Sur 300 g couché, un pli non rainé fait craqueler la couche et l'encre sur l'arête,\n"
    "en particulier dans les aplats de couleur. Le rainage garantit aussi que le pli tombe\n"
    "exactement à la cote — indispensable ici, les volets se suivant à 2 mm près.",
    fill=HexColor('#FBF1DE'))
y -= 6*mm

y = titre(c, y, '4. Points déjà vérifiés de notre côté')
y = duo(c, y, [
    ('Fond perdu',  '3 mm présents sur les 4 côtés, fonds débordants'),
    ('Repères',     'Traits de coupe aux angles + repères de pli marqués « PLI »'),
    ('Polices',     'Incorporées au PDF — aucune police à fournir'),
    ('Photo couv.', "≈ 185 dpi à la taille d'emploi — validé par nos soins, ne pas bloquer le BAT"),
])
y -= 12*mm

y = titre(c, y, '5. Fichier remis')
y = duo(c, y, [
    ('Nom du fichier', 'TRIPTYQUE_VISAP_PLI_ROULE.pdf'),
    ('Contenu',        '2 pages — page 1 extérieur, page 2 intérieur'),
    ('Format',         '630 × 303 mm, quadri, polices incorporées'),
], lab_w=42*mm)
y -= 12*mm

y = titre(c, y, '6. Ce que nous attendons en retour')
for n, t in enumerate([
    'Un devis incluant le rainage et le pliage, pour 250 et 500 exemplaires.',
    'Un BAT numérique avec le plan de pliage coté, avant lancement.',
    "Si vous préconisez un autre grammage ou un pli accordéon, dites-le-nous :",
    "le fichier est paramétrable, les volets peuvent repasser à 3 × 210 mm.",
], 1):
    if n <= 3:
        c.setFillColor(OR); c.circle(M + 1.6*mm, y + 1.1*mm, 1.4*mm, stroke=0, fill=1)
    txt(c, M + 6*mm, y, t, 'Sans', 8.5, TEXTE)
    y -= 5.4*mm

pied(c, 2); c.showPage()
c.save()
print('OK —', out)

# Triptyque VISAP ADOM SENIOR — reconstruction vectorielle
# Volets gradués pour pli roulé + fond perdu 3 mm + traits de coupe et de pliage
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

# ---------- charte ----------
ENCRE = HexColor('#073E47')
TEAL  = HexColor('#0F6470')
OR    = HexColor('#DB982D')
CREME = HexColor('#F1ECE1')
PALE  = HexColor('#D9E4E4')
FOND  = HexColor('#EAF2F3')
LIGNE = HexColor('#C9D8DB')
TEXTE = HexColor('#243238')
GRIS  = HexColor('#66777C')
BLANC = HexColor('#FFFFFF')

F = '/usr/share/fonts/truetype/liberation/'
D = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('Sans',   F+'LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('SansB',  F+'LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Serif',  D+'DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('SerifB', D+'DejaVuSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Cases',  D+'DejaVuSans.ttf'))      # glyphe ☐ U+2610

ASSETS = '/home/user/MEMOIRE-TECHNIQUE-et-AO/generateur/assets/'

# ---------- géométrie : pli roulé ----------
# Volet extérieur (couverture) le plus large, volet intérieur (rabat) le plus étroit.
BLEED = 3*mm
H     = 297*mm
W_COUV, W_CENTRE, W_RABAT = 210*mm, 208*mm, 206*mm
W = W_RABAT + W_CENTRE + W_COUV                      # 624 mm
PAGE = (W + 2*BLEED, H + 2*BLEED)
OX, OY = BLEED, BLEED                                 # origine du format fini

# Bords des volets, face EXTÉRIEURE (gauche→droite) : rabat | centre | couverture
EXT = [W_RABAT, W_CENTRE, W_COUV]
# Face INTÉRIEURE : miroir — couverture | centre | rabat
INT = [W_COUV, W_CENTRE, W_RABAT]

def bornes(widths):
    xs, acc = [], 0.0
    for w in widths:
        xs.append((acc, acc + w)); acc += w
    return xs

# ---------- helpers ----------
class Clip:
    """Restreint le dessin décoratif aux bornes d'un volet (fond perdu inclus)."""
    def __init__(self, c, x0, x1, bleed_g=False, bleed_d=False):
        self.c, self.x0, self.x1 = c, x0, x1
        self.bg, self.bd = bleed_g, bleed_d
    def __enter__(self):
        self.c.saveState()
        a = self.x0 - (BLEED if self.bg else 0)
        b = self.x1 + (BLEED if self.bd else 0)
        p = self.c.beginPath()
        p.rect(a, 0, b - a, PAGE[1])
        self.c.clipPath(p, stroke=0)
        return self.c
    def __exit__(self, *e):
        self.c.restoreState()

def image_cover(c, path, x, y, w, h, r=0):
    """Place une image en 'cover' (remplit le cadre, recadrage centré)."""
    img = ImageReader(path)
    iw, ih = img.getSize()
    sc = max(w / iw, h / ih)
    dw, dh = iw * sc, ih * sc
    c.saveState()
    p = c.beginPath()
    if r: p.roundRect(x, y, w, h, r)
    else: p.rect(x, y, w, h)
    c.clipPath(p, stroke=0)
    c.drawImage(img, x - (dw - w) / 2, y - (dh - h) / 2,
                width=dw, height=dh, mask='auto')
    c.restoreState()

def rr(c, x, y, w, h, r, fill=None, stroke=None, lw=0.7):
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(lw)
    c.roundRect(x, y, w, h, r, stroke=1 if stroke else 0, fill=1 if fill else 0)

def rect(c, x, y, w, h, fill=None, stroke=None, lw=0.7):
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(lw)
    c.rect(x, y, w, h, stroke=1 if stroke else 0, fill=1 if fill else 0)

def txt(c, x, y, s, font='Sans', size=8, color=TEXTE, align='l'):
    if '\u2610' in s and font.startswith('Sans'):
        font = 'Cases'; size = size * 0.94
    c.setFont(font, size); c.setFillColor(color)
    if align == 'c': c.drawCentredString(x, y, s)
    elif align == 'r': c.drawRightString(x, y, s)
    else: c.drawString(x, y, s)

def entete(c, x0, x1, titre, ref):
    """Bandeau haut : logo à gauche, titre à droite, filet orange."""
    y = OY + H - 16*mm
    try:
        logo = ImageReader(ASSETS + 'logo_adomsenior.png')
        lw = 26*mm; lh = lw * 256/1360
        c.drawImage(logo, x0 + 9*mm, y - 1*mm, width=lw, height=lh, mask='auto')
    except Exception:
        txt(c, x0 + 9*mm, y, 'Adomsenior', 'SerifB', 10, ENCRE)
    txt(c, x1 - 9*mm, y + 2.2*mm, titre, 'SansB', 8.2, ENCRE, 'r')
    txt(c, x1 - 9*mm, y - 1.6*mm, ref, 'Sans', 7, GRIS, 'r')
    c.setStrokeColor(OR); c.setLineWidth(1.1)
    c.line(x0 + 9*mm, y - 5*mm, x1 - 9*mm, y - 5*mm)

def pied(c, x0, x1, ref, page):
    y = OY + 12*mm
    txt(c, x0 + 9*mm, y, ref, 'Sans', 7.2, GRIS)
    c.setFont('SansB', 7.6); c.setFillColor(ENCRE)
    c.drawRightString(x1 - 9*mm, y, 'Page ' + page)

def titre_section(c, x, y, s, size=13):
    """Barre orange + titre serif."""
    c.setFillColor(OR); c.rect(x, y - 1*mm, 1.6*mm, 5.6*mm, stroke=0, fill=1)
    txt(c, x + 4.5*mm, y, s, 'SerifB', size, ENCRE)

def label(c, x, y, s, size=7):
    txt(c, x, y, s, 'SansB', size, TEAL)

def case(c, x, y, s, size=7.4, gap=3.1*mm):
    """Case à cocher + libellé ; renvoie la largeur occupée."""
    c.setStrokeColor(GRIS); c.setLineWidth(0.55)
    c.rect(x, y - 0.4*mm, 2.5*mm, 2.5*mm, stroke=1, fill=0)
    txt(c, x + gap, y, s, 'Sans', size, TEXTE)
    return gap + c.stringWidth(s, 'Sans', size) + 3.2*mm

def ligne_champ(c, x, y, w, s):
    txt(c, x, y, s, 'SansB', 7, TEAL)
    c.setStrokeColor(LIGNE); c.setLineWidth(0.5)
    c.line(x + c.stringWidth(s, 'SansB', 7) + 2*mm, y - 0.8*mm, x + w, y - 0.8*mm)

def tableau(c, x, y, colw, rows, hrow=7.2*mm, head=True, headfill=ENCRE, zebra=FOND):
    """Tableau simple ; rows[0] = en-tête si head. Renvoie le y du bas."""
    cy = y
    for i, row in enumerate(rows):
        h = hrow
        if i == 0 and head:
            rect(c, x, cy - h, sum(colw), h, fill=headfill)
            cx = x
            for j, cell in enumerate(row):
                txt(c, cx + colw[j]/2, cy - h + h/2 - 1*mm, cell, 'SansB', 7, BLANC, 'c')
                cx += colw[j]
        else:
            if zebra and (i % 2 == 1):
                rect(c, x, cy - h, colw[0], h, fill=zebra)
            cx = x
            for j, cell in enumerate(row):
                rect(c, cx, cy - h, colw[j], h, stroke=LIGNE, lw=0.5)
                if cell:
                    col = TEAL if j == 0 else TEXTE
                    dispo = colw[j] - 4.4*mm
                    if c.stringWidth(cell, 'Sans', 7.2) > dispo and ' ' in cell:
                        mots, l1 = cell.split(' '), ''
                        for w_ in mots:
                            if c.stringWidth((l1 + ' ' + w_).strip(), 'Sans', 7.2) <= dispo:
                                l1 = (l1 + ' ' + w_).strip()
                            else:
                                break
                        l2 = cell[len(l1):].strip()
                        txt(c, cx + 2.4*mm, cy - h + h/2 + 0.6*mm, l1, 'Sans', 7.2, col)
                        txt(c, cx + 2.4*mm, cy - h + h/2 - 2.8*mm, l2, 'Sans', 7.2, col)
                    else:
                        txt(c, cx + 2.4*mm, cy - h + h/2 - 1*mm, cell, 'Sans', 7.2, col)
                cx += colw[j]
        cy -= h
    return cy

def grille(c, x, y, w, h, pas=5*mm, gros=25*mm):
    """Quadrillage de croquis."""
    rect(c, x, y, w, h, fill=BLANC)
    c.setLineWidth(0.25); c.setStrokeColor(PALE)
    i = pas
    while i < w:
        c.line(x + i, y, x + i, y + h); i += pas
    i = pas
    while i < h:
        c.line(x, y + i, x + w, y + i); i += pas
    c.setLineWidth(0.5); c.setStrokeColor(HexColor('#AFC6C9'))
    i = gros
    while i < w:
        c.line(x + i, y, x + i, y + h); i += gros
    i = gros
    while i < h:
        c.line(x, y + i, x + w, y + i); i += gros
    rect(c, x, y, w, h, stroke=ENCRE, lw=1.1)

# ---------- repères d'impression ----------
def reperes(c, widths):
    """Traits de coupe (coins) et de pliage (dans le fond perdu)."""
    c.setStrokeColor(HexColor('#000000')); c.setLineWidth(0.4)
    L = 2.6*mm
    for (px, py) in [(OX, OY), (OX + W, OY), (OX, OY + H), (OX + W, OY + H)]:
        sx = -1 if px == OX else 1
        sy = -1 if py == OY else 1
        c.line(px + sx*0.8*mm, py, px + sx*(0.8*mm + L), py)
        c.line(px, py + sy*0.8*mm, px, py + sy*(0.8*mm + L))
    acc = 0.0
    for w in widths[:-1]:
        acc += w
        x = OX + acc
        c.setStrokeColor(HexColor('#888888')); c.setLineWidth(0.4)
        c.setDash(1.2, 1.2)
        c.line(x, OY - 0.8*mm, x, OY - 2.8*mm)
        c.line(x, OY + H + 0.8*mm, x, OY + H + 2.8*mm)
        c.setDash()
        txt(c, x, OY + H + 3.6*mm, 'PLI', 'Sans', 4, HexColor('#888888'), 'c')

# =====================================================================
# FACE EXTÉRIEURE : rabat (décor) | centre (logo) | couverture
# =====================================================================
def face_exterieure(c):
    b = bornes(EXT)
    rect(c, 0, 0, PAGE[0], PAGE[1], fill=CREME)

    # --- volet 1 : rabat décoratif (dos du dépliant) ---
    x0, x1 = OX + b[0][0], OX + b[0][1]
    with Clip(c, x0, x1, bleed_g=True):
        c.setFillColor(PALE)
        c.circle(x1 - 34*mm, OY + H - 26*mm, 42*mm, stroke=0, fill=1)
        c.setFillColor(OR)
        c.circle(x0 + 24*mm, OY + H - 26*mm, 17*mm, stroke=0, fill=1)
        rr(c, x0 + 14*mm, OY + 52*mm, 92*mm, 186*mm, 46*mm, fill=ENCRE)
        rr(c, x0 + 30*mm, OY + 68*mm, 60*mm, 154*mm, 30*mm, fill=CREME)
        rr(c, x0 + 42*mm, OY + 80*mm, 36*mm, 130*mm, 18*mm, fill=FOND)
        c.setFillColor(OR)
        rr(c, x1 - 40*mm, OY + 96*mm, 7*mm, 56*mm, 3.5*mm, fill=OR)
        c.setFillColor(PALE)
        c.circle(x0 + 34*mm, OY + 34*mm, 20*mm, stroke=0, fill=1)
        c.setStrokeColor(BLANC); c.setLineWidth(1.2)
        c.circle(x0 + 34*mm, OY + 34*mm, 13*mm, stroke=1, fill=0)

    # --- volet 2 : bloc logo ---
    x0, x1 = OX + b[1][0], OX + b[1][1]
    with Clip(c, x0, x1):
        c.setFillColor(PALE)
        c.circle(x0 + 16*mm, OY + H - 18*mm, 38*mm, stroke=0, fill=1)
        c.setFillColor(ENCRE)
        c.circle(x1 - 12*mm, OY + 30*mm, 34*mm, stroke=0, fill=1)
        c.setFillColor(OR)
        c.circle(x1 - 8*mm, OY + 18*mm, 16*mm, stroke=0, fill=1)
    rr(c, x0 + 22*mm, OY + 72*mm, 164*mm, 156*mm, 8*mm, fill=HexColor('#FDFCFA'))
    cxm = x0 + 104*mm
    try:
        img = ImageReader(ASSETS + 'logo_adomsenior.png')
        lw = 94*mm
        c.drawImage(img, cxm - lw/2, OY + 188*mm, width=lw, height=lw*256/1360, mask='auto')
    except Exception:
        pass
    txt(c, cxm, OY + 162*mm, 'Bien chez soi', 'SansB', 17, ENCRE, 'c')
    c.setStrokeColor(OR); c.setLineWidth(1.8)
    c.line(cxm - 40*mm, OY + 154*mm, cxm + 40*mm, OY + 154*mm)
    txt(c, cxm, OY + 140*mm, 'adomsenior.fr', 'Sans', 9.5, TEXTE, 'c')
    txt(c, cxm, OY + 131*mm, 'contact@adomsenior.fr', 'Sans', 9.5, TEXTE, 'c')
    for dx, hh in [(-15*mm, 24*mm), (0, 38*mm), (15*mm, 17*mm)]:
        rr(c, cxm + dx - 5.5*mm, OY + 88*mm, 11*mm, hh, 5.5*mm, fill=PALE)
    c.setStrokeColor(OR); c.setLineWidth(1.2)
    c.line(x0 + 28*mm, OY + 30*mm, x1 - 28*mm, OY + 30*mm)
    txt(c, cxm, OY + 22*mm,
        'TEC-VISAP-TRIPTYQUE-01 · Rév. E · MODÈLE TERRAIN', 'Sans', 7, GRIS, 'c')

    # --- volet 3 : couverture ---
    x0, x1 = OX + b[2][0], OX + b[2][1]
    with Clip(c, x0, x1, bleed_d=True):
        c.setFillColor(ENCRE)
        c.circle(x1 - 10*mm, OY + H - 16*mm, 34*mm, stroke=0, fill=1)
        c.setFillColor(OR)
        c.circle(x1 - 8*mm, OY + H - 4*mm, 19*mm, stroke=0, fill=1)
    try:
        img = ImageReader(ASSETS + 'logo_adomsenior.png')
        lw = 52*mm
        c.drawImage(img, x0 + 14*mm, OY + H - 34*mm, width=lw, height=lw*256/1360, mask='auto')
    except Exception:
        pass
    txt(c, x0 + 14*mm, OY + H - 64*mm, 'DOSSIER VISAP', 'SansB', 27, ENCRE)
    txt(c, x0 + 14*mm, OY + H - 74*mm,
        'Relevé terrain et préparation du chantier', 'Sans', 10.5, GRIS)
    px, py, pw, ph = x0 + 14*mm, OY + 60*mm, 182*mm, 150*mm
    try:
        image_cover(c, ASSETS + 'photo_douche_hero.png', px, py, pw, ph, r=4*mm)
    except Exception:
        rr(c, px, py, pw, ph, 4*mm, fill=PALE)
    c.setFillColor(ENCRE); c.circle(px + pw - 8*mm, py + ph - 12*mm, 10*mm, stroke=0, fill=1)
    c.setFillColor(OR); rr(c, px - 2.5*mm, py + 28*mm, 5*mm, 48*mm, 2.5*mm, fill=OR)
    rr(c, x0 + 14*mm, OY + 16*mm, 182*mm, 36*mm, 4*mm, fill=BLANC)
    cw = 182*mm / 3
    for i, s2 in enumerate(['BÉNÉFICIAIRE :', 'BAILLEUR :', 'DATE :']):
        txt(c, x0 + 18*mm + i*cw, OY + 44*mm, s2, 'SansB', 7, TEAL)
        if i:
            c.setStrokeColor(LIGNE); c.setLineWidth(0.5)
            c.line(x0 + 14*mm + i*cw, OY + 20*mm, x0 + 14*mm + i*cw, OY + 48*mm)
    reperes(c, EXT)

# =====================================================================
# FACE INTÉRIEURE : couverture(dos) | centre | rabat
# =====================================================================
def volet_releve(c, x0, x1):
    entete(c, x0, x1, 'VISAP - RELEVÉ TERRAIN', 'TEC-VISAP-01 · MODÈLE TERRAIN')
    m = x0 + 9*mm; wv = (x1 - 9*mm) - m
    y = OY + H - 32*mm
    txt(c, m, y, 'FICHE TERRAIN - Relevé avant travaux', 'SerifB', 14, TEAL)
    y -= 9*mm
    for gauche, droite in [('BÉNÉFICIAIRE :', 'TÉLÉPHONE :'),
                           ('BAILLEUR / DONNEUR D\'ORDRE :', None),
                           ('ADRESSE :', 'VILLE :')]:
        ligne_champ(c, m, y, wv*0.52 if droite else wv, gauche)
        if droite: ligne_champ(c, m + wv*0.58, y, wv*0.42, droite)
        y -= 8*mm
    y -= 1*mm
    titre_section(c, m, y, '1. Accès et usage')
    y -= 5*mm
    bloc = [
        ('LOGEMENT', ['Maison', 'Appartement'], 'Étage :',
         'ASCENSEUR', ['Oui', 'Non'], 'Cabine L × P (cm) :'),
        ('STATIONNEMENT', ['Facile', 'À prévoir', 'Impossible'], None,
         'PASSAGES', [], 'Porte entrée (cm) :        Porte SDB (cm) :'),
        ('USAGE', ['Debout', 'Assis', 'Avec aidant'], None,
         'TRANSFERT', ['Côté droit', 'Côté gauche', 'Fauteuil'], None),
        ('APPUI', ['Droite', 'Gauche', 'Deux côtés'], None,
         'POINT PARTICULIER', [], None),
    ]
    hb = 15.5*mm; cw = wv/2
    for lg, cg, sg, ld, cd, sd in bloc:
        y -= hb
        rect(c, m, y, cw, hb, stroke=LIGNE, lw=0.5)
        rect(c, m + cw, y, cw, hb, stroke=LIGNE, lw=0.5)
        for xx, lab, cases, suff in [(m, lg, cg, sg), (m + cw, ld, cd, sd)]:
            label(c, xx + 2.4*mm, y + hb - 4.4*mm, lab)
            cx = xx + 2.4*mm
            for s in cases:
                cx += case(c, cx, y + 3.4*mm, s)
            if suff:
                txt(c, cx if cases else xx + 2.4*mm, y + 3.4*mm, suff, 'Sans', 7.4, TEXTE)
    y -= 6*mm
    titre_section(c, m, y, '2. Contrôles rapides')
    y -= 5*mm
    rows = [['Point', 'Constat'],
            ['Diagnostics disponibles', '☐ Oui   ☐ Non   ☐ À demander'],
            ['Coupure d\'eau repérée', '☐ Oui   ☐ Non   Emplacement :'],
            ['Arrivées EF / EC testées', '☐ Oui   ☐ Non'],
            ['Évacuation testée', '☐ Oui   ☐ Non'],
            ['VMC / ventilation', '☐ Fonctionne   ☐ Aspiration faible   ☐ Absente'],
            ['Mur pour appuis', '☐ Plein   ☐ Creux   ☐ À identifier'],
            ['Désordre existant photographié', '☐ Oui   ☐ Non']]
    y = tableau(c, m, y, [wv*0.42, wv*0.58], rows, hrow=8.6*mm)
    y -= 6*mm
    titre_section(c, m, y, '3. Cotes essentielles')
    y -= 5*mm
    cw4 = [wv*0.30, wv*0.22, wv*0.24, wv*0.24]
    rows = [['Élément', 'Constat', 'Cote 1 (cm)', 'Cote 2 (cm)'],
            ['Fenêtre / allège', 'Largeur :', 'Hauteur :', 'Allège :'],
            ['VMC proche d\'un angle — relever jusqu\'aux 2 murs', '☐ Oui  ☐ Non', 'Distance mur 1 :', 'Distance mur 2 :']]
    tableau(c, m, y, cw4, rows, hrow=12*mm)
    pied(c, x0, x1, 'ADOM SENIOR · adomsenior.fr · TEC-VISAP-01 · Rév. H · MODÈLE TERRAIN', '1 / 2')

def volet_croquis(c, x0, x1):
    entete(c, x0, x1, 'VISAP - RELEVÉ TERRAIN', 'TEC-VISAP-01 · MODÈLE TERRAIN')
    m = x0 + 9*mm; wv = (x1 - 9*mm) - m
    y = OY + H - 32*mm
    titre_section(c, m, y, 'FICHE TERRAIN - Croquis et observations', 14)
    y -= 6*mm
    hg = 92*mm
    for lab in ['IMPLANTATION AVANT TRAVAUX', 'IMPLANTATION APRÈS TRAVAUX']:
        y -= hg
        grille(c, m, y, wv, hg)
        rect(c, m + 1.2*mm, y + hg - 8*mm, 62*mm, 6.6*mm, fill=BLANC)
        txt(c, m + 3.4*mm, y + hg - 6*mm, lab, 'SansB', 8, ENCRE)
        y -= 5*mm
    y -= 2*mm
    titre_section(c, m, y, '5. Observations')
    y -= 5*mm
    y -= 26*mm
    rect(c, m, y, wv, 26*mm, stroke=LIGNE, lw=0.6)
    txt(c, m + 2.6*mm, y + 21*mm, 'CHAMP LIBRE', 'Sans', 7, GRIS)
    y -= 8*mm
    txt(c, m, y, 'VISAP RÉALISÉE PAR', 'SansB', 7.4, OR)
    y -= 14*mm
    cw3 = [wv*0.45, wv*0.30, wv*0.25]
    cx = m
    for j, s in enumerate(['NOM ET PRÉNOM', 'FONCTION', 'DATE']):
        rect(c, cx, y, cw3[j], 14*mm, stroke=LIGNE, lw=0.6)
        txt(c, cx + 2.4*mm, y + 9.6*mm, s, 'Sans', 7, GRIS)
        cx += cw3[j]
    pied(c, x0, x1, 'ADOM SENIOR · adomsenior.fr · TEC-VISAP-01 · Rév. H · MODÈLE TERRAIN', '2 / 2')

def volet_produit(c, x0, x1):
    entete(c, x0, x1, 'FICHE PRODUIT VISAP', 'TEC-PRODUIT-01 · MODÈLE TERRAIN')
    m = x0 + 8*mm; wv = (x1 - 8*mm) - m
    y = OY + H - 32*mm
    txt(c, m, y, 'FICHE PRODUIT - Produits à commander', 'SerifB', 13.5, TEAL)
    y -= 9*mm
    for a, b_, cc in [('BÉNÉFICIAIRE :', 'DATE :', 'ÉTABLIE PAR :'),
                      ('BAILLEUR / DONNEUR D\'ORDRE :', 'TÉLÉPHONE :', None),
                      ('ADRESSE CHANTIER :', 'VILLE :', 'ÉTAGE :')]:
        ligne_champ(c, m, y, wv*0.50, a)
        ligne_champ(c, m + wv*0.54, y, wv*0.20, b_)
        if cc: ligne_champ(c, m + wv*0.78, y, wv*0.22, cc)
        y -= 7.6*mm
    y -= 1*mm
    txt(c, m, y, 'CONFIGURATION RETENUE', 'SansB', 7.6, TEAL)
    y -= 2*mm
    cw = wv/2
    for gauche, droite in [
        ('Receveur — L × P :          Coloris :', 'Accès — ☐ frontal  ☐ latéral  ☐ angle   Autre :'),
        ('Paroi — ☐ fixe  ☐ pivotante  ☐ coulissante  ☐ rabattable',
         'Équipements — ☐ siège  ☐ barres  ☐ mitigeur  ☐ VMC  ☐ autre :')]:
        y -= 8*mm
        rect(c, m, y, cw, 8*mm, stroke=LIGNE, lw=0.5)
        rect(c, m + cw, y, cw, 8*mm, stroke=LIGNE, lw=0.5)
        txt(c, m + 2.4*mm, y + 2.8*mm, gauche, 'Sans', 7, TEXTE)
        txt(c, m + cw + 2.4*mm, y + 2.8*mm, droite, 'Sans', 7, TEXTE)
    y -= 7*mm
    txt(c, m, y, 'PRODUITS À COMMANDER', 'SansB', 7.6, TEAL)
    y -= 3*mm
    gauche = ['Receveur', 'Panneaux muraux (grand / bas)', 'Profilé d\'angle',
              'Profilé de jonction / H', 'Profilé finition / U / tablette',
              'Komacel / habillage', 'Paroi / porte (type à préciser)', 'Paroi basse',
              'Meuble lavabo complet', 'Lavabo ergonomique + miroir', 'Miroir + éclairage LED',
              'Revêtement de sol', 'Plinthes / barre de seuil', 'Siège de douche',
              'Accoudoirs', 'VMC', 'Divers']
    droite = ['Mitigeur douche (type à préciser)', 'Mitigeur lavabo', 'Set de douche',
              'Siphon douche', 'Siphon lavabo', 'Barre d\'appui (type à préciser)',
              'Silicone blanc', 'Silicone transparent', 'Plots / cales', 'Pack WC surélevé',
              'Pompe de relevage', 'Revêtement mural', 'Lavabo sur colonne', 'Kit magnétique',
              'Fixations / Starfix', 'Plinthe PVC receveur', 'Divers']
    colw = [wv*0.175, wv*0.045, wv*0.28, wv*0.175, wv*0.045, wv*0.28]
    hh = 8.4*mm
    rect(c, m, y - hh, wv, hh, fill=ENCRE)
    cx = m
    for j, s in enumerate(['PRODUIT', 'QTÉ', 'RÉFÉRENCE / DIMENSIONS / COLORIS',
                           'PRODUIT', 'QTÉ', 'RÉFÉRENCE / DIMENSIONS / COLORIS']):
        txt(c, cx + colw[j]/2, y - hh + 3*mm, s, 'SansB', 5.8, BLANC, 'c')
        cx += colw[j]
    y -= hh
    hr = 8.1*mm
    for i in range(len(gauche)):
        y -= hr
        cx = m
        for j, cell in enumerate([gauche[i], '', '', droite[i], '', '']):
            f = FOND if j in (0, 3) else BLANC
            rect(c, cx, y, colw[j], hr, fill=f)
            rect(c, cx, y, colw[j], hr, stroke=LIGNE, lw=0.4)
            if cell:
                s = cell
                if c.stringWidth(s, 'Sans', 6.4) > colw[j] - 3*mm:
                    txt(c, cx + 1.8*mm, y + hr/2 + 0.4*mm, s[:s.rfind(' ', 0, 28)], 'Sans', 6.2, TEAL)
                    txt(c, cx + 1.8*mm, y + hr/2 - 2.6*mm, s[s.rfind(' ', 0, 28)+1:], 'Sans', 6.2, TEAL)
                else:
                    txt(c, cx + 1.8*mm, y + hr/2 - 0.9*mm, s, 'Sans', 6.4, TEAL)
            cx += colw[j]
    y -= 7*mm
    txt(c, m, y, 'PRÉCISIONS / PRODUITS SPÉCIFIQUES', 'SansB', 7.4, TEAL)
    y -= 26*mm
    rect(c, m, y, wv, 24*mm, stroke=LIGNE, lw=0.6)
    pied(c, x0, x1, 'ADOM SENIOR · adomsenior.fr · TEC-PRODUIT-01 · Rév. C · MODÈLE TERRAIN', '1 / 1')

def face_interieure(c):
    b = bornes(INT)
    rect(c, 0, 0, PAGE[0], PAGE[1], fill=BLANC)
    volet_releve(c,  OX + b[0][0], OX + b[0][1])
    volet_croquis(c, OX + b[1][0], OX + b[1][1])
    volet_produit(c, OX + b[2][0], OX + b[2][1])
    reperes(c, INT)

# =====================================================================
def version_a4(out):
    """Version A4 pour impression de dépannage : couverture + les 3 fiches.
    Les deux volets purement décoratifs ne sont pas repris (aucun contenu utile,
    et une imprimante de bureau ne sait pas imprimer à fond perdu)."""
    global OX, OY, H, PAGE
    OX, OY = 0, 0
    H = 297*mm
    PAGE = (210*mm, 297*mm)
    c = canvas.Canvas(out, pagesize=PAGE)
    c.setTitle('Dossier VISAP — version A4 terrain — ADOM SENIOR')

    # 1. couverture simplifiée
    rect(c, 0, 0, 210*mm, 297*mm, fill=CREME)
    try:
        img = ImageReader(ASSETS + 'logo_adomsenior.png')
        lw = 52*mm
        c.drawImage(img, 14*mm, H - 34*mm, width=lw, height=lw*256/1360, mask='auto')
    except Exception:
        pass
    txt(c, 14*mm, H - 64*mm, 'DOSSIER VISAP', 'SansB', 27, ENCRE)
    txt(c, 14*mm, H - 74*mm, 'Relevé terrain et préparation du chantier', 'Sans', 10.5, GRIS)
    try:
        image_cover(c, ASSETS + 'photo_douche_hero.png', 14*mm, 60*mm, 182*mm, 150*mm, r=4*mm)
    except Exception:
        rr(c, 14*mm, 60*mm, 182*mm, 150*mm, 4*mm, fill=PALE)
    rr(c, 14*mm, 16*mm, 182*mm, 36*mm, 4*mm, fill=BLANC)
    cw = 182*mm/3
    for i, s2 in enumerate(['BÉNÉFICIAIRE :', 'BAILLEUR :', 'DATE :']):
        txt(c, 18*mm + i*cw, 44*mm, s2, 'SansB', 7, TEAL)
        if i:
            c.setStrokeColor(LIGNE); c.setLineWidth(0.5)
            c.line(14*mm + i*cw, 20*mm, 14*mm + i*cw, 48*mm)
    txt(c, 105*mm, 8*mm,
        'Version A4 — impression de dépannage · TEC-VISAP-TRIPTYQUE-01 · Rév. E',
        'Sans', 6.5, GRIS, 'c')
    c.showPage()

    # 2-4. les trois fiches, une par page
    for f in (volet_releve, volet_croquis, volet_produit):
        rect(c, 0, 0, 210*mm, 297*mm, fill=BLANC)
        f(c, 0, 210*mm)
        c.showPage()
    c.save()
    print(f'OK — {out}  (4 pages A4 : couverture + 3 fiches)')

import sys
out = sys.argv[1] if len(sys.argv) > 1 else 'TRIPTYQUE_VISAP.pdf'
c = canvas.Canvas(out, pagesize=PAGE)
c.setTitle('Dossier VISAP 3 volets — ADOM SENIOR')
face_exterieure(c); c.showPage()
face_interieure(c); c.showPage()
c.save()
print(f'OK — {out}')
print(f'   format fini  : {W/mm:.0f} x {H/mm:.0f} mm')
print(f'   avec fond perdu : {PAGE[0]/mm:.0f} x {PAGE[1]/mm:.0f} mm')
print(f'   volets extérieur : rabat {W_RABAT/mm:.0f} | centre {W_CENTRE/mm:.0f} | couverture {W_COUV/mm:.0f}')

if len(sys.argv) > 2:
    version_a4(sys.argv[2])

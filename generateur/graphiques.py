# Graphiques du mémoire technique ADOM SENIOR — langage visuel du triptyque VISAP
# fond crème, teal foncé, orange doré, formes arrondies, étiquettes directes
from PIL import Image, ImageDraw, ImageFont, ImageOps

ENCRE  = (7, 62, 71)      # 073E47
TEAL   = (15, 100, 112)   # 0F6470
OR     = (219, 152, 45)   # DB982D
CREME  = (241, 236, 225)  # F1ECE1
PALE   = (217, 228, 228)  # D9E4E4
BLANC  = (255, 255, 255)
TEXTE  = (36, 50, 56)
GRIS   = (102, 119, 124)

FS = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
FSB = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
FGB = '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'

def F(path, size): return ImageFont.truetype(path, size)

def rr(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def center_text(d, cx, cy, text, font, fill):
    d.text((cx, cy), text, font=font, fill=fill, anchor='mm')

def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

# =====================================================================
# 1. BARRES CA — croissance 2023-2025
# =====================================================================
def g_ca():
    W, H = 1560, 860
    im = Image.new('RGB', (W, H), BLANC)
    d = ImageDraw.Draw(im)
    rr(d, (8, 8, W-8, H-8), 28, fill=CREME)
    # cercles décor
    d.ellipse((W-150, -60, W+40, 130), fill=PALE)
    d.ellipse((W-95, 40, W-35, 100), fill=OR)
    d.text((60, 48), 'UNE CROISSANCE RÉGULIÈRE', font=F(FSB, 30), fill=OR)
    d.text((60, 92), 'Chiffre d’affaires ADOM SENIOR', font=F(FGB, 52), fill=ENCRE)
    base_y, max_h, bw = 700, 380, 260
    xs = [170, 560, 950]
    vals = [(2023, 185, 'Année de lancement'), (2024, 630, '× 3,4 en un an'), (2025, 700, '+ 11 % de croissance')]
    vmax = 700.0
    for (an, v, note), x in zip(vals, xs):
        h = int(max_h * v / vmax)
        if an == 2025:
            # segment Morbihan Habitat (150 K€) en orange, séparé par un liseré blanc
            h_mh = int(max_h * 150 / vmax)
            rr(d, (x, base_y - h, x + bw, base_y - h_mh - 4), 14, fill=TEAL)
            rr(d, (x, base_y - h_mh, x + bw, base_y), 14, fill=OR)
            d.rectangle((x, base_y - h_mh - 4, x + bw, base_y - h_mh), fill=CREME)
            d.line((x + bw + 18, base_y - h_mh/2, x + bw + 66, base_y - h_mh/2), fill=OR, width=4)
            d.text((x + bw + 78, base_y - h_mh/2 - 30), '150 K€', font=F(FSB, 34), fill=ENCRE)
            for i, l in enumerate(['réalisés pour', 'Morbihan Habitat', '(105 chantiers)']):
                d.text((x + bw + 78, base_y - h_mh/2 + 8 + i*30), l, font=F(FS, 25), fill=TEXTE)
        else:
            rr(d, (x, base_y - h, x + bw, base_y), 14, fill=TEAL)
        center_text(d, x + bw/2, base_y - h - 42, f'{v} K€', F(FSB, 44), ENCRE)
        center_text(d, x + bw/2, base_y + 36, str(an), F(FSB, 34), TEXTE)
        center_text(d, x + bw/2, base_y + 76, note, F(FS, 23), GRIS)
    d.line((140, base_y, W - 120, base_y), fill=ENCRE, width=4)
    im.save('assets/g_ca.png')

# =====================================================================
# 2. CHRONOLOGIE — du bon de commande aux travaux (style ASH p26)
# =====================================================================
def g_delais():
    W, H = 1560, 2000
    im = Image.new('RGB', (W, H), BLANC)
    d = ImageDraw.Draw(im)
    rr(d, (8, 8, W-8, H-8), 28, fill=CREME)
    d.ellipse((-70, H-190, 120, H+20), fill=PALE)
    d.ellipse((W-130, -50, W+30, 110), fill=PALE)
    d.ellipse((W-85, 55, W-35, 105), fill=OR)
    center_text(d, W/2, 70, 'DÉLAIS DE TRAITEMENT', F(FGB, 58), ENCRE)
    center_text(d, W/2, 130, 'Notre engagement : travaux réalisés sous 4 semaines après réception du bon de commande',
                F(FSB, 27), TEAL)
    ax = 430            # axe vertical
    top, bot = 240, H - 170
    d.line((ax, top, ax, bot - 40), fill=TEAL, width=10)
    # flèche finale
    d.polygon([(ax - 26, bot - 46), (ax + 26, bot - 46), (ax, bot)], fill=TEAL)
    steps = [
        ('J0',   'Bon de commande', 'Réception du bon de commande Morbihan Habitat : commande du matériel envoyée le jour même à notre chaîne logistique.', TEAL),
        ('J+2',  'Prise de rendez-vous', 'Le locataire est appelé : la date de pose est fixée dès l’envoi de la commande, en fonction de ses contraintes.', TEAL),
        ('J+7',  'Livraison GEODIS', 'Les matériaux sont livrés en environ 5 jours ouvrés par notre partenaire GEODIS, au plus près du chantier.', TEAL),
        ('J+10', 'Confirmation', 'Rappel du locataire 48h avant la pose ; affichage en cage d’escalier en lien avec le gardien.', TEAL),
        ('S3–S4','Pose en 1 journée', 'Transformation complète de la salle de bains en une journée (1 j ½ à 48h avec travaux annexes).', OR),
        ('J+28', 'Réception — ≤ 4 semaines', 'PV de réception signé avec le locataire, notice remise, photos et documents partagés sur INTERFAST.', OR),
    ]
    n = len(steps)
    gap = (bot - 120 - top) / (n - 1)
    for i, (jal, titre, txt, col) in enumerate(steps):
        y = int(top + i * gap)
        # pastille jalon
        r = 56
        d.ellipse((ax - r, y - r, ax + r, y + r), fill=BLANC, outline=col, width=8)
        fnt = F(FSB, 30)
        center_text(d, ax, y, jal, fnt, ENCRE)
        # libellé à gauche
        lines = wrap(d, titre, F(FSB, 32), 290)
        ty = y - (len(lines) * 36) / 2 + 2
        for li, l in enumerate(lines):
            d.text((ax - r - 26, ty + li * 36), l, font=F(FSB, 32), fill=col if col == OR else ENCRE, anchor='rm')
        # texte à droite
        lines = wrap(d, txt, F(FS, 26), W - ax - r - 120)
        ty = y - (len(lines) * 32) / 2 + 4
        for li, l in enumerate(lines):
            d.text((ax + r + 36, ty + li * 32), l, font=F(FS, 26), fill=TEXTE, anchor='lm')
    # bandeau final
    rr(d, (ax + 90, bot - 78, W - 70, bot - 6), 18, fill=OR)
    center_text(d, (ax + 90 + W - 70) / 2, bot - 42, 'SALLE DE BAINS TERMINÉE', F(FSB, 34), BLANC)
    im.save('assets/g_delais.png')

# =====================================================================
# 3. LOGISTIQUE — GEODIS + CEDEO
# =====================================================================
def g_logistique():
    W, H = 1900, 760
    im = Image.new('RGB', (W, H), BLANC)
    d = ImageDraw.Draw(im)
    rr(d, (8, 8, W-8, H-8), 28, fill=CREME)
    d.ellipse((-60, -70, 130, 120), fill=PALE)
    d.ellipse((40, 60, 95, 115), fill=OR)
    center_text(d, W/2, 78, 'NOTRE CHAÎNE LOGISTIQUE', F(FGB, 54), ENCRE)
    boxes = [
        ('STOCK FABRICANT', 'Panneaux LT Showertec, receveurs, parois et accessoires réservés à nos marchés'),
        ('TRANSPORT GEODIS', 'Livraison en ≈ 5 jours ouvrés au plus près du lieu d’intervention'),
        ('POSE', 'Réception du matériel par nos poseurs, contrôle et pose en 1 journée'),
    ]
    bw, bh, y0 = 470, 300, 170
    xs = [90, 715, 1340]
    for (titre, txt), x in zip(boxes, xs):
        rr(d, (x, y0, x + bw, y0 + bh), 26, fill=BLANC, outline=TEAL, width=5)
        rr(d, (x, y0, x + bw, y0 + 78), 26, fill=TEAL)
        d.rectangle((x, y0 + 50, x + bw, y0 + 78), fill=TEAL)
        center_text(d, x + bw/2, y0 + 39, titre, F(FSB, 33), BLANC)
        lines = wrap(d, txt, F(FS, 28), bw - 60)
        ty = y0 + 110
        for l in lines:
            center_text(d, x + bw/2, ty + 16, l, F(FS, 28), TEXTE)
            ty += 40
    # flèches
    for x in (xs[0] + bw, xs[1] + bw):
        x2 = x + (xs[1] - xs[0] - bw)
        ymid = y0 + bh/2
        d.line((x + 18, ymid, x2 - 34, ymid), fill=OR, width=10)
        d.polygon([(x2 - 38, ymid - 22), (x2 - 38, ymid + 22), (x2 - 6, ymid)], fill=OR)
    # bandeau CEDEO
    rr(d, (90, 550, W - 90, 680), 24, fill=PALE)
    d.text((130, 580), 'EN PARALLÈLE — RÉSEAU CEDEO DU MORBIHAN', font=F(FSB, 30), fill=ENCRE)
    d.text((130, 624), 'Consommables, réassort immédiat et SAV : Lorient, Lanester, Auray, Theix–Vannes, Vannes Ouest, Ploërmel, Saint-Thuriau.',
           font=F(FS, 27), fill=TEXTE)
    im.save('assets/g_logistique.png')

# =====================================================================
# 4. INTERFAST — représentation schématique de l'espace client
# =====================================================================
def g_interfast():
    W, H = 1900, 1150
    im = Image.new('RGB', (W, H), BLANC)
    d = ImageDraw.Draw(im)
    rr(d, (8, 8, W-8, H-8), 28, fill=CREME)
    # fenêtre navigateur
    bx0, by0, bx1, by1 = 90, 90, W - 90, H - 130
    rr(d, (bx0, by0, bx1, by1), 22, fill=BLANC, outline=ENCRE, width=5)
    # barre de titre
    rr(d, (bx0, by0, bx1, by0 + 70), 22, fill=ENCRE)
    d.rectangle((bx0, by0 + 40, bx1, by0 + 70), fill=ENCRE)
    for i, c in enumerate([OR, PALE, TEAL]):
        d.ellipse((bx0 + 28 + i * 46, by0 + 21, bx0 + 56 + i * 46, by0 + 49), fill=c)
    center_text(d, (bx0 + bx1) / 2, by0 + 36, 'INTERFAST — Espace client MORBIHAN HABITAT', F(FSB, 30), BLANC)
    # menu latéral
    mx1 = bx0 + 420
    d.rectangle((bx0 + 4, by0 + 72, mx1, by1 - 4), fill=PALE)
    menu = ['Vue d’ensemble', 'Planning des visites', 'Interventions terminées', 'Rapports & photos', 'Documents partagés', 'Commentaires']
    for i, m in enumerate(menu):
        y = by0 + 120 + i * 92
        if i == 0:
            rr(d, (bx0 + 24, y - 18, mx1 - 24, y + 46), 14, fill=TEAL)
            d.text((bx0 + 50, y - 2), m, font=F(FSB, 29), fill=BLANC)
        else:
            d.text((bx0 + 50, y), m, font=F(FS, 29), fill=ENCRE)
    # contenu : cartes chantier
    cards = [
        ('Résidence Ker Anna — Vannes', 'Réceptionné', OR, 'PV signé · notice remise · 12 photos'),
        ('Rue des Ajoncs — Lorient', 'Pose planifiée', TEAL, 'RDV confirmé · matériel livré'),
        ('Résidence des Chênes — Ploërmel', 'À valider', ENCRE, 'VISAP transmise · devis en attente'),
    ]
    cx0 = mx1 + 40
    for i, (nom, statut, col, meta) in enumerate(cards):
        y = by0 + 110 + i * 210
        rr(d, (cx0, y, bx1 - 40, y + 178), 18, fill=CREME, outline=PALE, width=3)
        d.text((cx0 + 34, y + 26), nom, font=F(FSB, 31), fill=ENCRE)
        d.text((cx0 + 34, y + 78), meta, font=F(FS, 27), fill=GRIS)
        # badge statut
        tw = d.textlength(statut, font=F(FSB, 26))
        rr(d, (bx1 - 80 - tw - 44, y + 24, bx1 - 80, y + 74), 25, fill=col)
        center_text(d, bx1 - 80 - (tw + 44) / 2, y + 49, statut, F(FSB, 26), BLANC)
        # barre de progression
        prog = [1.0, 0.65, 0.4][i]
        rr(d, (cx0 + 34, y + 132, bx1 - 80, y + 152), 10, fill=PALE)
        rr(d, (cx0 + 34, y + 132, cx0 + 34 + int((bx1 - 114 - cx0 - 34) * prog), y + 152), 10, fill=col)
    center_text(d, W/2, H - 72,
                'Représentation schématique de l’espace client INTERFAST — accès nominatif, consultable 24h/24 sur ordinateur et mobile.',
                F(FS, 27), GRIS)
    im.save('assets/g_interfast.png')

# =====================================================================
# 5. AVANT / APRÈS — réalisations
# =====================================================================
def g_avant_apres():
    M = 'assets/'
    pairs = [(M + 'chantier_avant_1.jpg', M + 'chantier_apres_1.jpg'), (M + 'chantier_avant_2.jpg', M + 'chantier_apres_2.jpg')]
    PW, PH = 560, 640
    W, H = 90 + 2 * (2 * PW + 150) + 60, PH + 260
    W = 90 + (2 * PW + 130) * 2 + 90 - 40
    im = Image.new('RGB', (W, H), BLANC)
    d = ImageDraw.Draw(im)
    rr(d, (8, 8, W - 8, H - 8), 28, fill=CREME)
    d.ellipse((W - 140, -60, W + 40, 120), fill=PALE)
    d.ellipse((W - 90, 50, W - 40, 100), fill=OR)
    d.text((60, 44), 'NOS RÉALISATIONS', font=F(FSB, 30), fill=OR)
    d.text((60, 88), 'La baignoire remplacée par une douche sécurisée — en 1 journée', font=F(FGB, 48), fill=ENCRE)
    y0 = 190
    x = 70
    for avant, apres in pairs:
        for path, label, col in [(avant, 'AVANT', ENCRE), (apres, 'APRÈS', OR)]:
            ph = Image.open(path).convert('RGB')
            ph = ImageOps.fit(ph, (PW, PH), method=Image.LANCZOS, centering=(0.5, 0.45))
            # coins arrondis
            mask = Image.new('L', (PW, PH), 0)
            ImageDraw.Draw(mask).rounded_rectangle((0, 0, PW, PH), radius=24, fill=255)
            im.paste(ph, (x, y0), mask)
            rr(d, (x + 18, y0 + 18, x + 18 + 150, y0 + 66), 24, fill=col)
            center_text(d, x + 18 + 75, y0 + 42, label, F(FSB, 27), BLANC)
            x += PW + 24
            if label == 'AVANT':
                # flèche entre les deux photos
                pass
        x += 82
    center_text(d, W/2, y0 + PH + 46,
                'Photos de chantiers réalisés par nos équipes. Toutes nos réalisations sur adomsenior.fr',
                F(FS, 28), TEXTE)
    im.save('assets/g_avant_apres.png')

g_ca(); g_delais(); g_logistique(); g_interfast(); g_avant_apres()
print('graphiques OK')

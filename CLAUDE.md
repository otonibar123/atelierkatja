# Projet : atelierkatja.com

## Contexte

On migre 3 landing pages de vente d'ebooks de pâtisserie depuis **Hotmart Pages** vers un site auto-hébergé. L'objectif est de ne plus payer l'abonnement Hotmart (~100€) pour l'hébergement des pages. Les liens de paiement Hotmart (`pay.hotmart.com/...`) restent inchangés — on migre uniquement les pages de vente.

La propriétaire est **Katja Althoff**, pâtissière autrichienne installée dans le Sud de la France (marque : Atelier Katja).

---

## Structure du projet

```
atelierkatja.com/
├── index.html                          # Page d'accueil (optionnel, peut rediriger)
├── assets/
│   ├── css/
│   │   └── style.css                   # CSS global partagé (design system)
│   ├── fonts/                          # Polices locales si besoin
│   └── images/
│       ├── marble-cake/                # Images du marble cake
│       ├── carrot-cake/                # Images du carrot cake
│       ├── cookies/                    # Images des cookies
│       └── shared/                     # Images partagées (photo Katja, devices, etc.)
├── the-art-of-marble-cake/
│   └── index.html
├── the-art-of-carrot-cake/
│   └── index.html
├── the-art-of-cookies/
│   └── index.html
└── CLAUDE.md                           # Ce fichier
```

---

## Étape 1 : Télécharger toutes les ressources des sites originaux

Avant de coder quoi que ce soit, il faut récupérer **toutes les images et assets** des 3 pages Hotmart pour les avoir en local.

### Pages sources à scraper

1. **Marble Cake** : `https://atelierkatja.hotmart.host/the-art-of-marble-cake`
2. **Carrot Cake** : `https://atelierkatja.hotmart.host/the-art-of-carrot-cake`
3. **Cookies** : `https://atelierkatja.hotmart.host/the-art-of-cookies`

### Instructions de téléchargement

Pour chaque page :

1. **Fetch la page HTML complète** avec `curl` ou `wget`
2. **Extraire toutes les URLs d'images** (elles sont sur `static-media.hotmart.com`)
3. **Télécharger chaque image** dans le dossier `assets/images/` correspondant
4. **Renommer les fichiers** avec des noms descriptifs (ex: `hero-cookie.png`, `katja-portrait.jpg`, `testimonial-lia.jpg`)
5. **Sauvegarder le HTML brut** de chaque page dans un dossier `_reference/` pour consultation

#### Images connues à télécharger

**Marble Cake :**
- `https://static-media.hotmart.com/E16llVUsAGn98dkw250JmI6IvdE=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/8800264/47027344_unknown.jpg` → `assets/images/marble-cake/hero-ebook.jpg`
- `https://static-media.hotmart.com/0jf3t3iTXjk2efE1lb_cfV-vcuE=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/8800331/e57c61ed-27ea-4936-a3d0-1db7c459f80f.jpg` → `assets/images/shared/katja-portrait.jpg`
- `https://static-media.hotmart.com/MoMlEZfh5oAhSi-rDVNERexNE1E=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/6802015/devices.png` → `assets/images/shared/devices.png`

**Carrot Cake :**
- `https://static-media.hotmart.com/6NKqVmdsBgpLf_WpH4jm5PiSfUw=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9310121/48545872_unknown.jpg` → `assets/images/carrot-cake/hero-carrot.jpg`
- `https://static-media.hotmart.com/mRqw9fcN21Yip2IsmtWZ5pJMaJs=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9310120/48546320_unknown.jpg` → `assets/images/carrot-cake/carrot-cake-detail.jpg`
- `https://static-media.hotmart.com/E-574JAc4ATNbPZXfM_oUpW5_FU=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9310117/48548768_unknown.jpg` → `assets/images/carrot-cake/baking-process.jpg`
- `https://static-media.hotmart.com/dnVGYyP7PxUVdVtdCFCrP01E3kI=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9310563/img_5233.jpg` → `assets/images/carrot-cake/katja-carrot.jpg`
- `https://static-media.hotmart.com/QxMZNXjf-R2yFvKRr2ZaysuRjIM=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/5584240/depoimentos1.png` → `assets/images/carrot-cake/testimonial-1.png`
- `https://static-media.hotmart.com/UwZ3KSxmy484obuEEDBI-xHFsaw=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/5584258/depoimentos2.png` → `assets/images/carrot-cake/testimonial-2.png`

**Cookies :**
- `https://static-media.hotmart.com/HTSRzcMbU0I68-DKTKRb3F673tA=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9101209/the_art_of_cookies-2.png` → `assets/images/cookies/hero-cookie.png`
- `https://static-media.hotmart.com/urSCzPfhw-x2-aOVrBhYpL6-aFM=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9087540/img_1509.jpg` → `assets/images/cookies/cookies-photo-1.jpg`
- `https://static-media.hotmart.com/jww8QZOX1yMuk8BdctMMmFkVDHY=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9087539/img_1511.jpg` → `assets/images/cookies/cookies-photo-2.jpg`
- `https://static-media.hotmart.com/qqYxDq-UuXLHjn3y8o-Fa-EBilQ=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9083513/47864160_unknown.jpg` → `assets/images/cookies/cookies-gallery-1.jpg`
- `https://static-media.hotmart.com/a9UamQYDdkUJE3ofrxMjU7FWc8g=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9083512/47858768_unknown.jpg` → `assets/images/cookies/cookies-gallery-2.jpg`
- `https://static-media.hotmart.com/c9Dt5fE8M5JoLiwKvrl9Y_cVY1g=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9083655/47976848_unknown.jpg` → `assets/images/cookies/cookies-gallery-3.jpg`
- `https://static-media.hotmart.com/lkPJkZiOFwBXeJO8NH-xCn9CrK0=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9101187/img_1515_-_modifie.jpg` → `assets/images/cookies/cookies-feedback.jpg`
- `https://static-media.hotmart.com/-NKX18_9Nhay8wwTZ27BTBeSO68=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9088094/451d5159-a516-4de2-8d0f-de8768c5c30e.jpg` → `assets/images/cookies/testimonial-lia.jpg`
- `https://static-media.hotmart.com/eRkzIdqOI1xjv8cthVhiQjJqscM=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9101188/whatsapp_image_2025-03-04_at_09.52.43_-_modifie.jpg` → `assets/images/cookies/testimonial-lia-result.jpg`
- `https://static-media.hotmart.com/1eufLZmx1oX7h6dZPbfnqrYYcJU=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9101199/whatsapp_image_2025-03-04_at_10.02.59.jpeg` → `assets/images/cookies/testimonial-christian.jpg`
- `https://static-media.hotmart.com/98901R1MRZ5mEA8t4WkVltxO918=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9101208/54e60bf0-0f25-48c2-be93-3d55044525fa.jpg` → `assets/images/cookies/testimonial-christian-result.jpg`
- `https://static-media.hotmart.com/oUvSkQx3nPYfPVsXQsTVwfYqeMk=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/5310960/foto-04.jpg` → `assets/images/cookies/testimonial-melina.jpg`

### Script de téléchargement

```bash
#!/bin/bash
# Exécuter depuis la racine du projet atelierkatja.com/

mkdir -p assets/images/{marble-cake,carrot-cake,cookies,shared}
mkdir -p _reference

# Sauvegarder les pages HTML originales
curl -o _reference/marble-cake-original.html "https://atelierkatja.hotmart.host/the-art-of-marble-cake"
curl -o _reference/carrot-cake-original.html "https://atelierkatja.hotmart.host/the-art-of-carrot-cake"
curl -o _reference/cookies-original.html "https://atelierkatja.hotmart.host/the-art-of-cookies"

# Télécharger les images (exemples — compléter avec toutes les URLs ci-dessus)
# Note: les images Hotmart sont en webp, on les garde telles quelles
curl -L -o assets/images/marble-cake/hero-ebook.jpg "https://static-media.hotmart.com/E16llVUsAGn98dkw250JmI6IvdE=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/8800264/47027344_unknown.jpg"
curl -L -o assets/images/shared/katja-portrait.jpg "https://static-media.hotmart.com/0jf3t3iTXjk2efE1lb_cfV-vcuE=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/8800331/e57c61ed-27ea-4936-a3d0-1db7c459f80f.jpg"
# ... continuer avec toutes les URLs listées ci-dessus
```

---

## Étape 2 : Design System

### Identité visuelle

- **Marque** : Atelier Katja
- **Univers** : Pâtisserie artisanale, raffinée, chaleureuse
- **Ton** : Élégant mais accessible, professionnel mais personnel

### Polices

- **Display** : `Playfair Display` (titres, prix, noms) — serif élégant
- **Body** : `DM Sans` (texte, boutons, labels) — sans-serif moderne et lisible

### Palette de couleurs

```css
:root {
    --cream: #FDF6EC;          /* Background principal */
    --warm-brown: #3E2723;     /* Texte principal, boutons foncés */
    --chocolate: #5D4037;      /* Hover, accent secondaire */
    --gold: #C8956C;           /* Accent principal, labels */
    --gold-light: #E8C9A0;     /* Accent léger, dividers */
    --text: #2C1810;           /* Texte body foncé */
    --text-light: #6D4C41;     /* Texte body léger */
    --white: #FFFFFF;          /* Cards, backgrounds */
    --border: rgba(62,39,35,0.1); /* Bordures subtiles */
}
```

### Composants partagés

Chaque page utilise les mêmes composants avec des variations :
- **Topbar** sticky avec "ATELIER KATJA" en lettres espacées
- **Boutons CTA** arrondis (border-radius: 60px) avec effet shimmer
- **Dividers** élégants (ligne — point — ligne)
- **Section "About Me"** avec photo de Katja + bio
- **Price Card** centrée avec badge de garantie
- **Trust badges** (garantie, sécurité, multi-device)
- **FAQ** en accordéon
- **Animations** : fade-up au scroll (IntersectionObserver)

---

## Étape 3 : Contenu des 3 pages

### Page 1 : The Art of Marble Cake (`/the-art-of-marble-cake/`)

**Lien de paiement** : `https://pay.hotmart.com/H96957151F?off=vf1qtg4h&hotfeature=51`
**Prix** : $12
**Garantie** : 7 jours

**Structure :**
1. Hero centré — titre + sous-titre + CTA + image ebook
2. Section "About the eBook" — description du contenu (recette détaillée, sirop, glaçage Rocher)
3. Section "Simple cakes, made perfect" — la passion de Katja
4. Section "About Me" — photo Katja + bio (Autriche → Sud de France, 8 ans, diplôme pâtisserie, business macarons/gâteaux)
5. Price card — $12 + CTA
6. Trust badges
7. FAQ (4 questions : public cible, garantie, accès produit, comment acheter)
8. Footer

### Page 2 : The Art of Carrot Cake (`/the-art-of-carrot-cake/`)

**Lien de paiement** : `https://pay.hotmart.com/A99233381H?off=s9n6ppy5&hotfeature=51`
**Prix** : $12
**Garantie** : 15 jours

**Structure :**
1. Hero en grille (texte à gauche, image à droite)
2. Section "Problème" — 3 cards (texture sèche, glaçage trop lourd, déco frustrante)
3. Section "Solution" — la formule infaillible
4. Section "What's inside" — 6 features numérotées (recette, photos step-by-step, science du baking, cream cheese frosting, déco marzipan, tips conservation)
5. Section "About Me" — photo Katja (version carrot cake) + bio
6. Témoignages (2 reviews)
7. Price card — $12 + CTA
8. Trust badges
9. FAQ (4 questions : débutants, équipement, réception ebook, congélation)
10. Footer

### Page 3 : The Art of Cookies (`/the-art-of-cookies/`)

**Lien de paiement** : `https://pay.hotmart.com/W98054458O?off=bhghmq1p&hotfeature=51`
**Prix** : $12
**Garantie** : 7 jours

**Structure :**
1. Hero sur fond sombre (warm-brown) — texte à gauche, image cookie à droite, prix + CTA dorés
2. Section "More than a recipe book" — description (recette de base + 8 variations + science du baking)
3. Grille de 3 photos de cookies
4. Section "About Me" — photo Katja + bio (5-star hotel, découverte des cookies, parcours)
5. Témoignages avec photos des clients (Lia, Christian, Melina)
6. Price card — $12 + CTA
7. Trust badges
8. FAQ (5 questions : public, garantie, accès, business, support)
9. Footer

---

## Étape 4 : Déploiement

### Option recommandée : Netlify (gratuit)

1. Créer un compte sur netlify.com
2. `netlify deploy --prod --dir=.` depuis la racine du projet
3. Connecter le domaine `atelierkatja.com` dans les DNS settings
4. SSL automatique inclus

### Alternative : Cloudflare Pages (gratuit)

1. Push le projet sur GitHub
2. Connecter le repo à Cloudflare Pages
3. Build command: aucun (site statique)
4. Publish directory: `/`
5. Ajouter le domaine custom

---

## Notes importantes

- **Les liens de paiement Hotmart ne changent PAS** — ils fonctionnent indépendamment de l'hébergement
- **Les images doivent être servies en local** (ne pas dépendre des CDN Hotmart qui pourraient couper l'accès)
- **Responsive obligatoire** — mobile first, les acheteurs viennent surtout des réseaux sociaux
- **Performance** — optimiser les images (WebP, lazy loading) pour un chargement rapide
- **SEO basique** — meta title, description, OG tags pour chaque page
- **Pas de framework JS** — HTML/CSS/JS vanilla pour rester simple et rapide

# atelierkatja.com

Site vitrine + vente d'ebooks de patisserie pour **Atelier Katja** (Katja Althoff).

## Stack technique

- **HTML / CSS / JS vanilla** — pas de framework, pas de build
- **Google Fonts** — Playfair Display + DM Sans
- **Hotmart** — checkout widget externe (paiement + livraison des ebooks)
- **Resend** — envoi d'emails depuis le formulaire de contact

## Hebergement

| Service          | Role                              |
|------------------|-----------------------------------|
| **GitHub**       | Code source (repo + versioning)   |
| **Cloudflare Pages** | Hebergement + CDN + SSL      |
| **Hotmart**      | Paiement + distribution des ebooks|
| **Resend**       | API d'envoi d'emails              |

### GitHub

- Repo : `github.com/otonibar123/atelierkatja`
- Branche de production : `main`
- Chaque push sur `main` declenche un deploiement automatique sur Cloudflare Pages

### Cloudflare Pages

- Le site est connecte au repo GitHub — deploiement automatique a chaque push sur `main`
- Domaine : `atelierkatja.com`
- SSL : automatique (Cloudflare)
- Pas de commande de build — Cloudflare sert les fichiers statiques directement
- Variable d'environnement configuree dans Cloudflare Dashboard : `RESEND_API_KEY`

## Structure du projet

```
atelierkatja/
├── index.html                     # Page d'accueil
├── the-art-of-marble-cake/
│   └── index.html                 # Page produit — Marble Cake ($12)
├── the-art-of-carrot-cake/
│   └── index.html                 # Page produit — Carrot Cake ($12)
├── the-art-of-cookies/
│   └── index.html                 # Page produit — Cookies ($12)
├── assets/
│   ├── css/style.css              # CSS global (design system)
│   └── images/                    # Images organisees par produit
├── functions/
│   └── api/contact.js             # Cloudflare Pages Function (formulaire contact → Resend)
├── llms.txt                       # Fichier pour les LLMs
├── robots.txt
├── sitemap.xml
├── CLAUDE.md                      # Instructions detaillees pour Claude Code
└── README.md                      # Ce fichier
```

## Liens de paiement Hotmart

Ces liens sont independants de l'hebergement — ils ne changent jamais :

| Produit         | Lien Hotmart                                                              |
|-----------------|---------------------------------------------------------------------------|
| Marble Cake     | `https://pay.hotmart.com/H96957151F?off=vf1qtg4h&hotfeature=51`          |
| Carrot Cake     | `https://pay.hotmart.com/A99233381H?off=s9n6ppy5&hotfeature=51`          |
| Cookies         | `https://pay.hotmart.com/W98054458O?off=bhghmq1p&hotfeature=51`          |

## Deployer

```bash
git add .
git commit -m "description du changement"
git push origin main
# → Cloudflare Pages deploie automatiquement en ~30 secondes
```

## Formulaire de contact

Le formulaire utilise une **Cloudflare Pages Function** (`functions/api/contact.js`) qui envoie les emails via l'API **Resend**.

- Endpoint : `POST /api/contact`
- La cle API Resend est stockee en variable d'environnement sur Cloudflare (`RESEND_API_KEY`)
- Les emails arrivent sur `contact@atelierkatja.com`

## SEO

- Donnees structurees (Schema.org) sur chaque page produit : `Product`, `Offer`, `BreadcrumbList`, `FAQPage`
- Meta tags Open Graph + Twitter Card
- `sitemap.xml` et `robots.txt` a la racine
- Le champ `priceValidUntil` dans les donnees structurees est a mettre a jour chaque annee (actuellement : 2026-12-31)

# DELIVERY-PACK — emilsalzer.dk

> Teknisk overdragelsesdokument for emilsalzer.dk.
> Genereret: 13. marts 2026
> Ansvarlig: Steven Wensley, BygMedAI

---

## 1. Repository

| Felt | Værdi |
|------|-------|
| **URL** | `https://github.com/stevenwensley-a11y/emilsalzer.dk` |
| **Branch-strategi** | `main` = produktion. Push til main trigger deploy. |
| **CI status** | Quality Gate (build + HTML-validering + Lighthouse + Smoke tests) → Deploy via GitHub Actions |
| **Teknologi** | Eleventy (11ty) v3.1.2, Nunjucks templates |
| **Node version** | 20 LTS |
| **Build kommando** | `npm run build` |
| **Output mappe** | `_site/` |

### Repo-struktur

```
├── src/
│   ├── _includes/
│   │   ├── base.njk         # Base layout (nav + footer)
│   │   ├── partials/
│   │   │   ├── head.njk     # <head> meta, fonts, CSS loading
│   │   │   ├── nav.njk      # Navigation (text logo "Salzer", 5 links)
│   │   │   └── footer.njk   # Footer (tagline, links, social)
│   │   └── components/
│   │       └── cta.njk      # CTA button macros
│   ├── _data/
│   │   └── site.json        # Global site config (SINGLE SOURCE OF TRUTH)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css         # Layer 1: CSS reset + design tokens
│   │   │   └── emilsalzer.css   # Layer 4: Site-specifik skin (Times New Roman)
│   │   └── [ingen billeder - minimalistisk design]
│   ├── index.njk               # Forside
│   ├── foredrag.njk            # Foredrag
│   ├── boeger.njk              # Bøger (placeholder - venter Emil's CVR)
│   ├── poesi.njk               # Poesi
│   ├── filosofi.njk            # Filosofi
│   ├── kontakt.njk             # Kontakt
│   ├── robots.txt
│   └── sitemap.xml
├── eleventy.config.js          # 11ty konfiguration
├── package.json                # Dependencies
├── CNAME                       # Custom domain
└── .github/workflows/
    ├── test.yml                # Quality Gate
    └── deploy.yml              # Build + Deploy til GitHub Pages
```

---

## 2. Deploy

| Felt | Værdi |
|------|-------|
| **Platform** | GitHub Pages via GitHub Actions |
| **Deploy trigger** | Push til `main` branch |
| **Build step** | `npm ci && npx @11ty/eleventy` |
| **Validering** | YAML-lækage check + style tag balance |
| **Output** | `_site/` → GitHub Pages artifact |
| **Custom domain** | emilsalzer.dk (CNAME) |
| **SSL** | Automatisk via GitHub Pages (Let's Encrypt) |

### Deploy-flow

```
Push til main
  → test.yml: Quality Gate
    → Build 11ty
    → HTML-validering
    → Broken links check
    → Lighthouse audit
    → Smoke tests
  → deploy.yml: Build & Deploy
    → Build 11ty
    → Artifact validering
    → Upload pages artifact
    → Deploy til GitHub Pages
  → LIVE på emilsalzer.dk
```

---

## 3. DNS

| Felt | Værdi |
|------|-------|
| **Registrar + DNS** | Simply.com (Stevens konto S623000) |
| **Nameservers** | Simply.com standard |

### DNS Records

| Type | Navn | Værdi |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | stevenwensley-a11y.github.io |

> **NB:** Domænet blev overført fra registrar S624093 til S623000 i marts 2026.

---

## 4. Credentials & Adgange

> **SIKKERHED:** Ingen passwords eller tokens i dette dokument.

| Adgang | Placering | Ansvarlig |
|--------|-----------|-----------|
| GitHub repo | stevenwensley-a11y konto | Steven (overdrages til Emil) |
| Simply.com (DNS + domæne) | Stevens konto S623000 | Steven (deling af kontoadgang anført) |
| Formspree kontaktform | xpqjldbp endpoint | Steven |

### Adgangsoverdragelse

- [ ] Emil inviteret som collaborator på GitHub repo
- [ ] Formspree endpoint `xpqjldbp` delt med Emil (email-modtagelse konfigureret)
- [ ] Simply.com domæneadgang klarificeret (Steven beholder som registrar for revidering)
- [ ] Dokumentation overdraget (denne pakke)

---

## 5. Kendte Begrænsninger

### Funktionalitet

- **Bøger-side er placeholder:** Afventer Emils CVR-nummer og betalingsløsning. Siden vises, men indhold er ikke tilgængeligt for salg.
- **Kontaktformular:** Sender via Formspree til xpqjldbp endpoint. Emil skal konfigurere email-modtagelse hos Formspree.

### Browser-kompatibilitet

- Times New Roman er systemfont — ingen ekstern loading nødvendig
- Minimalistisk design uden animationer — bred browserkompatibilitet

### Performance

- Lighthouse mål: Performance ≥ 90, Accessibility ≥ 90
- Ingen billeder → hurtig indlæsning

### Kendte issues

| Issue | Beskrivelse | Workaround |
|-------|-------------|------------|
| GA4 ikke sat op | Analytics er ikke implementeret | Emil kan selv opsætte GA4 ved at generere tracking-ID og tilføje til site.json |
| Bøger-side placeholder | Ingen kommerciel funktionalitet endnu | Afventer Emil's CVR + betalingsintegration (ikke inkluderet i pakke) |

---

## 6. Dependencies & Tredjepartstjenester

| Tjeneste | Bruges til | Konto-ejer | Status |
|----------|-----------|------------|--------|
| GitHub Pages | Hosting + deploy | Steven → Emil | Aktiv |
| Formspree | Kontaktformular | Steven (endpoint xpqjldbp) | Aktiv |
| Google Analytics 4 | (Ikke sat op) | — | Valgfrit |

### NPM Dependencies

| Package | Version | Formål |
|---------|---------|--------|
| @11ty/eleventy | ^3.1.2 | Static site generator |
| @playwright/test | ^1.58.2 | E2E testing (CI) |
| http-server | ^14.1.1 | Lokal testserver (CI) |

---

## 7. Kontaktinformation

| Felt | Værdi |
|------|-------|
| **Emil** | thesalzer@gmail.com |
| **Steven (BygMedAI)** | steven@bygmedai.dk, +45 5388 6061 |

---

## Underskrift

| | Dato | Underskrift |
|--|------|------------|
| **Leverandør (BygMedAI)** | | |
| **Kunde (Emil Salzer)** | | |

---

*Genereret af BygMedAI. Fase 3 pilot — emilsalzer.dk. Referencekunde (Medium-pakke, gratis).*

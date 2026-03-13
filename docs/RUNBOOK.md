# RUNBOOK — emilsalzer.dk

> Driftsvejledning for emilsalzer.dk.
> Genereret: 13. marts 2026
> Ansvarlig: Steven Wensley, BygMedAI

---

## 1. Deploy

### Normal deploy (indholdsændring)

```bash
# 1. Klon repo (første gang)
git clone https://github.com/stevenwensley-a11y/emilsalzer.dk.git
cd emilsalzer.dk

# 2. Installer dependencies
npm install

# 3. Foretag ændringer i src/ mappen

# 4. Test lokalt
npm run serve
# Åbn http://localhost:8080 i browser

# 5. Commit og push
git add .
git commit -m "Opdateret [beskriv ændring]"
git push origin main

# 6. Vent på deploy (1-3 minutter)
#    Tjek: GitHub → Actions → grønt flueben = LIVE
```

### Tidsramme

| Handling | Tid |
|----------|-----|
| Push til main | 0 min |
| CI Quality Gate | ~1-2 min |
| Deploy til GitHub Pages | ~1 min |

---

## 2. Opdatering af Indhold

### Sidens filer

| Side | Fil |
|------|-----|
| Forside | `src/index.njk` |
| Foredrag | `src/foredrag.njk` |
| Bøger | `src/boeger.njk` |
| Poesi | `src/poesi.njk` |
| Filosofi | `src/filosofi.njk` |
| Kontakt | `src/kontakt.njk` |

### Tekst

Åbn den relevante `.njk` fil i en teksteditor. Find teksten og erstat.

**Vigtigt:**
- Rør IKKE ved `{% %}` eller `{{ }}` template-kode
- Rør IKKE ved `---` frontmatter i toppen af filer
- Hold HTML-tags intakte (`<h1>`, `<p>`, `<a>` osv.)

### Navigation

Navigation er defineret i `src/_data/site.json` under `nav.links`. Tilføj eller fjern items her.

**Eksempel:**
```json
"nav": {
  "links": [
    { "label": "Foredrag", "url": "/foredrag/" },
    { "label": "Bøger", "url": "/boeger/" },
    { "label": "Poesi", "url": "/poesi/" },
    { "label": "Filosofi", "url": "/filosofi/" },
    { "label": "Kontakt", "url": "/kontakt/" }
  ]
}
```

### Footer

Footer er i `src/_includes/partials/footer.njk`. Links styres af `site.json` under `footer.links`.

### Global konfiguration

`src/_data/site.json` styrer: sitenavn, email, telefon, fonts, navigation, footer og skin. Ændr her for globale opdateringer.

**Vigtige felter:**
- `email` → vises på kontaktside
- `nav.links` → navigationsmenuen
- `footer.links` → footer-links
- `fonts` → Times New Roman (systemfont, ingen ændring anbefalet)

---

## 3. Kontaktformular

### Opsætning i Formspree

Kontaktformularen sender til Formspree endpoint `xpqjldbp`.

**For at modtage emails:**
1. Gå til https://formspree.io/forms/xpqjldbp/
2. Log ind (eller opret konto med emilsalzer@gmail.com)
3. Konfigurer "Notifications" til at sende til ønsket email-adresse
4. Test ved at udfylde formularen på `/kontakt/`

---

## 4. Rollback

### Hurtig rollback

```bash
git log --oneline -5       # Find den gode commit
git revert HEAD             # Fortryd seneste
git push origin main        # Deploy automatisk
```

### Hvis deploy fejler

1. GitHub → repo → Actions tab
2. Klik på fejlet run (rødt kryds)
3. Læs fejlbeskeden
4. Typiske fejl:
   - **Build fejl:** Syntaks i .njk fil → ret og push igen
   - **Style tag mismatch:** Ulukket `<style>` tag → tilføj `</style>`
   - **YAML-lækage:** `---` eller `jsonLd: |` i indhold → flyt til frontmatter

---

## 5. Fejlfinding

### Siden viser ikke mine ændringer

| Tjek | Løsning |
|------|---------|
| Browser cache | Ctrl+Shift+R (hard refresh) |
| Deploy status | GitHub → Actions → skal være grøn |
| Korrekt fil | Redigér i `src/`, ALDRIG i `_site/` |
| Push gennemført | `git status` → "nothing to commit" |

### Sitet er nede

| Tjek | Løsning |
|------|---------|
| GitHub Status | [githubstatus.com](https://githubstatus.com) |
| Simply.com betaling | Bekræft at domæne-faktura er betalt |
| DNS | `dig emilsalzer.dk` → skal pege på 185.199.x.x |
| CNAME | Tjek at `CNAME` fil indeholder `emilsalzer.dk` |

### Build fejler lokalt

```bash
rm -rf node_modules _site
npm install
npm run build
```

### Kontaktformular virker ikke

| Tjek | Løsning |
|------|---------|
| Formspree konto | Log ind på https://formspree.io/forms/xpqjldbp/ |
| Email-modtagelse konfigureret | Sæt op under "Notifications" |
| Endpoint-ID korrekt | Skal være `xpqjldbp` (ikke anden ID) |
| Test udfyldelse | Udfyld `/kontakt/` side og send besked til dig selv |

---

## 6. Kontakt & Eskalering

| Kanal | Kontakt | Svartid |
|-------|---------|---------|
| Email | steven@bygmedai.dk | 1-2 hverdage |
| Telefon | +45 5388 6061 | Hverdage 9-17 |

**Stabiliseringsperiode:** 10 dage fra leveringsdato (gratis support for fejl i leveret produkt).

**Efter stabilisering:** Se SUPPORT.md for hvad der er inkluderet.

---

## 7. Bøger-siden (Placeholder)

Bøger-siden er funktionel som informationsside, men **uden kommerciel funktionalitet**.

**For at aktivere booksalg:**
1. Emil skal fremskaffe CVR-nummer
2. Vælg betalingsprocessor (Stripe, MobilePay, betalings-gateway)
3. Kontakt Steven for udvikling af betalingsintegration (separat projekt, ikke inkluderet i Medium-pakke)

Indtil da er siden tom med placeholder-tekst.

---

## 8. Analytics (Valgfrit)

Google Analytics er **ikke sat op**. Emil kan selv opsætte ved at:

1. Gå til [Google Analytics](https://analytics.google.com)
2. Opret property for emilsalzer.dk
3. Få `Measurement ID` (G-xxxxxxxx format)
4. Tilføj til `src/_data/site.json`:
   ```json
   "analytics": {
     "id": "G-XXXXXXXX"
   }
   ```
5. Push til main → automatisk deploy

---

*Genereret af BygMedAI. Fase 3 pilot — emilsalzer.dk.*

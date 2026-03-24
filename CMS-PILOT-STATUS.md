# CMS Pilot Status — Emil Salzer (2026-03-24)

## Verificeret tilstand

| Komponent | Status | Bevis |
|-----------|--------|-------|
| OAuth Worker | ✅ LIVE | `curl https://oauth.bygmedai.dk/health` → `{"status":"ok","service":"bygmedai-decap-oauth"}` |
| admin/ loader | ✅ HTTP 200 | `curl -o /dev/null -w "%{http_code}" https://emilsalzer.dk/admin/` → `200` |
| config.yml (live) | ⚠️ MANGLER media_folder | Live: ingen `media_folder`/`public_folder` — fix committed, IKKE pushet (se push-blocker) |
| config.yml (fix) | ✅ Klar til deploy | Commit `b7d0aaf`: tilføjer `media_folder: "src/assets/images"` + `public_folder: "/assets/images"`, fjerner redundant `auth_endpoint` |
| Data-lag | ✅ Alle 6 JSON-filer | `forside.json`, `kontakt.json`, `boeger.json`, `filosofi.json`, `poesi.json`, `foredrag.json` — alle returnerer HTTP 200 fra GitHub raw |
| Template refactoring | ✅ Allerede refaktoreret | Alle .njk-filer bruger `pages.<side>.*` data-referencer (grep: 6–13 refs per fil) |
| Passthrough | ✅ Konfigureret | `eleventy.config.js` linje 3: `addPassthroughCopy({ "src/admin": "admin" })` |
| Build | ✅ 0 fejl | `npx @11ty/eleventy` → 12 filer skrevet, 0 warnings |
| Visuelt identisk | ✅ Nul diff | `diff <(curl -s https://emilsalzer.dk/) <(cat _site/index.html)` → ingen output |

## Push-blocker (Stevens handling påkrævet)

Commit `b7d0aaf` (`fix(cms): tilføj media_folder og public_folder til config.yml`) sidder på lokal branch `claude/coverage-residual-risk-analysis-guqvi`.

**Blocker:** Session-PAT er scoped til Bygmedai org — kan ikke skrive til `stevenwensley-a11y/emilsalzer.dk`.

**Løsning (vælg én):**
1. **Anbefalet:** Overfør `stevenwensley-a11y/emilsalzer.dk` til Bygmedai org (som gjort med nordisign.dk — beslutning D023). Herefter kan Claude pushe i næste session.
2. **Alternativt:** Steven cherry-picker commit `b7d0aaf` manuelt fra lokal branch og pusher til main.

**Hvad commit `b7d0aaf` ændrer:**
```diff
-  auth_endpoint: /auth        # redundant (Decap default)
+                               # fjernet

+media_folder: "src/assets/images"
+public_folder: "/assets/images"
```

## Hvad der mangler for at kunden kan bruge det

1. **[BLOCKER] Push commit `b7d0aaf`** til main på `stevenwensley-a11y/emilsalzer.dk` — se push-blocker ovenfor
2. **Emil inviteres som GitHub collaborator** på `stevenwensley-a11y/emilsalzer.dk` (Stevens opgave) — kræves for at Emil kan logge ind i Decap CMS
3. Efter push: verificér `emilsalzer.dk/admin/` viser login-knap uden config-fejl

## Hvad næste site (DDD) kræver

1. Opret `src/_data/pages/*.json` filer med DDD-indhold (samme struktur som forside.json)
2. Refaktorér DDD .njk-templates til at bruge `pages.<side>.*` data-referencer
3. Opret `src/admin/config.yml` med:
   - `backend.repo: <DDD-repo-sti>`
   - `backend.base_url: https://oauth.bygmedai.dk`
   - `publish_mode: simple`
   - `media_folder` + `public_folder` (lær af Emil-piloten)
   - `collections` med felter svarende til JSON-strukturen
4. Verificér DDD-repo er under Bygmedai org (proxy-adgang)
5. `~55 min` estimat per site (fra CI-PILOT-REPORT.md erfaringer)

## Teknisk reference

- **Commit klar til push:** `b7d0aaf` på branch `claude/coverage-residual-risk-analysis-guqvi`
- **images sti:** `src/assets/images/` → bygget til `/assets/images/` (passthrough via eleventy.config.js)
- **OAuth Worker:** `https://oauth.bygmedai.dk` (`/auth` endpoint, ingen `auth_endpoint` nøgle nødvendig i config.yml)
- **Decap CMS version:** `^3.0.0` (via unpkg CDN i `src/admin/index.html`)

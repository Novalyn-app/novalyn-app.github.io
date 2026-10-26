# Novalyn — website

The public marketing site for **Novalyn**, a Chrome extension that bulk-relists
your own Vinted listings.

**Live: https://novalyn-app.github.io/**

Plain static HTML and CSS — **no build step**, no CI, and no Pages settings to
touch. This repo is named `<org>.github.io`, so GitHub publishes its default
branch root automatically. Push to `main` and the site updates in about a
minute.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing: hero, the safe order, comparison, screenshots, features, pricing, FAQ |
| `demo/index.html` | Clickable demo — the real popup with sample data |
| `relist-vinted.html` | Guide (EN): how relisting works on Vinted |
| `vinted-advertenties-vernieuwen.html` | Guide (NL) |
| `renouveler-annonce-vinted.html` | Guide (FR) |
| `vinted-anzeige-erneuern.html` | Guide (DE) |
| `privacy.html` / `terms.html` / `refund.html` | Policies |
| `404.html` | Not-found page |
| `styles.css` | The whole design system |
| `assets/icon-128.png` | Logo / favicon |

The four guides cross-link, carry `hreflang` alternates and are listed in
`sitemap.xml`. The demo is `noindex` on purpose: it is a product toy, not a page
worth ranking.

## The only link that matters

Every "Add to Chrome" on the site points at the Chrome Web Store listing, and
the listing points back here as its support site. If the item id ever changes,
replace it everywhere — it appears in every page header, the closing band, and
the footer.

## Generated files — do not hand-edit

```
assets/shots/*.png      screenshots of the real popup (light + dark)
demo/harness/*          the shipped popup/options plus the chrome stub
```

Both are produced by the extension repo:

```
node scripts/site-demo.mjs                 # writes into ../Novalyn-Site
node scripts/site-demo.mjs --site <path>
node scripts/site-demo.mjs --no-shots      # harness only, no Chrome needed
```

That script serves the built `dist/` from the extension, captures the popup with
headless Chrome and copies the real bundle into `demo/harness/`. It uses the same
sample data as the store screenshots, so the site and the store can never show
different products. `demo/index.html` is the hand-written wrapper around it.

## Editing

Edit the HTML/CSS and push to `main`. The support address is
`support.novalyn@gmail.com`. Prices and Stripe Payment Links must stay in sync
with `CHECKOUT_LINKS` in `src/core/licenseApi.ts` of the extension repo.

---

Novalyn is an independent tool and is not affiliated with, endorsed by, or
sponsored by Vinted.

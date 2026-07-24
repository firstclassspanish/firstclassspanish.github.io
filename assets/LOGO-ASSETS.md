# First Class Spanish — Logo Assets

Canonical logo files. These **replace** the previous inline ticket SVG everywhere it appears.

## Instruction for future sessions

The old logo markup (rounded rect, dashed line, flat star badge) is retired. Delete it
from `PROJECT-BRIEFING.md` and from any page it was pasted into. Do not regenerate or
re-draw these marks from description — use the files below verbatim.

---

## The three files

| File | Role | Where it goes |
|---|---|---|
| `fcs-lockup.svg` | **Primary.** Medallion + wordmark, horizontal | Site header, every page |
| `fcs-medallion.svg` | Square seal, no text | Favicon, YouTube avatar, app icon, social profile |
| `first-class-spanish-ticket.svg` | Full detailed ticket | Homepage hero, OG/share card, print, worksheet headers |

Rule of thumb: **the full ticket only appears once per page, and only above 400px wide.**
Below that the guilloche, grain, and microtype turn to mush — use the lockup.

---

## How to embed

### Header lockup — inline it

`fcs-lockup.svg` is ~4KB, so inlining costs nothing and it inherits the page's font
loading. Paste the `<svg>` element directly into the header markup:

```html
<a href="/" class="site-logo" aria-label="First Class Spanish home">
  <!-- paste contents of fcs-lockup.svg here -->
</a>
```

```css
.site-logo svg { height: 52px; width: auto; display: block; }
@media (max-width: 640px) {
  .site-logo svg { height: 40px; }
  .site-logo #tagline { display: none; }   /* tagline is illegible below ~46px */
}
```

The lockup has `id="tagline"` on the strapline specifically so it can be hidden that way.

### Hero ticket — inline it too

Same reason: it carries an `@import` for Google Fonts, and browsers **block external
resources in SVGs loaded via `<img>`**. Referenced that way it silently falls back to
Georgia. Inline it in the homepage only.

```css
.hero-ticket svg { width: min(760px, 92vw); height: auto; }
```

### Medallion — reference it freely

`fcs-medallion.svg` contains no text and no font dependency, so it is safe anywhere:

```html
<img src="/assets/fcs-medallion.svg" alt="First Class Spanish" width="48" height="48">
```

### Favicon

Generate the PNG/ICO set from `fcs-medallion.svg` (any favicon generator, or export from
a browser). Minimum set: `favicon.ico` (32px), `apple-touch-icon.png` (180px),
`icon-512.png`. The medallion was drawn with heavy strokes so it still reads at 16px.

---

## If a text-bearing mark is ever needed as `<img>`

Convert the type to outlines first — Illustrator *Type → Create Outlines*, Figma
*Outline Stroke*, or Inkscape *Path → Object to Path* — then save as Plain SVG. That
removes the font dependency. Only needed for email signatures, embeds, or anywhere
inlining isn't possible.

---

## Brand tokens (as used in these files)

```
ink        #0F3B27   wordmark, primary text
jade deep  #1C5F3F   medallion disc, secondary type
jade       #2E8B5E   brand green, backgrounds
gold       #B8912F   rules, serials
gold light #E3C46B   foil highlight
cream      #F6F0DF   paper, star
cream deep #E9DFC4   paper shadow
```

Type: **Playfair Display 800** (wordmark) / **Barlow Condensed 600** (utility, all-caps,
letterspaced). Fallbacks Georgia and Arial are built into the font stack.

---

## Copy rules

- The eyebrow reads **Admit one · Pase general** — deliberately level-agnostic, since the
  site is not limited to Spanish 1. Do not reintroduce a level number.
- Tagline: **Your ticket to Spanish fluency**
- Seal ring: **Primera clase · First class · Admit one**
- Serials (`Serie A · Nº 0001`, `FCS-2026-0001`) are decorative ticket furniture. Keep
  them fixed; do not increment or randomize.

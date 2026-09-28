# Luna Liu Design System

Design system for **Luna Liu**, a UI/UX designer's personal portfolio site. Built from a single written brand brief (a "Linear / Modern" style guide pasted into chat) — no codebase, Figma file, or existing brand assets were attached. Every visual asset here is original to this system; there is no logo (see Iconography).

**Sources used:** none beyond the pasted brief. If a codebase, Figma link, or existing portfolio content exists, attach it and this system should be revised against it.

**Note on the brief's color conflict:** the brief's prose describes a dark, near-black Linear-style UI with a single indigo accent (`#5E6AD2`), but its actual token block defines a light pastel-blue palette ("Electric Soft Tropical Reef": `#B0C4DE #87CEEB #ADD8E6 #E0F0FF #F0F8FF`) with no indigo at all — the two can't both be true. Per your instruction, this system uses **the literal light palette**, with a dark neutral ink scale added for legible text/borders on a white base (see Caveats).

## Components
- **Button** — `components/core/Button.jsx` — primary / secondary / ghost, 3 sizes
- **Input** — `components/core/Input.jsx` — labeled text field with focus ring + error state
- **Card** — `components/core/Card.jsx` — surface with mouse-tracking spotlight + hover lift, 3 variants
- **Badge** — `components/core/Badge.jsx` — mono uppercase pill, 3 variants

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css` — design tokens
- `guidelines/` — 12 foundation specimen cards (Colors, Type, Spacing, Foundations groups)
- `components/core/` — Button, Input, Card, Badge + `.d.ts` + `.prompt.md` + demo card
- `ui_kits/portfolio/` — full interactive portfolio site (Home, Work, Case Study, About, Contact)
- `thumbnail.html` — project tile
- `SKILL.md` — Claude Code / Agent Skills manifest

## Content fundamentals
- **Voice:** first person singular ("I design...", "I care about..."). The subject is Luna herself; visitors are addressed rarely and only in CTAs ("Get in touch").
- **Tone:** editorial, confident, understated — short declarative sentences, no hype adjectives ("revolutionary", "game-changing"), no exclamation points. Matches the brief's vibe words: austere, authoritative, refined, intellectual.
- **Casing:** sentence case for headlines and body copy; UPPERCASE + wide tracking for mono labels/eyebrows only ("01 / SELECTED WORK").
- **Emoji:** never. The editorial/austere vibe explicitly rules out decorative emoji.
- **Numbers as structure:** section eyebrows are numbered ("01 / Selected Work", "02 / About") — a quiet way to imply sequence/rigor without heavy chrome.
- Example lines actually used: "I design interfaces that feel considered — precise, quiet, a little architectural." / "Based between studios. Available for select engagements."

## Visual foundations
- **Color:** near-white base (`--surface` #fff, `--surface-tint` #E0F0FF) with a five-step brand-blue scale used for accents, tags, and glow — never as large flat fills. Text uses a dark ink scale (`--ink-900`…`--ink-100`), added since the brief's palette had no dark neutral for legible copy.
- **Type:** Inter (sans) for all UI/copy, JetBrains Mono for labels/metadata/eyebrows only. Display headlines are large (56–88px), semibold, tight tracking (-0.03em). Body copy is relaxed line-height (1.6). Mono labels are small (12px), uppercase, wide tracking (0.12em).
- **Backgrounds:** flat near-white base — no photography. The one atmospheric device carried over from the brief is soft, heavily-blurred pastel blobs (blue/sky) behind hero sections, plus an optional faint 32px hairline grid — used sparingly, never as full-bleed imagery or hand-drawn illustration.
- **Animation:** fast and precise — 200–300ms transitions, expo-out easing (`cubic-bezier(0.16,1,0.3,1)`), movements capped at 4–8px. Background blobs float slowly (8–10s loops). Nothing bounces or overshoots.
- **Hover states:** cards/buttons lift 2–6px with a slightly stronger shadow; primary buttons shift to a darker blue (`--primary-strong`); ghost elements gain a tinted background. Never a pure opacity fade alone.
- **Press states:** scale to 0.98, shadow flattens.
- **Borders:** nearly invisible — `--border` is a 6–8% neutral tint, never a bold 1–2px line.
- **Shadows:** always multi-layer — inset top highlight + soft diffuse shadow + (on hover/CTA) a soft accent-color glow. Never a single flat drop shadow.
- **Radius:** 8px (buttons/inputs), 12px (icon containers), 16px (cards/large containers), pill (badges/tags).
- **Transparency/blur:** used only for the sticky header (backdrop-blur + ~85% opacity surface) and the optional "glass" card variant — never as a default surface treatment.
- **Layout:** centered container (max 1120px), generous section padding (96–128px vertical), asymmetric project grid (cards span 1 or 2 columns, not uniform tiles).
- **Cards:** white surface, 1px near-invisible border, 16px radius, multi-layer shadow, cursor-tracked accent spotlight, 4px hover lift.

## Iconography
No icon assets were provided. This system uses **Lucide** (CDN, `lucide.dev`) — thin (1.5px stroke), geometric, matches the brief's precise/technical vibe. Load via `<script src="https://unpkg.com/lucide@latest"></script>` and `lucide.createIcons()`, or inline `<i data-lucide="arrow-right">`. No icon font, no PNG icon set, no emoji, no unicode-glyph icons are used anywhere in this system. Social links in the footer are currently plain text — swap in Lucide brand-adjacent icons or real logos once real profile links are provided.

## Caveats / open questions for you
1. **No real name/photo/work provided** — "Luna Liu" and all project names, case-study copy, and bio text are placeholders. Replace with real projects, a real photo, and real case-study content.
2. **Color palette conflict** (see above) — I used the literal pastel palette per your answer; flag if you'd rather I follow the brief's dark-Linear prose instead, or blend both (e.g. an optional dark theme).
3. **No fonts were attached** — Inter + JetBrains Mono are loaded live from Google Fonts (`tokens/fonts.css`) rather than bundled as local font files. If you have licensed font files, attach them and I'll self-host.
4. **No logo attached** — nowhere in this system is a logo drawn or invented; the wordmark "Luna Liu" stands in for a mark everywhere one would appear.
5. Only 4 primitives were built (Button, Input, Card, Badge) per your "keep it minimal" answer — ask if you'd like Select, Checkbox, Tabs, Toast, etc. added later.

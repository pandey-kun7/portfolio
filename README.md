# kunal.pandey — Engineer in Progress

A loud little neo-brutalist portfolio. No framework, no build step, no dependencies at runtime — just HTML, CSS, JS and questionable color choices that somehow work.

**Live:** drop the files on Vercel / GitHub Pages / Netlify and you're done.

## What's inside

| Page | Route | Contents |
|---|---|---|
| Professional | `index.html` | Hero, manifesto, selected work, viewer note, toolbox, GitHub contributions graph, contact form |
| Personal | `personal.html` | "Why do you wanna watch my personal life?" + under-construction joke, contact form |

Shared across both: `styles.css` (design system + responsive layout), `script.js` (page-aware nav, smooth scroll, contributions graph, Gmail-compose forms).

## Features

- **Two pages, one vibe** — Professional has the work, Personal has the jokes. Nav highlights the active page via `body[data-page]`.
- **Live GitHub contributions graph** — custom-built grid (not an image embed) fed by the public contributions API. Blue levels, grey-bordered squares, month/day labels, hover tooltips with count + date, current-year only, capped at today.
- **Gmail-compose contact forms** — visitor enters their email + subject + body, hits send, and it opens *their* Gmail pre-filled to `10c.kunalpandey@gmail.com` with a `From:` footer so replies are easy. No backend, nothing to break.
- **Custom purple scrollbar** with a thin ink rail, press-flat buttons, sticky blurred topbar, film-grain overlay.

## Projects showcased

Krono (HTTP server in C) · Shorty (URL shortener) · Search Engine (TF-IDF) · BitTorrent client · Anonymis (realtime chat, FE + BE) · Scrappy (scraping CLI)

## Run it locally

```bash
# any static server works, e.g:
npx serve .
# or
python -m http.server
```

Then open `http://localhost:3000` (or whichever port). Note: the contributions graph needs internet — it fetches live data.

## Deploy

Static hosting only. Push to GitHub → import repo in Vercel → deploy. No build command, no output directory, no env vars.

## Customizing

- **Avatar / socials** — hero avatar loads from the public GitHub avatar URL; X link points to [@pandey_kun](https://x.com/pandey_kun); topbar has GitHub + LinkedIn.
- **Resume** — hero "Resume ↗" button links to a Google Drive PDF. Keep sharing on "Anyone with the link".
- **Contact email** — search for `10c.kunalpandey@gmail.com` across `index.html`, `personal.html`, `script.js` to swap the recipient.
- **Graph colors** — `graphColors` array in `script.js` + matching legend in `index.html`.
- **Fonts** — Space Grotesk + DM Mono via Google Fonts.

## Stack

HTML · CSS · Vanilla JS · GitHub contributions API · Google Fonts. That's it.

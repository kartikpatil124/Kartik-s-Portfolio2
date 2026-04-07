# Kartik Patil Portfolio

Single-page portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## Stack

- Next.js 16
- Tailwind CSS 4
- Framer Motion
- GSAP ScrollTrigger
- Lucide React
- Netlify-ready static export

## Local Setup

```bash
npm install
cd frontend-next
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

From the repo root:

```bash
npm run dev
npm run build
npm run lint
```

## Project Notes

- The live portfolio app lives in `frontend-next/`.
- The page is a single-page experience with section anchors for `Hero`, `About`, `Skills`, `Projects`, `Contact`, and `Footer`.
- Project search and filtering run client-side with no page reload.
- The contact form is marked up for Netlify Forms and also shows an MVP success toast locally.
- `prefers-reduced-motion` disables the heavier motion treatment.

## Deploy To Netlify

1. Push this repository to GitHub.
2. In Netlify, create a new site from that GitHub repo.
3. Netlify will pick up `netlify.toml` automatically.
4. Build settings should resolve to:
   - Base directory: `frontend-next`
   - Build command: `npm run build`
   - Publish directory: `out`
5. Deploy.

## No Environment Variables Required

This MVP does not need any environment variables.

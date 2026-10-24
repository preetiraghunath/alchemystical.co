# alchemystical.co

The Alchemystical website, built with [Astro](https://astro.build).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Structure

- `src/pages/index.astro`: the home page, which composes the section components.
- `src/components/`: one component per section (Header, Hero, Intro, Practice, Founder, Ethos, Contact, Footer).
- `src/layouts/BaseLayout.astro`: the HTML shell, fonts, background layers, and scripts.
- `src/styles/global.css`: site styles and themes.
- `src/scripts/motion.js`: scroll reveals and the sticky header.
- `src/assets/`: images optimized at build time.
- `public/`: files copied as-is, including `CNAME` for the custom domain.

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`.
In the repository's Settings → Pages, set **Source** to **GitHub Actions**.

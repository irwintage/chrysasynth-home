# Chrysasynth

**Make sound, make sense.**

Chrysasynth is an independent creative audio ecosystem for sound exploration, composition and sound design.

- [Home](https://chrysasynth.com/): the main entry point.
- [Knowledge](https://chrysasynth.com/knowledge/): articles, original visual artwork, audio examples and interactive experiments.
- [Forge](https://forge.chrysasynth.com/): a browser-based creative audio laboratory, maintained separately.

## Repository structure

```text
index.html              Home and interactive SVG sculpture
logo.png                Shared brand asset
knowledge/              Editorial hub
  articles/             Five articles, narration and interactive audio
sitemap.xml             Canonical page URLs
robots.txt              Search crawler instructions
```

## Local preview

No build step or dependencies are required. From the repository root run:

```sh
python -m http.server 8000
```

Open http://localhost:8000/. Audio examples require a user gesture; narration uses browser speech synthesis and depends on available voices.

## Deployment

Deploy the repository root as a static site on Cloudflare Pages (no build command, output directory `.`). Forge remains hosted separately.

Keep the existing Cloudflare Pages project and custom-domain configuration unchanged. The Home uses a lightweight interactive SVG sculpture. Knowledge is served from the same repository.

## Publication checklist

- Restore verified privacy, terms and contact destinations before linking them again.
- Submit `https://chrysasynth.com/sitemap.xml` to Google Search Console after deployment.
- Enable the Knowledge link in Forge after the new URL is live.

© 2025–2026 Chrysasynth. All rights reserved.

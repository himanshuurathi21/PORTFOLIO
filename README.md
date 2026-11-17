# Himanshu Rathi — Portfolio

A cinematic, interactive personal brand site for Himanshu Rathi: developer, content creator and community leader.

**Live:** https://himanshurathiportfolio.netlify.app/

## Stack

- React 19 + Vite 7
- Motion for animation and transitions
- Lucide React for icons
- Custom CSS design system (no framework)
- FormSubmit for the contact form

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (default `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deployment

The project is configured for Netlify in `netlify.toml`.

1. Push the repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select the repo.
3. Netlify reads the config automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `22`
4. Deploy. The SPA redirect sends every route to `index.html` for clean anchor navigation.

The canonical URL in `index.html`, `robots.txt` and `sitemap.xml` is
`https://himanshurathiportfolio.netlify.app/`. Update those files if the domain changes.

## Content

All copy and links live in `src/data/`:

- `content.js` — profile, navigation, social links, impact statistics, experience and education
- `projects.js` — project case studies, filters, editorial covers, screenshot galleries and live links
- `skills.js` — skill groups and proof points
- `credentials.js` — certifications, hackathon records and certificate links

Sections are composed in `src/App.jsx`; individual sections are in `src/components/`.

## Assets

- `public/assets/images/profile.jpg` — hero portrait
- `public/assets/images/profile-avatar.jpg` — square portrait used in the HTML resume
- `public/assets/images/projects/` — editorial project covers and real screenshots
- `public/assets/images/og-cover.jpg` — social sharing image (1200 × 630)
- `public/assets/Himanshu-Rathi-Resume.pdf` — downloadable resume
- `public/assets/certificates/` — certificate images and PDFs
- `public/favicon.svg`, `public/manifest.webmanifest` — browser/PWA metadata
- `source-assets/` — original source files kept out of the deployed bundle

## Contact form

The form posts to FormSubmit at `https://formsubmit.co/rathihimanshuu@gmail.com`. FormSubmit
requires a one-time email confirmation on the first submission. The form returns to
`/?sent=1#contact` and shows a success message.

## Notes

- Theme choice is stored in `localStorage` under `hr-theme`; system preference is used on first visit.
- All animation respects `prefers-reduced-motion`.
- The custom cursor is pointer-only and disabled on touch devices.

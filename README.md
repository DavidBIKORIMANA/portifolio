# David Bikorimana — Portfolio (React)

Modern, premium, responsive portfolio built with **React 18**, **Vite**, **SCSS**, **Bootstrap 5**, and **AOS**.

## Tech Stack

- **React 18** + **Vite 6**
- **SCSS (Sass)** — navy + gold executive theme
- **Bootstrap 5** — responsive grid
- **AOS** — scroll animations
- **Font Awesome 6** — icons (CDN)

## Project Structure

```
portfolio/
├── index.html              # Vite entry + SEO meta
├── package.json
├── vite.config.js
├── public/
│   ├── img/                # profile.png, about.png, favicon.svg
│   └── files/              # David-Bikorimana-CV.pdf
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/               # site content (projects, skills, etc.)
│   ├── hooks/              # scroll, typing, counters, in-view
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, Loader, etc.
│   │   ├── sections/       # Hero, About, Projects, Contact…
│   │   └── ui/             # Counter, SkillBar, Particles…
│   └── styles/style.scss   # source styles — edit this
└── assets/                 # legacy static files (optional backup)
```

## Getting Started

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build

# Preview production build
npm run preview
```

## Editing Styles

Styles live in `src/styles/style.scss`. Vite compiles them automatically during `npm run dev` and `npm run build`.

## Deploy

Run `npm run build` and deploy the **`dist/`** folder to any static host (Netlify, Vercel, GitHub Pages, Apache, etc.).

## Contact

**David Bikorimana** — Kigali, Rwanda  
📞 +250 788 275 364 · ✉ bikorimanadavid.rw@gmail.com  
[LinkedIn](https://www.linkedin.com/in/david-bikorimana-053529146/) · [GitHub](https://github.com/DavidBIKORIMANA)

© 2026 David Bikorimana. All rights reserved.

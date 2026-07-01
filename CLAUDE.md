# ARC Lab Website

Website for **ARC Lab** (Autonomy, Robotics & Control Lab) — the research lab of
Dr. Usama Mehmood in the Department of Computer Science at Information Technology
University (ITU), Lahore. The lab works on formal methods, machine learning, and
control theory for autonomous and cyber-physical systems.

## Stack

- **React 18** (function components, hooks) + **Vite 5** for dev/build.
- **Plain CSS**, single global stylesheet at [src/index.css](src/index.css) (~1000 lines, all class-based, no CSS modules or Tailwind).
- No router library, no TypeScript, no test framework, no state-management library.

## Commands

```bash
npm install      # install dependencies
npm run dev      # Vite dev server  → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the built dist/ → http://localhost:4173
```

A [Makefile](Makefile) wraps these: `make` (install + dev), `make install`,
`make dev`, `make build`, `make preview`, `make clean`. It also checks that
Node/npm are installed before running.

## Architecture

- Entry: [index.html](index.html) → [src/main.jsx](src/main.jsx) mounts [src/App.jsx](src/App.jsx).
- **Routing is manual.** [src/App.jsx](src/App.jsx) holds a `currentPage` string
  in `useState` and a `navigate(page)` callback that swaps pages and scrolls to
  top. There is no URL routing — paths in the nav data (`/research`, etc.) are
  mapped to page keys in [src/components/Navbar.jsx](src/components/Navbar.jsx)
  via `pageMap`. Adding a page means: create the page component, add a `case` to
  the `switch` in `App.jsx`, and add a nav entry to `site.json`.
- **Pages** ([src/pages/](src/pages/)): `Home`, `Research`, `Publications`,
  `Tools`, `Team`.
- **Shared components** ([src/components/](src/components/)): `Navbar`, `Footer`.

## Content is data-driven (edit JSON, not JSX)

All site content lives in [src/data/](src/data/) and is imported directly into
components. To update the site, edit these files — usually no JSX changes needed:

- [src/data/site.json](src/data/site.json) — lab name, university, description,
  contact email, nav items, and the homepage news feed.
- [src/data/research.json](src/data/research.json) — research projects (with
  `status: "ongoing" | "completed"`, `tags`, period, image) and the master `tags`
  list used for filtering on the Research page.
- [src/data/team.json](src/data/team.json) — `pi` (principal investigator),
  `members`, and `alumni`.
- [src/data/publications.json](src/data/publications.json) — publications list.
- [src/data/tools.json](src/data/tools.json) — `tools` and `benchmarks`.

Several JSON entries are placeholders with `null` values (e.g. publications, some
team bios, alumni) — these are scaffolding to be filled in, not bugs.

## Static assets

Served from [public/](public/) at the site root. Project demo GIFs live in
[public/assets/projects/](public/assets/projects/). Image paths in the JSON (e.g.
`/assets/projects/AV.gif`, `/assets/team/asim.jpg`) resolve against `public/`.
Image tags use `onError` handlers to hide missing images or render initials
placeholders, so referenced-but-missing assets degrade gracefully.

## Conventions

- Keep content in JSON; keep components presentational.
- One global CSS file; reuse existing class names rather than introducing new
  styling systems.
- Match the existing plain-React style (no router, no TS).

## Personal Website (scaffolded)

A personal academic site for Dr. Usama Mehmood, built from the **same template**
as this lab site (shared components, CSS, and the data-driven pattern) but kept
as a **separate site with its own content**, deployed to its own URL. The
scaffold exists; most content JSON is still placeholder `null`s to be filled in.

### Building each site

A `VITE_SITE` flag selects which site builds (see [src/site.js](src/site.js)):

```bash
npm run dev              # lab site (default)
npm run dev:personal     # personal site  (VITE_SITE=personal)
npm run build            # lab → dist/
npm run build:personal   # personal → dist-personal/
```

[src/App.jsx](src/App.jsx) reads the flag (`isLab` / `isPersonal`) and assembles
the per-site brand, nav, footer, and page set in `buildConfig`. `Navbar`/`Footer`
are generic (they take `brand` + `nav`); page keys derive from nav paths via
`pathToPage` in [src/components/Navbar.jsx](src/components/Navbar.jsx). The
personal build is smaller because Vite tree-shakes the lab-only pages out.

### Lab site vs. personal site — the conceptual split

Treat these as two distinct sites that happen to share a look. The dividing line
is **"we" vs. "I"**:

- **Lab site (this repo's current content):** the *group*. Collective research,
  members, tools, lab output. Voice is "we / the lab". Outlives any individual;
  members rotate. Audience: prospective students, collaborators, funders.
- **Personal site:** the *individual*. Bio, teaching, talks, CV. Voice is "I / my".
  Tied to the person and follows them between institutions. Audience: students in
  the courses, conference audiences, hiring/tenure committees.

Practical consequences:

- **Share the template, not the content.** Reuse `src/components/`, `src/index.css`,
  the lightbox, and the JSON-driven approach — but each site keeps its **own**
  `src/data/` files. Do not make one dataset serve both.
- **Publications are the one shared dataset.** [src/data/publications.json](src/data/publications.json)
  is a single source of truth shared by both sites. Each entry has a `scope`
  field — `"lab"`, `"personal"`, or `"both"` (missing = `"both"`) — and
  [src/pages/Publications.jsx](src/pages/Publications.jsx) filters by the current
  `SITE` so each site shows only its relevant papers. This avoids two copies that
  drift apart. (Tag/data drift has already bitten this project once — keep one
  source.)
- Anything that is inherently personal — **Teaching** and **Talks** — belongs only
  on the personal site, never the lab nav.

### Coexistence in the codebase

Both sites live in this repo and share the template. Select which one builds via a
small site flag (e.g. an env var `VITE_SITE=lab|personal` read in `App.jsx`, or a
second Vite entry/config) that chooses the nav, page set, and `data/` directory.
Keep per-site content under clearly separated folders, e.g.
`src/data/lab/` and `src/data/personal/`. Routing stays manual, same as today
(`currentPage` + `navigate()` in `App.jsx`).

### Pages and data shapes

- **Home** — short bio, current position/affiliation, research interests, contact
  and links (Google Scholar, CV PDF). Reuse the `pi` object shape from
  [src/data/team.json](src/data/team.json) (`name`, `title`, `bio`, `email`,
  `photo`, `website`, `googleScholar`, `interests`) as the model for a
  `personal/profile.json`.
- **Teaching** — public lecture notes and slides. New `personal/teaching.json`:
  list of courses, each with `code`, `title`, `term`/`year`, optional
  `description`, and a `materials` array of `{ label, type: "notes" | "slides",
  file }` pointing at PDFs.
- **Talks** — invited talks / presentations, each linking to slide PDFs. New
  `personal/talks.json`: list of `{ title, venue, date, location, slides (PDF
  path), optional video/link }`.

### Assets

PDFs (lecture notes, slides, talk decks, CV) go under `public/assets/` in
site-specific subfolders, e.g. `public/assets/teaching/<course>/...` and
`public/assets/talks/...`. Paths in the JSON resolve against `public/`, same as
the lab images. Link to PDFs with a normal `<a href>` (open in a new tab); reuse
the existing link/button styles rather than adding new ones.

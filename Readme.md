# ARC Lab Website

Website for the **ARC Lab** (Autonomy, Robotics & Control Lab) led by
Dr. Usama Mehmood in the Department of Computer Science at
**Information Technology University (ITU)**, Lahore.

The lab develops theories, algorithms, and tools for the design and analysis of
autonomous, reliable, and cyber-physical systems — spanning formal methods,
machine learning, and control theory.

## Tech stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- Plain CSS (single global stylesheet)
- No routing library — lightweight in-app page switching

## Getting started

Requires [Node.js](https://nodejs.org) (LTS recommended) and npm.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
```

### Build for production

```bash
npm run build    # output to dist/
npm run preview  # preview the production build at http://localhost:4173
```

### Using the Makefile (optional)

```bash
make           # install dependencies, then start the dev server
make install   # install dependencies only
make dev       # start the dev server
make build     # production build
make preview   # preview the production build
make clean     # remove node_modules/ and dist/
```

## Editing site content

Almost all content is data-driven — edit the JSON files in [`src/data/`](src/data/)
rather than the React components:

| File | Controls |
|------|----------|
| `site.json` | Lab name, university, description, contact, navigation, news |
| `research.json` | Research projects and filter tags |
| `team.json` | Principal investigator, members, alumni |
| `publications.json` | Publications |
| `tools.json` | Tools and benchmarks |

Images and other static assets go in [`public/`](public/) (e.g. project demos in
`public/assets/projects/`). Paths in the JSON resolve against `public/`.

## Project structure

```
index.html              # Vite entry point
src/
  main.jsx              # React mount
  App.jsx               # App shell + page switching
  index.css             # Global styles
  components/           # Navbar, Footer
  pages/                # Home, Research, Publications, Tools, Team
  data/                 # JSON content (see table above)
public/assets/          # Images, GIFs, and other static files
```

## License

Internal project for ARC Lab, ITU.

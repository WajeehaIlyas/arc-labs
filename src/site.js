// Which site this build renders: "lab" (the ARC Lab group site) or
// "personal" (Dr. Usama Mehmood's individual site). Both are built from the
// same template; the flag selects the nav, page set, and data directory.
// Set via the VITE_SITE env var (e.g. `VITE_SITE=personal npm run dev`).
export const SITE = import.meta.env.VITE_SITE === "personal" ? "personal" : "lab";

export const isLab = SITE === "lab";
export const isPersonal = SITE === "personal";

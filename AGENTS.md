# AGENTS.md

Coffee Bar is a public starter for the Sitewerk talk "Agentic testing with e2e". Readers adapt their own clone or fork; the upstream repository is a read-only reference. Talk in plain words, in the user's language, and run the commands yourself.

Read `BRIEF.md` first. It says who the prototype is for, what it shows and what is made up; update it when any of that changes.

The demo uses the Sitewerk prototype stack. The page is `app/routes/home.tsx`. The live demo renames `ADD_LABEL` in `app/data/menu.ts`. End-to-end tests are in `tests/` and run with `npx e2e run`; `e2e.config.ts` starts the dev server on port 4317. Locator tests need no model. Agent tests use each person's own ChatGPT login. Test output, including the replay cache, stays local and is ignored by Git.

## Commands

- `npm install` once, then `npm run dev` as a background command. The prototype runs at http://127.0.0.1:4317.
- `npm run check` lints, checks types and builds. Run it before you publish and fix what it reports. `npm run fix` formats and sorts classes.

## Where things go

| Path | Holds |
|---|---|
| `app/routes.ts` | Every page and its URL |
| `app/routes/<page>.tsx` | One page, under about 200 lines. Its parts go in `app/routes/<page>/` |
| `app/components/ui/` | Base UI parts styled with the tokens: button, field, select, dialog, popover |
| `app/components/` | Parts several pages share, such as a header |
| `app/data/` | Made-up content and its types, one file per topic |
| `app/lib/` | Helpers: `cn` joins classes, `format` writes CHF, dates and times |
| `app/app.css` | Design tokens: colors and font |
| `app/root.tsx` | The HTML around every page: icons, notifications, error page |
| `public/` | Files served as they are: images, icons, fonts |

## Stack

React 19, React Router 8 in framework mode rendering in the browser (`ssr: false`), Vite, TypeScript, Tailwind CSS 4 and Base UI. The `prototype-stack` skill says which library to use for what, and the `react-router` skill covers routes, links and page data.

## Rules

- Style with the tokens in `app/app.css`, such as `bg-primary`, `text-muted-foreground` and `border-border`. To match a customer's brand, change the token values. `npm run check` rejects palette colors such as `bg-blue-600`.
- Load fonts, images and scripts from this project only: a customer's font comes from a `@fontsource-variable/<name>` package or from files in `public/fonts/`, as the `prototype-stack` skill describes.
- Before using a Base UI component, read its page in `node_modules/@base-ui/react/docs/react/components/`.
- Write realistic content for the customer in English: Swiss names, addresses and prices in CHF. For another language, change `lang` in `app/root.tsx` and the locale in `app/lib/format.ts`, for example to `de-CH`; German uses Swiss spelling (ss, not ß).
- Every page works at phone width (375 px).
- File names are kebab-case. Import app code with `~/`, for example `~/components/ui/button`.
- After adding or renaming a route, run `npm run check`; it generates the `./+types/<route>` files that route imports.

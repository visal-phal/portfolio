# Visal Phal Portfolio

A resume-led personal portfolio for Visal Phal with a public profile, contact inbox, and browser-local full-content admin editor.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/visal-portfolio/src/App.tsx` — public portfolio, contact form, and `/admin` editor
- `artifacts/visal-portfolio/src/index.css` — ivory / oxblood visual system, typography, grain, and motion
- `artifacts/visal-portfolio/public/assets/` — extracted portrait and downloadable resume
- `artifacts/visal-portfolio/README.md` — local run and GitHub Pages instructions

## Architecture decisions

- The portfolio remains static-hosting friendly: contact messages, editable content, uploaded portrait data, and local login state use `localStorage`.
- Wouter is configured with the Vite base path so GitHub Pages repository deployments can use a subpath.
- The visual language intentionally translates the provided resume and reference image into an editorial web experience rather than reproducing a one-page PDF.
- The admin editor is content-driven, so public sections render from the same editable model instead of hardcoded timeline/project arrays.

## Product

The public site introduces Visal Phal, presents education, work history, selected work, capabilities, skills, contact details, and a downloadable resume. Visitors can submit a message. The admin route lets Visal review browser-local messages, edit every public section, add/remove entries, manage links, and upload a replacement portrait.

## User preferences

- Clean modern portfolio with a warm ivory, oxblood red, and ink-black palette based on the supplied reference design.

## Gotchas

- The admin login is intentionally local-only for GitHub Pages and is not a secure server-backed auth system.
- For a GitHub repository deployment, build with `BASE_PATH=/repository-name/`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

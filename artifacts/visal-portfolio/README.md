# Visal Phal Portfolio

A single-page React portfolio for Visal Phal with:

- Resume-led public profile, experience, education, selected work, capabilities, skills, and contact sections
- Downloadable resume PDF and extracted portrait
- Contact form that saves messages to the browser
- `/admin` editor for updating every public section, adding/removing experiences and projects, editing education and skills, managing social links, and uploading a new portrait
- Local inbox for viewing and deleting contact messages

## Run locally

```bash
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/visal-portfolio run dev
```

## Build for GitHub Pages

For a repository named `visal-portfolio`, build with the repository path as the base:

```bash
BASE_PATH=/visal-portfolio/ pnpm --filter @workspace/visal-portfolio run build
```

Publish `artifacts/visal-portfolio/dist/public` with GitHub Pages. Use `/` instead of
`/visal-portfolio/` for a custom domain or user/organization site.

## Admin note

The admin page is intentionally browser-local so the site can remain a static GitHub
Pages app. Contact messages, uploaded images, edits, and login state are stored in
`localStorage`, which means they are only visible in the browser that created them.
The current local login uses the configured portfolio email and password. Replace the
client-side login with server-backed authentication before using this for private or
production data.
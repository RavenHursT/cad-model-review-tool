# CADchat

Monorepo for the CAD model review interview exercise — a 3D cube viewer with persisted design review comments.

## Architecture

```
apps/web          Next.js 16 + React Three Fiber (frontend)
apps/api          NestJS 11 + tRPC (backend API)
packages/database Prisma ORM → Supabase Postgres (Phase 3+)
packages/trpc     Shared Zod schemas + tRPC router (Phase 4+)
packages/ui       ShadCN components (Phase 6+)
```

The frontend never talks to Supabase directly. All data flows through the NestJS API via tRPC.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, React Three Fiber |
| API | NestJS, tRPC, Zod |
| Database | Prisma ORM, Supabase Postgres |
| Monorepo | Turborepo, pnpm workspaces |
| Deploy | Vercel (dual projects), GitHub Actions CI |

## Prerequisites

- Node.js >= 22
- pnpm 11.x

## Local Development

```bash
pnpm install
cp .env.example .env
pnpm dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type-check all packages |
| `pnpm db:migrate` | Run Prisma migrations (Phase 3+) |

## Deployment

Two Vercel projects deploy from this monorepo:

| Project | Root Directory | Production URL |
|---------|---------------|----------------|
| `cmrt-web` | `apps/web` | https://cmrt-web-lurchbulldog-3827s-projects.vercel.app |
| `cmrt-api` | `apps/api` | https://cmrt-api-lurchbulldog-3827s-projects.vercel.app |

Both projects auto-deploy on push to `origin/main`. Repository: https://github.com/RavenHursT/cad-model-review-tool (public)

1. **GitHub Actions** — lint, typecheck, build (and `prisma migrate deploy` once database migrations exist)
2. **Vercel** — automatic deploy of both projects

### Environment Variables

**cmrt-web**

| Variable | Description |
|----------|-------------|
| `API_URL` | URL of the `cmrt-api` deployment |

**cmrt-api**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase transaction pooler URL |
| `DIRECT_URL` | Supabase direct connection URL |
| `WEB_URL` | URL of the `cmrt-web` deployment |

**GitHub Actions secrets:** `DATABASE_URL`, `DIRECT_URL`

## Demo Flow (once feature-complete)

1. Open the web app — a 3D cube renders in the viewport
2. Click the cube — a review panel appears above it
3. Add a comment — saved as `pending`
4. Click the cube again — approve or reject the comment
5. Final status persists across page reloads

## CI

See [`.github/workflows/quality.yml`](.github/workflows/quality.yml) and [`.github/workflows/migrate.yml`](.github/workflows/migrate.yml):

- **quality** — runs on every push and PR
- **migrate** — runs on push to `main` when `packages/database/prisma/migrations/` changes

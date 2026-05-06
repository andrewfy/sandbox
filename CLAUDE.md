# Sandbox — Claude Code Learning Repo

This repo is a learning sandbox for Claude Code, agentic workflows, and the
Next.js / Vercel / Supabase stack.

## Project layout

```
sandbox/
├── hello-world/        # Next.js app (App Router, TypeScript, Tailwind v4)
├── .claude/
│   └── commands/       # Project-level custom slash commands (*.md files)
└── CLAUDE.md           # ← you are here (loaded for every session in this repo)
```

## Stack

- **Framework**: Next.js 15 (App Router)
- **Deployment**: Vercel
- **Database/Auth**: Supabase
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Dev workflow

```bash
cd hello-world
npm install
npm run dev      # http://localhost:3000
npm run build    # verify before deploying
```

## Environment variables

Copy `.env.example` → `.env.local` and fill in your Supabase credentials.
Never commit `.env.local`. Add variables to Vercel dashboard for production.

## Supabase conventions

- Use the Supabase JS client (`@supabase/supabase-js`) via a shared helper in `lib/supabase.ts`
- Row-Level Security (RLS) must be enabled on every table
- Prefer server-side Supabase client for sensitive operations (Next.js Server Components / Route Handlers)

## Claude Code concepts being explored

- `CLAUDE.md` files: give Claude persistent context about the project
- `.claude/commands/*.md`: custom slash commands available in Claude Code sessions
- Hooks (`settings.json`): shell commands that run on Claude events (pre/post tool use, etc.)
- Skills: built-in slash commands like `/review`, `/security-review`, `/simplify`

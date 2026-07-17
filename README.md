# Dashboard App

A clean, minimal dashboard built with TanStack Start, React, and Tailwind CSS.

## Local Development

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-name>
```

### 2. Install dependencies

This project uses [Bun](https://bun.sh/) (recommended) or npm.

```bash
bun install
```

Or with npm:

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your Lovable Cloud / Supabase values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

> You can find these values in your Lovable Cloud project settings.

### 4. Start the development server

```bash
bun run dev
```

Or with npm:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start the local dev server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

## Project Structure

```text
src/
  components/     # Reusable UI components
  routes/         # TanStack file-based routes
  lib/            # Utilities and shared logic
  styles.css      # Global styles and Tailwind theme
public/           # Static assets
```

## Learn More

- [Lovable Cloud docs](https://docs.lovable.dev/features/cloud)
- [TanStack Start docs](https://tanstack.com/start/latest)

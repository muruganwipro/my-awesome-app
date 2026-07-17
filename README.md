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

Open `.env` and fill in your backend values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

#### Option A: Lovable Cloud (recommended)

Lovable Cloud gives you a managed backend with database, auth, storage, and server functions — no separate Supabase account required.

1. In the Lovable editor, open the **Cloud** panel.
2. Follow the prompts to create or connect your project.
3. Once connected, copy `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from **Cloud → Settings → API**.
4. Paste them into your `.env` file.

#### Option B: Manual Supabase project

If you prefer to use your own Supabase project:

1. Go to [supabase.com](https://supabase.com) and sign in or create an account.
2. Click **New project**, choose an organization, give the project a name, and set a secure database password.
3. Wait for the project to finish provisioning (this may take a minute or two).
4. Once ready, open the project dashboard and go to **Project Settings → API**.
5. Copy the **URL** and the **anon public** API key.
6. Paste them into your `.env` file:

   ```env
   VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-public-key>
   ```

7. Return to the Supabase dashboard and enable any services the app needs:
   - **Authentication:** Go to **Authentication → Providers**. Enable **Email** (and **Google** if you want social login).
   - **Row Level Security (RLS):** When you create database tables later, enable RLS and add policies so users can only access their own data.
   - **Storage:** If the app needs file uploads, create a bucket under **Storage** and set appropriate RLS policies.

> Keep `VITE_SUPABASE_PUBLISHABLE_KEY` public-safe — it is meant for the browser. Never put the service role key or database password in `.env`.

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

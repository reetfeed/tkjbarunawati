# XII TKJ Angkatan 2026 — Website Kelas

Website portfolio kelas XII TKJ SMK Barunawati 26.

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Hosting**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

## Deploy ke Vercel

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repository
3. Tambahkan environment variable:
   - `DATABASE_URL` = connection string dari Neon
4. Deploy!

## Database

Push schema ke database Neon:

```bash
DATABASE_URL="postgresql://..." npx drizzle-kit push --config ./drizzle.config.ts
```
# tkjbarunawati

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Production environment variable

This frontend expects a separate backend service. Before you deploy on Vercel, add the environment variable:

- `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com`

The app rewrites `/api/*` to that backend URL in production. Locally it defaults to `http://127.0.0.1:8000`.

### Backend and database setup

This repository also includes a backend scaffold in `backend/` and a Supabase schema dump in `database_dump.sql`.

1. Deploy the backend service from `backend/` to Render or Railway.
2. Set `DATABASE_URL` to your Supabase connection string.
3. Deploy the frontend on Vercel with `NEXT_PUBLIC_API_URL`.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

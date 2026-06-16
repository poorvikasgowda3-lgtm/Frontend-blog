# Meet5 Backend

This backend is designed to work with the Meet5 frontend and support:

- `GET /api/articles`
- `GET /api/users/:userId/feed/recommended`
- `POST /api/articles/draft`
- `PUT /api/articles/:articleId/publish`
- `POST /api/interactions/views`
- `GET /docs` for Swagger UI

## Deployment

### 1) Create a Supabase database

- Create tables by running `database_dump.sql` in Supabase SQL Editor.
- Copy the Supabase connection string from Settings > Database > Connection string.

### 2) Deploy to Render or Railway

- Connect your backend GitHub repository.
- Set the environment variable:
  - `DATABASE_URL` = your Supabase connection string
- Set the build command:
  - `npm install`
- Set the start command:
  - `npm start`
- Deploy the service.
- Confirm that `https://<your-backend>.onrender.com/docs` loads.

### 3) Connect the frontend

- In Vercel, add:
  - `NEXT_PUBLIC_API_URL` = `https://<your-backend>.onrender.com`
- Deploy the frontend.
- Verify the feed and article publish flow work on the live site.

## Local development

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Run locally:
   ```bash
   npm start
   ```
3. The frontend can use `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000` locally.

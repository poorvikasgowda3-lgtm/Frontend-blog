# Deployment Steps for Meet5

## 1. Supabase Database (The Brain)

1. Go to Supabase and create a new project.
2. Open the SQL editor.
3. Copy the contents of `database_dump.sql` and run it in Supabase.
4. Verify the tables and sample data were created.
5. In Supabase, go to `Settings` > `Database` > `Connection string`.
6. Copy the `DATABASE_URL` connection string.

> Keep this secret. Do not commit it to GitHub.

## 2. Backend on Render or Railway (The Engine)

### Prepare the backend repository

1. Make sure your GitHub repo includes the `backend/` folder with:
   - `backend/package.json`
   - `backend/server.js`
   - `backend/swagger.json`
   - `backend/.env.example`
   - `database_dump.sql`
2. Add `backend/.env` to your local `.gitignore` if it exists. The root `.gitignore` already ignores `.env*`.

### Deploy on Render

1. Connect your GitHub repository to Render.
2. Create a new Web Service.
3. Use `render.yaml` at the repository root if Render detects it automatically.
4. If you deploy manually, set the service root to `backend/`.
5. Set the environment variable:
   - `DATABASE_URL` = your Supabase connection string
6. Build command:
   - `cd backend && npm install`
7. Start command:
   - `cd backend && npm start`
8. Deploy.
9. Confirm the public URL responds and that `/docs` loads.

### OR Deploy on Railway

1. Create a new project in Railway.
2. Link the GitHub repo.
3. Add the project service using the `backend/` folder or a Dockerfile if required.
4. Add env var:
   - `DATABASE_URL` = your Supabase connection string
5. Set the start command:
   - `npm start`
6. Deploy and confirm `/docs` loads.

## 3. Frontend on Vercel (The Face)

1. Connect your GitHub repository to Vercel.
2. Before deploying, open Vercel Environment Variables.
3. Add:
   - `NEXT_PUBLIC_API_URL` = `https://<your-backend-url>` (the deployed Render/Railway URL)
4. Deploy the frontend.
5. Verify the live app loads and that the feed is populated from the backend.

## 4. Verify the live wiring

- Visit the frontend URL.
- Confirm article feed loads.
- Confirm posting an article works.
- Confirm the backend `/docs` page loads.

## 5. Submission details

- Frontend Link: your Vercel URL
- Backend Link: `https://<your-backend>/docs`
- DB Screenshot: Supabase connection string screen (blur password)

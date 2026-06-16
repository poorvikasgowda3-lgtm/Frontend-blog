import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { Pool } from "pg";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(fs.readFileSync(join(__dirname, "swagger.json"), "utf8"));

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_, res) => {
  res.json({ 
    status: "ok", 
    message: "Meet5 backend is running.",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  });
});

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET all published articles with pagination
app.get("/api/articles", asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT article_id, author_id, title, summary, published_at, created_at
     FROM articles
     WHERE status = 'published'
     ORDER BY published_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM articles WHERE status = 'published'`
  );

  res.json({
    data: result.rows,
    pagination: {
      total: parseInt(countResult.rows[0].total),
      page,
      limit,
      pages: Math.ceil(parseInt(countResult.rows[0].total) / limit),
    },
  });
}));

// GET recommended feed for a user with pagination
app.get("/api/users/:userId/feed/recommended", asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 12);
  const offset = (page - 1) * limit;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const result = await pool.query(
    `SELECT article_id, author_id, title, summary, published_at, created_at
     FROM articles
     WHERE status = 'published'
     ORDER BY published_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM articles WHERE status = 'published'`
  );

  res.json({
    feed: result.rows,
    pagination: {
      total: parseInt(countResult.rows[0].total),
      page,
      limit,
      pages: Math.ceil(parseInt(countResult.rows[0].total) / limit),
    },
  });
}));

// POST create a new draft article
app.post("/api/articles/draft", asyncHandler(async (req, res) => {
  const { author_id, title, content, summary } = req.body;

  // Validation
  if (!author_id) {
    return res.status(400).json({ error: "author_id is required" });
  }
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({ error: "content is required and must be a non-empty string" });
  }
  if (title.trim().length > 255) {
    return res.status(400).json({ error: "title must be less than 255 characters" });
  }

  const result = await pool.query(
    `INSERT INTO articles (author_id, title, summary, content, status, created_at)
     VALUES ($1, $2, $3, $4, 'draft', now())
     RETURNING article_id, author_id, title, summary, status, created_at`,
    [author_id, title.trim(), summary ? summary.trim().substring(0, 500) : null, content.trim()]
  );
  res.status(201).json(result.rows[0]);
}));

// PUT publish an article
app.put("/api/articles/:articleId/publish", asyncHandler(async (req, res) => {
  const { articleId } = req.params;

  if (!articleId || isNaN(articleId)) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  const result = await pool.query(
    `UPDATE articles
     SET status = 'published', published_at = now()
     WHERE article_id = $1
     RETURNING article_id, author_id, title, summary, status, published_at`,
    [articleId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json(result.rows[0]);
}));

// POST record an interaction (view, like, etc.)
app.post("/api/interactions/views", asyncHandler(async (req, res) => {
  const { article_id, user_id, duration_seconds, device_type } = req.body;

  // Validation
  if (!article_id || isNaN(article_id)) {
    return res.status(400).json({ error: "article_id is required and must be a number" });
  }
  if (!user_id || isNaN(user_id)) {
    return res.status(400).json({ error: "user_id is required and must be a number" });
  }

  const result = await pool.query(
    `INSERT INTO interactions (article_id, user_id, type, duration_seconds, device_type, created_at)
     VALUES ($1, $2, 'view', $3, $4, now())
     RETURNING interaction_id, article_id, user_id, type, created_at`,
    [article_id, user_id, duration_seconds || 0, device_type || null]
  );
  res.status(201).json(result.rows[0]);
}));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ 
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`✓ Backend listening on port ${PORT}`);
  console.log(`✓ API Documentation: http://localhost:${PORT}/docs`);
});

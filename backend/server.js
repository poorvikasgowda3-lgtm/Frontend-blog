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
const  = process.env.DATABASE_URL;
DATABASE_URL
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
  res.json({ status: "ok", message: "Meet5 backend is running." });
});

app.get("/api/articles", async (_, res) => {
  try {
    const result = await pool.query(
      `SELECT article_id, author_id, title, summary, published_at
       FROM articles
       WHERE status = 'published'
       ORDER BY published_at DESC
       LIMIT 20`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load articles." });
  }
});

app.get("/api/users/:userId/feed/recommended", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT article_id, author_id, title, summary, published_at
       FROM articles
       WHERE status = 'published'
       ORDER BY published_at DESC
       LIMIT 12`
    );
    res.json({ feed: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load recommended feed." });
  }
});

app.post("/api/articles/draft", async (req, res) => {
  const { author_id, title, content, summary } = req.body;

  if (!author_id || !title || !content) {
    return res.status(400).json({ error: "Missing author_id, title, or content." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO articles (author_id, title, summary, content, status)
       VALUES ($1, $2, $3, $4, 'draft')
       RETURNING article_id, author_id, title, summary, published_at`,
      [author_id, title, summary || null, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create draft article." });
  }
});

app.put("/api/articles/:articleId/publish", async (req, res) => {
  const { articleId } = req.params;

  try {
    const result = await pool.query(
      `UPDATE articles
       SET status = 'published', published_at = now()
       WHERE article_id = $1
       RETURNING article_id, author_id, title, summary, published_at`,
      [articleId]
    );

    if (!result.rowCount) {
      return res.status(404).json({ error: "Article not found." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to publish article." });
  }
});

app.post("/api/interactions/views", async (req, res) => {
  const { article_id, user_id, duration_seconds, device_type } = req.body;

  if (!article_id || !user_id) {
    return res.status(400).json({ error: "Missing article_id or user_id." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO interactions (article_id, user_id, type, duration_seconds, device_type)
       VALUES ($1, $2, 'view', $3, $4)
       RETURNING interaction_id`,
      [article_id, user_id, duration_seconds || 0, device_type || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record interaction." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

const express = require("express");
const { Pool } = require("pg")

const app = express();
app.use(express.json())

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
//Health check route
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "error", db: "disconnected" });
  } catch (err) {
    res.status(500).json({ status: "error", db: err.message });
  }
});

app.get("/items", async (req, res) => {
  const result = await pool.query("SELECT * FROM items ORDER BY id");
  res.json(result.rows);
});

// POST /items — Criar novo item
app.post("/items", async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    "INSERT INTO items (name) VALUES ($1) RETURNING *", [name]
  );
  res.status(201).json(result.rows[0]);
});

// GET /items/:id — Buscar item por ID
app.get("/items/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM items WHERE id = $1", [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Item não encontrado" });
  }
  res.json(result.rows[0]);
});

// DELETE /items/:id — Remover item
app.delete("/items/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM items WHERE id = $1", [req.params.id]
  );
  res.json({ deleted: true });
});

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app;
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO items (name) VALUES
  ('Item Alpha'),
  ('Item Beta'),
  ('Item Gamma');

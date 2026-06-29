import express from 'express';
import { Pool } from 'pg';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Initialize Cloud Database Connection
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for cloud hosting
});

// Test Endpoint
app.get('/', (req, res) => {
  res.json({ message: "🚀 Velo Core Engine is LIVE on the cloud!" });
});

// Live Video Feed Endpoint
app.get('/api/videos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM videos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database fetching fault encountered' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


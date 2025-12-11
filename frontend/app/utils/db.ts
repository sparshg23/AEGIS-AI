import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getRecentThreats = async () => {
  const text = `
    SELECT * FROM threats 
    ORDER BY detected_at DESC 
    LIMIT 10
  `;
  const { rows } = await query(text);
  return rows;
};

export const getAverageRiskScore = async () => {
  const text = `
    SELECT AVG(risk_score)::numeric(10,2) as avg_score 
    FROM threats 
    WHERE detected_at > NOW() - INTERVAL '1 hour'
  `;
  const { rows } = await query(text);
  return rows[0].avg_score;
};

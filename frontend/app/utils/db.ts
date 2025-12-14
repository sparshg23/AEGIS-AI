// frontend/utils/db.ts (or wherever this file is located)

import { Pool } from 'pg';

// Use POSTGRES_URL, which Vercel provides as a single string.
// If POSTGRES_URL is undefined (e.g., in a local .env file), fall back to PRISMA_DATABASE_URL.
const connectionString = process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL;

// --- Implement the Singleton Pattern for Serverless Functions ---
// This prevents memory leaks by reusing the connection pool.

function getPoolSingleton() {
  const pool = new Pool({
    connectionString: connectionString,
    // Add SSL for external databases like Neon/Render
    ssl: {
      rejectUnauthorized: false // Necessary for many cloud DBs
    }
  });

  // Attach the pool to the global object in development, otherwise return it.
  if (process.env.NODE_ENV === 'production') {
    return pool;
  } else {
    // @ts-ignore
    if (!global.pgPool) {
        // @ts-ignore
        global.pgPool = pool;
    }
    // @ts-ignore
    return global.pgPool;
  }
}

// @ts-ignore
const pool: Pool = getPoolSingleton();


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

// ... keep your getRecentThreats and getAverageRiskScore functions ...
// (They do not need modification)
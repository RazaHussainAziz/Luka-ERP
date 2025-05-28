process.loadEnvFile('./.env');
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

await pool.connect();
pool.on('connect', () => {
  console.log('connected to database');
});

export default pool;

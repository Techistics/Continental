import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  
});
pool.connect()
  .then(() => console.log("✅ Connected to Neon"))
  .catch(err => console.error("❌ DB connection error:", err));


export default pool;



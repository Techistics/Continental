import { Pool } from "pg";

declare global {
  var cachedPool: Pool | undefined;
}

const pool =
  global.cachedPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  global.cachedPool = pool;
}

export default pool;

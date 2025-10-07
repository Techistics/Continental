import { NextResponse } from "next/server";
import pool from "../../../../db/index";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return NextResponse.json({ db_time: result.rows[0].now });
  } catch (err) {
    console.error("❌ DB test error:", err);
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
  }
}

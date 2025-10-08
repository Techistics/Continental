import { NextResponse } from "next/server";
import pool from "../../../../db"; // adjust path

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM menu"); // table name
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ API /menu error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

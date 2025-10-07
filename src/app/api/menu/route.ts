import { NextResponse } from "next/server";
import pool from "../../../../db"; // adjust path

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM menu"); // table name
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
      
    );
  }
}

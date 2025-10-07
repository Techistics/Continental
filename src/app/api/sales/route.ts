import { NextResponse } from "next/server";
import pool from "../../../../db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "7", 10);

    const query = `
      SELECT m.name, SUM(o.quantity) AS total_sold
      FROM orders o
      JOIN menu m ON m.id = o.menu_id
      WHERE o.order_date >= NOW() - INTERVAL '${days} days'
      GROUP BY m.name
      ORDER BY total_sold DESC;
    `;

    const { rows } = await pool.query(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 });
  }
}

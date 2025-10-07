import { NextResponse } from "next/server";
import pool from "../../../../../../db/index";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query("DELETE FROM MenuItems WHERE id = $1 RETURNING *", [params.id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, price, imageUrl } = await req.json();

    const result = await pool.query(
      `UPDATE MenuItems 
       SET name = $1, description = $2, price = $3, imageUrl = $4 
       WHERE id = $5 RETURNING *`,
      [name, description, price, imageUrl, params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating item:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

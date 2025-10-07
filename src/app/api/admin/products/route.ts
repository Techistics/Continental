import { NextResponse } from "next/server";
import pool from "../../../../../db";

type ReqBody = {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
};

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM menu");
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { name, price, description, category, image_url } = body;

    if (!name || !price || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO menu (name, price, description, category, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, description, category, image_url || null]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, price, description, category, image_url } = body;

    if (!id || !name || !price || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { rows } = await pool.query(
      `UPDATE menu
       SET name=$1, price=$2, description=$3, category=$4, image_url=$5
       WHERE id=$6
       RETURNING *`,
      [name, price, description, category, image_url || null, id]
    );

    return NextResponse.json(rows[0], { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM menu WHERE id = $1", [id]);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

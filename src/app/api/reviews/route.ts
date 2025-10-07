import { NextResponse} from "next/server";
import pool from "../../../../db"; 
import { getAuth } from "@clerk/nextjs/server"; 
import type { NextRequest } from "next/server";

type ReqBody = {
  product_id: number;
  rating: number;
  comment?: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("product_id");
    if (!productId) {
      return NextResponse.json({ error: "Missing product_id" }, { status: 400 });
    }

    const { rows } = await pool.query(
      "SELECT id, user_id, rating, comment, created_at FROM reviews WHERE product_id = $1 ORDER BY created_at DESC",
      [productId]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ReqBody;
    const { product_id, rating, comment } = body;

    if (!product_id || !rating) {
      return NextResponse.json({ error: "product_id and rating are required" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "rating must be between 1 and 5" }, { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO reviews (user_id, product_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, product_id, rating, comment, created_at`,
      [userId, product_id, rating, comment || null]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    // Ensure proper typing of items
    const lineItems = (items as { name: string; price: number; quantity: number }[]).map(
      (item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100), // convert dollars to cents
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "An unknown error occurred during Stripe checkout.";

    console.error("❌ Stripe Checkout Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

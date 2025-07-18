// app/api/stripe/checkout/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { userId, plano } = await req.json();

  const prices = {
    basic: "price_1XXXXXXXBASIC", // Substitua pelos IDs reais do Stripe
    pro: "price_1XXXXXXXPROF",
  };

  if (!prices[plano]) {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: prices[plano],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/sucesso?plano=${plano}&userId=${userId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/upgrade`,
  });

  return NextResponse.json({ url: session.url });
}

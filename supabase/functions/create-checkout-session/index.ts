import Stripe from "https://esm.sh/stripe@16.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();
  const cartId = body.cartId as string | undefined;

  if (!cartId) {
    return Response.json({ error: "cartId is required" }, { status: 400 });
  }

  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      unit_price_cents,
      product_variants (
        id,
        name,
        products (
          name
        )
      )
    `)
    .eq("cart_id", cartId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!cartItems?.length) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const lineItems = cartItems.map((item: any) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.unit_price_cents,
      product_data: {
        name: item.product_variants?.products?.name ?? "Durti-Ryce merch",
        description: item.product_variants?.name ?? undefined,
      },
    },
  }));

  const baseUrl = Deno.env.get("APP_BASE_URL") ?? "http://localhost:8081";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    metadata: {
      cart_id: cartId,
    },
  });

  return Response.json({
    checkoutUrl: session.url,
    checkoutSessionId: session.id,
  });
});

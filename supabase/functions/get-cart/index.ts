import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json().catch(() => ({}));
  const guestToken = body.guestToken as string | undefined;

  if (!guestToken) {
    return Response.json({ error: "guestToken is required" }, { status: 400 });
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id, guest_token, status, currency")
    .eq("guest_token", guestToken)
    .eq("status", "active")
    .maybeSingle();

  if (cartError) {
    return Response.json({ error: cartError.message }, { status: 500 });
  }

  if (!cart) {
    return Response.json({ cart: null, items: [] });
  }

  const { data: items, error: itemsError } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      unit_price_cents,
      product_id,
      variant_id,
      products (
        name,
        image_url,
        product_url
      ),
      product_variants (
        name,
        color,
        size
      )
    `)
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: true });

  if (itemsError) {
    return Response.json({ error: itemsError.message }, { status: 500 });
  }

  return Response.json({ cart, items: items ?? [] });
});

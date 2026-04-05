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
  const cartId = body.cartId as string | undefined;
  const variantId = body.variantId as string | undefined;
  const quantity = Number(body.quantity ?? 1);

  if (!cartId || !variantId) {
    return Response.json({ error: "cartId and variantId are required" }, { status: 400 });
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return Response.json({ error: "quantity must be greater than 0" }, { status: 400 });
  }

  const { data: variant, error: variantError } = await supabase
    .from("product_variants")
    .select("id, product_id, price_cents")
    .eq("id", variantId)
    .single();

  if (variantError || !variant) {
    return Response.json({ error: "Variant not found" }, { status: 404 });
  }

  const { data: existingItem, error: findError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("variant_id", variantId)
    .maybeSingle();

  if (findError) {
    return Response.json({ error: findError.message }, { status: 500 });
  }

  if (existingItem) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + quantity,
      })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ item: data, updated: true });
  }

  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      cart_id: cartId,
      product_id: variant.product_id,
      variant_id: variant.id,
      quantity,
      unit_price_cents: variant.price_cents,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ item: data, created: true });
});

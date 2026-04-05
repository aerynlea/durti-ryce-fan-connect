import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

function createGuestToken() {
  return crypto.randomUUID();
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json().catch(() => ({}));
  const guestToken = body.guestToken ?? createGuestToken();

  const { data: existingCart, error: findError } = await supabase
    .from("carts")
    .select("id, guest_token, status, currency")
    .eq("guest_token", guestToken)
    .eq("status", "active")
    .maybeSingle();

  if (findError) {
    return Response.json({ error: findError.message }, { status: 500 });
  }

  if (existingCart) {
    return Response.json({
      cart: existingCart,
      guestToken,
      created: false,
    });
  }

  const { data: createdCart, error: createError } = await supabase
    .from("carts")
    .insert({
      guest_token: guestToken,
      status: "active",
      currency: "usd",
    })
    .select("id, guest_token, status, currency")
    .single();

  if (createError) {
    return Response.json({ error: createError.message }, { status: 500 });
  }

  return Response.json({
    cart: createdCart,
    guestToken,
    created: true,
  });
});

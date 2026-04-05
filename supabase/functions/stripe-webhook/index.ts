import Stripe from "https://esm.sh/stripe@16.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

async function createPrintfulOrder(_session: Stripe.Checkout.Session) {
  // Placeholder for the Printful API call.
  // In the next phase this should:
  // 1. Read the order items from Supabase
  // 2. Map them to Printful variant IDs
  // 3. Send recipient + item data to Printful
  // 4. Save the returned Printful order ID
  return null;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = request.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature ?? "", webhookSecret);
  } catch (error) {
    return Response.json({ error: "Invalid signature", details: String(error) }, { status: 400 });
  }

  const { error: upsertError } = await supabase
    .from("webhook_events")
    .upsert({
      provider: "stripe",
      provider_event_id: event.id,
      event_type: event.type,
      payload: event,
      processed_at: new Date().toISOString(),
    });

  if (upsertError) {
    return Response.json({ error: upsertError.message }, { status: 500 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const cartId = session.metadata?.cart_id;

    if (cartId) {
      await supabase
        .from("carts")
        .update({ status: "converted" })
        .eq("id", cartId);
    }

    await createPrintfulOrder(session);
  }

  return Response.json({ received: true });
});

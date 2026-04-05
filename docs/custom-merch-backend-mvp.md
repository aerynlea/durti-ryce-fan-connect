# Custom Merch Backend MVP

## Goal

Build one shared merch system for the Durti-Ryce app and web experience.

This replaces the current split behavior where:

- the app has a local cart
- the website has a separate Bandzoogle cart
- checkout only works fully on the website

The MVP goal is to make the app and web storefront use the same product catalog, cart, checkout, and fulfillment flow.

## Recommended Stack

### Frontend

- Expo / React Native for the mobile app
- Expo web or a future Next.js storefront for browser access

### Backend

- Supabase Postgres for data
- Supabase Edge Functions for secure server logic
- Stripe Checkout Sessions for payment
- Printful API for product sync and order fulfillment

### Why this stack

- Supabase keeps auth, database, and server-side functions in one place
- Stripe Checkout is the fastest secure payment route for MVP
- Printful handles production and shipping once an order is paid
- The app can stay focused on the fan experience instead of custom payment logic

## System Overview

1. Products and variants are synced from Printful into Supabase
2. The app reads products from Supabase instead of hardcoded merch objects
3. Users add items to a shared cart in Supabase
4. The app sends the cart to a checkout function
5. The checkout function creates a Stripe Checkout Session
6. The user completes payment in Stripe
7. A Stripe webhook marks the order paid
8. The webhook calls Printful to create the fulfillment order
9. Printful produces and ships the merch

## Core Services

### App

- Reads products
- Manages cart UI
- Starts checkout
- Shows order status

### Supabase

- Stores products, variants, carts, and orders
- Stores user or guest cart state
- Exposes secure server functions

### Stripe

- Processes payments
- Sends webhook events when checkout completes

### Printful

- Provides product and variant data
- Accepts fulfillment orders after payment

## Data Model

### Products

Used for merch cards and product detail pages.

Fields:

- `id`
- `slug`
- `name`
- `description`
- `image_url`
- `badge`
- `active`
- `printful_product_id`
- `created_at`
- `updated_at`

### Product Variants

Used for size, color, price, and availability.

Fields:

- `id`
- `product_id`
- `name`
- `sku`
- `color`
- `size`
- `price_cents`
- `currency`
- `image_url`
- `active`
- `printful_variant_id`
- `created_at`
- `updated_at`

### Carts

One cart per signed-in user or guest session.

Fields:

- `id`
- `user_id`
- `guest_token`
- `status`
- `currency`
- `created_at`
- `updated_at`

### Cart Items

Individual items inside a cart.

Fields:

- `id`
- `cart_id`
- `product_id`
- `variant_id`
- `quantity`
- `unit_price_cents`
- `created_at`
- `updated_at`

### Orders

Created before checkout, finalized after Stripe payment.

Fields:

- `id`
- `user_id`
- `email`
- `status`
- `currency`
- `subtotal_cents`
- `shipping_cents`
- `tax_cents`
- `total_cents`
- `stripe_checkout_session_id`
- `stripe_payment_intent_id`
- `printful_order_id`
- `shipping_name`
- `shipping_phone`
- `shipping_address_1`
- `shipping_address_2`
- `shipping_city`
- `shipping_state`
- `shipping_postal_code`
- `shipping_country`
- `created_at`
- `updated_at`

### Order Items

Snapshot of what was purchased.

Fields:

- `id`
- `order_id`
- `product_id`
- `variant_id`
- `product_name`
- `variant_name`
- `quantity`
- `unit_price_cents`
- `created_at`

### Webhook Events

Used so Stripe webhooks can be safely retried.

Fields:

- `id`
- `provider`
- `provider_event_id`
- `event_type`
- `processed_at`
- `payload`

## API Surface

### Public app routes

#### `GET /api/products`

Returns active products and primary images.

#### `GET /api/products/:slug`

Returns a product plus variants.

#### `GET /api/cart`

Returns the current user or guest cart.

#### `POST /api/cart/items`

Adds a variant to the cart.

Body:

```json
{
  "variantId": "uuid",
  "quantity": 1
}
```

#### `PATCH /api/cart/items/:id`

Updates quantity.

Body:

```json
{
  "quantity": 2
}
```

#### `DELETE /api/cart/items/:id`

Removes an item from the cart.

#### `POST /api/checkout/session`

Creates a Stripe Checkout Session from the current cart.

Response:

```json
{
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

### Server-only routes/functions

#### `POST /api/internal/printful/sync`

Pulls product and variant data from Printful.

#### `POST /api/webhooks/stripe`

Handles Stripe events:

- `checkout.session.completed`
- `payment_intent.payment_failed`

## Environment Variables

### Public

- `EXPO_PUBLIC_API_URL`

### Server only

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_CURRENCY`
- `PRINTFUL_API_TOKEN`
- `PRINTFUL_STORE_ID`
- `APP_BASE_URL`

## Implementation Order

### Phase 1: Foundation

1. Create a Supabase project
2. Run the schema in `supabase/schema.sql`
3. Add environment variables
4. Create a Printful API store
5. Generate Stripe API keys

### Phase 2: Product Sync

1. Build the Printful sync function
2. Import live merch into `products` and `product_variants`
3. Replace hardcoded merch in `App.js` with API-driven data

### Phase 3: Shared Cart

1. Create guest cart logic using a stored token
2. Build `GET /api/cart`
3. Build add, update, and remove cart item endpoints
4. Replace local React cart state with backend calls

### Phase 4: Checkout

1. Create the Stripe Checkout Session function
2. Send the current cart to Stripe
3. Redirect the user to Stripe Checkout

### Phase 5: Fulfillment

1. Add Stripe webhook handling
2. Create an order record when checkout succeeds
3. Send the paid order to Printful
4. Save the Printful order ID

### Phase 6: Post-purchase

1. Add success and cancel screens
2. Add order status view
3. Add basic admin visibility for orders

## MVP Scope

Build now:

- product catalog
- color and size variants
- shared cart
- Stripe checkout
- Printful fulfillment
- order confirmation

Save for later:

- loyalty system
- discount logic
- subscriptions
- multi-address shipping
- advanced admin dashboard
- SMS notifications

## Immediate Next Steps

1. Create the Supabase project
2. Add the schema file
3. Create Printful API credentials
4. Create Stripe test keys
5. Replace the local cart in the app with API calls

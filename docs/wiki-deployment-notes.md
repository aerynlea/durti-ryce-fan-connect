# Deployment Notes

This page captures the current deployment picture for **Durti-Ryce Fan Connect** and the setup needed to move from local development toward a more production-ready workflow.

## Current Deployment Status

The app currently runs locally through Expo.

At this stage, the repository includes:

- the Expo app
- starter Supabase wiring for merch data
- starter Supabase Edge Functions
- Stripe webhook and checkout scaffolding
- Printful sync scaffolding

Some backend pieces are planned and partially scaffolded, but they are not yet fully deployed end to end.

## App Runtime

Current local run command:

- `npm start`

Other available scripts:

- `npm run android`
- `npm run ios`
- `npm run web`

## Environment Variables

The project already references environment values for local and backend-connected behavior.

Frontend environment values:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_API_URL`

Server and function environment values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_CURRENCY`
- `PRINTFUL_API_TOKEN`
- `PRINTFUL_STORE_ID`

## Database Setup

Supabase SQL files included in the repository:

- `supabase/schema.sql`
- `supabase/seed-sample-merch.sql`

Recommended order:

1. create or open the Supabase project
2. run `supabase/schema.sql`
3. optionally run `supabase/seed-sample-merch.sql`
4. confirm products and variants are available

## Edge Functions

The repository includes these starter functions:

- `create-checkout-session`
- `stripe-webhook`
- `sync-printful-products`
- `get-or-create-cart`
- `get-cart`
- `upsert-cart-item`

Before these can work in production, they still need:

- deployment to Supabase Edge Functions
- environment secrets added in Supabase
- endpoint testing
- verification of request and response behavior

## Checkout And Fulfillment Notes

The intended backend flow is:

1. the app reads products from Supabase
2. the user adds items to a shared cart
3. checkout is created through Stripe
4. Stripe sends a webhook event after payment
5. the backend records the order
6. Printful receives fulfillment data

At the moment, this exists as scaffolded backend direction rather than a fully released production system.

## Suggested Release Checklist

Before treating the backend flow as production-ready, confirm:

1. Expo app runs cleanly in local testing
2. Supabase schema is applied
3. sample or real merch data is available
4. required environment variables are set
5. Edge Functions are deployed
6. Stripe webhook events are verified
7. checkout success and cancel flows are tested
8. Printful sync behavior is validated

## Documentation Notes

For project continuity, it would help to keep this page updated whenever:

- a new environment variable is added
- a deployment step changes
- a backend service is connected
- a release process becomes standardized

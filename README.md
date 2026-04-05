# Durti-Ryce Fan Connect

Durti-Ryce Fan Connect is a mobile-first Expo + React Native fan app designed to give supporters one home for the full artist experience.

The app brings together:

- show dates and ticket links
- music and video access
- merchandise browsing
- fan club entry points
- newsletter signup
- artist profiles
- social and contact links

## Project Goal

Create a clean, accessible fan platform that makes it easy for supporters to:

- find the next show quickly
- buy tickets in as few taps as possible
- shop merch
- stay connected to the band
- discover artist profiles and social links
- join the fan community

## Current Features

- `Home` screen with a branded hero, next show, merch highlights, and newsletter signup
- `Shows` tab with upcoming live dates, venue details, ticket links, and map links
- `Music` tab with audio and video hub links
- `Merch` tab with live store-inspired products, images, pricing, cart behavior, and checkout handoff
- `Artists` tab with profile sections for Deron, Hunter Lane, and Monique Renée
- `Fan Club` tab with membership tier links
- `More` tab with booking, social, and contact access

## Merch Integration

The merch section is currently connected to the live Durti-Ryce store flow by linking users to the real store/product pages for final checkout.

Current in-app merch experience:

- browse featured products
- add products to a local cart
- review quantities and totals
- continue to the live store for checkout

## Tech Stack

- `Expo`
- `React Native`
- `JavaScript`

## Custom Merch Backend Plan

The project now includes starter planning files for a true shared merch system using:

- `Supabase` for database and server functions
- `Stripe` for checkout
- `Printful` for fulfillment

Files added for this:

- [docs/custom-merch-backend-mvp.md](/Users/aerynwoullard/TEST/band-news-app/docs/custom-merch-backend-mvp.md)
- [supabase/schema.sql](/Users/aerynwoullard/TEST/band-news-app/supabase/schema.sql)
- [supabase/seed-sample-merch.sql](/Users/aerynwoullard/TEST/band-news-app/supabase/seed-sample-merch.sql)
- [supabase/functions/create-checkout-session/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/create-checkout-session/index.ts)
- [supabase/functions/stripe-webhook/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/stripe-webhook/index.ts)
- [supabase/functions/sync-printful-products/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/sync-printful-products/index.ts)
- [supabase/functions/get-or-create-cart/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/get-or-create-cart/index.ts)
- [supabase/functions/get-cart/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/get-cart/index.ts)
- [supabase/functions/upsert-cart-item/index.ts](/Users/aerynwoullard/TEST/band-news-app/supabase/functions/upsert-cart-item/index.ts)
- [.env.example](/Users/aerynwoullard/TEST/band-news-app/.env.example)

## Phase 1 Wiring

The app is now wired for the first Supabase integration step:

- [lib/supabase.js](/Users/aerynwoullard/TEST/band-news-app/lib/supabase.js) creates the client
- [lib/merch.js](/Users/aerynwoullard/TEST/band-news-app/lib/merch.js) fetches and normalizes products
- [lib/cart.js](/Users/aerynwoullard/TEST/band-news-app/lib/cart.js) is ready for the shared cart function endpoints
- [`App.js`](/Users/aerynwoullard/TEST/band-news-app/App.js) can now read merch from Supabase when env vars are present

To finish phase 1 locally you still need to:

1. Add your values to `.env`
2. Run the Supabase schema
3. Install the new dependency:

```bash
npm install
```

To see Supabase-backed merch right away:

1. Run [seed-sample-merch.sql](/Users/aerynwoullard/TEST/band-news-app/supabase/seed-sample-merch.sql) in the Supabase SQL Editor
2. Restart Expo
3. Open the `Merch` tab and look for the catalog status message confirming Supabase-backed merch

## Next Shared Backend Step

The project now also includes starter guest-cart function scaffolding for:

- creating or reusing a guest cart
- loading cart items
- adding variants to the shared cart

Before those functions can be used end-to-end, you still need to:

1. deploy the Supabase Edge Functions
2. add `EXPO_PUBLIC_API_URL` to `.env`
3. add `SUPABASE_SERVICE_ROLE_KEY` for server-side function access

## Run Locally

1. Open a terminal in the project folder:

```bash
cd /Users/aerynwoullard/TEST/band-news-app
```

2. Install dependencies:

```bash
npm install
```

3. Start Expo:

```bash
npm start
```

4. Open the app in Expo Go on your phone by scanning the QR code.

## GitHub Workflow

When you make changes and want to upload them to GitHub:

```bash
git add .
git commit -m "Describe your update"
git push
```

## Roadmap

- connect newsletter signup to a real email platform
- improve merch checkout flow with deeper store integration
- add more artist profiles and media
- add push notifications
- add fan club exclusives and premium content
- improve navigation with a more native mobile tab system

## Repository

GitHub repo:

[https://github.com/aerynlea/durti-ryce-fan-connect](https://github.com/aerynlea/durti-ryce-fan-connect)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

type PrintfulListResponse = {
  result?: Array<{
    id: number;
    name: string;
    thumbnail_url?: string;
  }>;
};

type PrintfulProductResponse = {
  result?: {
    sync_product?: {
      id: number;
      name: string;
      thumbnail_url?: string;
    };
    sync_variants?: Array<{
      id: number;
      name: string;
      retail_price?: string;
      files?: Array<{ preview_url?: string }>;
      product?: {
        image?: string;
      };
      color?: string;
      size?: string;
    }>;
  };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function priceStringToCents(value?: string) {
  if (!value) {
    return 0;
  }

  return Math.round(Number(value) * 100);
}

async function fetchPrintful(path: string) {
  const response = await fetch(`https://api.printful.com${path}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("PRINTFUL_API_TOKEN") ?? ""}`,
      "X-PF-Store-Id": Deno.env.get("PRINTFUL_STORE_ID") ?? "",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Printful request failed: ${response.status} ${body}`);
  }

  return response.json();
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const productList = (await fetchPrintful("/sync/products")) as PrintfulListResponse;
    const products = productList.result ?? [];

    for (const product of products) {
      const details = (await fetchPrintful(`/sync/products/${product.id}`)) as PrintfulProductResponse;
      const syncProduct = details.result?.sync_product;
      const syncVariants = details.result?.sync_variants ?? [];

      if (!syncProduct) {
        continue;
      }

      const slug = slugify(syncProduct.name);

      const { data: savedProduct, error: productError } = await supabase
        .from("products")
        .upsert(
          {
            slug,
            name: syncProduct.name,
            description: `Synced from Printful store ${Deno.env.get("PRINTFUL_STORE_ID") ?? ""}.`,
            image_url: syncProduct.thumbnail_url ?? product.thumbnail_url ?? null,
            badge: "Synced from Printful",
            printful_product_id: syncProduct.id,
          },
          { onConflict: "slug" },
        )
        .select("id")
        .single();

      if (productError) {
        throw productError;
      }

      for (const variant of syncVariants) {
        const previewImage =
          variant.files?.find((file) => file.preview_url)?.preview_url ??
          variant.product?.image ??
          syncProduct.thumbnail_url ??
          null;

        const inferredColor = variant.color ?? variant.name.split(" / ")[0] ?? null;
        const inferredSize = variant.size ?? variant.name.split(" / ")[1] ?? null;

        const { error: variantError } = await supabase
          .from("product_variants")
          .upsert(
            {
              product_id: savedProduct.id,
              name: variant.name,
              color: inferredColor,
              size: inferredSize,
              price_cents: priceStringToCents(variant.retail_price),
              currency: "usd",
              image_url: previewImage,
              printful_variant_id: variant.id,
            },
            { onConflict: "printful_variant_id" },
          );

        if (variantError) {
          throw variantError;
        }
      }
    }

    return Response.json({
      ok: true,
      syncedProducts: products.length,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
});

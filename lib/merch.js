import { supabase } from "./supabase";

export function buildDefaultSelections(items) {
  return {
    colors: Object.fromEntries(
      items
        .filter((item) => item.colors?.length)
        .map((item) => [item.id, item.colors[0]]),
    ),
    sizes: Object.fromEntries(
      items
        .filter((item) => item.sizes?.length)
        .map((item) => [item.id, item.sizes[0]]),
    ),
  };
}

function centsToDollars(value) {
  return Number((value ?? 0) / 100);
}

export function normalizeProducts(rows) {
  return rows.map((row) => {
    const variants = (row.product_variants ?? []).filter((variant) => variant.active);
    const prices = variants.map((variant) => centsToDollars(variant.price_cents));
    const colors = [...new Set(variants.map((variant) => variant.color).filter(Boolean))];
    const sizes = [...new Set(variants.map((variant) => variant.size).filter(Boolean))];

    return {
      id: row.slug || row.id,
      name: row.name,
      price: prices.length ? Math.min(...prices) : 0,
      description: row.description || "Live store item from the shared merch backend.",
      badge: row.badge || "Backend product",
      image: row.image_url,
      productUrl: row.product_url || null,
      colors: colors.length ? colors : undefined,
      sizes: sizes.length ? sizes : undefined,
    };
  });
}

export async function fetchMerchCatalog() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      slug,
      name,
      description,
      image_url,
      product_url,
      badge,
      active,
      product_variants (
        id,
        name,
        color,
        size,
        price_cents,
        image_url,
        active
      )
    `)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return normalizeProducts(data ?? []);
}

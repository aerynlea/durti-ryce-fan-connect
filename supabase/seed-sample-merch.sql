insert into public.products (
  slug,
  name,
  description,
  image_url,
  product_url,
  badge,
  printful_product_id
)
values
  (
    'durti-ryce-limited-hoodie',
    'Durti-Ryce Nation - Limited Edition Hoodie',
    'Heavyweight signature hoodie from the live Durti-Ryce store.',
    'https://files.cdn.printful.com/files/503/5031b695ac648859c3a5567678f43e7e_preview.png',
    'https://durtiryce.com/product/1227977-durti-ryce-nation-limited-edition-hoodie',
    'Backend sample product',
    1227977
  ),
  (
    'durti-ryce-limited-vneck',
    'Durti-Ryce Nation - Limited Edition Women’s relaxed v-neck t-shirt',
    'Soft relaxed-fit V-neck tee pulled directly from the current Durti-Ryce merch page.',
    'https://files.cdn.printful.com/files/aa4/aa4b1c079c913c5b8b605d6ded0f5a2d_preview.png',
    'https://durtiryce.com/product/1228840-durti-ryce-nation-limited-edition-women-s-relaxed-v-neck-t-shirt',
    'Backend sample product',
    1228840
  ),
  (
    'durti-ryce-limited-cap',
    'Durti-Ryce Nation - Limited Edition Structured Twill Cap',
    'Limited edition structured twill cap with stretch-band sizing from the live store.',
    'https://files.cdn.printful.com/files/c58/c58434acea323ec3e7518507fbdd169b_preview.png',
    'https://durtiryce.com/product/1228390-durti-ryce-nation-limited-edition-structured-twill-cap',
    'Backend sample product',
    1228390
  ),
  (
    'durti-ryce-black-glossy-mug',
    'Durti-Ryce Nation - Limited Edition Black Glossy Mug',
    'A glossy ceramic mug from the live store with Durti-Ryce branding.',
    'https://files.cdn.printful.com/files/125/125a67b6537deab334bd763b12db93a8_preview.png',
    'https://durtiryce.com/product/1228511-durti-ryce-nation-limited-edition-black-glossy-mug',
    'Backend sample product',
    1228511
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  product_url = excluded.product_url,
  badge = excluded.badge,
  printful_product_id = excluded.printful_product_id,
  updated_at = now();

insert into public.product_variants (
  product_id,
  name,
  color,
  size,
  price_cents,
  currency,
  image_url,
  printful_variant_id
)
select p.id, v.name, v.color, v.size, v.price_cents, 'usd', v.image_url, v.printful_variant_id
from (
  values
    (
      'durti-ryce-limited-hoodie',
      'Black / S',
      'Black',
      'S',
      8000,
      'https://files.cdn.printful.com/files/503/5031b695ac648859c3a5567678f43e7e_preview.png',
      122797701
    ),
    (
      'durti-ryce-limited-hoodie',
      'Black / M',
      'Black',
      'M',
      8000,
      'https://files.cdn.printful.com/files/503/5031b695ac648859c3a5567678f43e7e_preview.png',
      122797702
    ),
    (
      'durti-ryce-limited-vneck',
      'Solid Black Blend / S',
      'Solid Black Blend',
      'S',
      3500,
      'https://files.cdn.printful.com/files/aa4/aa4b1c079c913c5b8b605d6ded0f5a2d_preview.png',
      122884001
    ),
    (
      'durti-ryce-limited-vneck',
      'Solid Black Blend / M',
      'Solid Black Blend',
      'M',
      3500,
      'https://files.cdn.printful.com/files/aa4/aa4b1c079c913c5b8b605d6ded0f5a2d_preview.png',
      122884002
    ),
    (
      'durti-ryce-limited-vneck',
      'Solid White Blend / S',
      'Solid White Blend',
      'S',
      3500,
      'https://files.cdn.printful.com/files/066/066fd0d78cbadf40025d0c31721d2866_preview.png',
      122884003
    ),
    (
      'durti-ryce-limited-cap',
      'White / S/M',
      'White',
      'S/M',
      3500,
      'https://files.cdn.printful.com/files/c58/c58434acea323ec3e7518507fbdd169b_preview.png',
      122839001
    ),
    (
      'durti-ryce-limited-cap',
      'White / L/XL',
      'White',
      'L/XL',
      3500,
      'https://files.cdn.printful.com/files/c58/c58434acea323ec3e7518507fbdd169b_preview.png',
      122839002
    ),
    (
      'durti-ryce-black-glossy-mug',
      'Default',
      null,
      null,
      1500,
      'https://files.cdn.printful.com/files/125/125a67b6537deab334bd763b12db93a8_preview.png',
      122851101
    )
) as v(slug, name, color, size, price_cents, image_url, printful_variant_id)
join public.products p on p.slug = v.slug
on conflict (printful_variant_id) do update
set
  name = excluded.name,
  color = excluded.color,
  size = excluded.size,
  price_cents = excluded.price_cents,
  image_url = excluded.image_url,
  updated_at = now();

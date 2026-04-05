const apiUrl = process.env.EXPO_PUBLIC_API_URL;

async function postJson(path, body) {
  if (!apiUrl) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export async function getOrCreateGuestCart(guestToken) {
  return postJson("/functions/v1/get-or-create-cart", { guestToken });
}

export async function fetchGuestCart(guestToken) {
  return postJson("/functions/v1/get-cart", { guestToken });
}

export async function addItemToGuestCart(cartId, variantId, quantity = 1) {
  return postJson("/functions/v1/upsert-cart-item", {
    cartId,
    variantId,
    quantity,
  });
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { decrementStock, getProductById, incrementStock } from "@/lib/db";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

function parseCart(raw: string | undefined): CartItem[] {
  if (!raw) return [];
  try {
    return JSON.parse(decodeURIComponent(raw)) as CartItem[];
  } catch {
    return [];
  }
}

function serializeCart(cart: CartItem[]): string {
  return encodeURIComponent(JSON.stringify(cart));
}

// Called from DynamicCart — cookies() is invoked here in a Server Action
// (not inside a "use cache" boundary), so it's safe.
export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  return parseCart(cookieStore.get("cart")?.value);
}

export async function addToCart(productId: number) {
  // cookies() is called here at the Server Action level — outside any cache scope
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get("cart")?.value);
  const product = await getProductById(productId);

  if (!product) throw new Error(`Product ${productId} not found`);

  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  await decrementStock(productId);

  cookieStore.set("cart", serializeCart(cart), {
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearCart() {
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get("cart")?.value);

  await Promise.all(cart.map((item) => incrementStock(item.productId)));

  cookieStore.delete("cart");
  revalidatePath("/07-ppr-suspense");
}

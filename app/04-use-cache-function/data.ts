import { cacheLife, cacheTag } from "next/cache";
import { getAllProducts, getProductById } from "@/lib/db";

export async function getCachedProducts() {
  "use cache";
  cacheLife("demo_short");
  cacheTag("products");
  return getAllProducts();
}

export async function getCachedProduct(id: number) {
  "use cache";
  cacheLife("demo_short");
  cacheTag("products", `product-${id}`);
  return getProductById(id);
}

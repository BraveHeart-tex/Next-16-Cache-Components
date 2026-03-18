export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    price: 149,
    stock: 12,
    category: "peripherals",
  },
  { id: 2, name: "USB-C Hub", price: 59, stock: 34, category: "peripherals" },
  { id: 3, name: "Webcam HD", price: 89, stock: 7, category: "video" },
  {
    id: 4,
    name: "Monitor Stand",
    price: 45,
    stock: 23,
    category: "accessories",
  },
  { id: 5, name: "Desk Mat XL", price: 35, stock: 56, category: "accessories" },
];

let nextId = 6;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAllProducts(): Promise<Product[]> {
  await delay(2000);
  return [...products];
}

export async function getProductById(id: number): Promise<Product | null> {
  await delay(280);
  return products.find((p) => p.id === id) ?? null;
}

export async function addProduct(
  name: string,
  price: number,
  category: string,
): Promise<Product> {
  await delay(250);
  const product: Product = { id: nextId++, name, price, stock: 10, category };
  products.push(product);
  return product;
}

export async function updateProductName(
  id: number,
  name: string,
): Promise<Product | null> {
  await delay(250);
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  product.name = name;
  return { ...product };
}

export async function decrementStock(id: number): Promise<Product | null> {
  await delay(250);
  const product = products.find((p) => p.id === id);
  if (!product || product.stock === 0) return null;
  product.stock -= 1;
  return { ...product };
}

export async function incrementStock(id: number): Promise<Product | null> {
  await delay(250);
  const product = products.find((p) => p.id === id);
  if (!product || product.stock === 0) return null;
  product.stock += 1;
  return { ...product };
}

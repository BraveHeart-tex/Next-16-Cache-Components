'use server'

import { revalidateTag, updateTag } from 'next/cache'
import { addProduct, updateProductName } from '@/lib/db'

// revalidateTag: stale-while-revalidate
// First refresh after this still shows old data. Second refresh shows new.
export async function addProductSWR(formData: FormData) {
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  await addProduct(name, price, 'accessories')
  revalidateTag('products', 'max')
}

// updateTag: immediate, read-your-own-writes
// Next refresh after this shows new data immediately.
export async function addProductImmediate(formData: FormData) {
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  await addProduct(name, price, 'accessories')
  updateTag('products')
}

// Also add an action that edits a product name (for the edit demo)
export async function renameProductImmediate(formData: FormData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name') as string
  await updateProductName(id, name)
  updateTag('products')
  updateTag(`product-\${id}`)
}

import { getProduct } from './data/products'
import { FREE_SHIPPING_MIN, SHIPPING_COST } from './format'
import type { CartItem } from './store/context'

export function cartTotals(cart: CartItem[]) {
  const subtotal = cart.reduce(
    (sum, item) => sum + (getProduct(item.id)?.price ?? 0) * item.qty,
    0,
  )
  const allFree = cart.every((item) => getProduct(item.id)?.freeShipping)
  const shipping = cart.length === 0 || allFree || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST
  return { subtotal, shipping, total: subtotal + shipping }
}

import { createContext, useContext } from 'react'

export type CartItem = { id: number; qty: number }

export type Store = {
  cart: CartItem[]
  cartCount: number
  favorites: number[]
  toast: string | null
  addToCart: (id: number, qty?: number) => void
  setQty: (id: number, qty: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  toggleFavorite: (id: number) => void
}

export const StoreContext = createContext<Store | null>(null)

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore precisa estar dentro de <StoreProvider>')
  return store
}

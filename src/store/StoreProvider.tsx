import { useEffect, useRef, useState, type ReactNode } from 'react'
import { getProduct } from '../data/products'
import { StoreContext, type CartItem } from './context'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load('cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => load('favorites', []))
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const showToast = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2500)
  }

  const clamp = (id: number, qty: number) =>
    Math.max(1, Math.min(qty, getProduct(id)?.stock ?? 1))

  const addToCart = (id: number, qty = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === id)
      if (!existing) return [...items, { id, qty: clamp(id, qty) }]
      return items.map((item) =>
        item.id === id ? { ...item, qty: clamp(id, item.qty + qty) } : item,
      )
    })
    showToast('Produto adicionado ao carrinho')
  }

  const setQty = (id: number, qty: number) =>
    setCart((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: clamp(id, qty) } : item)),
    )

  const removeFromCart = (id: number) =>
    setCart((items) => items.filter((item) => item.id !== id))

  const clearCart = () => setCart([])

  const toggleFavorite = (id: number) =>
    setFavorites((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]))

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <StoreContext
      value={{
        cart,
        cartCount,
        favorites,
        toast,
        addToCart,
        setQty,
        removeFromCart,
        clearCart,
        toggleFavorite,
      }}
    >
      {children}
    </StoreContext>
  )
}

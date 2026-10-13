import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

const getHash = () => window.location.hash.slice(1) || '/'

// Rotas baseadas em hash (#/produto/1) para não precisar de servidor nem de biblioteca.
export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash)
  const [path, query = ''] = hash.split('?')
  return { path, query }
}

export function navigate(to: string) {
  window.location.hash = to
}

import type { FormEvent } from 'react'
import { categories } from '../data/products'
import { navigate, useRoute } from '../router'
import { useStore } from '../store/context'

function Header() {
  const { cartCount, favorites } = useStore()
  const { query } = useRoute()
  const params = new URLSearchParams(query)
  const q = params.get('q') ?? ''
  const activeCat = params.get('cat')

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const term = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    navigate(term ? `/busca?q=${encodeURIComponent(term)}` : '/busca')
  }

  return (
    <header className="header">
      <div className="container header-main">
        <a href="#/" className="logo" aria-label="Mercadão — página inicial">
          <span className="logo-mark">🛒</span>
          <span>
            Merca<strong>dão</strong>
          </span>
        </a>

        <form className="search" onSubmit={onSearch} role="search" key={q}>
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Buscar produtos, marcas e muito mais…"
            aria-label="Buscar produtos"
          />
          <button type="submit" aria-label="Buscar">
            🔍
          </button>
        </form>

        <nav className="header-actions">
          <a href="#/favoritos" className="header-link">
            <span aria-hidden="true">♥</span>
            <span className="header-link-text">Favoritos</span>
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </a>
          <a href="#/carrinho" className="header-link">
            <span aria-hidden="true">🛒</span>
            <span className="header-link-text">Carrinho</span>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </a>
        </nav>
      </div>

      <div className="container header-cats">
        <a href="#/busca">
          Todos
        </a>
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`#/busca?cat=${encodeURIComponent(cat.name)}`}
            className={activeCat === cat.name ? 'active' : undefined}
          >
            {cat.name}
          </a>
        ))}
        <a href="#/busca?oferta=1" className="header-cats-offer">
          Ofertas do dia
        </a>
      </div>
    </header>
  )
}

export default Header

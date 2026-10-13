import type { Product } from '../data/products'
import { discount, money, soldLabel } from '../format'
import { useStore } from '../store/context'
import ProductImage from './ProductImage'

function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useStore()
  const isFavorite = favorites.includes(product.id)
  const off = discount(product.price, product.oldPrice)

  return (
    <article className="card">
      <button
        type="button"
        className={isFavorite ? 'fav-btn active' : 'fav-btn'}
        onClick={() => toggleFavorite(product.id)}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <a href={`#/produto/${product.id}`} className="card-link">
        <ProductImage product={product} />
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          {product.oldPrice && <s className="old-price">{money(product.oldPrice)}</s>}
          <div className="price-row">
            <span className="price">{money(product.price)}</span>
            {off > 0 && <span className="off">{off}% OFF</span>}
          </div>
          <p className="installments">em 10x {money(product.price / 10)} sem juros</p>
          {product.freeShipping && (
            <p className="shipping">
              Frete grátis {product.fast && <span className="fast">⚡ RÁPIDO</span>}
            </p>
          )}
          <p className="card-meta">
            <span className="stars">★</span> {product.rating.toFixed(1)} ·{' '}
            {soldLabel(product.sold)}
          </p>
        </div>
      </a>
    </article>
  )
}

export default ProductCard

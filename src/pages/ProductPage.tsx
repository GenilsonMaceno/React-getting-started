import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import { products, type Product } from '../data/products'
import { discount, money, soldLabel } from '../format'
import { navigate } from '../router'
import { useStore } from '../store/context'

function ProductPage({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore()
  const [qty, setQty] = useState(1)
  const isFavorite = favorites.includes(product.id)
  const off = discount(product.price, product.oldPrice)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5)

  const buyNow = () => {
    addToCart(product.id, qty)
    navigate('/carrinho')
  }

  return (
    <>
      <nav className="breadcrumb">
        <a href="#/">Início</a> ›{' '}
        <a href={`#/busca?cat=${encodeURIComponent(product.category)}`}>{product.category}</a>
      </nav>

      <div className="panel product">
        <ProductImage product={product} large />

        <div className="product-info">
          <p className="muted">Novo · {soldLabel(product.sold)}</p>
          <h1>{product.title}</h1>
          <p className="card-meta">
            <span className="stars">★</span> {product.rating.toFixed(1)} ({product.reviews}{' '}
            avaliações)
          </p>

          {product.oldPrice && <s className="old-price">{money(product.oldPrice)}</s>}
          <div className="price-row">
            <span className="price price-lg">{money(product.price)}</span>
            {off > 0 && <span className="off">{off}% OFF</span>}
          </div>
          <p className="installments">em 10x {money(product.price / 10)} sem juros</p>

          <h2>Sobre o produto</h2>
          <p>{product.description}</p>

          <h2>Características</h2>
          <table className="specs">
            <tbody>
              {product.specs.map(([name, value]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="buy-box">
          <p className="shipping">
            {product.freeShipping ? 'Frete grátis' : 'Frete a calcular no carrinho'}
            {product.fast && <span className="fast">⚡ RÁPIDO</span>}
          </p>
          <p className="muted">
            {product.fast ? 'Chega amanhã comprando hoje.' : 'Chega em até 7 dias úteis.'}
          </p>

          <p className="stock">
            <strong>Estoque disponível</strong> ({product.stock} unidades)
          </p>

          <div className="qty">
            <span>Quantidade</span>
            <button type="button" onClick={() => setQty(qty - 1)} disabled={qty <= 1} aria-label="Diminuir">
              −
            </button>
            <output>{qty}</output>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              disabled={qty >= product.stock}
              aria-label="Aumentar"
            >
              +
            </button>
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={buyNow}>
            Comprar agora
          </button>
          <button
            type="button"
            className="btn btn-soft btn-block"
            onClick={() => addToCart(product.id, qty)}
          >
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            className="btn btn-link btn-block"
            onClick={() => toggleFavorite(product.id)}
          >
            {isFavorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
          </button>

          <p className="seller">
            Vendido por <strong>{product.seller}</strong>
          </p>
          <p className="muted">🛡️ Compra garantida: receba o produto ou devolvemos seu dinheiro.</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="section-title">Quem viu este produto também viu</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ProductPage

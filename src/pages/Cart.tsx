import ProductImage from '../components/ProductImage'
import { getProduct } from '../data/products'
import { cartTotals } from '../cart'
import { FREE_SHIPPING_MIN, money } from '../format'
import { useStore } from '../store/context'
import type { CartItem } from '../store/context'

export function Summary({ cart }: { cart: CartItem[] }) {
  const { subtotal, shipping, total } = cartTotals(cart)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <dl className="summary">
      <div>
        <dt>Produtos ({count})</dt>
        <dd>{money(subtotal)}</dd>
      </div>
      <div>
        <dt>Frete</dt>
        <dd className={shipping === 0 ? 'free' : undefined}>
          {shipping === 0 ? 'Grátis' : money(shipping)}
        </dd>
      </div>
      <div className="summary-total">
        <dt>Total</dt>
        <dd>{money(total)}</dd>
      </div>
    </dl>
  )
}

function Cart() {
  const { cart, setQty, removeFromCart } = useStore()
  const { subtotal, shipping } = cartTotals(cart)

  if (cart.length === 0) {
    return (
      <div className="panel empty">
        <span aria-hidden="true">🛒</span>
        <h1>Seu carrinho está vazio</h1>
        <p>Que tal dar uma olhada nas ofertas do dia?</p>
        <a href="#/busca?oferta=1" className="btn btn-primary">
          Ver ofertas
        </a>
      </div>
    )
  }

  return (
    <div className="cart">
      <section className="panel">
        <h1 className="section-title">Carrinho de compras</h1>
        <ul className="cart-list">
          {cart.map((item) => {
            const product = getProduct(item.id)
            if (!product) return null
            return (
              <li key={item.id} className="cart-item">
                <a href={`#/produto/${product.id}`} className="cart-thumb">
                  <ProductImage product={product} />
                </a>
                <div className="cart-item-info">
                  <a href={`#/produto/${product.id}`}>{product.title}</a>
                  {product.freeShipping && <p className="shipping">Frete grátis</p>}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Excluir
                  </button>
                </div>
                <div className="qty">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    aria-label="Diminuir"
                  >
                    −
                  </button>
                  <output>{item.qty}</output>
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    disabled={item.qty >= product.stock}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>
                <strong className="cart-item-price">{money(product.price * item.qty)}</strong>
              </li>
            )
          })}
        </ul>
      </section>

      <aside className="panel">
        <h2 className="section-title">Resumo da compra</h2>
        <Summary cart={cart} />
        {shipping > 0 && (
          <p className="muted">
            Faltam {money(FREE_SHIPPING_MIN - subtotal)} para você ganhar frete grátis.
          </p>
        )}
        <a href="#/checkout" className="btn btn-primary btn-block">
          Continuar a compra
        </a>
        <a href="#/busca" className="btn btn-link btn-block">
          Continuar comprando
        </a>
      </aside>
    </div>
  )
}

export default Cart

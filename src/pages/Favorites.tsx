import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useStore } from '../store/context'

function Favorites() {
  const { favorites } = useStore()
  const items = products.filter((p) => favorites.includes(p.id))

  if (items.length === 0) {
    return (
      <div className="panel empty">
        <span aria-hidden="true">♡</span>
        <h1>Você ainda não tem favoritos</h1>
        <p>Toque no coração de um produto para salvá-lo aqui.</p>
        <a href="#/" className="btn btn-primary">
          Explorar produtos
        </a>
      </div>
    )
  }

  return (
    <section>
      <h1 className="section-title">Meus favoritos</h1>
      <div className="grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Favorites

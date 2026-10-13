import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'
import { discount } from '../format'

const offers = [...products]
  .filter((p) => p.oldPrice)
  .sort((a, b) => discount(b.price, b.oldPrice) - discount(a.price, a.oldPrice))
  .slice(0, 5)

const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 10)

function Home() {
  return (
    <>
      <Carousel />

      <section className="panel">
        <h2 className="section-title">Categorias</h2>
        <div className="cat-grid">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#/busca?cat=${encodeURIComponent(cat.name)}`}
              className="cat-item"
            >
              <span className="cat-emoji" aria-hidden="true">
                {cat.emoji}
              </span>
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">Ofertas do dia</h2>
          <a href="#/busca?oferta=1">Ver todas</a>
        </div>
        <div className="grid">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">Mais vendidos</h2>
          <a href="#/busca?ordem=vendidos">Ver todos</a>
        </div>
        <div className="grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

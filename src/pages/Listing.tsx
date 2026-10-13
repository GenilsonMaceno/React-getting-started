import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'
import { navigate } from '../router'

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const priceRanges = [
  { label: 'Até R$ 100', value: '100' },
  { label: 'Até R$ 300', value: '300' },
  { label: 'Até R$ 1.000', value: '1000' },
]

function Listing({ query }: { query: string }) {
  const params = new URLSearchParams(query)
  const q = params.get('q') ?? ''
  const cat = params.get('cat')
  const freeOnly = params.get('frete') === '1'
  const offersOnly = params.get('oferta') === '1'
  const max = Number(params.get('max')) || null
  const order = params.get('ordem') ?? 'relevancia'

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(query)
    if (value === null) next.delete(key)
    else next.set(key, value)
    const text = next.toString()
    navigate(text ? `/busca?${text}` : '/busca')
  }

  const terms = normalize(q).split(/\s+/).filter(Boolean)
  const results = products
    .filter((p) => {
      const haystack = normalize(`${p.title} ${p.category} ${p.seller}`)
      return (
        terms.every((term) => haystack.includes(term)) &&
        (!cat || p.category === cat) &&
        (!freeOnly || p.freeShipping) &&
        (!offersOnly || p.oldPrice !== undefined) &&
        (!max || p.price <= max)
      )
    })
    .sort((a, b) => {
      if (order === 'menor') return a.price - b.price
      if (order === 'maior') return b.price - a.price
      if (order === 'vendidos') return b.sold - a.sold
      return 0
    })

  const heading = q ? `Resultados para “${q}”` : (cat ?? (offersOnly ? 'Ofertas do dia' : 'Todos os produtos'))

  return (
    <div className="listing">
      <aside className="filters">
        <h1 className="listing-title">{heading}</h1>
        <p className="muted">
          {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
        </p>

        <h2>Categorias</h2>
        <ul>
          <li>
            <button
              type="button"
              className={!cat ? 'filter-link active' : 'filter-link'}
              onClick={() => setParam('cat', null)}
            >
              Todas
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                className={cat === c.name ? 'filter-link active' : 'filter-link'}
                onClick={() => setParam('cat', c.name)}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>

        <h2>Preço</h2>
        <ul>
          <li>
            <button
              type="button"
              className={!max ? 'filter-link active' : 'filter-link'}
              onClick={() => setParam('max', null)}
            >
              Qualquer preço
            </button>
          </li>
          {priceRanges.map((range) => (
            <li key={range.value}>
              <button
                type="button"
                className={String(max) === range.value ? 'filter-link active' : 'filter-link'}
                onClick={() => setParam('max', range.value)}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>

        <h2>Entrega e ofertas</h2>
        <label className="check">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setParam('frete', e.target.checked ? '1' : null)}
          />
          Frete grátis
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={offersOnly}
            onChange={(e) => setParam('oferta', e.target.checked ? '1' : null)}
          />
          Com desconto
        </label>
      </aside>

      <section className="listing-results">
        <div className="sort">
          <label htmlFor="ordem">Ordenar por</label>
          <select id="ordem" value={order} onChange={(e) => setParam('ordem', e.target.value)}>
            <option value="relevancia">Mais relevantes</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="vendidos">Mais vendidos</option>
          </select>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-listing">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <span aria-hidden="true">🔎</span>
            <h2>Não encontramos nada por aqui</h2>
            <p>Revise a busca ou remova alguns filtros.</p>
            <a href="#/busca" className="btn btn-primary">
              Limpar filtros
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default Listing

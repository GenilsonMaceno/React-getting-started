import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { getProduct } from './data/products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Listing from './pages/Listing'
import ProductPage from './pages/ProductPage'
import { useRoute } from './router'
import { useStore } from './store/context'
import './App.css'

function NotFound() {
  return (
    <div className="panel empty">
      <span aria-hidden="true">🧭</span>
      <h1>Página não encontrada</h1>
      <a href="#/" className="btn btn-primary">
        Voltar ao início
      </a>
    </div>
  )
}

function Page({ path, query }: { path: string; query: string }) {
  if (path === '/') return <Home />
  if (path === '/busca') return <Listing query={query} />
  if (path === '/carrinho') return <Cart />
  if (path === '/checkout') return <Checkout />
  if (path === '/favoritos') return <Favorites />

  const match = path.match(/^\/produto\/(\d+)$/)
  const product = match && getProduct(Number(match[1]))
  // key reinicia a quantidade escolhida ao trocar de produto
  if (product) return <ProductPage key={product.id} product={product} />

  return <NotFound />
}

function App() {
  const { path, query } = useRoute()
  const { toast } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return (
    <>
      <Header />
      <main className="container main">
        <Page path={path} query={query} />
      </main>
      <Footer />
      {toast && (
        <div className="toast" role="status">
          ✓ {toast}
        </div>
      )}
    </>
  )
}

export default App

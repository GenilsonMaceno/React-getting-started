import { useState, type FormEvent } from 'react'
import { cartTotals } from '../cart'
import { money } from '../format'
import { useStore } from '../store/context'
import { Summary } from './Cart'

type Order = { number: string; total: number; name: string; payment: string }

const payments = ['Pix', 'Cartão de crédito', 'Boleto']

function Checkout() {
  const { cart, clearCart } = useStore()
  const [order, setOrder] = useState<Order | null>(null)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setOrder({
      number: String(Math.floor(100000 + Math.random() * 900000)),
      total: cartTotals(cart).total,
      name: String(data.get('nome')).split(' ')[0],
      payment: String(data.get('pagamento')),
    })
    clearCart()
  }

  if (order) {
    return (
      <div className="panel empty">
        <span aria-hidden="true">🎉</span>
        <h1>Pedido confirmado, {order.name}!</h1>
        <p>
          Pedido nº <strong>{order.number}</strong> · {money(order.total)} via {order.payment}
        </p>
        <p className="muted">Esta é uma loja de demonstração: nenhuma cobrança foi feita.</p>
        <a href="#/" className="btn btn-primary">
          Voltar para a loja
        </a>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="panel empty">
        <span aria-hidden="true">🛒</span>
        <h1>Não há nada para finalizar</h1>
        <a href="#/" className="btn btn-primary">
          Ir às compras
        </a>
      </div>
    )
  }

  return (
    <form className="cart" onSubmit={onSubmit}>
      <section className="panel form">
        <h1 className="section-title">Finalizar compra</h1>

        <h2>Dados de entrega</h2>
        <label>
          Nome completo
          <input name="nome" required autoComplete="name" />
        </label>
        <div className="form-row">
          <label>
            CEP
            <input
              name="cep"
              required
              inputMode="numeric"
              pattern="\d{5}-?\d{3}"
              placeholder="00000-000"
              title="Informe um CEP com 8 dígitos"
              autoComplete="postal-code"
            />
          </label>
          <label>
            Número
            <input name="numero" required />
          </label>
        </div>
        <label>
          Endereço
          <input name="endereco" required autoComplete="street-address" />
        </label>

        <h2>Forma de pagamento</h2>
        <div className="pay-options">
          {payments.map((payment, i) => (
            <label key={payment} className="pay-option">
              <input type="radio" name="pagamento" value={payment} defaultChecked={i === 0} />
              {payment}
            </label>
          ))}
        </div>
      </section>

      <aside className="panel">
        <h2 className="section-title">Resumo da compra</h2>
        <Summary cart={cart} />
        <button type="submit" className="btn btn-primary btn-block">
          Confirmar pedido
        </button>
        <a href="#/carrinho" className="btn btn-link btn-block">
          Voltar ao carrinho
        </a>
      </aside>
    </form>
  )
}

export default Checkout

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-perks">
        <div>
          <span aria-hidden="true">💳</span>
          <strong>Pague como quiser</strong>
          <p>Pix, boleto ou cartão em até 10x sem juros.</p>
        </div>
        <div>
          <span aria-hidden="true">🚚</span>
          <strong>Frete grátis a partir de R$ 199</strong>
          <p>Em milhares de produtos selecionados.</p>
        </div>
        <div>
          <span aria-hidden="true">🛡️</span>
          <strong>Compra garantida</strong>
          <p>Receba o produto ou devolvemos seu dinheiro.</p>
        </div>
      </div>
      <p className="footer-copy">
        Mercadão · projeto de demonstração — os produtos e preços são fictícios.
      </p>
    </footer>
  )
}

export default Footer

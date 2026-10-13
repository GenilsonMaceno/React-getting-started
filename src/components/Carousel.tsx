import { useEffect, useState } from 'react'

const slides = [
  {
    kicker: 'OFERTAS DA SEMANA',
    title: 'Até 40% OFF em eletrônicos',
    text: 'TVs, fones e caixas de som com frete grátis.',
    cta: 'Ver ofertas',
    href: '#/busca?cat=Eletr%C3%B4nicos',
    emoji: '🎧',
    className: 'slide slide-1',
  },
  {
    kicker: 'CASA NOVA',
    title: 'Tudo para sua cozinha',
    text: 'Air fryer, panelas e muito mais em até 10x sem juros.',
    cta: 'Comprar agora',
    href: '#/busca?cat=Casa',
    emoji: '🍳',
    className: 'slide slide-2',
  },
  {
    kicker: 'FRETE GRÁTIS',
    title: 'Em milhares de produtos',
    text: 'Aproveite a entrega rápida a partir de R$ 199.',
    cta: 'Aproveitar',
    href: '#/busca?frete=1',
    emoji: '🚚',
    className: 'slide slide-3',
  },
]

function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      5000,
    )
    return () => window.clearInterval(timer)
  }, [index])

  const slide = slides[index]
  const go = (step: number) => setIndex((index + step + slides.length) % slides.length)

  return (
    <section className={slide.className} aria-roledescription="carrossel">
      <button type="button" className="slide-arrow" onClick={() => go(-1)} aria-label="Anterior">
        ‹
      </button>
      <div className="slide-content">
        <div>
          <p className="slide-kicker">{slide.kicker}</p>
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>
          <a href={slide.href} className="btn btn-primary">
            {slide.cta}
          </a>
        </div>
        <span className="slide-emoji" aria-hidden="true">
          {slide.emoji}
        </span>
      </div>
      <button type="button" className="slide-arrow" onClick={() => go(1)} aria-label="Próximo">
        ›
      </button>
      <div className="slide-dots">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            className={i === index ? 'active' : undefined}
            onClick={() => setIndex(i)}
            aria-label={`Ir para o banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel

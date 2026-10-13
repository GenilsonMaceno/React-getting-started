import type { Product } from '../data/products'

// Ilustração do produto: emoji sobre um fundo colorido (funciona sem internet).
function ProductImage({ product, large }: { product: Product; large?: boolean }) {
  return (
    <div
      className={large ? 'product-img large' : 'product-img'}
      style={{
        background: `linear-gradient(135deg, hsl(${product.hue} 80% 94%), hsl(${product.hue + 40} 75% 86%))`,
      }}
      role="img"
      aria-label={product.title}
    >
      <span aria-hidden="true">{product.emoji}</span>
    </div>
  )
}

export default ProductImage

import { useCart } from '../hooks/useCart'

function StarIcon() {
  return <span className="text-gold-light">★</span>
}

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(product.id)

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2)

  return (
    <div className="group bg-navy-2 border border-white/[0.06] rounded-xl overflow-hidden
                    transition-all duration-300 hover:-translate-y-1 hover:border-gold/30
                    flex flex-col">

      {/* Image */}
      <div className="relative h-52 bg-white overflow-hidden flex-shrink-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-3 transition-transform duration-500
                     group-hover:scale-110"
        />
        {/* Category pill */}
        <span className="absolute top-2 left-2 bg-navy/80 backdrop-blur-sm border border-gold/30
                         text-gold text-[10px] font-semibold tracking-widest uppercase
                         px-2.5 py-1 rounded-full">
          {product.category}
        </span>
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px]
                           font-bold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-cream text-sm font-medium truncate mb-1">
          {product.title}
        </h3>
        <p className="text-muted text-xs line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-gold font-semibold text-base">
              ${discountedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-muted text-xs line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-muted text-xs">
            <StarIcon /> {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Stock indicator */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-muted mb-1">
            <span>Stock</span>
            <span>{product.stock} left</span>
          </div>
          <div className="h-1 bg-navy-4 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                product.stock > 50 ? 'bg-green-500' :
                product.stock > 20 ? 'bg-gold' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
            />
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={() => addToCart(product)}
          className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase
                      transition-all duration-200 border
                      ${inCart
                        ? 'bg-gold border-gold text-navy cursor-default'
                        : 'bg-transparent border-gold/40 text-gold hover:bg-gold hover:border-gold hover:text-navy'
                      }`}
        >
          {inCart ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  )
}

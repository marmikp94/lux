import { useCart } from '../hooks/useCart'

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const lineTotal = (item.price * item.quantity).toFixed(2)

  return (
    <div className="flex gap-4 items-start bg-navy-2 border border-white/[0.06]
                    rounded-xl p-4 animate-slide-up hover:border-gold/20 transition-colors">

      {/* Thumbnail */}
      <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 overflow-hidden p-1.5">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-cream text-sm font-medium truncate">{item.title}</p>
        <p className="text-muted text-xs uppercase tracking-wider mt-0.5 mb-3">
          {item.category}
        </p>

        {/* Qty controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-7 h-7 rounded-md border border-gold/30 text-cream text-lg
                       flex items-center justify-center hover:border-gold hover:text-gold
                       transition-all duration-150 leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-cream text-sm font-semibold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-7 h-7 rounded-md border border-gold/30 text-cream text-lg
                       flex items-center justify-center hover:border-gold hover:text-gold
                       transition-all duration-150 leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-muted text-xs ml-1">
            @ ${item.price.toFixed(2)} each
          </span>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <span className="text-gold font-semibold text-base">${lineTotal}</span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-muted hover:text-red-400 transition-colors duration-150 p-1"
          aria-label="Remove item"
          title="Remove from cart"
        >
          <TrashIcon />
        </button>
      </div>

    </div>
  )
}

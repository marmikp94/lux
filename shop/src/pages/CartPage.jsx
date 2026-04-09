import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/CartItem'

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1" className="text-muted mb-6">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <h2 className="font-display text-3xl text-cream mb-2">Your cart is empty</h2>
      <p className="text-muted text-sm mb-8 max-w-xs leading-relaxed">
        Discover our curated collection and add something exceptional to your cart.
      </p>
      <Link
        to="/"
        className="border border-gold text-gold px-8 py-3 rounded-full text-sm
                   font-semibold tracking-widest uppercase hover:bg-gold hover:text-navy
                   transition-all duration-200"
      >
        Browse Products
      </Link>
    </div>
  )
}

function OrderSummary({ subtotal, shipping, total, itemCount, onClear }) {
  return (
    <div className="bg-navy-2 border border-white/[0.06] rounded-xl p-6 sticky top-24">
      <h2 className="font-display text-xl text-cream mb-6">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm text-muted">
          <span>Subtotal ({itemCount} items)</span>
          <span className="text-cream">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted">
          <span>Shipping</span>
          <span className="text-cream">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted">
          <span>Tax (estimate)</span>
          <span className="text-cream">${(subtotal * 0.08).toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gold/20 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-cream font-semibold">Total</span>
          <span className="text-gold font-bold text-xl">
            ${(total + subtotal * 0.08).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout CTA */}
      <button className="w-full bg-gold hover:bg-gold-light text-navy font-bold text-sm
                         tracking-widest uppercase py-3.5 rounded-xl transition-colors duration-200">
        Proceed to Checkout
      </button>

      {/* Continue shopping */}
      <Link
        to="/"
        className="block text-center text-muted text-xs mt-4 hover:text-gold transition-colors"
      >
        ← Continue Shopping
      </Link>

      {/* Clear cart */}
      <button
        onClick={onClear}
        className="block w-full text-center text-red-400/60 text-xs mt-3
                   hover:text-red-400 transition-colors"
      >
        Clear entire cart
      </button>

      {/* Trust badges */}
      <div className="mt-6 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-2">
        {[
          { icon: '🔒', label: 'Secure' },
          { icon: '↩️', label: '30-Day Returns' },
          { icon: '🚚', label: 'Free over $100' },
        ].map(b => (
          <div key={b.label} className="text-center">
            <div className="text-lg mb-1">{b.icon}</div>
            <p className="text-muted text-[10px] leading-tight">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CartPage() {
  const { cart, subtotal, shipping, total, totalCount, clearCart } = useCart()

  if (cart.length === 0) return <EmptyCart />

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl text-cream mb-1">Your Cart</h1>
        <p className="text-muted text-sm">
          {totalCount} item{totalCount !== 1 ? 's' : ''} — saved automatically, survives page refresh ✓
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        {/* Items list */}
        <div className="space-y-4">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary sidebar */}
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          itemCount={totalCount}
          onClear={clearCart}
        />

      </div>
    </div>
  )
}

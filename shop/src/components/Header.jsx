import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

export default function Header() {
  const { totalCount } = useCart()
  const { pathname } = useLocation()

  const navLink = (to, label) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200
          ${active ? 'text-gold' : 'text-muted hover:text-gold'}`}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display text-2xl text-gold tracking-wider">
          LUXÉ
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLink('/', 'Shop')}
          {navLink('/cart', 'My Cart')}
        </nav>

        {/* Cart button */}
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-navy-3 border border-gold rounded-full
                     px-4 py-2 text-cream text-sm font-medium transition-all duration-200
                     hover:border-gold hover:text-gold group"
        >
          <span className="group-hover:text-gold text-cream transition-colors">
            <CartIcon />
          </span>
          <span>Cart</span>
          {totalCount > 0 && (
            <span
              key={totalCount}
              className="bg-gold text-navy text-xs font-bold w-5 h-5 rounded-full
                         flex items-center justify-center animate-pop"
            >
              {totalCount > 99 ? '99+' : totalCount}
            </span>
          )}
        </Link>

      </div>
    </header>
  )
}

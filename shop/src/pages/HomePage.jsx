import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchProducts, searchProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import Toast from '../components/Toast'

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const toastId = useRef(0)
  const searchTimeout = useRef(null)

  // Initial load
  useEffect(() => {
    fetchProducts(30)
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Debounced search
  useEffect(() => {
    if (!search.trim()) {
      if (!loading) {
        setLoading(true)
        fetchProducts(30)
          .then(setProducts)
          .catch(e => setError(e.message))
          .finally(() => setLoading(false))
      }
      return
    }
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setLoading(true)
      searchProducts(search)
        .then(setProducts)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, 400)

    return () => clearTimeout(searchTimeout.current)
  }, [search])

  const showToast = useCallback((msg) => {
    const id = ++toastId.current
    setToast({ msg, id })
  }, [])

  const categories = [...new Set(products.map(p => p.category))].slice(0, 6)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96
                          bg-gold/5 rounded-full blur-3xl" />
        </div>
        <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">
          New Collection — 2025
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight mb-4">
          Curated for the<br />
          <em className="text-gold not-italic">discerning</em> few
        </h1>
        <p className="text-muted text-base max-w-md mx-auto leading-relaxed">
          Premium products, thoughtfully selected for quality, style, and lasting value.
        </p>
      </section>

      {/* Search + Filter bar */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-navy-2 border border-gold/20 rounded-full
                         pl-10 pr-4 py-2.5 text-sm text-cream placeholder-muted
                         focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          {/* Count */}
          <p className="text-muted text-sm">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        {/* Category tags */}
        {!loading && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSearch(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize
                  ${search === cat
                    ? 'bg-gold text-navy border-gold font-semibold'
                    : 'border-gold/20 text-muted hover:border-gold/50 hover:text-gold'
                  }`}
              >
                {cat}
              </button>
            ))}
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs px-3 py-1.5 rounded-full border border-red-500/40
                           text-red-400 hover:border-red-500 transition-all"
              >
                ✕ Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-gold text-sm border border-gold/30 px-6 py-2 rounded-full hover:bg-gold/10"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading
            ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToast={showToast}
                />
              ))
          }
        </div>

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-cream mb-2">No products found</p>
            <p className="text-muted text-sm">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.msg}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  )
}

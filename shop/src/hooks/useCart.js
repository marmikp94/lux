import { useCartContext } from '../context/CartContext'

/**
 * useCart — the ONLY way components should interact with cart state.
 * Never read CartContext directly in components; always use this hook.
 */
export function useCart() {
  const { cart, dispatch } = useCartContext()

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Add product to cart (or increment qty if already exists) */
  const addToCart = (product) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        rating: product.rating,
        stock: product.stock,
      },
    })
  }

  /** Remove item from cart entirely */
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id })

  /** +1 or -1 quantity (min stays at 1) */
  const updateQuantity = (id, delta) =>
    dispatch({ type: 'UPDATE_QTY', payload: { id, delta } })

  /** Wipe entire cart */
  const clearCart = () => dispatch({ type: 'CLEAR' })

  // ── Derived values ─────────────────────────────────────────────────────────

  /** Total number of items (sum of all quantities) — used for badge */
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  /** Subtotal price */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  /** Flat shipping rate */
  const shipping = cart.length > 0 ? 9.99 : 0

  /** Grand total */
  const total = subtotal + shipping

  /** Check if a specific product is already in cart */
  const isInCart = (id) => cart.some((item) => item.id === id)

  /** Get quantity of specific item */
  const getQuantity = (id) => cart.find((i) => i.id === id)?.quantity ?? 0

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    shipping,
    total,
    isInCart,
    getQuantity,
  }
}

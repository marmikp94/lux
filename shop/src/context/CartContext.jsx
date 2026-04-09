import { createContext, useReducer, useEffect, useContext } from 'react'

// ─── Storage Key (version it so schema changes don't break old data) ───────────
const STORAGE_KEY = 'luxe_cart_v1'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const saveToStorage = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch (err) {
    console.warn('localStorage write failed:', err)
  }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD': {
      const existing = state.find(i => i.id === action.payload.id)
      if (existing) {
        // Item exists → increment quantity
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      // New item → append with quantity 1
      return [...state, { ...action.payload, quantity: 1 }]
    }

    case 'REMOVE':
      return state.filter(i => i.id !== action.payload)

    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, quantity: Math.max(1, i.quantity + action.payload.delta) }
          : i
      )

    case 'CLEAR':
      return []

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const CartContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    loadFromStorage  // lazy initializer: reads localStorage ONCE on mount
  )

  // Sync to localStorage on every cart change
  useEffect(() => {
    saveToStorage(cart)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── Raw context hook (internal use) ──────────────────────────────────────────
export const useCartContext = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider')
  return ctx
}

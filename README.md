# LUXÉ Shop — React + Tailwind E-Commerce App

A premium e-commerce storefront built with React 18, Tailwind CSS, and React Router v6.
Features a product listing page, persistent cart, and order summary — all production-ready.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 6 | Client-side routing |
| DummyJSON API | — | Mock product data |
| localStorage | Native | Cart persistence across refreshes |

---

## Features

- Product grid fetched from `https://dummyjson.com/products`
- Live search with debounce + category filter pills
- Add to Cart with animated badge counter
- Cart persists across page refreshes (localStorage)
- Cart page with quantity controls and remove item
- Order summary with subtotal, shipping, and tax
- Skeleton loading placeholders
- Toast notifications on add to cart
- Fully responsive (mobile → desktop)
- Stock indicator bar per product
- Discount badge + strikethrough original price

---

## Project Structure

```
shop/
├── index.html                  # Entry HTML + Google Fonts
├── package.json                # Dependencies
├── vite.config.js              # Vite + React plugin
├── tailwind.config.js          # Custom colors, fonts, animations
├── postcss.config.js           # Required by Tailwind
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Router + CartProvider wiring
    ├── index.css               # Tailwind directives + utilities
    ├── api/
    │   └── products.js         # fetchProducts, searchProducts
    ├── context/
    │   └── CartContext.jsx     # useReducer + localStorage sync
    ├── hooks/
    │   └── useCart.js          # Cart actions + derived values
    ├── components/
    │   ├── Header.jsx          # Sticky nav + cart badge
    │   ├── ProductCard.jsx     # Product tile + Add to Cart
    │   ├── CartItem.jsx        # Cart row with qty controls
    │   ├── SkeletonCard.jsx    # Shimmer loading placeholder
    │   └── Toast.jsx           # Auto-dismiss notification
    └── pages/
        ├── HomePage.jsx        # Product grid + search + filters
        └── CartPage.jsx        # Cart list + Order Summary
```

---

## Getting Started

### Prerequisites

Make sure you have these installed on your machine:

- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9 or higher (comes with Node)

Check your versions:

```bash
node -v   # should print v18+
npm -v    # should print v9+
```

---

### Step 1 — Download & Unzip

Download `luxe-shop.zip` and extract it:

```bash
unzip luxe-shop.zip
cd shop
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

This installs React, Vite, Tailwind, React Router and all dev tools.
It will create a `node_modules/` folder — this is normal.

---

### Step 3 — Start Dev Server

```bash
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser. The app is live with hot reload.

---

### Step 4 — Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimised, minified files ready for any static host.

To preview the production build locally:

```bash
npm run preview
```

---

## Build From Scratch (Manual Setup)

If you want to build the project from zero rather than using the zip:

```bash
# 1. Create Vite + React project
npm create vite@latest my-shop -- --template react
cd my-shop

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install React Router
npm install react-router-dom

# 4. Install all at once
npm install
```

Then update `tailwind.config.js` content paths:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

And add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now copy each file from the project structure above into the correct location.

---

## How the Cart Works

Understanding this is the most important part of the codebase.

### Storage Flow

```
User clicks "Add to Cart"
        ↓
ProductCard calls addToCart(product)
        ↓
useCart hook calls dispatch({ type: 'ADD', payload: product })
        ↓
cartReducer handles ADD:
  → item exists? increment quantity
  → new item? append with quantity: 1
        ↓
useEffect detects cart state change
        ↓
localStorage.setItem('luxe_cart_v1', JSON.stringify(cart))
        ↓
Header badge re-renders with new count
```

### Why Cart Survives Refresh

The `CartContext` uses a **lazy initializer** in `useReducer`:

```js
const [cart, dispatch] = useReducer(
  cartReducer,
  [],
  loadFromStorage   // ← this runs ONCE on mount, reads localStorage
)
```

And syncs back on every change:

```js
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}, [cart])
```

Result: cart is always in sync with localStorage — it survives refreshes, tab closes, and browser restarts.

---

## Data Flow Diagram

```
DummyJSON API (https://dummyjson.com/products)
          ↓
    HomePage.jsx  (useEffect fetch on mount)
          ↓
    ProductCard.jsx  (renders each product)
          ↓
    "Add to Cart" click
          ↓
    useCart() hook → dispatch(ADD)
          ↓
    CartContext (useReducer)
          ↓  ↘
    localStorage   Header badge
                   CartPage list
```

---

## Key Files Explained

### `src/context/CartContext.jsx`
The heart of the app. Holds cart state using `useReducer`. Handles three actions:
- `ADD` — adds item or increments quantity if already in cart
- `REMOVE` — removes item by id
- `UPDATE_QTY` — increments or decrements quantity (minimum 1)
- `CLEAR` — empties the entire cart

### `src/hooks/useCart.js`
A clean interface for components to interact with the cart. Components should never import `CartContext` directly — always use this hook. Exposes: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `totalCount`, `subtotal`, `total`, `isInCart`, `getQuantity`.

### `src/api/products.js`
Isolated API layer. If you ever swap DummyJSON for a real backend, you only change this one file — no component touches the fetch URL directly.

### `src/pages/HomePage.jsx`
Fetches products on mount, renders the product grid. Includes debounced search (400ms delay) that calls `searchProducts()` and category filter pills derived from the product list.

### `src/pages/CartPage.jsx`
Reads cart from `useCart()`, renders `CartItem` for each entry, and shows an `OrderSummary` sidebar with subtotal, shipping ($9.99 flat), estimated tax (8%), and total.

---

## Customisation Guide

### Change the number of products loaded

In `src/pages/HomePage.jsx`:

```js
fetchProducts(30)  // change 30 to any number up to 100
```

### Change shipping cost

In `src/hooks/useCart.js`:

```js
const shipping = cart.length > 0 ? 9.99 : 0  // change 9.99
```

### Change tax rate

In `src/pages/CartPage.jsx`:

```js
subtotal * 0.08   // 0.08 = 8%, change to your rate
```

### Add a new cart action

1. Add a case in `cartReducer` inside `CartContext.jsx`
2. Add a wrapper function in `useCart.js`
3. Call it from any component via `const { yourFunction } = useCart()`

### Change the color theme

All custom colors are in `tailwind.config.js`:

```js
colors: {
  gold: { DEFAULT: '#C9A84C', light: '#E8C97A', dark: '#A07830' },
  navy: { DEFAULT: '#0A0D14', 2: '#111622', 3: '#1A2035' },
}
```

---

## Deployment

### Netlify (recommended, free)

```bash
npm run build
# Drag and drop the dist/ folder to https://netlify.com/drop
```

Or connect your GitHub repo and set:
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
# Add to vite.config.js:
# base: '/your-repo-name/'

npm run build
# Push dist/ to gh-pages branch
```

---

## Common Issues

**`npm install` fails**
Make sure Node.js is v18+. Run `node -v` to check.

**Blank page after `npm run dev`**
Check browser console for errors. Usually a missing import or typo in a file path.

**Products not loading**
Check your internet connection — the app fetches from `dummyjson.com`. Open DevTools → Network tab to inspect the API call.

**Cart not persisting**
Make sure your browser allows localStorage. In incognito/private mode some browsers block it.

**Tailwind styles not applying**
Ensure `tailwind.config.js` has the correct `content` paths and `index.css` has the three `@tailwind` directives.

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build optimised production bundle to `dist/` |
| `npm run preview` | Preview production build locally |

---

## License

MIT — free to use, modify, and distribute.

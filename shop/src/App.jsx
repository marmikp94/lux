import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'

export default function App() {
  return (
    // 1. CartProvider wraps everything — cart state accessible anywhere
    <CartProvider>
      {/* 2. BrowserRouter enables React Router */}
      <BrowserRouter>
        {/* 3. Sticky header always visible */}
        <Header />

        {/* 4. Page routes */}
        <Routes>
          <Route path="/"     element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Fallback — redirect unknown routes to home */}
          <Route path="*"     element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

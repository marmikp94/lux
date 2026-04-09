const BASE_URL = 'https://dummyjson.com'

/**
 * Fetch all products
 * @param {number} limit - number of products to fetch
 * @returns {Promise<Array>} products array
 */
export const fetchProducts = async (limit = 30) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.products
}

/**
 * Fetch single product by id
 * @param {number} id
 * @returns {Promise<Object>} product object
 */
export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

/**
 * Search products
 * @param {string} query
 * @returns {Promise<Array>} products array
 */
export const searchProducts = async (query) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Search failed')
  const data = await res.json()
  return data.products
}

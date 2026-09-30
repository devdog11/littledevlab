import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductsPage from './pages/products/ProductsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsPage />
  </StrictMode>,
)

import { hydrateRoot } from 'react-dom/client';
import Products from '../pages/Products';
import '../styles/products.css';

hydrateRoot(document.getElementById('root')!, <Products />);

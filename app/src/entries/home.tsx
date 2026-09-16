import { hydrateRoot } from 'react-dom/client';
import Home from '../pages/Home';
import '../styles/index.css';

hydrateRoot(document.getElementById('root')!, <Home />);

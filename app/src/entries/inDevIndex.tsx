import { hydrateRoot } from 'react-dom/client';
import InDevIndex from '../pages/InDevIndex';
import '../styles/in-development__index.css';

hydrateRoot(document.getElementById('root')!, <InDevIndex />);

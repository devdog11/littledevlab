import { hydrateRoot } from 'react-dom/client';
import BuildLog from '../pages/BuildLog';
import '../styles/build-log.css';

hydrateRoot(document.getElementById('root')!, <BuildLog />);

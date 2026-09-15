import { hydrateRoot } from 'react-dom/client';
import InDevDrawerOrganizer from '../pages/InDevDrawerOrganizer';
import '../styles/in-development__drawer-organizer.css';

hydrateRoot(document.getElementById('root')!, <InDevDrawerOrganizer />);

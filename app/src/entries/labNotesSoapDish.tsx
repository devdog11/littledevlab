import { hydrateRoot } from 'react-dom/client';
import LabNotesSoapDish from '../pages/LabNotesSoapDish';
import '../styles/lab-notes__soap-dish-mount-puck.css';

hydrateRoot(document.getElementById('root')!, <LabNotesSoapDish />);

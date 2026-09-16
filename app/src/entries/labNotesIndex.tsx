import { hydrateRoot } from 'react-dom/client';
import LabNotesIndex from '../pages/LabNotesIndex';
import '../styles/lab-notes__index.css';

hydrateRoot(document.getElementById('root')!, <LabNotesIndex />);

import { hydrateRoot } from 'react-dom/client';
import LabNotesPrompt from '../pages/LabNotesPrompt';
import '../styles/lab-notes__prompt-and-context-engineering.css';

hydrateRoot(document.getElementById('root')!, <LabNotesPrompt />);

import { hydrateRoot } from 'react-dom/client';
import LabNotesServiceNow from '../pages/LabNotesServiceNow';
import '../styles/lab-notes__servicenow-mcp-home-assistant-cloudflare.css';

hydrateRoot(document.getElementById('root')!, <LabNotesServiceNow />);

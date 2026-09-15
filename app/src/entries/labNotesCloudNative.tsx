import { hydrateRoot } from 'react-dom/client';
import LabNotesCloudNative from '../pages/LabNotesCloudNative';
import '../styles/lab-notes__cloud-native-agentic-workflow.css';

hydrateRoot(document.getElementById('root')!, <LabNotesCloudNative />);

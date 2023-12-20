import { createTerritoryButtons } from './components/ui.js';
import data from './data/territories.json';

// Initialize the app and populate the territory selection dropdown
function initApp() {
  createTerritoryButtons();
}
// Initial application setup
initApp();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

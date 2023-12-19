import { populateTerritorySelect } from './components/ui.js';
import data from './data/territories.json';

// Initialize the app and populate the territory selection dropdown
function initApp() {
  populateTerritorySelect(data.data);
}

// Initial application setup
initApp();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

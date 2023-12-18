import { populateTerritorySelect } from './components/ui.js';
import data from './data/territories.json';

// Function to initialize the app and populate the territory selection dropdown
function initApp() {
  populateTerritorySelect(data.data); // Use data from territories.json
}

// Initial application setup
initApp();

// Optionally, if you want to do something when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

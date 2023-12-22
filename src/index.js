import { createTerritoryButtons, toggleMode } from './components/ui.js';

// Init the app and populate the territory selection buttons
function initApp() {
  createTerritoryButtons();
  toggleMode();
}

initApp();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

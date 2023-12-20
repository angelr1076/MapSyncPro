import { createTerritoryButtons, toggleMode } from './components/ui.js';

// Initialize the app and populate the territory selection dropdown
function initApp() {
  createTerritoryButtons();
  toggleMode();
}
// Initial application setup
initApp();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

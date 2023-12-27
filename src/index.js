import { createTerritoryButtons, toggleMode } from './components/ui.js';

// Init the app and populate the territory selection buttons
async function initApp() {
  try {
    await createTerritoryButtons();
    toggleMode();
  } catch (error) {
    console.error('Error initializing the app:', error);
  }
}

initApp();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

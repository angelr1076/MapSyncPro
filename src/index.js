import {
  populateTerritorySelect,
  handleUserChoice,
  toggleUIElements,
} from './components/ui.js';
import data from './data/territories.json';

// Function to initialize the app
function initApp() {
  populateTerritorySelect(data.data); // Use data from territories.json
}

// Event listener for territory selection
document.querySelector('#territory-select').addEventListener('change', e => {
  const selectedTerritory = e.target.value;
  handleUserChoice(data.data, selectedTerritory, chosenTerritory => {
    // Process the chosen territory data
    console.log(chosenTerritory);
  });
  toggleUIElements(true); // Show the map and hide other elements
});

// Initial application setup
initApp();

// Optional: Home button functionality
// document.querySelector('button').onclick = () => {
//   window.location.reload();
// };

// Optionally, if you want to do something when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
});

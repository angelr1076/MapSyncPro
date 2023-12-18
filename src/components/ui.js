import { initializeMap, updateMap } from './map.js';
import data from '../data/territories.json';

const selectList = document.querySelector('#territory-select');
const mapDisplay = document.querySelector('#main');
const selectContainer = document.querySelector('#select-container');
const pageFooter = document.querySelector('#page-footer');

// Function to populate the territory selection dropdown
const populateTerritorySelect = () => {
  data.data.forEach(territory => {
    const option = document.createElement('option');
    option.value = territory.territoryName;
    option.text = territory.territoryName;
    selectList.appendChild(option);
  });
};

// Function to handle user's territory choice
const handleUserChoice = (territories, choice, callback) => {
  const chosenTerritory = territories.find(t => t.territoryName === choice);
  if (chosenTerritory) {
    console.log(chosenTerritory);
    callback(chosenTerritory);
  } else {
    console.error('Chosen territory not found');
  }
};

// Function to show or hide UI elements
function toggleUIElements(showMap) {
  if (showMap) {
    mapDisplay.style.display = 'block';
    selectContainer.classList.add('hidden');
    pageFooter.style.display = 'none';
  } else {
    mapDisplay.style.display = 'none';
    selectContainer.classList.remove('hidden');
    pageFooter.style.display = 'block';
  }
}

// Initialize the map on page load
initializeMap();

// Event listener for territory selection
selectList.addEventListener('change', e => {
  const selectorChoice = e.target.value;
  handleUserChoice(data.data, selectorChoice, chosenTerritory => {
    // Use chosenTerritory here for further actions, such as updating the map
    updateMap(chosenTerritory);
  });
  toggleUIElements(true);
});

export { populateTerritorySelect, handleUserChoice, toggleUIElements };

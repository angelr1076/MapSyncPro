import { initMap } from './map.js';
import data from '../data/territories.json';
import '../styles/style.css';

const selectContainer = document.querySelector('#select-container');
const selectList = document.querySelector('#territory-select');
const mapDisplay = document.querySelector('#main');
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

function showElement(element) {
  element.classList.add('show');
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
  element.classList.remove('show');
}

// Function to show or hide UI elements
function toggleUIElements(showMap) {
  if (showMap) {
    showElement(mapDisplay);
    hideElement(selectContainer);
    hideElement(pageFooter);
  } else {
    hideElement(mapDisplay);
    showElement(selectContainer);
    showElement(pageFooter);
  }
}

// Event listener for territory selection
selectList.addEventListener('change', e => {
  const selectorChoice = e.target.value;
  handleUserChoice(data.data, selectorChoice, chosenTerritory => {
    toggleUIElements(true);
    initMap(chosenTerritory);
  });
});

// document.querySelector('button').onclick = () => {
//   window.location.reload();
// };

export { populateTerritorySelect };

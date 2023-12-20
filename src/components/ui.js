import { initMap } from './map.js';
import data from '../data/territories.json';
import '../styles/style.css';

const selectContainer = document.querySelector('#select-container');
const buttonContainer = document.querySelector('#button-container');
const territorySelect = document.querySelector('#territory-select');
const backButton = document.querySelector('#back-button');
const mapDisplay = document.querySelector('#main');
const pageFooter = document.querySelector('#page-footer');
const pageHeaderTerritoryName = document.querySelector(
  '#page-header__territory-name'
);
const customerCountElement = document.querySelector('#customer-count');

// Update customer count in the UI
function updateCustomerCount(territory) {
  const count = territory.addresses.length;
  customerCountElement.textContent = `${count} Customers`;
}

// Create buttons for each territory
const createTerritoryButtons = () => {
  data.data.forEach(territory => {
    const button = document.createElement('button');
    button.textContent = territory.territoryName;
    button.classList.add('btn', 'btn-primary', 'm-2');
    button.onclick = () => handleUserChoice(territory.territoryName);
    buttonContainer.appendChild(button);
  });
};

// Handle user's territory choice
const handleUserChoice = choice => {
  const chosenTerritory = data.data.find(t => t.territoryName === choice);
  if (chosenTerritory) {
    console.log(chosenTerritory);
    updateCustomerCount(chosenTerritory);
    pageHeaderTerritoryName.textContent = chosenTerritory.territoryName;
    toggleUIElements(true);
    initMap(chosenTerritory);
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

// Show or hide UI elements
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

backButton.addEventListener('click', () => {
  toggleUIElements(false);
});

export { createTerritoryButtons };

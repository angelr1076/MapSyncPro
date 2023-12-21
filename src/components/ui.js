import { initMap } from './map.js';
import data from '../data/territories.json';
import allData from '../data/allTerritories.json';
import '../styles/style.css';

const selectContainer = document.querySelector('#select-container');
const buttonContainer = document.querySelector('#button-container');
const backButton = document.querySelector('#back-button');
const lightModeButton = document.querySelector('#light-mode-icon');
const darkModeButton = document.querySelector('#dark-mode-icon');
const mapDisplay = document.querySelector('#main');
const pageFooter = document.querySelector('#page-footer');
const pageHeaderTerritoryName = document.querySelector('#territory-name');
const customerCountElement = document.querySelector('#customer-count');

// Update customer count in the UI
function updateCustomerCount(territory) {
  const count = territory.addresses.length;
  customerCountElement.textContent = `${count} Customers`;
}

// Create buttons for each territory
function createTerritoryButtons() {
  data.data.forEach(territory => {
    const button = document.createElement('button');
    button.textContent = territory.territoryName;
    button.classList.add('btn', 'm-2');
    button.onclick = () => handleUserChoice(territory.territoryName);
    buttonContainer.appendChild(button);
  });

  const allButton = document.createElement('button');
  allButton.textContent = 'All Territories';
  allButton.classList.add('btn', 'm-2');
  allButton.onclick = () => handleUserChoice('All Territories');
  buttonContainer.appendChild(allButton);
}

// Handle user's territory choice
function handleUserChoice(choice) {
  let chosenTerritory;
  choice !== 'All Territories'
    ? (chosenTerritory = data)
    : (chosenTerritory = allData);
  chosenTerritory = chosenTerritory.data.find(t => t.territoryName === choice);

  if (chosenTerritory) {
    const zoomLevel = setZoomLevel(chosenTerritory.territoryName);
    updateCustomerCount(chosenTerritory);
    pageHeaderTerritoryName.textContent = chosenTerritory.territoryName;
    toggleUIElements(true);
    initMap(chosenTerritory, zoomLevel);
    choice === 'All Territories'
      ? createLegend(chosenTerritory)
      : hideElement(pageFooter);
  } else {
    console.error('Chosen territory not found');
  }
}

function createModal(el, territory, color) {
  const modal = document.querySelector('#legendModal');
  const modalHeader = document.querySelector('#modal-header-content');
  const modalBody = document.querySelector('#modal-body-content');
  let isModalOpen = false;

  const increaseOpacity = () => {
    el.style.opacity = '60%';
  };

  const decreaseOpacity = () => {
    el.style.opacity = '100%';
  };

  const toggleModal = () => {
    if (isModalOpen) {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
      modalHeader.innerHTML = territory;
      modalBody.innerHTML = color;
    }
    isModalOpen = !isModalOpen;
  };

  const hideModal = e => {
    if (e.target === modal || e.target === window) {
      modal.style.display = 'none';
      isModalOpen = false;
    }
  };

  // Desktop mouse events
  el.addEventListener('mouseenter', increaseOpacity);
  el.addEventListener('mouseleave', decreaseOpacity);
  el.addEventListener('click', toggleModal);

  // Close modal when clicking outside
  window.addEventListener('click', hideModal);
}

function createLegend(customerArr) {
  const territoryLegend = document.querySelector('#legend');
  territoryLegend.innerHTML = '';
  showElement(pageFooter);

  customerArr = customerArr.addresses;

  const colorArr = [];
  const uniqueTerritory = [
    ...new Set(
      customerArr
        .map(unique => unique.territory)
        .filter(unique => unique.length > 0)
    ),
  ];

  const uniqueColors = [
    ...new Set(
      customerArr
        .map(unique => unique.color)
        .filter(unique => unique.length > 0)
    ),
  ];

  const uniqueHex = [
    ...new Set(
      customerArr.map(unique => unique.hex).filter(unique => unique.length > 0)
    ),
  ];

  colorArr.push({
    terr: uniqueTerritory,
    color: uniqueColors,
    hexCode: uniqueHex,
  });

  const { terr, color, hexCode } = colorArr[0];

  for (let item in hexCode) {
    let hexColorChoice = hexCode[item];
    const terrName = terr[item];
    const terrColor = color[item];
    const circleEl = document.createElement('btn');

    const styles = {
      border: '3px solid #808080',
      backgroundColor: `#${hexColorChoice}`,
      cursor: 'pointer',
      borderRadius: '50%',
      color: `#fff`,
    };

    Object.assign(circleEl.style, styles);
    circleEl.className = 'circle-button btn m-2 p-3';
    territoryLegend.appendChild(circleEl);

    createModal(circleEl, terrName, terrColor);
  }
}

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
  } else {
    hideElement(mapDisplay);
    showElement(selectContainer);
  }
}

function setZoomLevel(territory) {
  // Check for screen width
  const isSmallScreen = window.innerWidth <= 600;

  if (territory === 'North San Diego') return isSmallScreen ? 13 : 15;
  else if (territory === 'South San Diego') {
    return isSmallScreen ? 12 : 14;
  } else if (territory === 'West San Diego') {
    return isSmallScreen ? 11 : 13;
  } else if (territory === 'East San Diego') {
    return isSmallScreen ? 12 : 14;
  } else if (territory === 'All Territories') {
    return isSmallScreen ? 9 : 10;
  }
}

function toggleMode() {
  const body = document.body;
  const lightIcon = lightModeButton;
  const darkIcon = darkModeButton;

  if (body.getAttribute('data-theme') === 'dark') {
    body.setAttribute('data-theme', 'light');
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  } else {
    body.setAttribute('data-theme', 'dark');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
  }
}

// Event listeners
lightModeButton.addEventListener('click', toggleMode);
darkModeButton.addEventListener('click', toggleMode);
backButton.addEventListener('click', () => {
  toggleUIElements(false);
});

export { createTerritoryButtons, toggleMode };

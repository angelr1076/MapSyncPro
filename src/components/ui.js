import { initMap } from './map.js';
import data from '../data/territories.json';
import allData from '../data/allTerritories.json';
import { getCustomers } from './api.js';
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
async function createTerritoryButtons() {
  try {
    const response = await getCustomers();
    const customerData = response.data;

    const uniqueTerritories = new Set(
      customerData.map(customer => customer[40].value)
    );

    uniqueTerritories.forEach(territoryName => {
      const button = document.createElement('button');
      button.textContent = territoryName;
      button.classList.add('btn', 'm-2');
      button.onclick = () => handleUserChoice(territoryName);
      buttonContainer.appendChild(button);
    });

    const allTerritoriesButton = document.createElement('button');
    allTerritoriesButton.textContent = 'All Territories';
    allTerritoriesButton.classList.add('btn', 'm-2');
    allTerritoriesButton.onclick = () => handleUserChoice('All Territories');
    buttonContainer.appendChild(allTerritoriesButton);
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
}

// Handle user's territory choice
async function handleUserChoice(choice) {
  try {
    const response = await getCustomers();

    if (!response || !response.data) {
      throw new Error('Invalid response data');
    }

    const customerData = response.data;
    // console.log('Choice:', choice);
    const chosenTerritoryData =
      choice !== 'All Territories'
        ? customerData.filter(customer => {
            // console.log('Filtering customer:', customer[40]?.value);
            return customer[40]?.value === choice;
          })
        : customerData;

    if (chosenTerritoryData.length > 0) {
      const zoomLevel = setZoomLevel(choice);
      updateCustomerCount({ addresses: chosenTerritoryData });
      pageHeaderTerritoryName.textContent = choice;
      toggleUIElements(true);
      // console.log('Chosen territory data:', chosenTerritoryData);
      initMap(chosenTerritoryData, choice, zoomLevel);
      choice === 'All Territories'
        ? createLegend({ addresses: chosenTerritoryData })
        : hideElement(pageFooter);
    } else {
      console.error('Chosen territory not found');
    }
  } catch (error) {
    console.error('Error in handleUserChoice:', error);
  }
}

function createModal(el, territory, color) {
  const modal = document.querySelector('#legendModal');
  const modalHeader = document.querySelector('#modal-header-content');
  const modalBody = document.querySelector('#modal-body-content');
  let isModalOpen = false;
  let modalTimeout;

  const showModal = () => {
    modal.style.display = 'block';
    modalHeader.innerHTML = territory;
    modalBody.innerHTML = color;
    modal.classList.add('animatein');
    modal.classList.remove('animateout');
    isModalOpen = true;

    modalTimeout = setTimeout(() => {
      closeModal();
    }, 1250);
  };

  const closeModal = () => {
    if (isModalOpen) {
      modal.classList.add('animateout');
      modal.classList.remove('animatein');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
      isModalOpen = false;
      clearTimeout(modalTimeout);
    }
  };

  el.addEventListener('click', showModal);
  window.addEventListener('click', e => {
    if (e.target === modal || e.target === window) {
      closeModal();
    }
  });
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
        .map(unique => unique[40].value)
        .filter(unique => unique.length > 0)
    ),
  ];

  const uniqueColors = [
    ...new Set(
      customerArr
        .map(unique => unique[41].value)
        .filter(unique => unique.length > 0)
    ),
  ];

  const uniqueHex = [
    ...new Set(
      customerArr
        .map(unique => unique[42].value)
        .filter(unique => unique.length > 0)
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

// If in the future I plan to scale the application to use real-time data or larger datasets that might not be feasible to store locally, maintaining the API functionality would be beneficial, so I'm keeping it. I initially wrote this and pulled from a database, and want to keep that part intact, even if it's not necessary for this project.

// These would come from a .env file in a real app
const realmName = 'realmName';
const userToken = 'userToken';
const url = 'apiEndpoint';
const territoriesTable = 'tableID';
const customersTable = 'customerTableID';

const headers = {
  'Realm-Hostname': realmName,
  Authorization: userToken,
  'Content-Type': 'application/json',
  'Content-Security-Policy': 'default-src',
  self: 'unsafe-inline',
  Guard: 'immutable',
};

// Set data object for territories
const territoriesData = {
  from: territoriesTable,
  select: ['territoryName', 'trueLat', 'trueLong', 'postalCodes'],
};

// Fetch territories from the API
const fetchTerritories = () => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(territoriesData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

// Fetch patient data from the API
const fetchCustomers = searchQuery => {
  const customerData = {
    from: customersTable,
    select: [
      'assignedTC',
      'mapColor',
      'marketingRep',
      'patientAddress',
      'therapyBillingStatus',
      'patientName',
      'primaryItemGroup',
      'territoryName',
      'linkToPatient',
      'outcomesLead',
      'primarySC',
      'primaryAddress',
      'colorHex',
    ],

    where: searchQuery,
  };

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(customerData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

export { fetchTerritories, fetchCustomers };

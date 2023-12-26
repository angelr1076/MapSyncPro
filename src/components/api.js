const realmName = process.env.REALM;
const userToken = process.env.USER_TOKEN;
const url = process.env.ENDPOINT;
const customersTable = process.env.TABLE_ID;

const headers = {
  'QB-Realm-Hostname': realmName,
  'User-Agent': '{User-Agent}',
  Authorization: `QB-USER-TOKEN ${userToken}`,
  'Content-Type': 'application/json',
};

const customerData = {
  from: customersTable,
  // 11 first name, 12 job title, 13 last name, 17 phone, 22 company,
  // 30 address, 38 lat, 39 long, 40 territory, 41 color, 42 hex.
  // 43 linkToCustomer, 44 email, 47 territoryLat, 48 territoryLong
  select: [11, 12, 13, 17, 22, 30, 38, 39, 40, 41, 42, 43, 44, 47, 48],
};

// Fetch customer data from the API
function getCustomers() {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(customerData),
  }).then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  });
}

export { getCustomers };

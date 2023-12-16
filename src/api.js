import { realmName, qbUserToken, url } from './env';

export const fetchTerritories = () => {
  const headers = {
    apiKey,
    Authorization: auth,
    'Content-Type': 'application/json',
  };

  const territories = {
    from: territoriesTable,
    select: [6, 40, 41, 44],
  };

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(territories),
  }).then(response => response.json());
};

export const fetchPatients = patientData => {};

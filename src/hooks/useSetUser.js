import { useEffect, useState } from 'react';
import { postFindOrCreateUser } from '../requests';
let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

export default function useSetUser() {
  // In production we have access to the chrome.storage API so we use it to store a user object in inject.js, then get it here.
  // In testing we do not have access to the chrome.storage API so we have to retrieve the user object from our database.
  const [user, setUser] = useState({});

  const findOrCreateUser = () => {
    postFindOrCreateUser('', '', 'none', cypress.gitHubUsername, 'none', cypress.gitHubToken).then(data =>
      setUser({
        ...data,
        login: data.contributor_name,
        ethereumKey: data.contributor_signature,
        ethereumAddress: data.contributor_id
      })
    );
  };

  useEffect(() => {
    chrome.storage.local.get(['turbosrcUser'], data => setUser(JSON.parse(data.turbosrcUser)));
  }, []);
  return { user };
}

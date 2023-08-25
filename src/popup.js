const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';
const e = React.createElement;
let cypress = {};
try {
  cypress = require('../cypress.env.json');
} catch (error) {
  console.warn("No cypress.env.json file in root directory. To run tests, follow the readme in /cypress");
}

document.addEventListener('DOMContentLoaded', function() {
  const domContainer = document.querySelector('#rootcontainer');

  window.location.href !== "http://localhost:5001"
    ? chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        const tab = tabs[0];
        const pathnames = tab.url.split('/');
        let user = pathnames[3];
        let repo = pathnames[4];

        fetch(`https://api.github.com/repos/${user}/${repo}`)
          .then(response => response.json())
          .then(data => {
            if (data?.message === 'Not Found') {
              data = { owner: { login: 'none' }, name: 'none' };
            }
            ReactDOM.render(e(App, { currentRepo: data }), domContainer);
          });
      })
    : fetch(`https://api.github.com/repos/${cypress.gitHubUsername}/${cypress.gitHubRepo}`)
        .then(response => response.json())
        .then(data => {
          if (data?.message === 'Not Found') {
            data = { owner: { login: 'none' }, name: 'none' };
          }
          ReactDOM.render(e(App, { currentRepo: data }), domContainer);
        });
});

const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';
const e = React.createElement;
const cypress = require('../cypress.env.json');

document.addEventListener('DOMContentLoaded', function() {
  const domContainer = document.querySelector('#rootcontainer');

  process.env.NODE_ENV !== 'test'
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

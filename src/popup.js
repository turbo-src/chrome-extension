const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';
const e = React.createElement;
var issueId = 'waiting...';
process.env.NODE_ENV === 'test'
  ? document.addEventListener('DOMContentLoaded', function() {
      const domContainer = document.querySelector('#rootcontainer');
      ReactDOM.render(e(App, { currentRepo: { owner: { login: 'jex441' }, name: 'demo' } }), domContainer);
    })
  : chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const tab = tabs[0];
      const pathnames = tab.url.split('/');
      const user = pathnames[3];
      const repo = pathnames[4];

      fetch(`https://api.github.com/repos/${user}/${repo}`)
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          if (data?.message === 'Not Found') {
            data = { owner: { login: 'none' }, name: 'none' };
          }
          ReactDOM.render(e(App, { currentRepo: data }), domContainer);
        });
    });

// cypress/plugins/index.js
const extensionLoader = require('cypress-browser-extension-plugin/loader');
module.exports = (on) => {
on('before:browser:launch', extensionLoader.load('/dist'));
}
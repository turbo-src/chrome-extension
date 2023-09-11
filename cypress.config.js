const { defineConfig } = require('cypress')
const CONFIG = require('./src/config.js');
const path = require('path');

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
  "chromeWebSecurity": false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.extensions.push(path.join(__dirname, 'dist'))
        return launchOptions
      })
    },
  },
})
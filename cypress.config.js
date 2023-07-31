const { defineConfig } = require('cypress')
const CONFIG = require('./src/config.js');
const path = CONFIG.path
module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.extensions.push(path)
        return launchOptions
      })
    },
  },
})
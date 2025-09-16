const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    // pageLoadTimeout: 300000, // 5 minutes
    // baseUrl: 'http://127.0.0.1:8000',
  },
});

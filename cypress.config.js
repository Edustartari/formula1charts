const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    // pageLoadTimeout: 60000, // 1 minute
    baseUrl: "http://127.0.0.1:8000",
    defaultCommandTimeout: 5000, // 5 seconds
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

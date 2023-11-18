import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});

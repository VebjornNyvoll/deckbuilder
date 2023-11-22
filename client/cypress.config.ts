import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'cvqn9t',
  e2e: {
    experimentalStudio: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});

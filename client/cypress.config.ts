import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'cvqn9t',
  retries: 4,
  e2e: {
    baseUrl:'http://it2810-66.idi.ntnu.no/project2/',
    experimentalStudio: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});

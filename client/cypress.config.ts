import { defineConfig } from 'cypress';
import {env} from "./custom.config";

export default defineConfig({
  projectId: 'cvqn9t',
  retries: 4,
  e2e: {
    baseUrl:env.REACT_APP_FRONTEND_URL,
    experimentalStudio: false,
    async setupNodeEvents(on, config) {
      const localStorageCommands = await import('cypress-localstorage-commands/plugin');
      localStorageCommands.default(on, config); // Access the default property
      return config;
    },
  },
});

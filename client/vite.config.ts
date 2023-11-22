import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react-swc";
import { viteMockPlugin } from './mockupplugin'; // Adjust the path as necessary// https://vitejs.dev/config/
export default defineConfig({
  base: "/project2",
  plugins: [react(), viteMockPlugin()],
  test: {
    // Put your Vitest options here
    globals: true,
    environment: 'jsdom',
  },
  define: { global: 'window' }
});

import { defineConfig } from 'vite';
import { viteMockPlugin } from './mockupplugin';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project2',
  plugins: [react(), viteMockPlugin()],
  test: {
    // Put your Vitest options here
    globals: true,
    environment: 'happy-dom',
  },
  define: { global: 'window' },
});

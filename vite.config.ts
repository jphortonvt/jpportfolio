import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ruled is linked from ../design-system, which has its own node_modules;
  // dedupe so the site and the design system share one copy of React.
  resolve: { dedupe: ['react', 'react-dom'] },
  server: { port: 5190, strictPort: true },
});

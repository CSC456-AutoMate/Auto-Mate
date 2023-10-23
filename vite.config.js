import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js',
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/setupTests.js",
    exclude: [
      ...configDefaults.exclude, '**/tests/**'
    ],
  },
})

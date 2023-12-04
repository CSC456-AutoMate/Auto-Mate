import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        global: true,
        environment: 'jsdom',
        setupFiles: './setupTest.js',
        coverage: {
            reporter: [
                'text',
                'html',
                'json-summary',
                'json'
            ]
        },
    },
});

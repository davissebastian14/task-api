const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',
    use: {
        baseURL: 'https://task-api-gen5.onrender.com',
    },
});
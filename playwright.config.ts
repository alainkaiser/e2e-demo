import { defineConfig } from '@playwright/test'

// The slide comparison. `npx e2e run` does not pick this up.
export default defineConfig({
  testDir: 'playwright',
  use: {
    baseURL: 'http://127.0.0.1:4317',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: true,
  },
})

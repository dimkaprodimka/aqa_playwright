import { defineConfig, devices } from '@playwright/test'
import { configDotenv } from "dotenv"

configDotenv({path: "./env/.env"})

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['./my-awesome-reporter.ts'], ['html']],
  use: {
    baseURL: process.env.ENV_URL,
    httpCredentials: {
      username: `${process.env.HTTP_CREDS_USERNAME}`,
      password: `${process.env.HTTPS_CREDS_PASSWORD}`
    },
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
       },
    }]
});

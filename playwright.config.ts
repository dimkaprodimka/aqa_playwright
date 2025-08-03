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
      password: `${process.env.HTTP_CREDS_PASSWORD}`
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-first-failure',
  },
  projects: [
    { name: 'setup chromium', testMatch: "./tests/auth.setup.spec.ts", use: { ...devices['Desktop Chrome'] } },
    { name: 'setup firefox', testMatch: "./tests/auth.setup.spec.ts", use: { ...devices['Desktop Firefox'] } },
    { name: 'setup safari', testMatch: "./tests/auth.setup.spec.ts", use: { ...devices['Desktop Safari'] } },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
       },
       dependencies: ['setup chromium']
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox']
       },
       dependencies: ['setup firefox']
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari']
       },
       dependencies: ['setup safari']
    }]
});

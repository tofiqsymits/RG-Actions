import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/HappyFlow',
  globalSetup: './Authentication/Setup/StagingSetup.ts',
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 6 * 10 * 1000
  },
  retries: 0,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: '50%',
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright', { outputFolder: "./test-results/Reports/HF/Staging/allure-results" }]
  ],
  use: {
    baseURL: 'https://stage.engyj.com/',
    storageState: './Authentication/Storage State/staging-storageState.json',
    actionTimeout: 0,
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: process.env.STAGE_USERNAME,
        viewport: { height: 1080, width: 1920 }
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        userAgent: process.env.STAGE_USERNAME,
        viewport: { height: 1080, width: 1920 }
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        userAgent: process.env.STAGE_USERNAME,
        viewport: { height: 1080, width: 1920 }
      }
    }
  ]
};

export default config;
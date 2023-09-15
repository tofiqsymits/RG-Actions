import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  testIgnore: ["e2e_ApplicantInternalQuestionnaireTableview.spec.ts", "e2e_ApplicantInternalQuestionnaireWorkflow.spec.ts"],
  globalSetup: './Authentication/Setup/ProductionSetup.ts',
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  retries: 1,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: '50%',
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright', { outputFolder: "./test-results/Reports/e2e/Production/allure-results" }]
  ],
  use: {
    baseURL: 'https://recruit.engyj.com/',
    storageState: './Authentication/Storage State/production-storageState.json',
    actionTimeout: 0,
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: process.env.RECRUIT_USERNAME
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        userAgent: process.env.RECRUIT_USERNAME
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        userAgent: process.env.RECRUIT_USERNAME
      }
    }
  ]
};

export default config;
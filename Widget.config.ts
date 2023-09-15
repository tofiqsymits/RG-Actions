import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests/Widget',
    timeout: 5 * 60 * 1000,
    expect: {
        timeout: 2 * 60 * 1000
    },
    retries: 1,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    workers: '50%',
    reporter: [['list'], ['allure-playwright', { outputFolder: "./test-results/Reports/widget/Production/allure-results-e2e" }], ['html']],
    use: {
        actionTimeout: 0,
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        },
    ]
};

export default config;
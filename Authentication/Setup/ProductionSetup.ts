import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
require('dotenv').config({ path: 'Configurations/.env' });

const USERNAME = process.env.RECRUIT_USERNAME ?? '';
const USEREMAIL = process.env.RECRUIT_EMAIL ?? '';
const USERPASSWORD = process.env.RECRUIT_PASSWORD ?? '';

export default async function globalSetup(config: FullConfig) {

    const { baseURL, storageState } = config.projects[0].use;
    const stats = fs.existsSync(storageState!.toString())
        ? fs.statSync(storageState!.toString())
        : null;
    // Token will always refresh on after 60 mins.

    //                                        expected mins*mins*miliseconds  
    if (stats && stats.mtimeMs > new Date().getTime() - 90 * 60 * 1000) {
        console.log(`\t┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐`);
        console.log(`\t\x1b[38;5;2m\t\t\t[Production] : Sign-In is Skipped because Token is Fresh\x1b[0m`);
        console.log(`\t└──────────────────────────────────────────────────────────────────────────────────────────────────────┘`);
        return;
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    console.log(`\t┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐`);
    console.log(`\x1b[2m\t\t\t[Production] : Signing-In is Started against \x1b[38;5;12m'${baseURL}'\x1b[0m`);
    await page.goto(baseURL + 'login');
    console.log(`\x1b[2m\t\t\t\t\t[Production] : Signing-In as \x1b[38;5;12m'${USERNAME}'\x1b[0m`);
    await page.getByRole('textbox', { name: 'Email Address' }).fill(USEREMAIL);
    await page.getByPlaceholder('Password').fill(USERPASSWORD);
    console.log(`\x1b[2m\t\t\t\t\t[Production] : Signing-In is Processing...\x1b[0m`);
    await page.getByRole('button', { name: 'Login' }).click();
    console.log(`\x1b[38;5;2m\t\t\t\t\t[Production] : Successfully! Signed-In\x1b[0m`);
    console.log(`\t└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`);
    await page.evaluate(() => {
        window.localStorage.setItem('__language', 'en');
    });
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}
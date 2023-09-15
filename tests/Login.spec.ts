import { expect, test } from '@playwright/test';
import { loginPage } from '.././Pages/LoginPage'
require('dotenv').config({path: 'Configurations/.env'});

test.describe.parallel('Logins Suit', () => {
    test('Valid Login & Password', async ({ page }) => {
        const except_title = "ENGYJ Recruit | Dashboard"
        const loginpage = new loginPage(page);
        await loginpage.goUrl();
        loginpage.all_Logins(process.env.RECRUIT_EMAIL ?? '',process.env.RECRUIT_PASSWORD ?? '');
        //await context.storageState({ path: 'state.json' });
        await expect(page).toHaveTitle(except_title);
    })

    test('Valid Login & invalid password', async ({ page }) => {
        const username = "automate.symits@gmail.com"
        const userpassword = "adasdiasda231"
        const loginpage = new loginPage(page);
        await loginpage.goUrl();
        loginpage.all_Logins(username, userpassword);
        await expect(page.locator('.invalid-feedback')).toBeVisible();
    })

    test('Invalid Login & valid password', async ({ page }) => {
        const username = "zhasj.symits@gmail.com"
        const userpassword = "admin123"
        const loginpage = new loginPage(page);
        await loginpage.goUrl();
        loginpage.all_Logins(username, userpassword);
        await expect(page.locator('.invalid-feedback')).toBeVisible();
    })

    test('Invalid Login & invalid password', async ({ page }) => {
        const username = "tasf12ts@gmail.com"
        const userpassword = "asadn123"
        const loginpage = new loginPage(page);
        await loginpage.goUrl();
        loginpage.all_Logins(username, userpassword);
        await expect(page.locator('.invalid-feedback')).toBeVisible();
    })
})

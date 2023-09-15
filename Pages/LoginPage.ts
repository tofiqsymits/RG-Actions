import { Page } from "@playwright/test";
require('dotenv').config({path: 'Configurations/.env'});



export class loginPage {

    page: Page
    
    _userEmail: any;
    _userPassword: any;
    _signinButton: any;
    
    constructor(page: Page) {
        this.page = page;
        // '_' indegate this is a locetaor.
        // Add page locators:
        this._userEmail = page.locator("[class$='form-control ']");
        this._userPassword = page.locator("//input[@id='password']");
        this._signinButton = page.locator("#save-form");
    }

    async goUrl() {
        await this.page.goto('https://recruit.engyj.com/login', { waitUntil: 'networkidle' });
    }

    async all_Logins(user_email: string, user_password: string) {
        await this.goUrl();
        await this._userEmail.fill(user_email);
        await this._userPassword.fill(user_password);
        await this._signinButton.click();
    }

    async Login(){
        await this.goUrl();
        await this._userEmail.fill(process.env.RECRUIT_EMAIL ?? '')
        await this._userPassword.fill(process.env.RECRUIT_PASSWORD ?? '');
        await this._signinButton.click();
    }
}
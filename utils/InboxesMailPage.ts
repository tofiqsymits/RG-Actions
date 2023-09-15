import { Locator, Page } from '@playwright/test';

export class InboxesMailPage {
    page: Page;

    // Global URLs
    private InboxesMail_Page_Url: string;

    // Private Variables
    private production_MailInbox: string;
    private staging_MailInbox: string;

    // Global Private Locators
    private _Get_my_first_inbox_button: Locator;
    private _Username_input: Locator;
    private _Domain_dropdown: Locator;
    private _AddInbox_button: Locator;

    // all locators related to Assertions
    _download_button: Locator;

    // some extra locators
    prefix_mailSubject: string;
    suffix_mailSubject: string;

    constructor(page: Page) {
        this.page = page;

        // Global URLs
        this.InboxesMail_Page_Url = "https://inboxes.com/";

        // Global Private Locators
        this._Get_my_first_inbox_button = page.getByRole('button', { name: "Get my first inbox!" });
        this._Username_input = page.locator("#username");
        this._Domain_dropdown = page.getByRole("combobox");
        this._AddInbox_button = page.getByRole('button', { name: "Add Inbox" });

        // Private Variables
        this.production_MailInbox = "recruit.engyj.production";
        this.staging_MailInbox = "recruit.engyj.staging";

        // all locators related to Assertions
        this._download_button = page.getByRole('link', { name: "Download" });

        // some extra locators
        this.prefix_mailSubject = "//td[contains(text(),'";
        this.suffix_mailSubject = "')]";
    }

    // this function will navigate to "Inboxes Mail" Page
    async Navigate_to_InboxesMail_Page() {
        await this.page.goto(this.InboxesMail_Page_Url);
    }

    // this function will only click on "Get my first inbox" button
    async click_on_getMyFirstInbox_button() {
        await this._Get_my_first_inbox_button.click();
    }

    // this function will first take baseURL (of respective production or staging) as parameter and create Mail Inbox for Production (Recruit) or Staging (Recruit) 
    async create_MailInbox(BASEURL: any) {
        if (BASEURL.includes('stage') == true) {
            await this._Username_input.fill(this.staging_MailInbox);
            await this._Domain_dropdown.click();
            await this._Domain_dropdown.selectOption("robot-mail.com");
            await this._AddInbox_button.click();
            await this.waitFor_all_ingoing_processes();
        }
        else if (BASEURL.includes('recruit') == true) {
            {
                await this._Username_input.fill(this.production_MailInbox);
                await this._Domain_dropdown.click();
                await this._Domain_dropdown.selectOption("robot-mail.com");
                await this._AddInbox_button.click();
                await this.waitFor_all_ingoing_processes();
            }
        }
    }

    // this function will click on Mail Subject, given as parameter
    async click_on_MailSubject(MAIL_SUBJECT: string, APPLICANT_NAME: string) {
        await this.page.waitForLoadState("domcontentloaded");
        const MailSubject_locator: any = this.page.locator(this.prefix_mailSubject + MAIL_SUBJECT + " for " + APPLICANT_NAME + this.suffix_mailSubject);
        await MailSubject_locator.click();
    }

    // this function will click on "Link" given as parameter from (above) opened Inbox, and return LINK's (external) URL
    async click_on_MailLink(LINK: string) {
        await this.page.waitForLoadState("domcontentloaded");
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            await this.page.getByRole('link', { name: "" + LINK + "" }).click()
        ]);
        const EXTERNAL_URL = newTab.url();
        await newTab.close();
        return { EXTERNAL_URL };
    }

    // this function will wait for every ingoing process
    private async waitFor_all_ingoing_processes() {
        await Promise.all([
            this.page.waitForEvent("requestfinished"),
            this.page.waitForEvent("response")
        ])
    }

} 
import { Page } from "@playwright/test";
import { applicant_info } from "../utils/applicant_info"

export class LandingPage {
    page: Page;

    private _workflowURL: string;
    private _subDomain: string;

    // Global Urls
    private websitechat_url: string;      // applychat
    private google_url: string;
    private facebook_url: string;
    private indeed_url: string;
    private linkedin_url: string;
    private direct_url: string;
    private walkIn_url: string;

    // Global Locators
    private _jobTitle_heading: any;
    private _fullName_input: any;
    private _emailAddress_input: any;
    private _phoneNumber_input: any;
    private _submitApplication_button: any;
    private _morethan1yearofexperience: any;
    private _lessthan1yearofexperience: any;
    private _all_radios: any[];

    constructor(page: Page) {
        this.page = page

        // All pages redirection locators
        this._workflowURL = 'careers/automate-job';
        this._subDomain = "/apply";

        // Global URLs
        this.websitechat_url = this._subDomain + "?referer_url=/applychat";
        this.google_url = this._subDomain + "?referer_url=https://www.google.com";
        this.facebook_url = this._subDomain + "?referer_url=https://www.facebook.com";
        this.indeed_url = this._subDomain + "?referer_url=https://www.indeed.com";
        this.linkedin_url = this._subDomain + "?referer_url=https://www.linkedin.com";
        this.walkIn_url = this._subDomain + "?referer_url=https://www.yahoo.com/walkin";

        this.direct_url = this._subDomain + "";

        // Global Locators
        this._jobTitle_heading = page.locator("//h5[normalize-space()='Automate JOB']");
        this._fullName_input = page.locator("//input[@id='f_name']");
        this._emailAddress_input = page.locator("input[placeholder='Your Email Address']");
        this._phoneNumber_input = page.locator("//input[@id='phone_number']");
        this._morethan1yearofexperience = page.locator("label input[value='More than 1 Year of Experience']");
        this._lessthan1yearofexperience = page.locator("label input[value='Less than 1 Year of Experience']");
        this._all_radios = [this._morethan1yearofexperience, this._lessthan1yearofexperience];
        this._submitApplication_button = page.locator("#save-form");
    }

    // this function will only return random source url
    async return_random_source_url() {
        const allSourceUrls: any = [
            this.websitechat_url, this.linkedin_url, this.indeed_url,
            this.google_url, this.facebook_url, this.direct_url, this.walkIn_url
        ];
        const random_SourceUrl: string = allSourceUrls[Math.floor(Math.random() * allSourceUrls.length)];
        return { random_SourceUrl };
    }

    // this function will goto Landing Page url with above randomly generated source url append with it
    async Navigate_to_Landing_Page() {
        const Source_Url = (await this.return_random_source_url()).random_SourceUrl;
        await this.page.goto(this._workflowURL, { waitUntil: 'networkidle' });
        const [LandingPage_Url] = await Promise.all([
            this.page.waitForEvent('load'),
            this._jobTitle_heading.click()
        ]);
        await this.page.goto(LandingPage_Url.url() + Source_Url, { waitUntil: 'networkidle' });
    }

    // this function will take baseURL as input, and will create email address for Production or Staging and return it
    async return_emailAddress(BASEURL: any) {
        const production_MailInbox: string = "recruit.engyj.production@robot-mail.com";
        const staging_MailInbox: string = "recruit.engyj.staging@robot-mail.com";
        let selected_Email: string;

        if (BASEURL.includes('stage') == true) {
            selected_Email = staging_MailInbox;
            return { selected_Email };
        }
        else {
            selected_Email = production_MailInbox;
            return { selected_Email };
        }
    }

    // this function will create applicant from Landing Page
    async create_applicant_from_landing_page(APPLICANT_NAME: string, APPLICANT_EMAIL: string) {
        await this._fullName_input.fill(APPLICANT_NAME);
        await this._emailAddress_input.fill(APPLICANT_EMAIL);
        await this._phoneNumber_input.fill(applicant_info.a_Phone);
        await this.click_random_Qualification_radio();
        await this._submitApplication_button.click();
    }

    // this function will randomly select Radio (present in Landing Page) and will just return its index
    async click_random_Qualification_radio() {
        const allRadios_length = this._all_radios.length;
        const randomlySelected_radio = this._all_radios[Math.floor(Math.random() * allRadios_length)];
        await randomlySelected_radio.click();
    }

}

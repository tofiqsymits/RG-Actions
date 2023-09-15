import { Page } from "@playwright/test";

export class JobPage {
    readonly page: Page;

    // Global Urls
    private Admin_JobApplication_URL: string;

    // all PRIVATE LOCATORS
    private _selectJob_dropdown: any;
    private _fullName_input: any;
    private _emailAddress_input: any;
    private _phoneNumber_input: any;
    private _address_input: any;
    private _host_input: any;
    private _qualified_radio: any;
    private _unqualified_radio: any;
    private _submitApplication_button: any;
    private _selectStage_dropdown: any;
    private _selectSource_dropdown: any;

    // all wait for selectors
    _selectStage_dropdown_: string;

    constructor(page: Page) {
        this.page = page

        // Global Urls
        this.Admin_JobApplication_URL = "admin/job-applications/create";

        // all Locators related to "Add Applicant via admin's Job Application Page"
        this._selectJob_dropdown = page.getByRole('combobox');
        this._selectStage_dropdown = page.getByRole('combobox', { name: 'Select Stage' });
        this._fullName_input = page.getByPlaceholder('Full Name');
        this._emailAddress_input = page.getByPlaceholder('Email Address');
        this._phoneNumber_input = page.getByPlaceholder('Cell Phone Number');
        this._address_input = page.locator('[placeholder="Address"]');
        this._selectSource_dropdown = page.getByRole("combobox", { name: "Select Source" });
        this._host_input = page.getByPlaceholder('Host');
        this._qualified_radio = page.locator('#qualified');
        this._unqualified_radio = page.locator('#unqualified');
        this._submitApplication_button = page.locator("#save-form");

        // all wait for selectors
        this._selectStage_dropdown_ = "//select[@id='stage']";
    }

    // this function will navigate to "Admin's  Job Applications URL"
    async Navigate_to_admin_JobApplications_Page() {
        await this.page.goto(this.Admin_JobApplication_URL, { waitUntil: 'networkidle' });
    }

    // this function will only click in Select Stage and set value (to any Stage) you give as a parameter
    async select_stage_any(STAGE_NAME: string) {
        await this.page.waitForSelector(this._selectStage_dropdown_, { state: "visible", strict: true });
        await this._selectStage_dropdown.click();
        await this._selectStage_dropdown.selectOption(STAGE_NAME);
    }

    // this function will Select "Automate Job" from Select Job dropdown
    async select_job(JOB_TITLE: string) {
        await this._selectJob_dropdown.selectOption({ label: "" + JOB_TITLE + "" });
        await this.waitFor_all_ingoing_processes();
        await this.page.waitForLoadState("networkidle");
    }

    // this function will select random "Qualified" or "Unqualified" radio
    async random_qualification_radio() {
        const all_Qualifications_radio: any[] = [this._qualified_radio, this._unqualified_radio];
        const randomly_select_radio: number = Math.floor(Math.random() * all_Qualifications_radio.length);
        await all_Qualifications_radio[randomly_select_radio].click();
    }

    // this function will only help in selecting Random Source from ADMIN'S JOB PAGE
    async randomly_select_source() {
        const allSources: string[] = ["Facebook", "Google", "Indeed", "Linkedin", "Direct", "Walk-In"];
        const randomIndex: number = Math.floor(Math.random() * allSources.length);
        const randomly_selectedSource: string = allSources[randomIndex];
        await this._selectSource_dropdown.selectOption(randomly_selectedSource);
    }

    // this function will Enter Applicant's Full Name, Email, Cell Phone Number, Address
    async Create_Applicant_via_Admin_Page(APPLICANT_NAME: string, APPLICANT_EMAIL: any, APPLICANT_PHONE: any, APPLICANT_ADDRESS: any) {
        await this._fullName_input.click();
        await this._fullName_input.fill(APPLICANT_NAME);
        await this._emailAddress_input.fill(APPLICANT_EMAIL)
        await this._phoneNumber_input.fill(APPLICANT_PHONE);
        await this._address_input.fill(APPLICANT_ADDRESS);
        await this.randomly_select_source();
        await this._host_input.fill("Ts-Script");
        await this.random_qualification_radio();
        await this._submitApplication_button.click();
    }

    // this function will take BaseUrl, Stage's name, applicant's name, phone, address, and email address from function(return_emailAddress())
    async Create_Applicant_with_specific_stage_via_Admin_Page(BASE_URL: any, STAGE_NAME: string, APPLICANT_NAME: string, APPLICANT_PHONE: any, APPLICANT_ADDRESS: any) {
        const APPLICANT_EMAIL: string = (await this.return_emailAddress(BASE_URL)).selected_Email;
        await this.select_stage_any(STAGE_NAME);
        await this._fullName_input.click();
        await this._fullName_input.fill(APPLICANT_NAME);
        await this._emailAddress_input.fill(APPLICANT_EMAIL)
        await this._phoneNumber_input.fill(APPLICANT_PHONE);
        await this._address_input.fill(APPLICANT_ADDRESS);
        await this.randomly_select_source();
        await this._host_input.fill("Ts-Script");
        await this.random_qualification_radio();
        await this._submitApplication_button.click();
    }

    // this function will help in editing informations about (already created) applicant
    async Edit_Applicant_Details(APPLICANT_NAME: string, APPLICANT_EMAIL: string, APPLICANT_PHONE: string, APPLICANT_ADDRESS: string) {
        await this._fullName_input.fill(APPLICANT_NAME);
        await this._emailAddress_input.fill(APPLICANT_EMAIL);
        await this._phoneNumber_input.fill(APPLICANT_PHONE);
        await this._address_input.fill(APPLICANT_ADDRESS);
        await this._submitApplication_button.click();
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

    // this function will wait for every ingoing process
    async waitFor_all_ingoing_processes() {
        await Promise.all([
            this.page.waitForEvent("requestfinished"),
            this.page.waitForEvent("response")
        ])
    }

}

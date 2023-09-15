import { Page } from "@playwright/test";
import { applicant_info } from "../utils/applicant_info";

export class WidgetHandle {
    page: Page

    private workflow_widget_URL: string;
    _frame_loc: any;

    constructor(page: Page) {
        this.page = page;
        // await page.locator('text=Start Instant Job Interview').click();

        //URLS
        this.workflow_widget_URL = 'https://symits.com/recruitment/'
        this._frame_loc = page.frameLocator('#chatbull-frame'); //Iframe locator  

        //applicant calender locators
    }

    async workflow_URL() {
        await this.page.goto(this.workflow_widget_URL, {
            waitUntil: 'networkidle'
        });
    }

    async widget_fill(applicant_name: string, applicant_email: string) {
        await this.page.getByRole('button', { name: 'Start Instant Job Interview' }).click();
        await this._frame_loc.getByPlaceholder('Type your first and last name only').click();
        await this._frame_loc.getByPlaceholder('Type your first and last name only').fill(applicant_name);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByPlaceholder('Your Cell Phone Number, only numbers starting with area code \n(Message & Data rates may apply)').click();
        await this._frame_loc.getByPlaceholder('Your Cell Phone Number, only numbers starting with area code \n(Message & Data rates may apply)').fill(applicant_info.a_Phone);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByPlaceholder('Enter your Email Address').click();
        await this._frame_loc.getByPlaceholder('Enter your Email Address').fill(applicant_email);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByRole('button', { name: 'Yes' }).click();
        await this._frame_loc.getByRole('button', { name: 'Yes' }).click();
        await this._frame_loc.getByRole('button', { name: 'Yes' }).click();
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.frameLocator('#chatbull-frame').locator('#return_job_url').getByRole('link', { name: 'Schedule Interview' }).click()
        ]);
        const Appointment_URL = newPage.url();
        return { Appointment_URL };
    }

    // this function will click on All No Buttons
    async widget_fill_disqualified(applicant_name: string, applicant_email: string) {
        await this.page.getByRole('button', { name: 'Start Instant Job Interview' }).click();
        await this._frame_loc.getByPlaceholder('Type your first and last name only').click();
        await this._frame_loc.getByPlaceholder('Type your first and last name only').fill(applicant_name);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByPlaceholder('Your Cell Phone Number, only numbers starting with area code \n(Message & Data rates may apply)').click();
        await this._frame_loc.getByPlaceholder('Your Cell Phone Number, only numbers starting with area code \n(Message & Data rates may apply)').fill(applicant_info.a_Phone);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByPlaceholder('Enter your Email Address').click();
        await this._frame_loc.getByPlaceholder('Enter your Email Address').fill(applicant_email);
        await this._frame_loc.getByRole('button', { name: 'Send' }).click();
        await this._frame_loc.getByRole('button', { name: 'No' }).click();
        await this._frame_loc.getByRole('button', { name: 'No' }).click();
        await this._frame_loc.getByRole('button', { name: 'No' }).click();
    }

}
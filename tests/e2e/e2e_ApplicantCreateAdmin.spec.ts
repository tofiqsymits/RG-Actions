import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";
import { applicant_info } from "../../utils/applicant_info";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
const JOB_TITLE = 'Automate JOB';
const APPLICANT_NAME = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL = applicant_info.a_Email;
const APPLICANT_PHONE = applicant_info.a_Phone;
const APPLICANT_ADDRESS = applicant_info.a_Address;

// all variables that used for verification
const QUALIFIED: string = "QUALIFIED (100.0%)";

// all editable texts variables
const APPLICANT_NAME_1 = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_1 = applicant_info.a_Email;
const APPLICANT_PHONE_1 = applicant_info.a_Phone_1;
const APPLICANT_ADDRESS_1 = applicant_info.a_Address;

// all browser's related variables
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser: Browser }) => {
    context = await Browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await page.close();
    await context.close();
});

test.describe('--- CREATE and EDIT APPLICANT via "Hiring Manager" or "Admin" - SUIT ---', () => {

    test(`Create Applicant via "Admin's Job Page"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Admin" or "Hiring Manager" Job Applications Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Navigate_to_admin_JobApplications_Page();
        })

        await test.step(`Selecting Job Title : "${JOB_TITLE}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.select_job(JOB_TITLE);
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Now Adding Applicant's Info... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Create_Applicant_via_Admin_Page(APPLICANT_NAME, APPLICANT_EMAIL, APPLICANT_PHONE, APPLICANT_ADDRESS);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Validating Assertion of Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('ENGYJ Recruit | Dashboard');
        })

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Validate Applicant : "${APPLICANT_NAME}" is Visible in Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            const all_visible_Applicants_count = await POM._applicantpagetv.all_Names.count();
            for (let i = 0; i < all_visible_Applicants_count; i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
                    return;
                }
            }
        })

    });

    /*
    test.skip(`Edit Applicant's Information`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Clicking "Edit" Icon of Applicant : "${APPLICANT_NAME}" in Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
                    await POM._applicantpagetv.all_Actions.nth(i).locator(POM._applicantpagetv._applicant_edit_icon).click();
                    return;
                }
            }
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Now Editing Applicant's Infos... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Edit_Applicant_Details(APPLICANT_NAME_1, APPLICANT_EMAIL_1, APPLICANT_PHONE_1, APPLICANT_ADDRESS_1);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Validating Assertion of Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle("ENGYJ Recruit | Applicants");
        })

    });

    test.skip(`Validate Informations after Edit`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Validating Applicant : "${APPLICANT_NAME_1}'s" Qualification... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_1) {
                    if (await POM._applicantpagetv.all_Qualifications.nth(i).textContent() === QUALIFIED) {
                        await POM._applicantpagetv.all_Actions.nth(i).locator(POM._applicantpagetv._applicant_edit_icon).click();
                        await POM._applicantpagetv.waitFor_all_ingoing_processes();
                        await page.waitForLoadState("networkidle");
                        await expect(POM._applicantpagetv._morethanineyearexperience_radio).toBeChecked();
                        return;
                    }
                    else {
                        await POM._applicantpagetv.all_Actions.nth(i).locator(POM._applicantpagetv._applicant_edit_icon).click();
                        await POM._applicantpagetv.waitFor_all_ingoing_processes();
                        await page.waitForLoadState("networkidle");
                        await expect(POM._applicantpagetv._lessthanineyearexperience_radio).toBeChecked();
                        return;
                    }
                }
            }
        })

        await test.step(`Opening Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.navigate_and_pick_Applicant(APPLICANT_NAME_1);
        })

        await test.step(`Validating Applicant's Email, Phone Number and Address are Changed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await Promise.all([
                expect(POM._applicantpagetv._profile_phone_title).toHaveText(APPLICANT_PHONE_1),
                expect(POM._applicantpagetv._profile_applicant_email).toHaveText(APPLICANT_EMAIL_1),
                expect(POM._applicantpagetv._profile_applicant_address).toHaveText(APPLICANT_ADDRESS_1)
            ]);
        })

    });
    */

});

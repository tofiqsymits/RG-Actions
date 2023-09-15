import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });

// all variables related to Applicant
const APPLICANT_NAME_cs: string = faker.name.firstName() + " " + faker.name.firstName();
let APPLICANT_EMAIL_cs: string;

// all texts related to STAGE
const WALK_IN_INTERVIEW_Stage: string = "Walk In Interview";
const PHONE_SCREEN_Stage: string = "Phone Screen";

// all browser's related variables
let context: BrowserContext;
let private_context: BrowserContext;
let page: Page;
let private_page: Page;

test.beforeAll(async ({ browser: Browser }) => {
    context = await Browser.newContext();
    page = await context.newPage();
    private_context = await Browser.newContext();
    await private_context.clearCookies();
    private_page = await private_context.newPage();
});

test.afterAll(async () => {
    await page.close();
    await context.close();
});

test.describe("--- APPLICANT CHANGE STAGE using Dropdown - SUIT ---", () => {

    test('Create New Applicant for Testing "Changing Stage using Dropdown"', async ({ browserName, baseURL }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Getting "Email Address" for Applicant : "${APPLICANT_NAME_cs}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_EMAIL_cs = (await POM_private._landinpage.return_emailAddress(baseURL)).selected_Email;
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_cs, APPLICANT_EMAIL_cs);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_cs}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

        await test.step(`Closing Private Contexts... of \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.close();
            await private_context.close();
        })

    });

    test('Cancel the Stage from ["Are you sure you want to move Stage?"] Modal', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_cs}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_cs);
        })

        await test.step(`Attempting to Cancel the Stage from ["Are you sure you want to move Stage?"] Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.cancel_from_areyoursure_modal(WALK_IN_INTERVIEW_Stage);
        })

        await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_applicants_modal_close.click();
        })

        await test.step(`Validating Applicant's Stage is "Phone Screen"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_cs) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(PHONE_SCREEN_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

    test('Cancel the Stage from ["Would you like to send automated Alerts?"] Modal', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME_cs}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_cs);
        })

        await test.step(`Attempting to Cancel the Stage from ["Would You Like to Send Automated Alert?"] Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.cancel_from_automatedalerts_modal(WALK_IN_INTERVIEW_Stage);
        })

        await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_applicants_modal_close.click();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await Promise.all([
                page.waitForLoadState("networkidle")
            ]);
        })

        await test.step(`Validating Applicant's Stage is "Phone Screen"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_cs) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(PHONE_SCREEN_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

    test('Attempt to Change Stage to "Walk In Interview" using Dropdown', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME_cs}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_cs);
        })

        await test.step(`Attempting to Change Applicant Stage to "Walk In Interview"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.applicant_profile_change_stage_dropdown(WALK_IN_INTERVIEW_Stage);
        })

        await test.step(`Performing Random Action in "Interview Change Status" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_applicants_modal_close.click();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await Promise.all([
                page.waitForLoadState("networkidle")
            ]);
        })

        await test.step(`Validating Applicant's Stage is Changed to "Walk In Interview"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_cs) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(WALK_IN_INTERVIEW_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

});

import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });

// all variables related to Applicant
const APPLICANT_NAME_pswv: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_pswv: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all variables related to store URL
let APPOINTMENT_URL: string;

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

test.describe('Applicant Schedule with Profile Button', () => {

    test('Create New Applicant for Testing "Profile Scheduling Appointment"', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_pswv, APPLICANT_EMAIL_pswv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_pswv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

        await test.step(`Closing Private Page... of \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.close();
            await private_context.close();
        })

    });

    test("Get Schedule Appointment Url", async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.Navigate_to_Workflowview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_pswv}" from Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.pick_Applicant(APPLICANT_NAME_pswv);
        })

        await test.step(`Getting Applicant's "Phone Screen Appointment" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPOINTMENT_URL = (await POM._applicantpagewv.applicant_schedule_with_prfile_button()).Appointment_URL;
        })

    });

    test('Schedule the Appointment', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.goto(APPOINTMENT_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Selecting Date for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.date_picked();
        })

        await test.step(`Selecting Random Time Slot for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.get_time_slot();
        })

        await test.step(`Now Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.schedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('Job Openings');
        })

    });

    test('Reschedule the Appointment', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.goto(APPOINTMENT_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Selecting Date for Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.date_picked();
        })

        await test.step(`Clicking "Reschedule Button" from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._applicantcalendarpage._areyoursure_reshedule_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
            await POM._applicantcalendarpage._interviewRescheduleBtn.click();
        })

        await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._applicantcalendarpage._timeslot_inside_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Selecting Random Time Slot for Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.get_time_slot();
        })

        await test.step(`Now Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.reschedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('Job Openings');
        })

    });

    test('Cancel the Appointment', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.goto(APPOINTMENT_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Cancelling Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantcalendarpage.cancel_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('Job Openings');
        })

    });

});

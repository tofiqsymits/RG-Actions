import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1280, width: 2000 } });

// all variables related to Applicant
const APPLICANT_NAME_ics: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_ics: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all browser's related variables
let context: BrowserContext;
let page: Page;
let private_context: BrowserContext;
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

test.describe('--- INTERVIEW CALENDAR PAGE - SUIT ---', () => {

    test('Create New Applicant for Testing "Schedule Interviews"', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_ics, APPLICANT_EMAIL_ics);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_ics}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
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

    test('Schedule the Interview', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Navigate_to_InterviewCalendar_Page();
        })

        await test.step(`Clicking Sidebar Menu... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Sidebar_menu.click();
        })

        await test.step(`Selecting Random Date and Time Slot for Scheduling... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.random_schedule_date();
        })

        await test.step(`Scheduling an Interview... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.applicant_picked_and_scheduling_interview(APPLICANT_NAME_ics);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_ics}" is Visible on Interview Calendar Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_ics
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).toBeVisible();
        })

    });

    test('Reschedule the Interview', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Clicking "Edit" Icon of Applicant : "${APPLICANT_NAME_ics}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.click_Edit_icon(APPLICANT_NAME_ics);
        })

        try {   //  handling with try catch block is need, because while testing in webkit browser waitForResponse() is not working and it fails the test
            await test.step(`Waiting for Time Slots Visibility... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForResponse(URL => "https://\*.engyj.com/admin/interview-schedule/get-timing" && URL.status() == 200, { timeout: 10 * 1000 });
            })
        }

        catch (error) {
            await test.step(`Waiting for Timeout of 2 Seconds... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForTimeout(2000);
            })
        }

        await test.step(`Selecting Random Time Slot for Rescheduling an Interview... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.random_timeSlot();
        })

        await test.step(`Clicking "Update" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.update_schedule();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_ics}" is Visible on Interview Calendar... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_ics
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).toBeVisible();
        })

    });

    test('Perform Random Action from "Interview Details" Modal', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Performing Random Action on Applicant : "${APPLICANT_NAME_ics}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.perform_random_action_on_checkbox(APPLICANT_NAME_ics);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Validating Assertion of Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle("ENGYJ Recruit | Applicants");
        })

        await test.step(`Navigating to "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Navigate_to_InterviewCalendar_Page();
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_ics}" is Not Visible on "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_ics
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).not.toBeVisible();
        })

    });

});

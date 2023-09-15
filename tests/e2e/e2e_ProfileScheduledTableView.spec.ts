import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
const APPLICANT_NAME_pstv: string = faker.name.firstName() + " " + faker.name.firstName();
let APPLICANT_EMAIL_pstv: string;

// all variables related to store URL
let APPOINTMENT_URL: string;

// all Mail Subject
const SCHEDULED_APPOINTMENT_text: string = "Appoint. Scheduled";
const RESCHEDULED_APPOINTMENT_text: string = "Appoint. Rescheduled";
const CANCELLED_APPOINTMENT_text: string = "Appoint. Cancelled";

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
    await private_page.close();
    await private_context.close();
});

test.describe('--- SCHEDULE AN APPOINTMENT WITH SCHEDULE BUTTON - SUIT ---', () => {

    test('Create New Applicant for Testing "Profile Scheduling Appointment"', async ({ browserName, baseURL }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Getting "Email Address" for Applicant : "${APPLICANT_EMAIL_pstv}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_EMAIL_pstv = (await POM_private._landinpage.return_emailAddress(baseURL)).selected_Email;
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_pstv, APPLICANT_EMAIL_pstv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_pstv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

    });

    test("Get Schedule Appointment Url", async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_pstv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_pstv);
        })

        await test.step(`Getting Applicant's "Phone Screen Appointment" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPOINTMENT_URL = (await POM._applicantpagetv.applicant_schedule_with_prfile_button()).Appointment_URL;
        })

    });

    test.describe('Schedule, Reschedule and Cancel Appointment - Suit', () => {

        test.beforeEach(async ({ browserName }) => {

            await test.step(`Navigating to Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.goto(APPOINTMENT_URL, { waitUntil: "networkidle" });
            })

        });

        test("Schedule the Appointment", async ({ browserName }) => {
            const POM = new POManager(page);

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

        test("Reschedule the Appointment", async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Selecting Date for Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantcalendarpage.date_picked();
            })

            await test.step(`Waiting for "Reschedule Button" to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantcalendarpage._areyoursure_reshedule_modal_popup_, { state: "visible", strict: true });
                await page.waitForLoadState("domcontentloaded");
            })

            await test.step(`Clicking "Reschedule Button" from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
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

        test("Cancel the Appointment", async ({ browserName }) => {
            const POM = new POManager(page);

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

    test.describe('Validations with Email - Suit', () => {

        test.beforeAll(async ({ browserName, baseURL }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
            })

            await test.step(`Clicking "Get my first inbox" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.click_on_getMyFirstInbox_button();
            })

            await test.step(`Creating "Mail Inbox"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.create_MailInbox(baseURL);
            })

        });

        test("Validate Scheduled Appointment's Emails", async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating Scheduled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page.locator
                    (
                        POM_private._inboxesmailpage.prefix_mailSubject
                        + SCHEDULED_APPOINTMENT_text
                        + " for "
                        + APPLICANT_NAME_pstv
                        + POM_private._inboxesmailpage.suffix_mailSubject
                    )
                ).toBeVisible({ timeout: 2 * 60 * 1000 });
            })

        });

        test("Validate Rescheduled Appointment's Emails", async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating Rescheduled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page.locator
                    (
                        POM_private._inboxesmailpage.prefix_mailSubject
                        + RESCHEDULED_APPOINTMENT_text
                        + " for "
                        + APPLICANT_NAME_pstv
                        + POM_private._inboxesmailpage.suffix_mailSubject
                    )
                ).toBeVisible({ timeout: 2 * 60 * 1000 });
            })

        });

        test("Validate Cancelled Appointment's Emails", async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating Cancelled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page.locator
                    (
                        POM_private._inboxesmailpage.prefix_mailSubject
                        + CANCELLED_APPOINTMENT_text
                        + " for "
                        + APPLICANT_NAME_pstv
                        + POM_private._inboxesmailpage.suffix_mailSubject
                    )
                ).toBeVisible({ timeout: 2 * 60 * 1000 });
            })

        });

    });

});

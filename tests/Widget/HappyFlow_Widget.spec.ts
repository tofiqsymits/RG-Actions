import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";
import { applicant_info } from "../../utils/applicant_info";

let private_context: BrowserContext;
let private_page: Page;

test.beforeAll(async ({ browser: Browser }) => {
    private_context = await Browser.newContext();
    await private_context.clearCookies();
    private_page = await private_context.newPage();
});

test.afterAll(async () => {
    await private_page.close();
    await private_context.close();
});

//test.use({baseURL: `https://symits.com/recruitment/`})
test.describe.configure({ mode: "serial" });

const APPLICANT_NAME_wq: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_wq: string = applicant_info.a_Email;
let Appointment_URL: string;

test.describe("--- Happy Flow With Widget - Suit ---", () => {

    test(`Widget Data Fill, and Get Applicant's "Appointment" URL`, async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Site : "Recruitment SEO Company"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._widgetHandle.workflow_URL();
        })

        await test.step(`Now Getting Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            Appointment_URL = (await POM_private._widgetHandle.widget_fill(APPLICANT_NAME_wq, APPLICANT_EMAIL_wq)).Appointment_URL;
        })

    });

    test(`Schedule Appointment`, async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Scheduling Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(Appointment_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Selecting Date for Schedule Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.date_picked();
        })

        await test.step(`Selecting Random Time Slot for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.get_time_slot();
        })

        await test.step(`Now Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.schedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.waitForEvent('load');
        })

        await test.step(`Validating Assertions with Page's Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page).toHaveTitle('Job Openings');
        })

    });

    test(`Reschedule Appointment`, async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Scheduling Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(Appointment_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Selecting Date to Reschedule "Appointment"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.date_picked();
        })

        await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.waitForSelector(POM_private._applicantcalendarpage._areyoursure_reshedule_modal_popup_, { state: "visible", strict: true });
            await private_page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Clicking "Reschedule Button" from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage._interviewRescheduleBtn.click();
        })

        await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.waitForSelector(POM_private._applicantcalendarpage._timeslot_inside_modal_popup_, { state: "visible", strict: true });
            await private_page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Now Rescheduling "Appointment"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.reschedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.waitForEvent("load");
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page).toHaveTitle("Job Openings");
        })

    });

    test(`Canceled Appointment`, async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Scheduling Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(Appointment_URL, { waitUntil: "networkidle" });
        })

        await test.step(`Cancelling Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantcalendarpage.cancel_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.waitForEvent("load");
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page).toHaveTitle("Job Openings");
        })

    });

});

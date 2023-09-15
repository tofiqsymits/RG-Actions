import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";
import { applicant_info } from "../../utils/applicant_info";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });

// all stages text
const SEND_DOCUMENTS_Stage: string = "Send Documents";

// all Mail Subjects
const SINGLE_DOCUMENTS_SENT_text: string = "Single Doc.";
const MULTIPLE_DOCUMENTS_SENT_text: string = "Multiple Doc.";

// all variables related to Applicant
const JOB_TITLE = 'Automate JOB';
const APPLICANT_NAME_asd: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_PHONE_asd: string = applicant_info.a_Phone;
const APPLICANT_ADDRESS_asd = applicant_info.a_Address;

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
    await private_page.close();
    await private_context.close();
});

test.describe('--- SEND DOCUMENTS - SUIT ---', () => {

    test('Create New Applicant for Testing "Send Documents"', async ({ browserName, baseURL }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Admin or Hiring Manager" Job Applications Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Navigate_to_admin_JobApplications_Page();
        })

        await test.step(`Selecting Job Title : "${JOB_TITLE}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.select_job(JOB_TITLE);
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Now Adding Applicant's Info... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Create_Applicant_with_specific_stage_via_Admin_Page(baseURL, SEND_DOCUMENTS_Stage, APPLICANT_NAME_asd, APPLICANT_PHONE_asd, APPLICANT_ADDRESS_asd);
        })

    });

    test.describe('Validate Documents Sent through Emails - Suit', () => {

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

        test('Validate Single Document Sent', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Clicking on Mail Subject : ${SINGLE_DOCUMENTS_SENT_text}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.click_on_MailSubject(SINGLE_DOCUMENTS_SENT_text, APPLICANT_NAME_asd);
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await private_page.waitForLoadState("domcontentloaded");
            })

            await test.step(`Validating Assertion of Single Document "Download" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._inboxesmailpage._download_button).toHaveCount(1);
            })

        });

        test('Validate Multiple Documents Sent', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
            })

            await test.step(`Clicking on Mail Subject : ${MULTIPLE_DOCUMENTS_SENT_text}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._inboxesmailpage.click_on_MailSubject(MULTIPLE_DOCUMENTS_SENT_text, APPLICANT_NAME_asd);
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await private_page.waitForLoadState("domcontentloaded");
            })

            await test.step(`Validating Assertion of Single Document "Download" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._inboxesmailpage._download_button).toHaveCount(2);
            })

        });

    });

});

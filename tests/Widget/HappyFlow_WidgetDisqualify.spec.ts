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

test.afterAll(async ({ browserName }) => {
    await test.step(`Closing "{${browserName}}..."`, async () => {
        await private_context.close();
    })
});

//test.use({baseURL: `https://symits.com/recruitment/`})
test.describe.configure({ mode: "serial" });

const APPLICANT_NAME_wdq: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_wdq: string = applicant_info.a_Email;

test.describe(`Happy Flow With Widget Suit - Disqualifying`, () => {

    test('Widget Data Fill With "No" Buttons', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Site : "Recruitment SEO Company"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._widgetHandle.workflow_URL();
        })

        await test.step(`Filling Widget Data with Each "NO" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._widgetHandle.widget_fill_disqualified(APPLICANT_NAME_wdq, APPLICANT_EMAIL_wdq);
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Disqualifying Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM_private._widgetHandle._frame_loc.getByText('We will review your questions and get in touch for the next steps either through')).toBeVisible();
        })

    });

});

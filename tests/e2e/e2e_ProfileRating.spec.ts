import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
let APPLICANT_NAME_pr: string;

// variable to store Stars
let STARS: number;

// all browser's related variables
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser: Browser }) => {
    context = await Browser.newContext();
    page = await context.newPage();
});

test.afterAll(async ({ browserName }) => {
    await page.close();
    await context.close();
});

test.describe('--- APPLICANT PROFILE RATING (TABLEVIEW PAGE) - SUIT ---', () => {

    test('Add Applicant Rating on Profile', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Getting the Name of first Applicant... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_NAME_pr = (await POM._applicantpagetv.get_first_Applicant_name()).firstApplicant_by_name;
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_pr}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_pr);
        })

        await test.step(`Adding STARS on Applicant : "${APPLICANT_NAME_pr}", and Getting Number of Stars... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            STARS = (await POM._applicantpagetv.add_stars_on_applicant()).randomlySelect_Star;
        })

        await test.step(`Validating Assertion with "Success Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._success_alert).toHaveText('×updated successfully.');
        })

        await test.step(`Validating "${STARS + 1}" Stars are Clicked... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_all_stars.nth(STARS)).toHaveClass(POM._applicantpagetv._profile_rating_stars_);
        })

    });

    test('Delete Applicant Rating on Profile', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Deleting Stars on Applicant : "${APPLICANT_NAME_pr}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.delete_stars_on_applicant();
        })

        await test.step(`Validating Assertion with "Success Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._success_alert).toHaveText('×updated successfully.');
        })

        await test.step(`Validating "${STARS + 1}" Stars are Deleted... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_all_stars.nth(STARS)).not.toHaveClass(POM._applicantpagetv._profile_rating_stars_);
        })

    });

});

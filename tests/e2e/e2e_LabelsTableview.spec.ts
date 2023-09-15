import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
const APPLICANT_NAME_ltv: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_ltv: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all variables to store Labels Text
let DEMOLABEL_TEXT_tv: string;
let RANDOMLY_SELECTED_LABEL_tv_text: string;
let MULTIPLE_LABELS: any[];

// all variables to store Indexes
let RANGE: number;

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

test.describe('--- TABLEVIEW PAGE LABELS - SUIT ---', () => {

    test('Create New Applicant for Testing "Labels"', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_ltv, APPLICANT_EMAIL_ltv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_ltv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
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

    test('Add the Label in Tableview Page', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Tableview Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_ltv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_ltv);
        })

        await test.step(`Randomly selecting "Label Colour", typing randomly generated "Text" and getting randomly generated "Text"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            DEMOLABEL_TEXT_tv = (await POM._applicantpagetv.randomly_selected_label_color_and_type_text())._demoLabelTestingText_tv;
        })

        await test.step(`Validating Label: "${DEMOLABEL_TEXT_tv}" is Visible inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_label_applicants_modal_labels.getByText(DEMOLABEL_TEXT_tv)).toBeVisible();
        })

        await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Validating "${DEMOLABEL_TEXT_tv}" is Visible on Applicant : "${APPLICANT_NAME_ltv}" in Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(POM._applicantpagetv.prefix_specific_ApplicantName_full_div + APPLICANT_NAME_ltv + POM._applicantpagetv.suffix_specific_ApplicantName_full_div + POM._applicantpagetv.prefix_allLabels_visible + DEMOLABEL_TEXT_tv + POM._applicantpagetv.suffix_allLabels_visible)).toBeVisible();   // this will concatenate two variable and convert it to locator
        })

    });

    test('Hide the Label in Tableview Page', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking "${APPLICANT_NAME_ltv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_ltv);
        })

        await test.step(`Hiding the Label... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.applicant_label_activate_deactivate(DEMOLABEL_TEXT_tv);
        })

        await test.step(`Validating Label is Not Visible on Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_label_applicants_modal_labels.getByText(DEMOLABEL_TEXT_tv)).not.toBeVisible();
        })

        await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Validating "${RANDOMLY_SELECTED_LABEL_tv_text}" is Not Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(POM._applicantpagetv.prefix_specific_ApplicantName_full_div + APPLICANT_NAME_ltv + POM._applicantpagetv.suffix_specific_ApplicantName_full_div + POM._applicantpagetv.prefix_allLabels_visible + DEMOLABEL_TEXT_tv + POM._applicantpagetv.suffix_allLabels_visible)).not.toBeVisible();   // this will concatenate two variable and convert it to locator
        })

    });

    test('Delete the Label in Tableview Page', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME_ltv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_ltv);
        })

        await test.step(`Deleting "${DEMOLABEL_TEXT_tv}" Label... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.applicant_label_deletion(DEMOLABEL_TEXT_tv);
        })

        await test.step(`Clicking "Add Labels" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_AddLabel_button.click();
        })

        await test.step(`Validating Label is Deleted... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_label_available_labels.getByText(DEMOLABEL_TEXT_tv)).not.toBeVisible();
        })

    });

    test(`Randomly Select Multiple (Existing) Labels in Tableview Page`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Getting Range to Loop Through... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            RANGE = (await POM._applicantpagetv.getRange_Labels()).range;
        })

        await test.step(`Getting All Labels... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            MULTIPLE_LABELS = (await POM._applicantpagetv.getUniqueRandom_Labels(RANGE)).uniqueMultipleLabels;
        })

        await test.step(`Now Clicking Multiple (Random) Labels... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.click_multiple_random_labels(MULTIPLE_LABELS);
        })

        await test.step(`Validating 'N' Number of Labels are Visible inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < MULTIPLE_LABELS.length; i++) {
                await expect(POM._applicantpagetv._profile_label_applicants_modal_labels.getByText(MULTIPLE_LABELS[i])).toBeVisible();
            }
        })

        await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Validating 'N' Number of Labels are Visible on Applicant : "${APPLICANT_NAME_ltv}" in Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < MULTIPLE_LABELS.length; i++) {
                await expect(page.locator(POM._applicantpagetv.prefix_specific_ApplicantName_full_div + APPLICANT_NAME_ltv + POM._applicantpagetv.suffix_specific_ApplicantName_full_div + POM._applicantpagetv.prefix_allLabels_visible + MULTIPLE_LABELS[i] + POM._applicantpagetv.suffix_allLabels_visible)).toBeVisible();   // this will concatenate two variable and convert it to locator
            }
        })

    });

});

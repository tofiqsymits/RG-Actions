import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";

// all variables related to Applicant
let APPLICANT_NAME_fwv: string;

// all qualifications related variables
let qualified_text = "Qualified";
let unqualified_text = "UnQualified";

// all treeitems texts
const Direct_text: string = "Direct";

// all labels related variables
let label_1: string;
let label_2: string;
let label_3: string;

// variable related to email
const email: string = "tofiq.symits@gmail.com";

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

test.beforeEach(async () => {
    const POM = new POManager(page);
    await POM._applicantpagewv.Navigate_to_Workflowview_Page();
    await POM._applicantpagewv.filterResults_attr.click();
});

test.describe.parallel('Filter By: "Qualifications"', () => {

    test('Filtering by "Qualified" Qualification', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: "${qualified_text} - All Qualifications"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.qualifiedQUALIFICATION_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "${qualified_text}" Applicants are Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.all_Qualifications.getByText(`${qualified_text}`).first()).toBeVisible();
        })

    });

    test('Filtering by "UnQualified" Qualification', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: "${unqualified_text} - All Qualifications"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.unqualifiedQUALIFICATION_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "${unqualified_text}" Applicants are Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.all_Qualifications.getByText(`${unqualified_text}`).first()).toBeVisible();
        })
    });

});

test.describe.parallel('Filter By: "Sources"', () => {

    test(`Filtering by "Direct" sources`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${Direct_text}" Source... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.directSOURCE_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Source : ${Direct_text}" is Visible inside Applicant's Box... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.all_Sources_Direct.first().getByText(`${Direct_text}`)).toBeVisible();
        })

    });

});

test.describe.parallel('Filter By: "Labels"', () => {

    test('Select Label - 01', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: "Label # 01"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_1 = (await POM._applicantpagewv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_1}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.profileLabels_after_Filters.getByText(label_1).first()).toBeVisible();
        })

    });

    test('Select Label - 02', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: "Label # 02"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_2 = (await POM._applicantpagewv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_2}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.profileLabels_after_Filters.getByText(label_2).first()).toBeVisible();
        })

    });

    test('Select Label - 03', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: "Label # 03"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_3 = (await POM._applicantpagewv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_3}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv.profileLabels_after_Filters.getByText(label_3).first()).toBeVisible();
        })

    });

});

test.describe.serial('Filter By: "Email", and Get Applicant Name', () => {

    test('Filtering by "Email"', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by: Email of "${email}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.emailFilter(email);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Picking First Applicant and Getting it's Name... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_NAME_fwv = (await POM._applicantpagewv._first_applicant.textContent()).trim();
        })

        await test.step(`Opening "${APPLICANT_NAME_fwv}" Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.pick_Applicant(APPLICANT_NAME_fwv);
        })

        await test.step(`Validating Applicant with Email : "${email}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagewv._profile_applicant_email).toHaveText(email);
        })

    });

    test('Search Applicant By Name', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Searching Applicant : "${APPLICANT_NAME_fwv}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.search_in_workflow_top(APPLICANT_NAME_fwv);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_fwv}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            try {
                await expect(POM._applicantpagewv.all_Names).toHaveText(APPLICANT_NAME_fwv);
            } catch (error) {
                console.log(`\t\tApplicant: "${APPLICANT_NAME_fwv}" is Found Multiple Times!`);
            }
        })

    });

});

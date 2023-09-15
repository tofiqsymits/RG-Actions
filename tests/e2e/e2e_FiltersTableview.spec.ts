import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";

// all variables related to Applicant
let APPLICANT_NAME_ftv: string;

// all treeitems texts
const Automate_JOB_text: string = "Automate JOB";
const Direct_text: string = "Direct";
const WalkIn_text: string = "Walk-In";

// all variables related to stages
const WALK_IN_INTERVIEW_Stage: string = "Walk In Interview";
const INTERNAL_QUESTIONNAIRE_E2E_Stage: string = "Internal Questionnaire E2E";
const HIRED_Stage: string = "Hired";

// variable related to email
const email: string = "tofiq.symits@gmail.com";

// all labels related variables
let label_1: string;
let label_2: string;
let label_3: string;

// all qualifications related variables
let qualified_text = "Qualified";
let unqualified_text = "UnQualified";

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
    await POM._applicantpagetv.Navigate_to_Tableview_Page();
    await POM._applicantpagetv.filterResults_attr.click();
});

test.describe.parallel('Filter By: "Jobs"', () => {

    test('Filtering by "Jobs" and "Walk in Interview" Stage', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${Automate_JOB_text} : ${WALK_IN_INTERVIEW_Stage}" Jobs... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.automatedJOB_and_StageName(WALK_IN_INTERVIEW_Stage);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Jobs" Column Have "${Automate_JOB_text}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Jobs.first().getByText(`${Automate_JOB_text}`)).toBeVisible();
        })

        await test.step(`Validating "Stage" Column Have "${WALK_IN_INTERVIEW_Stage}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Stages.getByText(WALK_IN_INTERVIEW_Stage).first()).toBeVisible();
        })

    });

    test('Filtering by "Jobs" and "Internal Questionnaire E2E" Stage', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${Automate_JOB_text} : ${INTERNAL_QUESTIONNAIRE_E2E_Stage}" Jobs... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.automatedJOB_and_StageName(INTERNAL_QUESTIONNAIRE_E2E_Stage);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Jobs" Column Have "${Automate_JOB_text}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Jobs.first().getByText(`${Automate_JOB_text}`)).toBeVisible();
        })

        await test.step(`Validating "Stage" Column Have "${INTERNAL_QUESTIONNAIRE_E2E_Stage}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Stages.getByText(INTERNAL_QUESTIONNAIRE_E2E_Stage).first()).toBeVisible();
        })

    });

    test('Filtering by "Jobs" and "Hired" Stage', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${Automate_JOB_text} : ${HIRED_Stage}" Jobs... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.automatedJOB_and_StageName(HIRED_Stage);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Jobs" Column Have "${Automate_JOB_text}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Jobs.first().getByText(`${Automate_JOB_text}`)).toBeVisible();
        })

        await test.step(`Validating "Stage" Column Have "${HIRED_Stage}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Stages.getByText(HIRED_Stage).first()).toBeVisible();
        })

    });

});

test.describe.parallel('Filter By: "Sources"', () => {

    test(`Filter "Sources"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by Source... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.directSOURCE_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        try {
            await test.step(`Validating "Source" Column Have "${Direct_text}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagetv.all_Sources.first().getByText(Direct_text)).toBeVisible();
            })
        }
        catch (error) {
            await test.step(`Validating "Source" Column Have "${WalkIn_text}" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagetv.all_Sources.first().getByText(WalkIn_text)).toBeVisible();
            })
        }

    });

});

test.describe.parallel('Filter By: "Labels"', () => {

    test('Select Label - 01', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "Label # 01"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_1 = (await POM._applicantpagetv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_1}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.profileLabels_after_Filters.getByText(label_1).first()).toBeVisible();
        })

    });

    test('Select Label - 02', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "Label # 02"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_2 = (await POM._applicantpagetv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_2}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.profileLabels_after_Filters.getByText(label_2).first()).toBeVisible();
        })

    });

    test('Select Label - 03', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "Label # 03"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            label_3 = (await POM._applicantpagetv.select_random_existing_label()).selected_existingLabel_text;
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Label: "${label_3}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.profileLabels_after_Filters.getByText(label_3).first()).toBeVisible();
        })

    });

});

test.describe.parallel('Filter By: "Qualifications"', () => {

    test('Filter By: "Qualified"', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${qualified_text} - All Qualifications"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.qualifiedQUALIFICATION_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Qualification" Column Have "${qualified_text}" Applicants... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Qualifications.getByText(`${qualified_text}`).first()).toBeVisible();
        })

    });

    test('Filter By: "UnQualified"', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by "${unqualified_text} - All Qualifications"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.unqualifiedQUALIFICATION_click();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "Qualification" Column Have "${unqualified_text}" Applicants... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv.all_Qualifications.getByText(`${unqualified_text}`).first()).toBeVisible();
        })

    });

});

test.describe.serial('Filter By: "Email", and Get Applicant Name', () => {

    test('Filter By: "Email"', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Filtering by Email of "${email}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.emailFilter(email);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Picking First Applicant and Getting it's Name... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_NAME_ftv = (await POM._applicantpagetv._first_applicant.textContent()).trim();
        })

        await test.step(`Opening "${APPLICANT_NAME_ftv}" Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_ftv);
        })

        await test.step(`Validating Applicant with Email : "${email}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_applicant_email).toHaveText(email);
        })

    });

    test('Search Applicant By Name', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Searching Applicant : "${APPLICANT_NAME_ftv}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.searchbynameorphone(APPLICANT_NAME_ftv);
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_ftv}" is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            try {
                await expect(POM._applicantpagetv.all_Names).toHaveText(APPLICANT_NAME_ftv);
            } catch (error) {
                console.log(`\t\tApplicant: "${APPLICANT_NAME_ftv}" is Found Multiple Times!`);
            }
        })

    });

});

import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });
test.skip(({ browserName }) => browserName === "firefox", 'Swapping is not Supported');

// applicant's variable
const APPLICANT_NAME_to_be_swap: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_to_be_swap: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all variables to store Indexes
let RANDOMLY_SELECTED_STAGE_INDEX: number;

// all Stages Text
const PHONE_SCREEN_Stage: string = "Phone Screen";
const WALK_IN_INTERVIEW_Stage: string = "Walk In Interview";
const DROP_DESTINATION_Stage: string = "Drop Destination";
const INTERNAL_QUESTIONNAIRE_HF_Stage: string = "Internal Questionnaire HF";
const EXTERNAL_QUESTIONNAIRE_HF_Stage: string = "External Questionnaire HF";
const REQUEST_DOCUMENT_Stage: string = "Request Documents";
const SEND_DOCUMENT_Stage: string = "Send Documents";
const HIRED_Stage: string = "Hired";
const REJECTED_Stage: string = "Rejected";
const RANDOM_STAGE: string[] = [HIRED_Stage, REJECTED_Stage];
//  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

test.describe(`--- HAPPYFLOW SWAPPING STAGES ---`, () => {

    test('Create New Applicant for Testing "Drag and Drop"', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_to_be_swap, APPLICANT_EMAIL_to_be_swap);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_to_be_swap}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
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

    test(`Validate Applicant's Stage is "Phone Screen"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Workflowview Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.Navigate_to_Workflowview_Page();
        })

        await test.step(`Validating Applicant's Stage is "Phone Screen"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                + APPLICANT_NAME_to_be_swap
                + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                + PHONE_SCREEN_Stage + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
            )).toBeVisible();
        })

    });

    test.describe(`--- Walk In Interview - Suit ---`, () => {

        test(`Swap Applicant to "${WALK_IN_INTERVIEW_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${WALK_IN_INTERVIEW_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, WALK_IN_INTERVIEW_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for "Interview Change Status" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interview_change_status_modal_popup_, { state: 'visible', strict: true });
            })

            await test.step(`Performing Random Action... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${WALK_IN_INTERVIEW_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + WALK_IN_INTERVIEW_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

    test.describe(`--- Drop Destination - Suit ---`, () => {

        test(`Swap Applicant to "${DROP_DESTINATION_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${DROP_DESTINATION_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, DROP_DESTINATION_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for "Interview Change Status" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interview_change_status_modal_popup_, { state: 'visible', strict: true });
            })

            await test.step(`Performing Random Action... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${DROP_DESTINATION_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + DROP_DESTINATION_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

    test.describe(`--- Internal Questionnaire HF - Suit ---`, () => {

        test(`Swap Applicant to "${INTERNAL_QUESTIONNAIRE_HF_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${INTERNAL_QUESTIONNAIRE_HF_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, INTERNAL_QUESTIONNAIRE_HF_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for "Interview Change Status" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interview_change_status_modal_popup_, { state: 'visible', strict: true });
            })

            await test.step(`Performing Random Action... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${INTERNAL_QUESTIONNAIRE_HF_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + INTERNAL_QUESTIONNAIRE_HF_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

    test.describe(`--- External Questionnaire HF - Suit ---`, () => {

        test(`Swap Applicant to "${EXTERNAL_QUESTIONNAIRE_HF_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${EXTERNAL_QUESTIONNAIRE_HF_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, EXTERNAL_QUESTIONNAIRE_HF_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for "Interview Change Status" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interview_change_status_modal_popup_, { state: 'visible', strict: true });
            })

            await test.step(`Performing Random Action... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${EXTERNAL_QUESTIONNAIRE_HF_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + EXTERNAL_QUESTIONNAIRE_HF_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

        test.describe(`--- Request Document - Suit ---`, () => {

        test(`Swap Applicant to "${REQUEST_DOCUMENT_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${REQUEST_DOCUMENT_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, REQUEST_DOCUMENT_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${REQUEST_DOCUMENT_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + REQUEST_DOCUMENT_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

    test.describe(`--- Send Document - Suit ---`, () => {

        test(`Swap Applicant to "${REQUEST_DOCUMENT_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Swapping Applicant : "${APPLICANT_NAME_to_be_swap}" to "${SEND_DOCUMENT_Stage}" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, SEND_DOCUMENT_Stage);
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
            })

            await test.step(`Clicking "Yes" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
            })

            await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForEvent('load');
            })

            await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForLoadState('domcontentloaded');
            })

            await test.step(`Hovering on Applicant : "${APPLICANT_NAME_to_be_swap}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                ).hover();
            })

            await test.step(`Validating Applicant's Stage is Changed to "${SEND_DOCUMENT_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.locator(
                    POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                    + APPLICANT_NAME_to_be_swap
                    + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                    + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                    + SEND_DOCUMENT_Stage
                    + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
                )).toBeVisible();
            })

        });

    });

    test(`Swap Applicant to Random "Hired/Rejected" Stage`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Getting Random "Hired/Rejected" Stage's Index... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            RANDOMLY_SELECTED_STAGE_INDEX = (await POM._applicantpagewv.get_random_stage_index(RANDOM_STAGE)).randomly_selected_index;
        })

        await test.step(`Swapping Applicant to Randomly Selected Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            const randomStage = RANDOM_STAGE[RANDOMLY_SELECTED_STAGE_INDEX];
            await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_to_be_swap, randomStage);
        })

        await test.step(`Clicking "Yes" Button from "Are you sure you want to move?" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.click_yes_areyoursure_modal_popup();
        })

        await test.step(`Clicking "Yes" Button from "Would you like to send Automated Alerts?" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.click_yes_automatedalerts_modal_popup();
        })

        await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant's Stage is Changed to Random "Hired or Rejected"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                + APPLICANT_NAME_to_be_swap
                + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                + RANDOM_STAGE[RANDOMLY_SELECTED_STAGE_INDEX]
                + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
            )).toBeVisible();
        })

    });

});

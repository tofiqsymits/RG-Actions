import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });
test.fixme(({ browserName }) => browserName === "firefox", "Swapping is Not Supported");

// all variables related to Applicant
const APPLICANT_NAME_iqwv: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_iqwv: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all texts for stage
const INTERNAL_QUESTIONNAIRE_E2E_Stage: string = "Internal Questionnaire E2E";

// all descriptions and headings texts to be verified
const InternalQuestionnaire_Profile_heading: string = "Internal Questionnaire (Profile) For ";
const InternalQuestionnaire_Profile_description: string = "Description: Internal Questionnaire (Profile) - Assertion";
const InternalQuestionnaire_InterviewAction_heading: string = "Internal Questionnaire - Interview Action For ";
const InternalQuestionnaire_InterviewAction_description: string = "Description: Internal Questionnaire - Interview Action - Assertion";

// all texts to be verified from timeline
const TEXT_TO_BE_VERIFIED: string = `Internal Questionnaire: (Internal Questionnaire (Profile)) filled by `;
const UPDATED_TEXT_TO_BE_VERIFIED: string = `Internal Questionnaire: (Internal Questionnaire (Profile)) updated by `;
const TEXT_TO_BE_VERIFIED_interviewaction: string = `Internal Questionnaire: (Internal Questionnaire - Interview Action) filled by `;
const UPDATED_TEXT_TO_BE_VERIFIED_interviewaction: string = `Internal Questionnaire: (Internal Questionnaire - Interview Action) updated by `;

// all variables to store URL
let APPOINTMENT_URL: string;

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

test.describe.skip('--- INTERNAL QUESTIONNAIRE E2E - WORKFLOWVIEW PAGE - SUIT ---', () => {

    test('Create New Applicant for Testing "Internal Questionnaire E2E"', async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_iqwv, APPLICANT_EMAIL_iqwv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_iqwv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

        await test.step(`Closing Private Contexts... of \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.close();
            await private_context.close();
        })

    });

    test(`Change Applicant's Stage to "Internal Questionnaire E2E" using Swapping`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.Navigate_to_Workflowview_Page();
        })

        await test.step(`Changing Applicant's Stage to "Internal Questionnaire E2E"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_iqwv, INTERNAL_QUESTIONNAIRE_E2E_Stage);
        })

        await test.step(`Clicking all "YES" Buttons from Modal Popups"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.click_YES();
        })

        await test.step(`Changing the "Interview Change Status" to "Pass"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.pass_interviewchangestatus();
        })

        await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_iqwv}" stage is Changed to "${INTERNAL_QUESTIONNAIRE_E2E_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._applicantpagewv.prefix_specific_ApplicantName_full_div
                + APPLICANT_NAME_iqwv
                + POM._applicantpagewv.suffix_specific_ApplicantName_full_div
                + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName
                + INTERNAL_QUESTIONNAIRE_E2E_Stage
                + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName
            )).toBeVisible();
        })

    });

    test.describe('INTERNAL QUESTIONNAIRE (Profile) - SUIT', () => {

        test('Fill "Internal Questionnaire (Profile)"', async ({ browserName, userAgent }) => {
            const POM = new POManager(page);

            await test.step(`Picking Applicant : "${APPLICANT_NAME_iqwv}" from Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.pick_Applicant(APPLICANT_NAME_iqwv);
            })

            await test.step(`Validating Internal Questionnaire "Fill" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await Promise.all([
                    expect(POM._applicantpagewv._profile_InternalQuestionnaire_fill_button).toBeVisible()
                ]);
            })

            await test.step(`Clicking Internal Questionnaire "Fill" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._profile_InternalQuestionnaire_fill_button.click();
            })

            await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
                await page.waitForLoadState("domcontentloaded");
            })

            if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
                await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(page.getByText(InternalQuestionnaire_Profile_heading + APPLICANT_NAME_iqwv)).toBeVisible();
                })

                await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(page.getByText(InternalQuestionnaire_Profile_description)).toBeVisible();
                })
            }

            await test.step(`Now Filling "Internal Questionnaire (Profile)"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.fill_internalquestionnaire();
            })

            await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitFor_all_ingoing_processes();
            })

            await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitForSelector_notes_timeline_texts();
            })

            await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._profile_timeline_all_texts.getByText(TEXT_TO_BE_VERIFIED + userAgent)).toBeVisible();
            })

            await test.step(`Validating Internal Questionnaire "Edit" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._profile_InternalQuestionnaire_edit_button).toBeVisible();
            })

        });

        test('Edit "Internal Questionnaire (Profile)"', async ({ browserName, userAgent }) => {
            const POM = new POManager(page);

            await test.step(`Clicking "Edit" button for "Internal Questionnaire"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._profile_InternalQuestionnaire_edit_button.click();
            })

            await test.step(`Now Editing "Internal Questionnaire (Profile)"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.edit_internalquestionnaire();
            })

            await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitFor_all_ingoing_processes();
            })

            await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitForSelector_notes_timeline_texts();
            })

            await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._profile_timeline_all_texts.getByText(UPDATED_TEXT_TO_BE_VERIFIED + userAgent)).toBeVisible();
            })

        });

    });

    test.describe('INTERNAL QUESTIONNAIRE (Interview Action) - SUIT', () => {

        test(`Get Appointment URL`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Getting Applicant's Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                APPOINTMENT_URL = (await POM._applicantpagewv.applicant_schedule_with_prfile_button()).Appointment_URL;
            })

        });

        test(`Schedule an Interview for "Internal Questionnaire E2E" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Navigating to "Internal Questionnaire E2E" Scheduling Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.goto(APPOINTMENT_URL, { waitUntil: 'networkidle' });
            })

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

            await test.step(`Validating Assertion with Page's Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page).toHaveTitle('Job Openings');
            })

        });

        test(`Fill "Internal Questionnaire - Interview Action"`, async ({ browserName, userAgent }) => {
            const POM = new POManager(page);

            await test.step(`Navigating to Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.Navigate_to_Workflowview_Page();
            })

            await test.step(`Picking Applicant : "${APPLICANT_NAME_iqwv}" from Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.pick_Applicant(APPLICANT_NAME_iqwv);
            })

            await test.step(`Clicking "Start Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._profile_start_interview_button.click();
            })

            await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interviewDetails_modal_popup_, { state: "visible", strict: true });
            })

            await test.step(`Waiting for "Internal Questionnaire - Interview Action" button to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._internalQuestionnaireInterviewAction_button_, { state: "visible", strict: true });
            })

            await test.step(`Clicking "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._internal_questionnaire_interview_action_button.click();
            })

            await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
                await page.waitForLoadState("domcontentloaded");
            })

            if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
                await test.step(`Validating "Internal Questionnaire - Interview Action" Modals's Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(page.getByText(InternalQuestionnaire_InterviewAction_heading + APPLICANT_NAME_iqwv)).toBeVisible();
                })

                await test.step(`Validating "Internal Questionnaire - Interview Action" Modals's Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(page.getByText(InternalQuestionnaire_InterviewAction_description)).toBeVisible();
                })
            }

            await test.step(`Now Filling "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m"`, async () => {
                await POM._applicantpagewv.fill_internalquestionnaireininterviewaction();
            })

            await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitFor_all_ingoing_processes();
            })

            await test.step(`Closing "Interview Details" Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._interviewDetails_modal_close_button.click();
            })

            await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitForSelector_notes_timeline_texts();
            })

            await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._profile_timeline_all_texts.getByText(TEXT_TO_BE_VERIFIED_interviewaction + userAgent)).toBeVisible();
            })

        });

        test(`Edit "Internal Questionnaire - Interview Action"`, async ({ browserName, userAgent }) => {
            const POM = new POManager(page);

            await test.step(`Clicking "Start Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._profile_start_interview_button.click();
            })

            await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._interviewDetails_modal_popup_, { state: "visible", strict: true });
                await page.waitForLoadState("domcontentloaded");
            })

            await test.step(`Validating "Internal Questionnaire - Interview Action" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._internal_questionnaire_interview_action_button).toBeVisible();
            })

            await test.step(`Clicking "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._internal_questionnaire_interview_action_button.click();
            })

            await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForSelector(POM._applicantpagewv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
                await page.waitForLoadState("domcontentloaded");
            })

            await test.step(`Now Editing "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.edit_internalquestionnaireininterviewaction();
            })

            await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitFor_all_ingoing_processes();
            })

            await test.step(`Closing "Interview Details" Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv._interviewDetails_modal_close_button.click();
            })

            await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagewv.waitForSelector_notes_timeline_texts();
            })

            await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagewv._profile_timeline_all_texts.getByText(UPDATED_TEXT_TO_BE_VERIFIED_interviewaction + userAgent)).toBeVisible();
            })

        });

    });

});

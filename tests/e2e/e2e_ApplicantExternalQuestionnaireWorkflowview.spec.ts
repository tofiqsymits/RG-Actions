import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.skip(({ browserName }) => browserName === "firefox", "Swapping is Not Supported");
test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });

// all variables related to Applicant
const APPLICANT_NAME_eqwv: string = faker.name.firstName() + " " + faker.name.firstName();
let APPLICANT_EMAIL_eqwv: string;

// all variables to store URL
let EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL: string;
let EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL: string;
let EXTERNAL_QUESTIONNAIRE_TRIGGER_URL: string;
let EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL: string;

// stages text
const EXTERNAL_QUESTIONNAIRE_E2E_Stage: string = "External Questionnaire E2E";
const HIRED_Stage: string = "Hired";

// all Mail Subject
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_text: string = "ExQ - Qualifying";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_text: string = "ExQ - Unqualifying";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_text: string = "ExQ - Q & UnQ";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_text: string = "ExQ - Triggers";

// all links in mails
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link: string = "External Questionnaire (Qualifying Question - e2e)";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link: string = "External Questionnaire (UnQualifying Question - e2e)";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_Link: string = "External Questionnaire (UnQualifying Question - e2e - Trigger)";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link: string = "External Questionnaire (Qualifying - UnQualifying)";

// all descriptions and headings texts
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_heading: string = "External Questionnaire (Qualifying Question - e2e) for";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_description: string = "Description: External Questionnaire (Qualifying Question - e2e) - Assertion";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_heading: string = "External Questionnaire (UnQualifying Question - e2e) for";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_description: string = "Description: External Questionnaire (UnQualifying Question - e2e) - Assertion";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_heading: string = "External Questionnaire (UnQualifying Question - e2e - Trigger) for";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_description: string = "Description: External Questionnaire (UnQualifying Question - e2e - Trigger) - Assertion";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_heading: string = "External Questionnaire (Qualifying - UnQualifying) for";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_description: string = "Description: External Questionnaire (Qualifying - UnQualifying) - Assertion";

// all validation texts
const AFTER_SUBMISSION_TITLE: string = "Thank You For Your Submission";
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

test.describe('--- EXTERNAL QUESTIONNAIRE E2E - SUIT ---', () => {

    test(`Create New Applicant for Testing "External Questionnaire E2E"`, async ({ browserName, baseURL }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Getting "Email Address" for Applicant : "${APPLICANT_EMAIL_eqwv}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_EMAIL_eqwv = (await POM_private._landinpage.return_emailAddress(baseURL)).selected_Email;
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_eqwv, APPLICANT_EMAIL_eqwv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_eqwv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

    });

    test(`Change Applicant's Stage to "External Questionnaire E2E"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Workflowview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.Navigate_to_Workflowview_Page();
        })

        await test.step(`Changing Applicant's Stage to "External Questionnaire E2E" by Swapping... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.swapApplicant_workflowview_by_name(APPLICANT_NAME_eqwv, EXTERNAL_QUESTIONNAIRE_E2E_Stage);
        })

        await test.step(`Clicking All "Yes" Button in All Modal Popups... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.click_YES();
        })

        await test.step(`Passing the "Interview Change Status" from Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.pass_interviewchangestatus();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagewv.waitFor_all_ingoing_processes();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant's Stage is Changed to "External Questionnaire E2E"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(POM._applicantpagewv.prefix_specific_ApplicantName_full_div + APPLICANT_NAME_eqwv + POM._applicantpagewv.suffix_specific_ApplicantName_full_div + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName + EXTERNAL_QUESTIONNAIRE_E2E_Stage + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName)).toBeVisible();
        })

    });

    test.describe('Fill and Validate External Questionnaires E2E', () => {

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

        test.describe('External Questionnaire (Qualifying) - SUIT', () => {

            test('Validate Assertions with "Heading" and "Description"', async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Clicking Mail Subject : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_text}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_QUALIFYING_text, APPLICANT_NAME_eqwv);
                })

                await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link)).EXTERNAL_URL;
                })

                await test.step(`Navigating to "External Questionnaire (Qualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL, { waitUntil: "networkidle" });
                    await page.waitForLoadState("domcontentloaded");
                })

                await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_heading + " " + APPLICANT_NAME_eqwv)).toBeVisible();
                })

                await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_description)).toBeVisible();
                })

            });

            test(`Fill External Questionnaire (Qualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Now Filling "External Questionnaire (Qualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._applicantpagewv.externalQuestionnaire_Qualifying();
                })

                await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.waitForEvent("load");
                })

                await test.step(`Navigating to "External Questionnaire (Qualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL, { waitUntil: "networkidle" });
                })

                await test.step(`Validating "External Questionnaire (Qualifying)" Questions are Filled... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
                })

            });

        });

        test.describe('External Questionnaire (Unqualifying) - SUIT', () => {

            test('Validate Assertions with "Heading" and "Description"', async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
                })

                await test.step(`Clicking Mail Subject : "${EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_text}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_text, APPLICANT_NAME_eqwv);
                })

                await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link)).EXTERNAL_URL;
                })

                await test.step(`Navigating to "External Questionnaire (Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL, { waitUntil: "networkidle" });
                    await page.waitForLoadState("domcontentloaded");
                })

                await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_heading + " " + APPLICANT_NAME_eqwv)).toBeVisible();
                })

                await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_description)).toBeVisible();
                })

            });

            test(`Fill External Questionnaire (Unqualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Now Filling "External Questionnaire (Unqualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._applicantpagewv.externalQuestionnaire_UnQualifying();
                })

                await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.waitForEvent("load");
                })

                await test.step(`Navigating to "External Questionnaire (Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL, { waitUntil: "networkidle" });
                })

                await test.step(`Validating "External Questionnaire (Unqualifying)" Questions are Filled... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
                })

            });

        });

        test.describe('External Questionnaire (Qualifying & Unqualifying) - SUIT', () => {

            test('Validate Assertions with "Heading" and "Description"', async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
                })

                await test.step(`Clicking Mail Subject : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_text}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_text, APPLICANT_NAME_eqwv);
                })

                await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link)).EXTERNAL_URL;
                })

                await test.step(`Navigating to "External Questionnaire (Qualifying & Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL, { waitUntil: "networkidle" });
                    await page.waitForLoadState("domcontentloaded");
                })

                await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_heading + " " + APPLICANT_NAME_eqwv)).toBeVisible();
                })

                await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_description)).toBeVisible();
                })

            });

            test(`Fill External Questionnaire (Qualifying & Unqualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Now Filling "External Questionnaire (Qualifying & Unqualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._applicantpagewv.externalQuestionnaire_Q_UQ();
                })

                await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.waitForEvent("load");
                })

                await test.step(`Navigating to "External Questionnaire (Qualifying & Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL, { waitUntil: "networkidle" });
                })

                await test.step(`Validating "External Questionnaire (Qualifying & Unqualifying)" Questions are Filled... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
                })

            });

        });

        test.describe('External Questionnaire (Triggers) - SUIT', () => {

            test('Validate Assertions with "Heading" and "Description"', async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
                })

                await test.step(`Clicking Mail Subject : "${EXTERNAL_QUESTIONNAIRE_TRIGGER_text}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_TRIGGER_text, APPLICANT_NAME_eqwv);
                })

                await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_TRIGGER_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    EXTERNAL_QUESTIONNAIRE_TRIGGER_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_TRIGGER_Link)).EXTERNAL_URL;
                })

                await test.step(`Navigating to "External Questionnaire (Trigger) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_TRIGGER_URL, { waitUntil: "networkidle" });
                    await page.waitForLoadState("domcontentloaded");
                })

                await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_TRIGGER_heading + " " + APPLICANT_NAME_eqwv)).toBeVisible();
                })

                await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(POM_private._applicantpagewv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_TRIGGER_description)).toBeVisible();
                })

            });

            test(`Fill External Questionnaire (Trigger) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
                const POM_private = new POManager(private_page);

                await test.step(`Now Filling "External Questionnaire (Trigger)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await POM_private._applicantpagewv.externalQuestionnaire_Trigger();
                })

                await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.waitForEvent("load");
                })

                await test.step(`Navigating to "External Questionnaire (Trigger) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await private_page.goto(EXTERNAL_QUESTIONNAIRE_TRIGGER_URL, { waitUntil: "networkidle" });
                })

                await test.step(`Validating "External Questionnaire (Trigger)" Questions are Filled... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
                })

            });

            test('Validate Applicant Stage is Changed to "Hired" => Trigger Testing', async ({ browserName }) => {
                const POM = new POManager(page);

                await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await page.reload();
                })

                await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await page.waitForLoadState("networkidle");
                })

                await test.step(`Validating Applicant's Stage is Changed to "Hired"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                    await expect(page.locator(POM._applicantpagewv.prefix_specific_ApplicantName_full_div + APPLICANT_NAME_eqwv + POM._applicantpagewv.suffix_specific_ApplicantName_full_div + POM._applicantpagewv.prefix_specific_ApplicantName_specific_StageName + HIRED_Stage + POM._applicantpagewv.suffix_specific_ApplicantName_specific_StageName)).toBeVisible();
                })

            });

        });

    });

});

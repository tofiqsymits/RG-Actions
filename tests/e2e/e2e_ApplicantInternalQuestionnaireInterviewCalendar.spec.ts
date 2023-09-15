import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { applicant_info } from "../../utils/applicant_info";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1280, width: 2000 } });

// all variables related to Applicant
const JOB_TITLE = 'Automate JOB';
const APPLICANT_NAME_iqic: string = applicant_info.a_Name_String;
const APPLICANT_PHONE_iqic = applicant_info.a_Phone;
const APPLICANT_ADDRESS_iqic = applicant_info.a_Address;

// all texts for stage
const INTERNAL_QUESTIONNAIRE_E2E_Stage: string = "Internal Questionnaire E2E";

// all descriptions and headings texts to be verified
const InternalQuestionnaire_InterviewAction_heading: string = "Internal Questionnaire - Interview Action For ";
const InternalQuestionnaire_InterviewAction_description: string = "Description: Internal Questionnaire - Interview Action - Assertion";

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

test.describe('--- INTERNAL QUESTIONNAIRE E2E - INTERVIEW CALENDAR PAGE - SUIT ---', () => {

    test(`Create New Applicant for Testing "Internal Questionnaire E2E" via "Admin's Job Page"`, async ({ browserName, baseURL }) => {
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
            await POM._jobpage.Create_Applicant_with_specific_stage_via_Admin_Page(baseURL, INTERNAL_QUESTIONNAIRE_E2E_Stage, APPLICANT_NAME_iqic, APPLICANT_PHONE_iqic, APPLICANT_ADDRESS_iqic);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Validating Assertion with Page's Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('ENGYJ Recruit | Dashboard');
        })

    });

    test(`Schedule an Interview for "Internal Questionnaire E2E" Stage`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Navigate_to_InterviewCalendar_Page();
        })

        await test.step(`Clicking Sidebar Menu... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Sidebar_menu.click();
        })

        await test.step(`Selecting random Date and Time Slot for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.random_schedule_date();
        })

        await test.step(`Now Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.applicant_picked_and_scheduling_interview(APPLICANT_NAME_iqic);
        })

        await test.step(`Waiting for Page to Reload... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_iqic}" is Visible on Interview Calendar Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant +
                APPLICANT_NAME_iqic +
                POM._interviewcalendarpage.suffix_specific_applicant
            )).toBeVisible();
        })

    });

    test('Reschedule an Interview for "Internal Questionnaire E2E" Stage', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Clicking "Edit" Icon of Applicant : "${APPLICANT_NAME_iqic}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.click_Edit_icon(APPLICANT_NAME_iqic);
        })

        try {   //  handling with try catch block is need, because while testing in webkit browser waitForResponse() is not working and it fails the test
            await test.step(`Waiting for Time Slots Visibility... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForResponse(URL => "https://\*.engyj.com/admin/interview-schedule/get-timing" && URL.status() == 200, { timeout: 10 * 1000 });
            })
        }

        catch (error) {
            await test.step(`Waiting for Timeout of 2 Seconds... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.waitForTimeout(2000);
            })
        }

        await test.step(`Selecting Random Time Slot for Rescheduling an Interview... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.random_timeSlot();
        })

        await test.step(`Clicking "Update" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.update_schedule();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Waiting for Contents to Load... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_iqic}" is Visible on Interview Calendar... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_iqic
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).toBeVisible();
        })

    });

    test(`Fill "Internal Questionnaire - Interview Action"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME_iqic}" from "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await (page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_iqic
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).click();
        })

        await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._interviewcalendarpage._interviewDetails_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Waiting for "Internal Questionnaire - Interview Action" button to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._interviewcalendarpage._internalQuestionnaireInterviewAction_button_, { state: "visible", strict: true });
        })

        await test.step(`Clicking the "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage._internal_questionnaire_interview_action_button.click();
        })

        await test.step(`Waiting for "Internal Questionnaire - Interview Action" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._interviewcalendarpage._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
        })

        if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
            await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.getByText(InternalQuestionnaire_InterviewAction_heading + APPLICANT_NAME_iqic)).toBeVisible();
            })

            await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(page.getByText(InternalQuestionnaire_InterviewAction_description)).toBeVisible();
            })
        }

        await test.step(`Now Filling "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.internalquestionnaireininterviewaction();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.waitFor_all_ingoing_processes();
        })

    });

    test(`Edit "Internal Questionnaire - Interview Action"`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Waiting for "Internal Questionnaire - Interview Action" button to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._interviewcalendarpage._internalQuestionnaireInterviewAction_button_, { state: "visible", strict: true });
        })

        await test.step(`Clicking "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage._internal_questionnaire_interview_action_button.click();
        })

        await test.step(`Waiting for "Internal Questionnaire - Interview Action" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._interviewcalendarpage._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Now Editing "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.internalquestionnaireininterviewaction_edit();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.waitFor_all_ingoing_processes();
        })

        await test.step(`Closing the "Interview Details" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage._interviewDetails_modal_close_button.click();
        })

    });

    test('Perform Random Action from "Interview Details" Modal', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Performing Random Action on Applicant : "${APPLICANT_NAME_iqic}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.perform_random_action_on_checkbox(APPLICANT_NAME_iqic);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent('load');
        })

        await test.step(`Validating Assertion of Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle("ENGYJ Recruit | Applicants");
        })

        await test.step(`Navigating to "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._interviewcalendarpage.Navigate_to_InterviewCalendar_Page();
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_iqic}" is Not Visible on "Interview Calendar Page"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.locator(
                POM._interviewcalendarpage.prefix_specific_applicant
                + APPLICANT_NAME_iqic
                + POM._interviewcalendarpage.suffix_specific_applicant
            )).not.toBeVisible();
        })

    });

});

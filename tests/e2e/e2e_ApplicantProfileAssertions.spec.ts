import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
const APPLICANT_NAME_pa: string = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_EMAIL_pa: string = faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com";

// all texts to be verify
const TIMELINE_TEXT: string = "Applicant has been invited for Phone Screen";

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

test.describe("--- APPLICANT'S PROFILE ALL ASSERTIONS - SUIT ---", () => {

    test('Validating All Assertions - (Related to Profile Sidebar)', async ({ browserName }) => {
        const POM = new POManager(page);
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_pa, APPLICANT_EMAIL_pa);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_pa}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

        await test.step(`Closing Private Contexts... of \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.close();
            await private_context.close();
        })

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_pa}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_pa);
        })

        await test.step(`Validating {APPLICANT'S TITLE} in Panel's Titles... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_applicants_title).toHaveText("Applicants");
        })

        await test.step(`Validating {PRINT} icon in Panel's Titles... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_print_title).toBeVisible();
        })

        await test.step(`Validating {CLOSE} icon in Panel's Titles... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_applicants_modal_close).toBeVisible();
        })

        await test.step(`Validating {APPLICANT NAME} Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_applicant_name_title).toBeVisible();
        })

        await test.step(`Validating {PHONE} icon... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_phone_icon).toBeVisible();
        })

        await test.step(`Validating {APPLICANT PHONE NUMBER}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_phone_title).toBeVisible();
        })

        await test.step(`Validating {EMAIL ENVELOPE} icon... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_email_envelop_icon).toBeVisible();
        })

        await test.step(`Validating {APPLICANT EMAIL}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_applicant_email).toBeVisible();
        })

        await test.step(`Validating {ALL COPY TO CLIPBOARD} Icons... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_copyToClipboard_all_icons).toHaveCount(2);
        })

        await test.step(`Validating {ALL STARS}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_all_stars).toHaveCount(5);
        })

        await test.step(`Validating {LABELS} Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_label_heading).toBeVisible();
        })

        await test.step(`Validating {ADD LABELS} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_AddLabel_button).toBeVisible();
        })

        await test.step(`Validating {PERSONAL TEXT MESSAGES} Button and Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_personalTextMessages_button).toBeVisible();
            await expect(POM._applicantpagetv._profile_personalTextMessages_button).toContainText("Personal Text Messages");
        })

        await test.step(`Validating {RE-SEND APPOINTMENT INVITE} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_resendAppointmentInvite_button).toBeVisible();
            await expect(POM._applicantpagetv._profile_resendAppointmentInvite_button).toHaveText("Re-send Appointment Invite");
        })

        await test.step(`Validating {SCHEDULE PHONE SCREEN} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_schedule_button).toBeVisible();
            await expect(POM._applicantpagetv._profile_schedule_button).toHaveText("Schedule Phone Screen");
        })

        await test.step(`Validating {ARCHIVE APPLICANT} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_archiveApplication_button).toBeVisible();
            await expect(POM._applicantpagetv._profile_archiveApplication_button).toContainText("Archive Application");
        })

        await test.step(`Validating {DOCUMENTS ADD/EDIT} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_documentsAddEdit_button).toBeVisible();
            await expect(POM._applicantpagetv._profile_documentsAddEdit_text).toHaveText("Documents Add / Edit");
        })

        await test.step(`Validating {MOVE TO STAGE} Dropdown... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_changeStage_dropdown).toBeVisible();
        })

        await test.step(`Validating {STAGE NAME}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_stage_name_title).toHaveText("Phone Screen");
        })

        await test.step(`Validating {SEE ANSWERS} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_seeAnswers_button).toHaveText("See Answers");
        })

        await test.step(`Validating {HIRE} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_Hire_button).toHaveText("Hire");
        })

        await test.step(`Validating {REJECT} Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_Reject_button).toHaveText("Reject");
        })

        await test.step(`Validating {QUESTIONNAIRES} Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_Questionnaires_title).toBeVisible();
        })

        await test.step(`Validating {INTERNAL QUESTIONNAIRE} Buttons... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_InternalQuestionnaire_fill_button).toBeVisible();
        })

        await test.step(`Validating {INTERNAL NOTES} Title, TextBox, Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_note_textarea).toBeVisible();
            await expect(POM._applicantpagetv._profile_addNote_button).toBeVisible();
        })

        await test.step(`Validating {TIMELIME} Div, Texts... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(TIMELINE_TEXT)).toBeVisible();
        })

    });

});

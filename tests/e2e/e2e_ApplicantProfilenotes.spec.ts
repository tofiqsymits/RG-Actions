import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";

test.describe.configure({ mode: 'serial' });

// all variables related to Applicant
let APPLICANT_NAME_pn: string;

// all texts related to NOTES
const ADD_NOTE: string = 'Note Created'
const UPDATE_NOTE: string = 'Note Updated';

// all texts to be verify
const UPDATED_TEXT_TO_BE_VERIFIED: string = `Note updated by `;
const DELETED_TEXT_TO_BE_VERIFIED: string = `Note Note Updated deleted by `;
const AFTER_ADD_NOTE_Alert_text: string = "×Note Added Successfully.";

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

test.describe('--- PROFILE NOTES - SUIT ---', () => {

    test('Add Note', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Getting the Name of First Applicant... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_NAME_pn = (await POM._applicantpagetv.get_first_Applicant_name()).firstApplicant_by_name;
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_pn}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_pn);
        })

        await test.step(`Adding Note to Applicant : "${APPLICANT_NAME_pn}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.add_note(ADD_NOTE);
        })

        await test.step(`Waiting for All Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Now Validating Assertion with "Success Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await Promise.all([
                expect(POM._applicantpagetv._success_alert).toContainText(AFTER_ADD_NOTE_Alert_text),
                expect(POM._applicantpagetv._success_alert).toBeVisible()
            ]);
        })

        await test.step(`Validating "View Note" Button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._applicantpagetv._profile_viewNotes_button_, { state: "visible", strict: true });
            await expect(POM._applicantpagetv._profile_viewNotes_button).toBeVisible();
        })

    });

    test('Update Note', async ({ browserName, userAgent }) => {
        const POM = new POManager(page);

        await test.step(`Updating Note for Applicant : "${APPLICANT_NAME_pn}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.update_note(UPDATE_NOTE);
        })

        await test.step(`Waiting for All Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion inside "Note" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._note_textArea_texts.getByText(UPDATE_NOTE)).toBeVisible();
        })

        await test.step(`Closing "Note" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._note_modal_close_icon.click();
        })

        await test.step(`Now Validating Assertion with Timeline Texts... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
            await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(UPDATED_TEXT_TO_BE_VERIFIED + userAgent)).toBeVisible();
        })

    });

    test('Delete Note', async ({ browserName, userAgent }) => {
        const POM = new POManager(page);

        await test.step(`Deleting Note for Applicant : "${APPLICANT_NAME_pn}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.delete_note();
        })

        await test.step(`Waiting for All Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating "View Note" Button is Not Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._profile_viewNotes_button).not.toBeVisible();
        })

        await test.step(`Now Validating Assertions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
            await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(DELETED_TEXT_TO_BE_VERIFIED + userAgent)).toBeVisible();
        })

    });

});

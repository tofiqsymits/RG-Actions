import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { height: 1080, width: 1920 } });

// applicant's variable
const APPLICANT_NAME_rdtv: string = faker.name.firstName() + " " + faker.name.firstName();
let APPLICANT_EMAIL_rdtv: string;

// stage text
const REQUEST_DOCUMENT_Stage: string = "Request Documents";
const HIRED_Stage: string = "Hired";

// all mail subjects
const REQUEST_DOCUMENT_Subject: string = "Documents";

// link
const UPLOAD_DOCUMENT_Link_text: string = "Upload your documents";

// all variables related to store URL
let UPLOAD_DOCUMENTS_URL: string;

// all warning alerts texts to be verified
const NO_FILE_UPLOADED_WARNING_ALERT_text: string = "×warningAtleast 1 File is required.";
const INVALID_FILE_FORMAT_WARNING_ALERT_text: string = "×warningFile must be in above formats.";
const AFTER_DOCUMENT_DELETE_ALERT_text: string = "×Document Deleted Successfully.";

// all validation texts
const AFTER_SUBMISSION_TITLE: string = "Thank You For Your Submission";

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

test.describe('--- REQUEST DOCUMENTS TABLEVIEW - SUIT ---', () => {

    test(`Create New Applicant for Testing "Request Document"`, async ({ browserName, baseURL }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.Navigate_to_Landing_Page();
        })

        await test.step(`Getting "Email Address" for Applicant : "${APPLICANT_EMAIL_rdtv}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            APPLICANT_EMAIL_rdtv = (await POM_private._landinpage.return_emailAddress(baseURL)).selected_Email;
        })

        await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME_rdtv, APPLICANT_EMAIL_rdtv);
        })

        await test.step(`Waiting for Applicant : "${APPLICANT_NAME_rdtv}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
        })

    });

    test(`Change Applicant's Stage to "Request Documents" by Dropdown, and Perform Random "Pass", "Fail", "No Show" or "Cancel" Action from "Interview Change Status" Modal`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_rdtv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_rdtv);
        })

        await test.step(`Changing Applicant's Stage using Dropdown... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.change_to_any_stage(REQUEST_DOCUMENT_Stage);
        })

        await test.step(`Clicking All "Yes/Confirm" Buttons from Modal Popups... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.click_YES();
        })

        await test.step(`Now Performing Random Action from "Interview Change Status" Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewchangestatus();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_applicants_modal_close.click();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await Promise.all([
                page.waitForLoadState("networkidle")
            ]);
        })

        await test.step(`Validating Applicant's Stage is Changed to "Request Document" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_rdtv) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(REQUEST_DOCUMENT_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

    test('Get "Upload Documents" URL via Mail', async ({ browserName, baseURL }) => {
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

        await test.step(`Clicking Mail Subject : ${REQUEST_DOCUMENT_Subject}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._inboxesmailpage.click_on_MailSubject(REQUEST_DOCUMENT_Subject, APPLICANT_NAME_rdtv);
        })

        await test.step(`Now Getting "Upload Documents" URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            UPLOAD_DOCUMENTS_URL = (await POM_private._inboxesmailpage.click_on_MailLink(UPLOAD_DOCUMENT_Link_text)).EXTERNAL_URL;
        })

    });

    test.describe('Upload Files with Different Invalid Formats or Empty File and "Validate"', () => {

        test.beforeEach(async () => {
            await private_page.goto(UPLOAD_DOCUMENTS_URL, { waitUntil: "networkidle" });
        });

        test('Upload Empty File', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating "We accept JPEG, JPG, PNG, DOC, DOCX and PDF files" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._applicantpagetv._we_accept_etc_files_text).toBeVisible();
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Validating Assertion with "Warning Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await Promise.all([
                    expect(POM_private._applicantpagetv._warning_alert).toHaveText(NO_FILE_UPLOADED_WARNING_ALERT_text)
                ]);
            })

        });

        test(`Upload "EXCEL.xlsx" & "PHP.php" formatted files`, async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Now Uploading "EXCEL.xlsx" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/EXCEL.xlsx');
            })

            await test.step(`Now Uploading "PHP.php" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._second_ChooseFile.setInputFiles('./utils/FileSamples/PHP.php');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Validating Assertion with "Warning Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await Promise.all([
                    expect(POM_private._applicantpagetv._warning_alert.first()).toHaveText(INVALID_FILE_FORMAT_WARNING_ALERT_text),
                    expect(POM_private._applicantpagetv._warning_alert).toHaveCount(2)
                ]);
            })

        });

        test(`Reupload "POWERPOINT.pptx" & "SQL.sql" formatted files`, async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Now Uploading "POWERPOINT.pptx" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/POWERPOINT.pptx');
            })

            await test.step(`Now Uploading "SQL.sql" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._second_ChooseFile.setInputFiles('./utils/FileSamples/SQL.sql');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Validating Assertion with "Warning Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await Promise.all([
                    expect(POM_private._applicantpagetv._warning_alert.first()).toHaveText(INVALID_FILE_FORMAT_WARNING_ALERT_text),
                    expect(POM_private._applicantpagetv._warning_alert).toHaveCount(2)
                ]);
            })

        });

        test(`Reupload "TEXT_DOCUMENT.txt" formatted file`, async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Now Uploading "TEXT_DOCUMENT.txt" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/TEXT_DOCUMENT.txt');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Validating Assertion with "Warning Alert"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await Promise.all([
                    expect(POM_private._applicantpagetv._warning_alert).toHaveText(INVALID_FILE_FORMAT_WARNING_ALERT_text)
                ]);
            })

        });

    });

    test.describe('Upload Both Required Files with Valid Formats and "Validate"', () => {

        test.beforeEach(async () => {
            await private_page.goto(UPLOAD_DOCUMENTS_URL, { waitUntil: "networkidle" });
        });

        test('Upload "DOC.doc" & "DOCX.docx" formatted files', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating "We accept JPEG, JPG, PNG, DOC, DOCX and PDF files" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._applicantpagetv._we_accept_etc_files_text).toBeVisible();
            })

            await test.step(`Now Uploading "DOC.doc" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/DOC.doc');
            })
            await test.step(`Now Uploading "DOCX.docx" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._second_ChooseFile.setInputFiles('./utils/FileSamples/DOCX.docx');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await private_page.waitForEvent("load");
            })

            await test.step(`Validating Assertion with "Thank Your For Submission" Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
            })

        });

        test('ReUpload "JPEG.jpg" & "JPG.jpg" formatted files', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating "We accept JPEG, JPG, PNG, DOC, DOCX and PDF files" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._applicantpagetv._we_accept_etc_files_text).toBeVisible();
            })

            await test.step(`Now Uploading "JPEG.jpg" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/JPEG.jpeg');
            })
            await test.step(`Now Uploading "JPG.jpg" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._second_ChooseFile.setInputFiles('./utils/FileSamples/JPG.jpg');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await private_page.waitForEvent("load");
            })

            await test.step(`Validating Assertion with "Thank Your For Submission" Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
            })

        });

        test('ReUpload "PNG.png" & "PDF.pdf" formatted files', async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating "We accept JPEG, JPG, PNG, DOC, DOCX and PDF files" Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM_private._applicantpagetv._we_accept_etc_files_text).toBeVisible();
            })

            await test.step(`Now Uploading "PNG.png" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._first_ChooseFile.setInputFiles('./utils/FileSamples/PNG.png');
            })
            await test.step(`Now Uploading "PDF.pdf" Format Document... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._second_ChooseFile.setInputFiles('./utils/FileSamples/PDF.pdf');
            })

            await test.step(`Clicking "Submit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM_private._applicantpagetv._upload_document_submit_button.click();
            })

            await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await private_page.waitForEvent("load");
            })

            await test.step(`Validating Assertion with "Thank Your For Submission" Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(private_page).toHaveTitle(AFTER_SUBMISSION_TITLE);
            })

        });

        test(`Validate "Right Tick" and Text "Change File"'s Visibility`, async ({ browserName }) => {
            const POM_private = new POManager(private_page);

            await test.step(`Validating "Ticks" and "Change File" button's Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                const ChangeFileButtons_count = await POM_private._applicantpagetv._changeFile_button.count();

                for (let i = 0; i < ChangeFileButtons_count; i++) {
                    await expect(POM_private._applicantpagetv._changeFile_button.nth(i)).toBeVisible();
                    await expect(POM_private._applicantpagetv._changeFile_button.nth(i)).toHaveText("Change File");
                    await expect(POM_private._applicantpagetv._tick_img.nth(i)).toBeVisible();
                }
            })

        });

    });

    test(`Validate Applicant's Stage is Changed to "Hired" ==> Trigger Testing`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_rdtv}'s" Stage is "Hired"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_rdtv) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(HIRED_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

    test('Delete all Attachments', async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME_rdtv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_rdtv);
        })

        await test.step(`Clicking "Documents Add / Edit" Button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_documentsAddEdit_button.click();
        })

        await test.step(`Waiting for "Documents" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._applicantpagetv._documents_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step(`Validating "Documents" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._documents_modal_popup).toBeVisible();
        })

        await test.step(`Now Deleting All Attachments... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            const allAttachments_count = await POM._applicantpagetv._all_attachments_div.count();

            for (let i = 0; i < allAttachments_count; i++) {
                await POM._applicantpagetv.documents_delete();
                await Promise.all([
                    expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_DOCUMENT_DELETE_ALERT_text)
                ]);

                await page.waitForResponse(URL => "https://\*.engyj.com/admin/job-applications/timeline/\*" && URL.status() == 200);
            }
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_rdtv}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.navigate_and_pick_Applicant(APPLICANT_NAME_rdtv);
        })

        await test.step(`Validating "Download Documents" Icon is Not Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._attachments_download_icon).not.toBeVisible();
        })

    });

});

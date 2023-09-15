import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

// applicant's variable
const APPLICANT_NAME: string = faker.name.firstName() + " " + faker.name.firstName();
let APPLICANT_EMAIL: string;

// all variables to store URLs
let PHONE_SCREEN_SCHEDULING_URL: string;
let WALK_IN_INTERVIEW_SCHEDULING_URL: string;
let DROP_DESTINATION_SCHEDULING_URL: string;
let INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_SCHEDULING_URL: string;
let EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL: string;
let EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL: string;
let EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL: string;
let EXTERNAL_QUESTIONNAIRE_TRIGGER_URL: string;
let UPLOAD_DOCUMENTS_URL: string;

// all mail subjects
const PHONE_SCREEN_INVITE_Subject: string = "AH invite";
const SCHEDULED_APPOINTMENT_text: string = "Appoint. Scheduled";
const RESCHEDULED_APPOINTMENT_text: string = "Appoint. Rescheduled";
const CANCELLED_APPOINTMENT_text: string = "Appoint. Cancelled";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_text: string = "ExQ - Qualifying";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_text: string = "ExQ - Unqualifying";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_text: string = "ExQ - Q & UnQ";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_text: string = "ExQ - Triggers";
const REQUEST_DOCUMENT_Subject: string = "Documents";

// all links inside mail
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link: string = "External Questionnaire (Qualifying Question - HF)";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link: string = "External Questionnaire (UnQualifying Question - HF)";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link: string = "External Questionnaire (Qualifying - UnQualifying)";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_Link: string = "External Questionnaire (UnQualifying Question - HF - Trigger)";
const UPLOAD_DOCUMENT_Link_text: string = "Upload your documents";

// all descriptions and headings texts
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_heading: string = "External Questionnaire (Qualifying Question - HF) for";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_description: string = "Description: External Questionnaire (Qualifying Question - HF) - Assertion";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_heading: string = "External Questionnaire (UnQualifying Question - HF) for";
const EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_description: string = "Description: External Questionnaire (UnQualifying Question - HF) - Assertion";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_heading: string = "External Questionnaire (Qualifying - UnQualifying) for";
const EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_description: string = "Description: External Questionnaire (Qualifying - UnQualifying) - Assertion";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_heading: string = "External Questionnaire (UnQualifying Question - HF - Trigger) for";
const EXTERNAL_QUESTIONNAIRE_TRIGGER_description: string = "Description: External Questionnaire (UnQualifying Question - HF - Trigger) - Assertion";

// all Stages Text
const WALK_IN_INTERVIEW_Stage: string = "Walk In Interview";
const DROP_DESTINATION_Stage: string = "Drop Destination";
const INTERNAL_QUESTIONNAIRE_HF_Stage: string = "Internal Questionnaire HF";
const EXTERNAL_QUESTIONNAIRE_HF_Stage: string = "External Questionnaire HF";
const REQUEST_DOCUMENT_Stage: string = "Request Documents";
const HIRED_Stage: string = "Hired";

// variable to store time slot
let TIME_SLOT: string;
let UPDATED_TIME_SLOT: string;

// all texts to be verified
const AFTER_INTERNAL_QUESTIONNAIRE_PROFILE_FILL_TIMELINE_text: string = `Internal Questionnaire: (Internal Questionnaire (Profile)) filled by `;
const AFTER_INTERNAL_QUESTIONNAIRE_PROFILE_EDIT_TIMELINE_text: string = `Internal Questionnaire: (Internal Questionnaire (Profile)) updated by `;
const INTERNAL_QUESTIONNAIRE_PROFILE_HEADING_text: string = "Internal Questionnaire (Profile) For ";
const INTERNAL_QUESTIONNAIRE_PROFILE_DESCRIPTION_text: string = "Description: Internal Questionnaire (Profile) - Assertion";
const INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_HEADING_text: string = "Internal Questionnaire - Interview Action For ";
const INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_DESCRIPTION_text: string = "Description: Internal Questionnaire - Interview Action - Assertion";
const AFTER_INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_FILL_TIMELINE_text: string = `Internal Questionnaire: (Internal Questionnaire - Interview Action) filled by `;
const AFTER_INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_EDIT_TIMELINE_text: string = `Internal Questionnaire: (Internal Questionnaire - Interview Action) updated by `;
const AFTER_SUBMISSION_TITLE: string = "Thank You For Your Submission";

// all warning alerts texts to be verified
const AFTER_ACCEPT_INTERVIEW_ALERT_text: string = "×Response applied successfully.";
const AFTER_PASS_FAIL_NOSHOW_ACTION_ALERT_text: string = "×Interview schedule status changed successfully.";
const NO_FILE_UPLOADED_WARNING_ALERT_text: string = "×warningAtleast 1 File is required.";
const INVALID_FILE_FORMAT_WARNING_ALERT_text: string = "×warningFile must be in above formats.";
const AFTER_DOCUMENT_DELETE_ALERT_text: string = "×Document Deleted Successfully.";
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
  await private_page.close();
  await private_context.close();
});

test.describe("--- HAPPYFLOW COMPLETE SYSTEM ---", () => {

  test('Create New Applicant for Testing "Complete HappyFlow System"', async ({ browserName, baseURL }) => {
    const POM_private = new POManager(private_page);

    await test.step(`Navigating to Landing Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
      await POM_private._landinpage.Navigate_to_Landing_Page();
    })

    await test.step(`Getting "Email Address" for Applicant : "${APPLICANT_NAME}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
      APPLICANT_EMAIL = (await POM_private._landinpage.return_emailAddress(baseURL)).selected_Email;
    })

    await test.step(`Filling Applicant's Information... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
      await POM_private._landinpage.create_applicant_from_landing_page(APPLICANT_NAME, APPLICANT_EMAIL);
    })

    await test.step(`Waiting for Applicant : "${APPLICANT_NAME}" to be Created Successfully... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
      await POM_private._applicantpagetv.waitFor_all_ingoing_processes();
    })

    await test.step(`Validating Assertion with "Alert" div... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
      await expect(private_page.locator("div[role='alert']")).toBeVisible({ timeout: 1 * 60 * 1000 });
    })

  });

  test('Create Inbox Mail', async ({ browserName, baseURL }) => {
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

  test.describe("--- PHONE SCREEN - SUIT ---", () => {

    test('Get "Phone Screen" Scheduling Appointment URL from mail ==> PRIVATE WINDOW', async ({ browserName }) => {
      const POM_private = new POManager(private_page);

      await test.step(`Clicking Mail Subject : "${PHONE_SCREEN_INVITE_Subject}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM_private._inboxesmailpage.click_on_MailSubject(PHONE_SCREEN_INVITE_Subject, APPLICANT_NAME);
      })

      await test.step(`Getting "Phone Screen" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        PHONE_SCREEN_SCHEDULING_URL = (await POM_private._applicantpagetv.get_PhoneScreen_scheduling_url()).SCHEDULE_URL;
      })

    });

    test.describe('Schedule, Reschedule and Cancel Appointment - Suit', () => {

      test.beforeEach(async ({ browserName }) => {

        await test.step(`Navigating to Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.goto(PHONE_SCREEN_SCHEDULING_URL, { waitUntil: "networkidle" });
        })

      });

      test("Schedule the Appointment", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Selecting Date for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.date_picked();
        })

        await test.step(`Selecting Random Time Slot for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.get_time_slot();
        })

        await test.step(`Now Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.schedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page).toHaveTitle('Job Openings');
        })

      });

      test("Reschedule the Appointment", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Selecting Date for Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.date_picked();
        })

        await test.step(`Waiting for "Reschedule Button" to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.waitForSelector(POM_private._applicantcalendarpage._areyoursure_reshedule_modal_popup_, { state: "visible", strict: true });
          await private_page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Clicking "Reschedule Button" from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage._interviewRescheduleBtn.click();
        })

        await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.waitForSelector(POM_private._applicantcalendarpage._timeslot_inside_modal_popup_, { state: "visible", strict: true });
          await private_page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Selecting Random Time Slot for Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.get_time_slot();
        })

        await test.step(`Now Rescheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.reschedule_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page).toHaveTitle('Job Openings');
        })

      });

      test("Cancel the Appointment", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Cancelling Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._applicantcalendarpage.cancel_appointment();
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await private_page.waitForEvent('load');
        })

        await test.step(`Validating Assertion... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page).toHaveTitle('Job Openings');
        })

      });

    });

    test.describe('Validations with Email - Suit', () => {

      test.beforeAll(async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
        })

      });

      test("Validate Scheduled Appointment's Emails", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Validating Scheduled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page.locator
            (
              POM_private._inboxesmailpage.prefix_mailSubject
              + SCHEDULED_APPOINTMENT_text
              + " for "
              + APPLICANT_NAME
              + POM_private._inboxesmailpage.suffix_mailSubject
            )
          ).toBeVisible({ timeout: 2 * 60 * 1000 });
        })

      });

      test("Validate Rescheduled Appointment's Emails", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Validating Rescheduled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page.locator
            (
              POM_private._inboxesmailpage.prefix_mailSubject
              + RESCHEDULED_APPOINTMENT_text
              + " for "
              + APPLICANT_NAME
              + POM_private._inboxesmailpage.suffix_mailSubject
            )
          ).toBeVisible({ timeout: 2 * 60 * 1000 });
        })

      });

      test("Validate Cancelled Appointment's Emails", async ({ browserName }) => {
        const POM_private = new POManager(private_page);

        await test.step(`Validating Cancelled Appointment's Emails... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(private_page.locator
            (
              POM_private._inboxesmailpage.prefix_mailSubject
              + CANCELLED_APPOINTMENT_text
              + " for "
              + APPLICANT_NAME
              + POM_private._inboxesmailpage.suffix_mailSubject
            )
          ).toBeVisible({ timeout: 2 * 60 * 1000 });
        })

      });

    });

    test(`Validate Applicant's stage is changed to "Walk In Interview" ==> Trigger Testing`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Validating Applicant : "${APPLICANT_NAME}" Stage is "Walk In Interview"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(WALK_IN_INTERVIEW_Stage)).toBeVisible(); // to check applicant`s stage is changed or not?
            return;
          }
        }
      })

    });

  });

  test.describe("--- WALK IN INTERVIEW - SUIT ---", () => {

    test('Get "Walk In Interview" Scheduling Appointment URL from Profile', async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Getting "Walk In Interview" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        WALK_IN_INTERVIEW_SCHEDULING_URL = (await POM._applicantpagetv.applicant_schedule_with_prfile_button()).Appointment_URL;
      })

    });

    test(`Schedule an Appointment for "Walk In Interview" Stage`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Navigating to "Walk In Interview" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.goto(WALK_IN_INTERVIEW_SCHEDULING_URL, { waitUntil: 'networkidle' });
      })

      await test.step(`Selecting date for Scheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.date_picked();
      })

      await test.step(`Selecting random timeslot for Scheduling an Appointment... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        TIME_SLOT = (await POM._applicantcalendarpage.get_time_slot()).randomly_selected_timeslot;
      })

      await test.step(`Now Scheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.schedule_appointment();
      })

      await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForEvent('load');
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating Assertion with Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(page).toHaveTitle("Job Openings");
      })

    });

    test(`"Accept Interview" button's Functionality`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Validating Assertion with random selected "timeslot"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._date_time_aside_pass_fail_noshow_buttons.getByText(TIME_SLOT)).toBeVisible();
      })

      await test.step(`Validating "Accept Interview" button is Visible inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._accept_interview_button).toBeVisible();
      })

      await test.step(`Clicking "Accept Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv._accept_interview_button.click();
      })

      await test.step(`Waiting for "Do you want to accept interview schedule" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForSelector(POM._applicantpagetv._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await page.waitForLoadState("domcontentloaded");
      })

      await test.step(`Validating "Do you want to accept interview schedule" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._modalPopup).toBeVisible();
      })

      await test.step(`Clicking "Yes" button from "Do you want to accept interview schedule" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv._yes_btn.click();
      })

      await test.step(`Validating Assertion with "Success Alert" text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_ACCEPT_INTERVIEW_ALERT_text);
      })

    });

    test(`Validate "Pass", "Fail" and "No Show" button's Visibility, and Reschedule an Appointment for "Walk In Interview" Stage`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.reload();
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating "Pass", "Fail", "No Show" buttons are Visible on Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Divs.nth(i).locator(POM._applicantpagetv._pass_fail_noshow_buttons_tbl)).toHaveCount(3);
            return;
          }
        }
      })

      await test.step(`Navigating to "Walk In Interview" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.goto(WALK_IN_INTERVIEW_SCHEDULING_URL, { waitUntil: 'networkidle' });
      })

      await test.step(`Selecting random date for Rescheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.date_picked();
      })

      await test.step(`Clicking "Reschedule" button from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage._interviewRescheduleBtn.click();
      })

      await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForSelector(POM._applicantcalendarpage._timeslot_inside_modal_popup_, { state: "visible", strict: true });
        await page.waitForLoadState("domcontentloaded");
      })

      await test.step(`Selecting random timeslot for Rescheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        UPDATED_TIME_SLOT = (await POM._applicantcalendarpage.get_time_slot()).randomly_selected_timeslot;
      })

      await test.step(`Now Rescheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.reschedule_appointment();
      })

      await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForEvent('load');
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating Assertion with Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(page).toHaveTitle("Job Openings");
      })

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Validating Assertion with updated "timeslot"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._date_time_aside_pass_fail_noshow_buttons.getByText(UPDATED_TIME_SLOT)).toBeVisible();
      })

    });

    test(`Perform random "Pass", "Fail", "No Show" Action inside Applicant's Profile ==> Trigger Testing`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Now Performing random Action inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.random_pass_fail_noshow_action();
      })

      await test.step(`Validating Assertion with "Success Alert" text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_PASS_FAIL_NOSHOW_ACTION_ALERT_text);
      })

      await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv._profile_applicants_modal_close.click();
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating Applicant : "${APPLICANT_NAME}" Stage is Changed to "Drop Destination"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(DROP_DESTINATION_Stage)).toBeVisible();
            return;
          }
        }
      })

    });

  });

  test.describe("--- DROP DESTINATION - SUIT ---", () => {

    test('Get "Drop Destination" Scheduling Appointment URL from Profile', async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Getting "Drop Destination" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        DROP_DESTINATION_SCHEDULING_URL = (await POM._applicantpagetv.applicant_schedule_with_prfile_button()).Appointment_URL;
      })

    });

    test(`Schedule and Reschedule an Appointment for "Drop Destination" Stage`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Navigating to "Drop Destination" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.goto(DROP_DESTINATION_SCHEDULING_URL, { waitUntil: 'networkidle' });
      })

      await test.step(`Selecting random date for Scheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.date_picked();
      })

      await test.step(`Selecting random timeslot for Scheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.get_time_slot();
      })

      await test.step(`Now Scheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.schedule_appointment();
      })

      await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForEvent('load');
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating Assertion with Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(page).toHaveTitle("Job Openings");
      })

      await test.step(`Navigating to "Drop Destination" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.goto(DROP_DESTINATION_SCHEDULING_URL, { waitUntil: 'networkidle' });
      })

      await test.step(`Selecting random date for Rescheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.date_picked();
      })

      await test.step(`Waiting for "Reschedule" button to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForSelector(POM._applicantcalendarpage._areyoursure_reshedule_modal_popup_, { state: "visible", strict: true });
        await page.waitForLoadState("domcontentloaded");
      })

      await test.step(`Clicking "Reschedule" button from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage._interviewRescheduleBtn.click();
      })

      await test.step(`Waiting for Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForSelector(POM._applicantcalendarpage._timeslot_inside_modal_popup_, { state: "visible", strict: true });
        await page.waitForLoadState("domcontentloaded");
      })

      await test.step(`Selecting random timeslot for Rescheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.get_time_slot();
      })

      await test.step(`Now Rescheduling an Appointment for "Drop Destination" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantcalendarpage.reschedule_appointment();
      })

      await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForEvent('load');
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Validating Assertion with Page Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(page).toHaveTitle("Job Openings");
      })

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Now Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Validating "Start Interview" button's Visibility... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._profile_start_interview_button).toBeVisible();
      })

    });

    test('Perform random "Pass", "Fail", "No Show" or "Canceled" Action ==> Trigger Testing', async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Now Clicking "Start Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv._profile_start_interview_button.click();
      })

      await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.waitFor_all_ingoing_processes();
      })

      await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForSelector(POM._applicantpagetv._interviewDetails_modal_popup_, { state: "visible", strict: true });
        await page.waitForLoadState("domcontentloaded");
      })

      await test.step(`Now Performing random Action on "Pass", "Fail", "No Show" and "Canceled" Radio... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.randomly_select_p_f_ns_c_from_interviewdetailsModal();
      })

      await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForEvent('load');
      })

      await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await page.waitForLoadState('networkidle');
      })

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Validating Applicant's stage is changed to "Internal Questionnaire - HF"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(INTERNAL_QUESTIONNAIRE_HF_Stage)).toBeVisible();
            return;
          }
        }
      })

    });

  });

  test.describe('--- INTERNAL QUESTIONNAIRE HF - SUIT ---', () => {

    test.describe('INTERNAL QUESTIONNAIRE (Profile) - SUIT', () => {

      test('Fill "Internal Questionnaire (Profile)"', async ({ browserName, userAgent }) => {
        const POM = new POManager(page);

        await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
        })

        await test.step(`Validating Internal Questionnaire "Fill" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await Promise.all([
            expect(POM._applicantpagetv._profile_InternalQuestionnaire_fill_button).toBeVisible()
          ]);
        })

        await test.step(`Clicking Internal Questionnaire "Fill" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._profile_InternalQuestionnaire_fill_button.click();
        })

        await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
          await page.waitForLoadState("domcontentloaded");
        })

        if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
          await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.getByText(INTERNAL_QUESTIONNAIRE_PROFILE_HEADING_text + APPLICANT_NAME)).toBeVisible();
          })

          await test.step(`Validating "Internal Questionnaire (Profile)" Modals's Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.getByText(INTERNAL_QUESTIONNAIRE_PROFILE_DESCRIPTION_text)).toBeVisible();
          })
        }

        await test.step(`Now Filling "Internal Questionnaire (Profile)"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.fill_internalquestionnaire();
        })

        await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
        })

        await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(AFTER_INTERNAL_QUESTIONNAIRE_PROFILE_FILL_TIMELINE_text + userAgent)).toBeVisible();
        })

        await test.step(`Validating Internal Questionnaire "Edit" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._profile_InternalQuestionnaire_edit_button).toBeVisible();
        })

      });

      test('Edit "Internal Questionnaire (Profile)"', async ({ browserName, userAgent }) => {
        const POM = new POManager(page);

        await test.step(`Clicking Internal Questionnaire "Edit" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._profile_InternalQuestionnaire_edit_button.click();
        })

        await test.step(`Now Editing "Internal Questionnaire (Profile)"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.edit_internalquestionnaire();
        })

        await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
        })

        await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(AFTER_INTERNAL_QUESTIONNAIRE_PROFILE_EDIT_TIMELINE_text + userAgent)).toBeVisible();
        })

      });

    });

    test.describe('INTERNAL QUESTIONNAIRE (Interview Action) - SUIT', () => {

      test(`Get Appointment URL`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Getting Applicant's Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_SCHEDULING_URL = (await POM._applicantpagetv.applicant_schedule_with_prfile_button()).Appointment_URL;
        })

      });

      test(`Schedule an Interview for "Internal Questionnaire HF" Stage`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Internal Questionnaire HF" Scheduling Appointment URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.goto(INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_SCHEDULING_URL, { waitUntil: 'networkidle' });
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

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
        })

        await test.step(`Clicking "Start Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._profile_start_interview_button.click();
        })

        await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._interviewDetails_modal_popup_, { state: "visible", strict: true });
        })

        await test.step(`Waiting for "Internal Questionnaire - Interview Action" button to be Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._internalQuestionnaireInterviewAction_button_, { state: "visible", strict: true });
        })

        await test.step(`Clicking "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._internal_questionnaire_interview_action_button.click();
        })

        await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
          await page.waitForLoadState("domcontentloaded");
        })

        if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
          await test.step(`Validating "Internal Questionnaire - Interview Action" Modals's Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.getByText(INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_HEADING_text + APPLICANT_NAME)).toBeVisible();
          })

          await test.step(`Validating "Internal Questionnaire - Interview Action" Modals's Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page.getByText(INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_DESCRIPTION_text)).toBeVisible();
          })
        }

        await test.step(`Now Filling "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m"`, async () => {
          await POM._applicantpagetv.fill_internalquestionnaireininterviewaction();
        })

        await test.step(`Waiting for Changes to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Closing "Interview Details" Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._interviewDetails_modal_close_button.click();
        })

        await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
        })

        await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(AFTER_INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_FILL_TIMELINE_text + userAgent)).toBeVisible();
        })

      });

      test(`Edit "Internal Questionnaire - Interview Action"`, async ({ browserName, userAgent }) => {
        const POM = new POManager(page);

        await test.step(`Clicking "Start Interview" button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._profile_start_interview_button.click();
        })

        await test.step(`Waiting for "Interview Details" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._interviewDetails_modal_popup_, { state: "visible", strict: true });
          await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Validating "Internal Questionnaire - Interview Action" button is Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._internal_questionnaire_interview_action_button).toBeVisible();
        })

        await test.step(`Clicking "Internal Questionnaire - Interview Action" button... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._internal_questionnaire_interview_action_button.click();
        })

        await test.step(`Waiting for "Internal Questionnaire" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await page.waitForSelector(POM._applicantpagetv._internalQuestionnaire_modal_popup_, { state: "visible", strict: true });
          await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Now Editing "Internal Questionnaire - Interview Action"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.edit_internalquestionnaireininterviewaction();
        })

        await test.step(`Waiting for Changes to be Completed... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitFor_all_ingoing_processes();
        })

        await test.step(`Closing "Interview Details" Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv._interviewDetails_modal_close_button.click();
        })

        await test.step(`Waiting for Timeline texts to be Loaded... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await POM._applicantpagetv.waitForSelector_notes_timeline_texts();
        })

        await test.step(`Validating Assertion With Timeline Text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
          await expect(POM._applicantpagetv._profile_timeline_all_texts.getByText(AFTER_INTERNAL_QUESTIONNAIRE_INTERVIEW_ACTION_EDIT_TIMELINE_text + userAgent)).toBeVisible();
        })

      });

    });

  });

  test.describe('--- EXTERNAL QUESTIONNAIRE HF - SUIT ---', () => {

    test(`Change Applicant's Stage to "External Questionnaire HF"`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.Navigate_to_Tableview_Page();
      })

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Changing Applicant's Stage to "External Questionnaire HF" by Dropdown... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.change_to_any_stage(EXTERNAL_QUESTIONNAIRE_HF_Stage);
      })

      await test.step(`Clicking All "Yes" Button in All Modal Popups... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.click_YES();
      })

      await test.step(`Passing the "Interview Change Status" from Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pass_interviewchangestatus();
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

      await test.step(`Validating Applicant's Stage is Changed to "External Questionnaire HF"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(EXTERNAL_QUESTIONNAIRE_HF_Stage)).toBeVisible();
            return;
          }
        }
      })

    });

    test.describe('Fill and Validate External Questionnaires HF', () => {

      test.describe('External Questionnaire (Qualifying) - SUIT', () => {

        test('Validate Assertions with "Heading" and "Description"', async ({ browserName }) => {
          const POM_private = new POManager(private_page);

          await test.step(`Clicking Mail Subject : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_text}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_QUALIFYING_text, APPLICANT_NAME);
          })

          await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_QUALIFYING_Link)).EXTERNAL_URL;
          })

          await test.step(`Navigating to "External Questionnaire (Qualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_URL, { waitUntil: "networkidle" });
            await page.waitForLoadState("domcontentloaded");
          })

          if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
            await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_heading + " " + APPLICANT_NAME)).toBeVisible();
            })

            await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_description)).toBeVisible();
            })
          }

        });

        test(`Fill External Questionnaire (Qualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
          const POM_private = new POManager(private_page);

          await test.step(`Now Filling "External Questionnaire (Qualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.externalQuestionnaire_Qualifying();
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
            await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_text, APPLICANT_NAME);
          })

          await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_Link)).EXTERNAL_URL;
          })

          await test.step(`Navigating to "External Questionnaire (Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_URL, { waitUntil: "networkidle" });
            await page.waitForLoadState("domcontentloaded");
          })

          if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
            await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_heading + " " + APPLICANT_NAME)).toBeVisible();
            })

            await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_UNQUALIFYING_description)).toBeVisible();
            })
          }

        });

        test(`Fill External Questionnaire (Unqualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
          const POM_private = new POManager(private_page);

          await test.step(`Now Filling "External Questionnaire (Unqualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.externalQuestionnaire_UnQualifying();
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
            await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_text, APPLICANT_NAME);
          })

          await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_Link)).EXTERNAL_URL;
          })

          await test.step(`Navigating to "External Questionnaire (Qualifying & Unqualifying) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_URL, { waitUntil: "networkidle" });
            await page.waitForLoadState("domcontentloaded");
          })

          if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
            await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_heading + " " + APPLICANT_NAME)).toBeVisible();
            })

            await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_QUALIFYING_AND_UNQUALIFYING_description)).toBeVisible();
            })
          }

        });

        test(`Fill External Questionnaire (Qualifying & Unqualifying) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
          const POM_private = new POManager(private_page);

          await test.step(`Now Filling "External Questionnaire (Qualifying & Unqualifying)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.externalQuestionnaire_Q_UQ();
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
            await POM_private._inboxesmailpage.click_on_MailSubject(EXTERNAL_QUESTIONNAIRE_TRIGGER_text, APPLICANT_NAME);
          })

          await test.step(`Clicking Mail Link : "${EXTERNAL_QUESTIONNAIRE_TRIGGER_Link}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            EXTERNAL_QUESTIONNAIRE_TRIGGER_URL = (await POM_private._inboxesmailpage.click_on_MailLink(EXTERNAL_QUESTIONNAIRE_TRIGGER_Link)).EXTERNAL_URL;
          })

          await test.step(`Navigating to "External Questionnaire (Trigger) Question's URL"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await private_page.goto(EXTERNAL_QUESTIONNAIRE_TRIGGER_URL, { waitUntil: "networkidle" });
            await page.waitForLoadState("domcontentloaded");
          })

          if (browserName !== "firefox") {    //  this condition is used to skip below 2 steps, because in Firefox browser, at these steps, page - browser are crashing
            await test.step(`Validating Assertion with Heading... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._heading_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_TRIGGER_heading + " " + APPLICANT_NAME)).toBeVisible();
            })

            await test.step(`Validating Assertion with Description... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
              await expect(POM_private._applicantpagetv._description_externalquestionnaire.getByText(EXTERNAL_QUESTIONNAIRE_TRIGGER_description)).toBeVisible();
            })
          }

        });

        test(`Fill External Questionnaire (Trigger) in PRIVATE WINDOW ==> Candidate Perspective`, async ({ browserName }) => {
          const POM_private = new POManager(private_page);

          await test.step(`Now Filling "External Questionnaire (Trigger)" Questions... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM_private._applicantpagetv.externalQuestionnaire_Trigger();
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

        test('Validate Applicant Stage is Changed to "Hired" ==> Trigger Testing', async ({ browserName }) => {
          const POM = new POManager(page);

          await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
          })

          await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
          })

          await test.step(`Validating Applicant's Stage is Changed to "Hired"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
              if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
                await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(HIRED_Stage)).toBeVisible();
                return;
              }
            }
          })

        });

      });

    });

  });

  test.describe('--- REQUEST DOCUMENTS - SUIT ---', () => {

    test(`Change Applicant's Stage to "Request Documents" using Dropdown, and Perform Random "Pass", "Fail", "No Show" or "Cancel" Action`, async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Changing Applicant's Stage using dropdown... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.change_to_any_stage(REQUEST_DOCUMENT_Stage);
      })

      await test.step(`Clicking All "Yes/Confirm" Buttons from Modal Popups... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.click_YES();
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
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(REQUEST_DOCUMENT_Stage)).toBeVisible();
            return;
          }
        }
      })

    });

    test('Get "Upload Documents" URL via Mail', async ({ browserName }) => {
      const POM_private = new POManager(private_page);

      await test.step(`Navigating to "Inboxes - Mailing Site"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM_private._inboxesmailpage.Navigate_to_InboxesMail_Page();
      })

      await test.step(`Clicking Mail Subject : ${REQUEST_DOCUMENT_Subject}... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM_private._inboxesmailpage.click_on_MailSubject(REQUEST_DOCUMENT_Subject, APPLICANT_NAME);
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

      await test.step(`Validating Applicant : "${APPLICANT_NAME}'s" Stage is "Hired"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        for (let i = 0; i < await (POM._applicantpagetv.all_Names).count(); i++) {
          if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME) {
            await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(HIRED_Stage)).toBeVisible();
            return;
          }
        }
      })

    });

    test('Delete all Attachments', async ({ browserName }) => {
      const POM = new POManager(page);

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME);
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
          await test.step(`${i + 1} Time : Validating With Alert Text...`, async () => {
            await Promise.all([
              expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_DOCUMENT_DELETE_ALERT_text)
            ]);

            await page.waitForResponse(URL => "https://\*.engyj.com/admin/job-applications/timeline/\*" && URL.status() == 200);
          })
        }
      })

      await test.step(`Picking Applicant : "${APPLICANT_NAME}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await POM._applicantpagetv.navigate_and_pick_Applicant(APPLICANT_NAME);
      })

      await test.step(`Validating "Download Documents" Icon is Not Visible... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
        await expect(POM._applicantpagetv._attachments_download_icon).not.toBeVisible();
      })

    });

  });

});

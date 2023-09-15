import { BrowserContext, Page, test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";
import { faker } from "@faker-js/faker";
import { applicant_info } from "../../utils/applicant_info";

test.describe.configure({ mode: "serial" });

// all variables related to Applicant
const JOB_TITLE = 'Automate JOB';
const APPLICANT_NAME_aif = faker.name.firstName() + " " + faker.name.firstName();
const APPLICANT_PHONE_aif = applicant_info.a_Phone;
const APPLICANT_ADDRESS_aif = applicant_info.a_Address;

// all variables related to Stages
const WALK_IN_INTERVIEW_Stage: string = "Walk In Interview";
const DROP_DESTINATION_Stage: string = "Drop Destination";

// all variables related to Store Scheduling URLS
let WALK_IN_INTERVIEW_SCHEDULING_URL: string;

// variable to store time slot
let TIME_SLOT: string;
let UPDATED_TIME_SLOT: string;

// all warning alerts texts to be verified
const AFTER_ACCEPT_INTERVIEW_ALERT_text: string = "×Response applied successfully.";
const AFTER_PASS_FAIL_NOSHOW_ACTION_ALERT_text: string = "×Interview schedule status changed successfully.";

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

test.describe(`--- "ACCEPT INTERVIEW" BUTTON - SUIT ---`, () => {

    test(`Create New Applicant from "Admin's or Hiring Manager" Job Applications Page`, async ({ browserName, baseURL }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to "Admin's or Hiring Manager's" Job Applications Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Navigate_to_admin_JobApplications_Page();
        })

        await test.step(`Selecting Job Title : "${JOB_TITLE}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.select_job(JOB_TITLE);
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState("networkidle");
        })

        await test.step(`Now Adding Applicant's Info... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._jobpage.Create_Applicant_with_specific_stage_via_Admin_Page(baseURL, WALK_IN_INTERVIEW_Stage, APPLICANT_NAME_aif, APPLICANT_PHONE_aif, APPLICANT_ADDRESS_aif);
        })

        await test.step(`Waiting for Page to Redirect... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForEvent("load");
        })

        await test.step(`Validating Assertion with Page's Title... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(page).toHaveTitle('ENGYJ Recruit | Dashboard');
        })

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_aif}'s" stage is "${WALK_IN_INTERVIEW_Stage}"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            const all_visible_Applicants_count = await POM._applicantpagetv.all_Names.count();
            for (let i = 0; i < all_visible_Applicants_count; i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_aif) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(WALK_IN_INTERVIEW_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

    test.describe(`Schedule an Interview - Suit`, () => {

        test(`Get Scheduling Url of "${WALK_IN_INTERVIEW_Stage}" stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Opening Applicant : "${APPLICANT_NAME_aif}'s" Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_aif);
            })

            await test.step(`Getting "Walk In Interview" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                WALK_IN_INTERVIEW_SCHEDULING_URL = (await POM._applicantpagetv.applicant_schedule_with_prfile_button()).Appointment_URL;
            })

        });

        test(`Schedule an Appointment for "${WALK_IN_INTERVIEW_Stage}" Stage`, async ({ browserName }) => {
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

    });

    test(`"Accept Interview" Button's Functionality`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.Navigate_to_Tableview_Page();
        })

        await test.step(`Picking Applicant : "${APPLICANT_NAME_aif}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_aif);
        })

        await test.step(`Validating Assertion with random selected "timeslot"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._date_time_aside_pass_fail_noshow_buttons.getByText(TIME_SLOT)).toBeVisible();
        })

        await test.step(`Validating "Accept Interview" Button is Visible inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._accept_interview_button).toBeVisible();
        })

        await test.step(`Clicking "Accept Interview" Button inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._accept_interview_button.click();
        })

        await test.step(`Waiting for "Do you want to accept interview schedule" Modal to Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForSelector(POM._applicantpagetv._sweerAlert_modal_popup_, { state: "visible", strict: true });
            await page.waitForLoadState("domcontentloaded");
        })

        await test.step(`Validating "Do you want to accept interview schedule" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._modalPopup).toBeVisible();
        })

        await test.step(`Clicking "Yes" Button from "Do you want to accept interview schedule" Modal... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._yes_btn.click();
        })

        await test.step(`Validating Assertion with "Success Alert" text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_ACCEPT_INTERVIEW_ALERT_text);
        })

    });

    test(`Validate "Pass", "Fail" and "No Show" Button's Visibility`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Refreshing the Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.reload();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('networkidle');
        })

        await test.step(`Validating "Pass", "Fail", "No Show" buttons are Visible on Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_aif) {
                    await expect(POM._applicantpagetv.all_Divs.nth(i).locator(POM._applicantpagetv._pass_fail_noshow_buttons_tbl)).toHaveCount(3);
                    return;
                }
            }
        })

    });

    test.describe(`Reschedule an Interview - Suit`, () => {

        test(`Reschedule an Appointment for "${WALK_IN_INTERVIEW_Stage}" Stage`, async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Navigating to "Walk In Interview" Scheduling URL... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await page.goto(WALK_IN_INTERVIEW_SCHEDULING_URL, { waitUntil: 'networkidle' });
            })

            await test.step(`Selecting random date for Rescheduling an Appointment for "Walk In Interview" Stage... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantcalendarpage.date_picked();
            })

            await test.step(`Clicking "Reschedule" Button from Modal Popup... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
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

        });

        test('Validate Updated Timeslot', async ({ browserName }) => {
            const POM = new POManager(page);

            await test.step(`Navigating to Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.Navigate_to_Tableview_Page();
            })

            await test.step(`Picking Applicant : "${APPLICANT_NAME_aif}" from Tableview Page... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await POM._applicantpagetv.pick_Applicant(APPLICANT_NAME_aif);
            })

            await test.step(`Validating Assertion with updated "timeslot"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
                await expect(POM._applicantpagetv._date_time_aside_pass_fail_noshow_buttons.getByText(UPDATED_TIME_SLOT)).toBeVisible();
            })

        });

    });

    test(`Perform random "Pass", "Fail", "No Show" Action inside Applicant's Profile ==> Trigger Testing`, async ({ browserName }) => {
        const POM = new POManager(page);

        await test.step(`Now Performing random Action inside Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv.random_pass_fail_noshow_action();
        })

        await test.step(`Validating Assertion with "Success Alert" text... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._success_alert).toHaveText(AFTER_PASS_FAIL_NOSHOW_ACTION_ALERT_text);
        })

        await test.step(`Validating "Success Alert" to be Disappear... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await expect(POM._applicantpagetv._success_alert).not.toBeVisible({ timeout: 60 * 1000 });
        })

        await test.step(`Closing Applicant's Profile... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await POM._applicantpagetv._profile_applicants_modal_close.click();
        })

        await test.step(`Waiting for Network to be "idle"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            await page.waitForLoadState('networkidle');
        })

        await test.step(`Validating Applicant : "${APPLICANT_NAME_aif}" Stage is Changed to "Drop Destination"... via \x1b[32m"[${browserName}]"\x1b[0m`, async () => {
            for (let i = 0; i < (await POM._applicantpagetv.all_Names.count()); i++) {
                if (await POM._applicantpagetv.all_Names.nth(i).textContent() === APPLICANT_NAME_aif) {
                    await expect(POM._applicantpagetv.all_Stages.nth(i).getByText(DROP_DESTINATION_Stage)).toBeVisible();
                    return;
                }
            }
        })

    });

});

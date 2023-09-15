import { expect, Page } from "@playwright/test";

export class InterviewCalendarPage {
    readonly page: Page

    /* ======== ALL GLOBAL URLS ======== */
    private InterviewCalendar_Page_URL: string;

    /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
    private _all_past_days: any;
    private _present_day: any;
    private _all_future_days: any;
    private _all_days: any;


    /* ======== ALL GLOBAL LOCATORS ======== */
    Sidebar_menu: any;

    /* ======== ALL PRIVATE LOCATORS ======== */
    private _timeslots_dropdown: any;
    private _timeslots_dropdown_values: any;
    private _scheduleInterview_modal_close_icon: any;

    // all locators for Internal Questionnaire in Interview Action and Their Radio
    private _familyandFriendsOnly_radio: any;
    private _shiftsareyoumostinterested_dropdown: any;
    private _cna_radio: any;
    private _justCats_radio: any;
    private _NoExperience_radio: any;
    private _hha_radio: any;
    private _justDogs_radio: any;
    private _submit_button: any;

    // all locators related to "Interview Schedule"
    private _candidate_inputbox: any;
    private _candidate_input: any;
    private _candidate_input_treeitem: any;
    private _schedule_interview_button: any;
    private _direct_chat_names: any;
    private _edit_icon: any;
    private _update_schedule_interview_button: any;
    private _all_checkbox: any;

    /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */

    // all locators related to "Internal Questionnaire - Interview Action"
    _description_box_inside_internalquestionnaire_modal: any;
    _heading_inside_internalquestionnaire_modal: any;
    _profile_start_interview_button: any;       // rename it
    _internal_questionnaire_interview_action_button: any;
    _interviewDetails_modal_close_button: any;

    /* ======== ALL SELECTORS ======== */
    _Interview_modal_popup_: string;
    _scheduleAnInterview_insideModal_button_: string;
    _interviewDetails_modal_popup_: string;
    _internalQuestionnaireInterviewAction_button_: string;
    _internalQuestionnaire_modal_popup_: string;

    // some extra locators
    prefix_specific_applicant: string;
    suffix_specific_applicant: string;

    constructor(page: Page) {
        this.page = page

        /* ======== ALL GLOBAL URLS ======== */
        this.InterviewCalendar_Page_URL = "admin/interview-schedule";

        /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
        this._all_past_days = page.locator("td.fc-day-top.fc-past");
        this._present_day = page.locator("td.fc-day-top.fc-today");
        this._all_future_days = page.locator("td.fc-day-top.fc-future");
        this._all_days = page.locator("td.fc-day-top");


        /* ======== ALL GLOBAL LOCATORS ======== */
        this.Sidebar_menu = page.locator("#sidebar-opener");

        /* ======== ALL PRIVATE LOCATORS ======== */
        this._timeslots_dropdown = page.locator("#scheduleTimeSlot");
        this._timeslots_dropdown_values = page.locator("select#scheduleTimeSlot option[value]");
        this._scheduleInterview_modal_close_icon = page.locator("button[class='close'] i[class='fa fa-times']");

        // all locators for Internal Questionnaire in Interview Action and Their Radio
        this._familyandFriendsOnly_radio = page.getByRole("radio", { name: "Family & friends only", exact: true });
        this._shiftsareyoumostinterested_dropdown = page.getByRole("combobox", { name: "What shifts are you most interested in working? D ", exact: true });
        this._cna_radio = page.getByRole("radio", { name: "CNA (Certified Nursing Assistant)", exact: true });
        this._justCats_radio = page.getByRole("radio", { name: "Just Cats", exact: true });
        this._NoExperience_radio = page.getByRole("radio", { name: "No Experience (That’s ok)", exact: true });
        this._hha_radio = page.getByRole("radio", { name: "HHA (Home Health Aide)", exact: true });
        this._justDogs_radio = page.getByRole("radio", { name: "Just Dogs", exact: true });
        this._submit_button = page.locator("#save-form");

        // all locators related to "Interview Schedule"
        this._candidate_inputbox = page.getByRole('combobox').first();
        this._candidate_input = page.locator('input[type="search"]');
        this._candidate_input_treeitem = page.getByRole("treeitem");
        this._schedule_interview_button = page.getByRole("button", { name: "Schedule an Interview" });
        this._direct_chat_names = page.locator("ul.scheduleul div.direct-chat-name");
        this._edit_icon = page.locator("button[title='Edit']");
        this._update_schedule_interview_button = page.getByRole("button", { name: "Update", exact: true });
        this._all_checkbox = page.locator("div.col-sm-12 div.form-group label[for]");

        /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */

        // all locators related to "Internal Questionnaire (Profile) & (Interview Action)"
        this._description_box_inside_internalquestionnaire_modal = page.locator("//div[@class='row']//div[contains(@class,'form-sub-heading')]");
        this._heading_inside_internalquestionnaire_modal = page.locator("div[class='col-12'] h4[class='card-title form-sub-heading mb-4']");
        this._profile_start_interview_button = page.locator("//a[normalize-space()='Start Interview']");
        this._internal_questionnaire_interview_action_button = page.locator("a[title='Internal Questionnaire - Interview Action']");
        this._interviewDetails_modal_close_button = page.locator("//button[@class='btn dark btn-outline']");

        /* ======== ALL SELECTORS ======== */
        this._Interview_modal_popup_ = "select[id='scheduleTimeSlot']";
        this._scheduleAnInterview_insideModal_button_ = "//button[normalize-space()='Schedule an Interview']";
        this._interviewDetails_modal_popup_ = "p a[target='_blank']";
        this._internalQuestionnaireInterviewAction_button_ = "a[title='Internal Questionnaire - Interview Action']";
        this._internalQuestionnaire_modal_popup_ = "div[id='questionnaireModal'] div[class='modal-body'] img";

        // some extra locators
        this.prefix_specific_applicant = "//span[contains(text(),'";
        this.suffix_specific_applicant = "')]";

    }

    /* ################################################ */

    // this function will navigate to Interview Calendar Page
    async Navigate_to_InterviewCalendar_Page() {
        await this.page.goto(this.InterviewCalendar_Page_URL, { waitUntil: "networkidle" });
    }

    // this function will click on random Date and check for timeslots are available or there are more than 5 time slots available, otherwise it will select other random future date
    async random_schedule_date() {
        const allPastDays = await this._all_past_days.count();
        const allFutureDays = await this._all_future_days.count();
        const presentDay = await this._present_day.count();
        const allDays = allFutureDays + presentDay + allPastDays;
        const allAvailableDays: number[] = [];

        // below loop is used to get all future + present Days, and SAVE those values in an array, so that we can randomly select days from those values
        for (let i = allPastDays; i < allDays; i++) {
            allAvailableDays.push(i);
        }   //  end of for loop i

        // this loop will will help in clicking days (from allAvailableDays), and perform action in it
        for (let j = 0; j < (allFutureDays + presentDay); j++) {
            const randomFutureDay: number = allAvailableDays[Math.floor(Math.random() * allAvailableDays.length)];    // this random function will give value from given array's indexes
            // when first (randomly generated) value is selected, and it does not have timeSlots, then below splicing will remove that value, and will loop through remaining different values
            allAvailableDays.splice(allAvailableDays.indexOf(randomFutureDay), 1);
            await this._all_days.nth(randomFutureDay).click();
            await this.waitFor_getTimings_API();
            await this.page.waitForTimeout(2500);

            try {
                await this.page.waitForSelector(this._Interview_modal_popup_, { state: 'attached', strict: true, timeout: 5000 });
                const allAvailableTimeSlots = await this._timeslots_dropdown_values.allInnerTexts();
                const toCheckAvailabletimeSlot = await this.page.evaluate(() => document.getElementById("scheduleTimeSlot")?.innerHTML); //validate date slots are available or not

                // this condition will firstly check if any text (of timeSlots) is available and timeSlots are more than 5
                if (toCheckAvailabletimeSlot?.length == 0 || allAvailableTimeSlots.length < 5) {
                    await this._scheduleInterview_modal_close_icon.click();
                }
                else {
                    const TIME_SLOT = (await this.random_timeSlot()).selected_random_timeSlot;
                    return { TIME_SLOT };
                }
            }
            catch (error) { }
        }   // end of for loop j
    }

    // this function will take all available timeslots (on random date from above function) in Array, and then randomly select timeslot among all timeslots
    async random_timeSlot() {
        const allAvailable_timeSlots = await this._timeslots_dropdown_values.allInnerTexts();
        const selected_random_timeSlot_index = Math.floor(Math.random() * allAvailable_timeSlots.length);
        const selected_random_timeSlot = allAvailable_timeSlots[selected_random_timeSlot_index];
        await this._timeslots_dropdown.selectOption(`${selected_random_timeSlot}`);
        return { selected_random_timeSlot };
    }

    // this function will check the visibility of Applicant's Name, if found then it will click on "Schedule an Interview" button, if found not then it will type applicant's name on input box
    async applicant_picked_and_scheduling_interview(APPLICANT_NAME: string) {
        // if OUR GIVEN NAME is visible in COMBOBOX then it will directly SCHEDULE an INTERVIEW
        if (await this.page.getByTitle(APPLICANT_NAME).isVisible()) {
            await this.schedule_interview();
        }
        // if GIVEN NAME is not visible
        else {
            await this._candidate_inputbox.click();
            await this._candidate_input.type(APPLICANT_NAME);
            // this condition will check in OUR GIVEN NAME in INPUT SEARCH BOX
            if (await this._candidate_input_treeitem.getByText(APPLICANT_NAME).isVisible()) {
                await this.page.getByRole("treeitem", { name: APPLICANT_NAME }).click();
                await this.schedule_interview();
            }
            else {
                console.log("\t\tNo Applicant with name " + '"' + APPLICANT_NAME + '" Found!');
            }
        }
    }

    // this function will Schedule an Interview
    async schedule_interview() {
        await this.page.waitForSelector(this._scheduleAnInterview_insideModal_button_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._schedule_interview_button.click();
    }

    // this function will help in clicking on specific applicant's edit icon
    async click_Edit_icon(APPLICANT_NAME: string) {
        await this.page.waitForLoadState("domcontentloaded");
        const allDirectChatNames = await this._direct_chat_names.allInnerTexts();

        // this loop will run until specific (already scheduled) applicant is visible
        for (let i = 0; i < allDirectChatNames.length; i++) {
            if (allDirectChatNames[i] === APPLICANT_NAME) {
                await this._edit_icon.nth(i).click();
                await this.page.waitForSelector(this._Interview_modal_popup_, { state: "visible", strict: true });
                return;
            }
        }
    }

    //  this function will click random checkbox (pass, fail, cancelled, no show)
    async perform_random_action_on_checkbox(APPLICANT_NAME: string) {
        const specific_applicant = this.prefix_specific_applicant + APPLICANT_NAME + this.suffix_specific_applicant;

        await this.page.locator(specific_applicant).click();
        await this.page.waitForSelector(this._interviewDetails_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        const allcheckbox_count: number = (await this._all_checkbox.count() - 1);
        const random_selected_checkbox_index = Math.floor(Math.random() * allcheckbox_count);
        await this._all_checkbox.nth(random_selected_checkbox_index).click();
    }

    // this function will only click on Update button when Rescheduling Interview
    async update_schedule() {
        await this._update_schedule_interview_button.click();
    }

    // this function will help in Filling all questions of "Internal Questionnaire in Interview Action"
    async internalquestionnaireininterviewaction() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._familyandFriendsOnly_radio.check();
        await this._shiftsareyoumostinterested_dropdown.selectOption("Night Shifts");
        await this._cna_radio.check();
        await this._justCats_radio.check();
        await this._submit_button.click();
    }

    // this function will help in Editing all questions of "Internal Questionnaire in Interview Action"
    async internalquestionnaireininterviewaction_edit() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._NoExperience_radio.check();
        await this._shiftsareyoumostinterested_dropdown.selectOption("Open to any Shifts");
        await this._hha_radio.check();
        await this._justDogs_radio.check();
        await this._submit_button.click();
    }

    // -----------------------------------------------------------------------------------------------
    async waitFor_getTimings_API() {
        for (let i = 0; i < 4; i++) {
            await this.page.waitForResponse(URL => "https://\*.engyj.com/admin/interview-schedule/get-timing" && URL.status() == 200);
        }
    }

    // this function will wait for every ingoing process
    async waitFor_all_ingoing_processes() {
        await Promise.all([
            this.page.waitForEvent("requestfinished"),
            this.page.waitForEvent("response")
        ])
    }
} 
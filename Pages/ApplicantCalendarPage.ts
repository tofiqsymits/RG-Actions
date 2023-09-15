import { Locator, Page } from '@playwright/test';

export class ApplicantCalendarPage {
    page: Page;

    private _alldates: any;
    private _interviewSubmitBtn: any;
    _interviewRescheduleBtn: any;
    private _interviewCencelBtn: any;
    private _InterviewRemarks: any;
    private _interviewCancelSureBtn: any;
    private _interviewCancelReaseon: any;
    _success_alert: any;

    // all Locators for Calendar
    _time_slots_dropdown_values: any;
    _time_slots_dropdown: any;

    // all waitForSelectors
    _timeslot_inside_modal_popup_: string;
    _areyoursure_reshedule_modal_popup_: string;
    _cancel_schedule_modal_popup_: string;

    constructor(page: Page) {
        this.page = page;

        this._alldates = page.locator(".date");
        this._interviewSubmitBtn = page.getByRole('button', { name: 'Submit' });
        this._interviewRescheduleBtn = page.getByRole('button', { name: 'Reschedule' });
        this._interviewCencelBtn = page.getByRole('link', { name: 'Cancel Interview' })
        this._interviewCancelSureBtn = page.locator(".swal-button.swal-button--cancelInterview");
        this._interviewCancelReaseon = page.locator('#reason');
        this._InterviewRemarks = page.locator('#comment');
        this._success_alert = page.locator(".jq-toast-single.jq-has-icon.jq-icon-success");

        // all Locators for Calendar
        this._time_slots_dropdown_values = page.locator("#scheduleTimeSlot option[value]");
        this._time_slots_dropdown = page.locator("#scheduleTimeSlot");

        // all waitForSelectors
        this._timeslot_inside_modal_popup_ = "div[id='modal-data-application'] div[class='modal-content'] select";
        this._areyoursure_reshedule_modal_popup_ = "//div[@class='swal-modal']";
        this._cancel_schedule_modal_popup_ = "div[id='CancelModal'] div[class='modal-content'] textarea";
    }

    // this function will randomly select any date, and check the visibility of specific (random) date
    async date_picked() {
        const allDates_count = await this._alldates.count();
        const allAvailableDates_index_number: number[] = [];

        for (let i = 0; i < allDates_count; i++) {
            allAvailableDates_index_number.push(i);
        }

        let k = 0
        while (k < allAvailableDates_index_number.length) {
            const randomDates_index_number = Math.floor(Math.random() * allAvailableDates_index_number.length);

            const visibility_check = await this.page.isEnabled("[id$='date_" + randomDates_index_number + "']");
            const date = this._alldates.nth(randomDates_index_number);
            allAvailableDates_index_number.splice(randomDates_index_number, 1);

            if (visibility_check == true) {
                await date.click();
                return;
            }
            k++;
        }
    }

    // this function will select random timeslot and return it
    async get_time_slot() {
        await this.page.waitForResponse(URL => "https://\*.engyj.com/schedule-interview/get-timings" && URL.status() == 200)
        await this._time_slots_dropdown.click();
        await this.page.waitForLoadState("domcontentloaded");
        const availableTimeSlots = await this._time_slots_dropdown_values.allInnerTexts();
        const randomly_selected_timeslot_index = Math.floor(Math.random() * availableTimeSlots.length);
        const randomly_selected_timeslot = availableTimeSlots[randomly_selected_timeslot_index];
        await this._time_slots_dropdown.selectOption(randomly_selected_timeslot);
        return { randomly_selected_timeslot };
    }

    async schedule_appointment() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._InterviewRemarks.fill('This is a scheduled remarks');
        await this._interviewSubmitBtn.click();
    }

    async reschedule_appointment() {
        await this._InterviewRemarks.fill('This is a rescheduled remarks');
        await this._interviewSubmitBtn.click();
    }

    async cancel_appointment() {
        await this._interviewCencelBtn.click();
        await this.page.waitForSelector(this._cancel_schedule_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._interviewCancelReaseon.fill('Interview Cancel Reason')
        await this._interviewCancelSureBtn.click();
        await this.page.locator('.swal-button.swal-button--okay').click();
    }

    // this function will wait for every ingoing process
    async waitFor_all_ingoing_processes() {
        await Promise.all([
            this.page.waitForEvent("requestfinished"),
            this.page.waitForEvent("response")
        ])
    }
}
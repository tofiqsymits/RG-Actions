import { Page } from "@playwright/test";
import { applicant_info } from "../utils/applicant_info";

export class ApplicantPageTableview {
    readonly page: Page


    /* ======== ALL GLOBAL URLS ======== */
    private Tableview_Page_URL: string;

    /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
    private _deleteConfirm_button: any;

    /* ======== ALL GLOBAL LOCATORS ======== */
    _first_applicant: any;

    // all locators related to Applicant's Profile
    _profile_applicants_title: any;
    _profile_print_title: any;
    _profile_applicants_modal_close: any;
    _profile_applicant_name_title: any;
    _profile_phone_icon: any;
    _profile_phone_title: any;
    _profile_email_envelop_icon: any;
    _profile_applicant_email: any;
    _profile_applicant_address: any;
    _profile_copyToClipboard_all_icons: any;
    _profile_all_stars: any;
    _profile_label_heading: any;
    _profile_AddLabel_button: any;
    _profile_personalTextMessages_button: any;
    _profile_resendAppointmentInvite_button: any;
    _profile_schedule_button: any;
    _profile_archiveApplication_button: any;
    _profile_documentsAddEdit_button: any;
    _profile_documentsAddEdit_text: any;
    _profile_changeStage_dropdown: any;
    _profile_stage_name_title: any;
    _profile_seeAnswers_button: any;
    _profile_Hire_button: any;
    _profile_Reject_button: any;
    _profile_Questionnaires_title: any;
    _profile_InternalQuestionnaire_fill_button: any;
    _profile_InternalQuestionnaire_edit_button: any;
    _profile_note_textarea: any;
    _profile_addNote_button: any;
    _profile_viewNotes_button: any;
    _profile_timeline_div: any;
    _profile_timeline_all_texts: any;
    _date_time_aside_pass_fail_noshow_buttons: any;
    _accept_interview_button: any;

    /* ======== ALL PRIVATE LOCATORS ======== */

    // all locators related to "External Questionnaire"
    private _mail_link: any;

    // all locators related to "Questionnaires"
    private _submit_button: any;
    private _Yes_Q_radio: any;
    private _No_radio: any;
    private _20_30_miles_Q: any
    private _PCA_checkbox: any;
    private _PCW_checkbox: any;
    private _IamEnrolled_checkbox: any;
    private _northernKentucky_radio: any;
    private _whatShiftsareYouMostInterested_dropdown: any;
    private _validFloridaDriversLicense_dropdown: any;
    private _IamNewToCaregiving_checkbox: any;
    private _JustDogs_radio: any;
    private _JustCats_Q_radio: any;
    private _columbusOhio_radio: any;
    private _CNA_Q_radio: any;
    private _columbus_radio: any;
    private _CBRF_checkbox: any;
    private _FloridaDriversLicense_dropdown: any;
    private _availableToWorkOnWeekends_dropdown: any;
    private _cincinnati_radio: any;
    private _RN_LPN_checkbox: any;
    private _familyandFriendsOnly_radio: any;
    private _shiftsareyoumostinterested_dropdown: any;
    private _cna_radio: any;
    private _justCats_radio: any;
    private _justDogs_radio: any;
    private _NoExperience_radio: any;
    private _hha_radio: any;

    // all locators related to Notes
    private _update_notes_pencil_icon: any;
    private _update_note_textArea: any;
    private _note_Update_button: any;
    private _note_Delete_icon: any;

    // all locators related to Filters
    private jobs_dropdown: any;
    private automateJob_treeitem: any;
    private stages_dropdown: any;
    private applyFilters_button: any;
    private sources_dropdown: any;
    private direct_treeitem: any;
    private selectLabels_dropdown: any;
    private all_existing_labels_treeitem: any;
    private qualifications_dropdown: any;
    private qualified_treeitem: any;
    private unqualified_treeitem: any;
    private email_input: any;
    private searchByNameOrPhone: any;

    // all locators related to Labels
    private _demoLabelTestingText_tv: string;
    private _labels_color_circle: any;
    private _label_editable_input: any;
    private _label_editable_input_ok: any;
    private _label_delete_icon: any;

    // all locators related to Stars
    private _profile_star_select: any;
    private _profile_star_delete_icon: any;

    // all locators related to Happyflow System
    private _pass_fail_noshow_buttons: any;
    private _PhoneScreen_Schedule_button: any;

    /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */
    _applicant_edit_icon: any;
    _success_alert: any;
    _warning_alert: any;

    // all locators related to "External Questionnaire"
    _heading_externalquestionnaire: any;
    _description_externalquestionnaire: any;

    // all locators related to "Internal Questionnaire (Profile) & (Interview Action)"
    _description_box_inside_internalquestionnaire_modal: any;
    _heading_inside_internalquestionnaire_modal: any;
    _profile_start_interview_button: any;
    _internal_questionnaire_interview_action_button: any;
    _interviewDetails_modal_close_button: any;

    // all locators related to Notes
    _note_textArea_texts: any;
    _note_modal_close_icon: any;

    // all locators related to Filters
    filterResults_attr: any;
    profileLabels_after_Filters: any;

    // all locators related to Labels
    _profile_label_applicants_modal_labels: any;
    _profile_label_available_labels: any;
    prefix_allLabels_visible: string;
    suffix_allLabels_visible: string;

    // all locators related to Request Documents
    _we_accept_etc_files_text: any;
    _upload_document_submit_button: any;
    _first_ChooseFile: any;
    _second_ChooseFile: any;
    _changeFile_button: any;
    _tick_img: any;
    _documents_modal_popup: any;
    _all_attachments_div: any;
    _documents_delete_icon: any;
    _attachments_download_icon: any;

    // all locators related to Happyflow System
    _modalPopup: any;
    _pass_fail_noshow_buttons_tbl: string;
    _interviewDetails_modal_popup: any;

    /* ======== ALL SELECTORS ======== */
    _profile_modal_sidebar_: string;
    _moveStage_dropdown_inside_profile_: string;
    _sweerAlert_modal_popup_: string;
    _interview_change_status_modal_popup_: string;
    _internalQuestionnaire_modal_popup_: string;
    _internalQuestionnaire_notes_timeline_texts_: string;
    _interviewDetails_modal_popup_: string;
    _internalQuestionnaireInterviewAction_button_: string;
    _add_notes_button_: string;
    _notes_textbox_modal_popup_: string;
    _update_notes_pencil_icon_: string;
    _update_notes_Update_button_: string;
    _profile_viewNotes_button_: string;
    _delete_notes_icon_: string;
    _delete_stars_icon_: string;
    _documents_modal_popup_: string;

    // some extra locators
    _yes_btn: any;
    _no_btn: any;
    private _ok_button: any;
    private _interviewChangeStatus_modal_close_button: any;
    private all_Checkbox: any;
    private _modalpass: any;
    all_Names: any;
    all_Stages: any;
    all_Actions: any;
    all_Sources: any;
    all_Jobs: any;
    all_Qualifications: any;
    all_Divs: any;
    _profile_rating_stars_: any;

    _morethanineyearexperience_radio: any;
    _lessthanineyearexperience_radio: any;

    // all suffix & prefix 
    prefix_specific_ApplicantName_full_div: string;
    suffix_specific_ApplicantName_full_div: string;


    constructor(page: Page) {
        this.page = page

        /* ======== ALL GLOBAL URLS ======== */
        this.Tableview_Page_URL = "admin/job-applications/table-view";

        /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
        this._deleteConfirm_button = page.getByRole("button", { name: "Delete", exact: true });

        /* ======== ALL GLOBAL LOCATORS ======== */
        this._first_applicant = page.locator('body tr:nth-child(1) [class="show-detail"]');

        // all locators related to Applicant's Profile
        this._profile_applicants_title = page.locator("//div[contains(@class,'right-side-toggle')]");
        this._profile_print_title = page.locator('#priint');
        this._profile_applicants_modal_close = page.locator("//i[@class='fa fa-close']");
        this._profile_applicant_name_title = page.locator('#applicant-name');
        this._profile_phone_icon = page.locator("//i[@class='fa fa-phone']");
        this._profile_phone_title = page.locator("#applicant-phone");
        this._profile_email_envelop_icon = page.locator("//i[@class='fa fa-envelope']");
        this._profile_applicant_email = page.locator("#applicant-email");
        this._profile_applicant_address = page.locator("#applicant-address1");
        this._profile_copyToClipboard_all_icons = page.locator("(//i[@class='fa fa-copy'])");
        this._profile_all_stars = page.locator("div.br-widget a");
        this._profile_label_heading = page.locator("//h4[normalize-space()='Labels:']");
        this._profile_AddLabel_button = page.locator('#addLabels');
        this._profile_personalTextMessages_button = page.locator("#view-msgs");
        this._profile_resendAppointmentInvite_button = page.locator("#sii-btn");
        this._profile_schedule_button = page.locator('#schedule-btn');
        this._profile_archiveApplication_button = page.locator("//a[normalize-space()='Archive Application']");
        this._profile_documentsAddEdit_button = page.locator("#add-doc-btn");
        this._profile_documentsAddEdit_text = page.locator("button[id='add-doc-btn'] span");
        this._profile_changeStage_dropdown = page.locator('#move_stage_dropdown').getByRole('combobox');
        this._profile_stage_name_title = page.locator('#stage-name');
        this._profile_seeAnswers_button = page.locator("#see-app-answers");
        this._profile_Hire_button = page.locator("//button[normalize-space()='Hire']");
        this._profile_Reject_button = page.locator("//button[normalize-space()='Reject']");
        this._profile_Questionnaires_title = page.locator('span').filter({ hasText: 'Questionnaires' });
        this._profile_InternalQuestionnaire_fill_button = page.getByRole('link', { name: "Fill", exact: true });
        this._profile_InternalQuestionnaire_edit_button = page.getByRole('link', { name: "Edit", exact: true });
        this._profile_note_textarea = page.locator('#add_update_note_value');
        this._profile_addNote_button = page.locator('#add_update_note');
        this._profile_viewNotes_button = page.locator("#view-notes-btn");
        this._profile_timeline_div = page.locator("//div[contains(@class,'timeline-container')]");
        this._profile_timeline_all_texts = page.locator('p.text-muted.fw-500.pb-1');
        this._date_time_aside_pass_fail_noshow_buttons = page.locator("span[id='scheduled-date'] i");
        this._accept_interview_button = page.locator("//button[@id='accept-btn']");

        /* ======== ALL PRIVATE LOCATORS ======== */

        // all locators related to "External Questionnaire"
        this._mail_link = page.frameLocator("#html_msg_body");

        // all locators related to "Questionnaires"
        this._submit_button = page.locator("#save-form");
        this._Yes_Q_radio = page.getByRole("radio", { name: "Yes (Q)", exact: true });
        this._No_radio = page.getByRole("radio", { name: "No", exact: true });
        this._20_30_miles_Q = page.getByRole("radio", { name: "20-30 miles (Q)", exact: true });
        this._PCA_checkbox = page.getByRole("checkbox", { name: "PCA", exact: true });
        this._PCW_checkbox = page.getByRole("checkbox", { name: "PCW", exact: true });
        this._IamEnrolled_checkbox = page.getByRole("checkbox", { name: "I am enrolled in one of the above programs", exact: true });
        this._northernKentucky_radio = page.getByRole("radio", { name: "Northern Kentucky", exact: true });
        this._whatShiftsareYouMostInterested_dropdown = page.getByRole("combobox", { name: "What shifts are you most interested in working? (Ex) D ", exact: true });
        this._validFloridaDriversLicense_dropdown = page.getByRole('combobox', { name: 'Do you have a valid Florida Driver’s License? (Ex) D ', exact: true });
        this._IamNewToCaregiving_checkbox = page.getByRole("checkbox", { name: "I am new to the caregiving field, but excited to get started", exact: true });
        this._JustDogs_radio = page.getByRole("radio", { name: "Just Dogs", exact: true });
        this._JustCats_Q_radio = page.getByRole("radio", { name: "Just Cats (Q)", exact: true });
        this._columbusOhio_radio = page.getByRole("radio", { name: "Columbus, Ohio", exact: true });
        this._CNA_Q_radio = page.getByRole("radio", { name: "CNA (Certified Nursing Assistant) (Q)", exact: true });
        this._columbus_radio = page.getByRole("radio", { name: "Columbus, Ohio", exact: true });
        this._CBRF_checkbox = page.getByRole("checkbox", { name: "CBRF", exact: true });
        this._FloridaDriversLicense_dropdown = page.getByRole("combobox", { name: "Do you have a valid Florida Driver’s License? D ", exact: true });
        this._availableToWorkOnWeekends_dropdown = page.getByRole("combobox", { name: "Are you available to work on Weekends? D ", exact: true });
        this._cincinnati_radio = page.getByRole("radio", { name: "Cincinnati, Ohio", exact: true });
        this._RN_LPN_checkbox = page.getByRole("checkbox", { name: "RN, LPN, NP, CNS, BSN", exact: true });
        this._familyandFriendsOnly_radio = page.getByRole("radio", { name: "Family & friends only", exact: true });
        this._shiftsareyoumostinterested_dropdown = page.getByRole("combobox", { name: "What shifts are you most interested in working? D ", exact: true });
        this._cna_radio = page.getByRole("radio", { name: "CNA (Certified Nursing Assistant)", exact: true });
        this._justCats_radio = page.getByRole("radio", { name: "Just Cats", exact: true });
        this._justDogs_radio = page.getByRole("radio", { name: "Just Dogs", exact: true });
        this._NoExperience_radio = page.getByRole("radio", { name: "No Experience (That’s ok)", exact: true });
        this._hha_radio = page.getByRole("radio", { name: "HHA (Home Health Aide)", exact: true });

        // all locators related to Notes
        this._update_notes_pencil_icon = page.locator("//a[@data-original-title='Edit Note']");
        this._update_note_textArea = page.locator("textarea[name='note']");
        this._note_Update_button = page.locator("button[type='submit']")
        this._note_Delete_icon = page.locator("//a[@data-original-title='Delete Note']");

        // all locators related to Filters
        this.jobs_dropdown = page.getByRole("combobox", { name: "All Jobs" });
        this.automateJob_treeitem = page.getByRole("treeitem").getByText("Automate JOB", { exact: true });
        this.stages_dropdown = page.getByRole("combobox", { name: "All Stages" });
        this.applyFilters_button = page.getByRole("button", { name: " Apply" });
        this.sources_dropdown = page.getByRole("combobox", { name: "All sources" });
        this.direct_treeitem = page.getByRole("treeitem").getByText("Direct", { exact: true });
        this.selectLabels_dropdown = page.locator("input[placeholder='Select Labels']");
        this.all_existing_labels_treeitem = page.getByRole("treeitem");
        this.qualifications_dropdown = page.getByRole("combobox", { name: "All Qualifications", exact: true });
        this.qualified_treeitem = page.getByRole("treeitem").getByText("Qualified", { exact: true });
        this.unqualified_treeitem = page.getByRole("treeitem").getByText("UnQualified", { exact: true });
        this.email_input = page.getByPlaceholder("Email", { exact: true });
        this.searchByNameOrPhone = page.getByPlaceholder("Search by Name or Phone", { exact: true });

        // all locators related to Labels
        this._demoLabelTestingText_tv = applicant_info.a_Random_Note;
        this._labels_color_circle = page.locator('#pic_color div');
        this._label_editable_input = page.locator("div[class='clonable_label'] div");
        this._label_editable_input_ok = page.locator("//div[@class='clonable_label']//i[contains(@class,'fa-check')]");
        this._label_delete_icon = page.locator("//i[@class='text-danger fa fa-trash']");

        // all locators related to Stars
        this._profile_star_select = page.getByRole('link', { name: '' });
        this._profile_star_delete_icon = page.locator('#trash_ico');

        // all locators related to Happyflow System
        this._pass_fail_noshow_buttons = page.locator("//a[contains(@class,'btn-lg')]");
        this._PhoneScreen_Schedule_button = page.getByRole('link', { name: "Schedule (Phone screen)" });

        /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */
        this._applicant_edit_icon = page.locator('a[data-original-title="Edit"]');
        this._success_alert = page.locator('.jq-toast-single.jq-has-icon.jq-icon-success');
        this._warning_alert = page.locator(".jq-toast-single.jq-has-icon.jq-icon-error");

        // all locators related to "External Questionnaire"
        this._heading_externalquestionnaire = page.locator("//h2[contains(@class, 'form-sub-heading')]");
        this._description_externalquestionnaire = page.locator("//h5[contains(@class, 'form-sub-heading')]");

        // all locators related to "Internal Questionnaire (Profile) & (Interview Action)"
        this._description_box_inside_internalquestionnaire_modal = page.locator("//div[contains(@class,'form-sub-heading')]");
        this._heading_inside_internalquestionnaire_modal = page.locator("//h4[contains(@class,'form-sub-heading')]");
        this._profile_start_interview_button = page.locator("//a[normalize-space()='Start Interview']");
        this._internal_questionnaire_interview_action_button = page.locator("a[title='Internal Questionnaire - Interview Action']");
        this._interviewDetails_modal_close_button = page.locator("#scheduleDetailModal").getByRole('button', { name: "Close", exact: true });

        // all locators related to Notes
        this._note_textArea_texts = page.locator("div[id='NotesModal'] div[class='modal-content'] span#note-text");
        this._note_modal_close_icon = page.locator("div[id='NotesModal'] span[aria-hidden='true']");

        // all locators related to Filters
        this.filterResults_attr = page.locator("//a[@id='toggle-filter']");
        this.profileLabels_after_Filters = page.locator("//ul[@class='pfs']//li");

        // all locators related to Labels
        this._profile_label_applicants_modal_labels = page.locator('#label_container div.label');
        this._profile_label_available_labels = page.locator("span[class=lbl_txt]");
        this.prefix_allLabels_visible = "//li[@title='";
        this.suffix_allLabels_visible = "']";

        // all locators related to Request Documents
        this._we_accept_etc_files_text = page.locator("//span[normalize-space()='We accept JPEG, JPG, PNG, DOC, DOCX and PDF files']");
        this._upload_document_submit_button = page.getByRole('button', { name: 'Submit', exact: true });
        this._first_ChooseFile = page.locator("input[name='attachments[0][file]']");
        this._second_ChooseFile = page.locator("input[name='attachments[1][file]']");
        this._changeFile_button = page.locator("button[class='btn-upload ']");
        this._tick_img = page.locator("img[alt='Responsive image']");
        this._documents_modal_popup = page.locator("tr[class='odd']");
        this._all_attachments_div = page.locator("//div[contains(@class,'btn-attachment')]");
        this._documents_delete_icon = page.locator("//a[contains(@class,'delete-document')]");
        this._attachments_download_icon = page.locator("div[id='added-docs'] i[class='fa fa-download']");

        // all locators related to Happyflow System
        this._modalPopup = page.locator("div.sweet-alert.showSweetAlert.visible");
        this._pass_fail_noshow_buttons_tbl = "ul.pfs a";
        this._interviewDetails_modal_popup = page.locator("div[class='modal-content'] a[target$='_blank']");

        /* ======== ALL SELECTORS ======== */
        this._profile_modal_sidebar_ = "div.form-group textarea";
        this._moveStage_dropdown_inside_profile_ = "div#move_stage_dropdown select.form-control";
        this._sweerAlert_modal_popup_ = "div.sweet-alert.showSweetAlert.visible";
        this._interview_change_status_modal_popup_ = "label[for='pass']";
        this._internalQuestionnaire_modal_popup_ = 'img[class="questionnaire-banner"]';
        this._internalQuestionnaire_notes_timeline_texts_ = "//div[contains(@class,'timeline-container')]";
        this._interviewDetails_modal_popup_ = "div[class='modal-content'] a[target$='_blank']";
        this._internalQuestionnaireInterviewAction_button_ = "a[title='Internal Questionnaire - Interview Action']";
        this._add_notes_button_ = "button#add_update_note";
        this._notes_textbox_modal_popup_ = "div[id='NotesModal'] div[class='modal-content']";
        this._update_notes_pencil_icon_ = "//a[@data-original-title='Edit Note']";
        this._update_notes_Update_button_ = "button[type='submit']";
        this._profile_viewNotes_button_ = "#view-notes-btn";
        this._delete_notes_icon_ = "//a[@data-original-title='Delete Note']";
        this._delete_stars_icon_ = "i#trash_ico";
        this._documents_modal_popup_ = "tr[class='odd']";

        // some extra locators
        this._yes_btn = page.getByRole('button', { name: 'Yes', exact: true });
        this._no_btn = page.getByRole('button', { name: 'No', exact: true });
        this._ok_button = page.locator("//button[normalize-space()='Ok']");
        this._interviewChangeStatus_modal_close_button = page.getByRole('button', { name: 'Close' });
        this.all_Checkbox = page.locator("div.portlet-body label[for]");
        this._modalpass = page.getByLabel('Pass');
        this.all_Names = page.locator('body tr [class="show-detail"]');
        this.all_Jobs = page.locator("tbody tr td:nth-child(5)");
        this.all_Stages = page.locator("tbody tr td:nth-child(6)");
        this.all_Sources = page.locator("tbody tr td:nth-child(7)");
        this.all_Qualifications = page.locator("tbody tr td:nth-child(9)");
        this.all_Actions = page.locator("tbody tr td:nth-child(12)");
        this.all_Divs = page.locator("tr[row-id]");
        this._morethanineyearexperience_radio = page.getByRole("radio", { name: "More than 1 Year of Experience", exact: true });
        this._lessthanineyearexperience_radio = page.getByRole("radio", { name: "Less than 1 Year of Experience", exact: true });
        this._profile_rating_stars_ = "br-selected br-current";

        // all suffix & prefix 
        this.prefix_specific_ApplicantName_full_div = "//a[normalize-space()='";
        this.suffix_specific_ApplicantName_full_div = "']/parent::td";

    }

    /* ################################################ */

    // this function will navigate to Applicant's Tableview Page
    async Navigate_to_Tableview_Page() {
        await this.page.goto(this.Tableview_Page_URL, { waitUntil: "networkidle" });
    }

    // this function will navigate to Applicant's Tableview Page and will pick applicant with it's name
    async navigate_and_pick_Applicant(APPLICANT_NAME: string) {
        await this.Navigate_to_Tableview_Page();
        await this.pick_Applicant(APPLICANT_NAME);
    }

    // this function will only PICK APPLICANT (by name)
    async pick_Applicant(APPLICANT_NAME: string) {
        await this.page.getByRole('link', { name: '' + APPLICANT_NAME + '' }).click();
        await this.page.waitForSelector(this._profile_modal_sidebar_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
    }

    // this function will change stage to "any" stage ONLY
    async change_to_any_stage(STAGE_NAME: string) {
        await this.page.waitForSelector(this._moveStage_dropdown_inside_profile_, { state: "visible", strict: true });
        await this._profile_changeStage_dropdown.click();
        await this._profile_changeStage_dropdown.selectOption(STAGE_NAME);
    }

    // this function will click on Schedule Button in Applicant's Profile
    async applicant_schedule_with_prfile_button() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this._profile_schedule_button.click()
        ]);
        const Appointment_URL = newPage.url();
        await newPage.close();
        return { Appointment_URL };
    }

    // this function will pick ONLY first applicant present on page and GET it's name
    async get_first_Applicant_name() {
        const firstApplicant_by_name = (await this._first_applicant.textContent()).trim();
        return { firstApplicant_by_name };
    }

    /* ========== ALL ACTIONS ========== */

    // this function will ATTEMPT to change stage of applicant from ["Are you sure to move applicant's stage to ..."], but does not change
    async cancel_from_areyoursure_modal(STAGE_NAME: string) {
        await this.change_to_any_stage(STAGE_NAME);
        await this.click_no_areyoursure_modal_popup();
    }

    // this function will click on "YES" Button in ["Are you sure to move stage?"] Modal
    async click_yes_areyoursure_modal_popup() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._yes_btn.click();
    }

    // this function will click on "NO" Button in ["Are you sure to move stage?"] Modal
    async click_no_areyoursure_modal_popup() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._no_btn.click();
    }

    // this function will click "YES" Button in ["Would you like to send automated Alerts?"] Modal
    async click_yes_automatedalerts_modal_popup() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._yes_btn.click();
    }

    // this function will click "NO" Button in ["Would you like to send automated Alerts?"] Modal
    async click_no_automatedalerts_modal_popup() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._no_btn.click();
    }

    // this function will click on "YES" Buttons on both ["Are you sure to move stage?"] and ["Would you like to send automated Alerts?"] Modals
    async click_YES() {
        await this.click_yes_areyoursure_modal_popup();
        await this.click_yes_automatedalerts_modal_popup();
    }

    // this function will ATTEMPT to change stage from ["Would you like to send automated Alerts?"], but does not change
    async cancel_from_automatedalerts_modal(STAGE_NAME: string) {
        await this.change_to_any_stage(STAGE_NAME);
        await this.click_yes_areyoursure_modal_popup();
        await this.randomly_select_yes_no_wouldyouliketosendautomated_modal();
        await this.close_interviewchangestatus_modal();
        await this.click_ok_willmovetopreviousstage();
    }

    // this function will wait for ["interview change status"] Modal, and Click on "close" button
    async close_interviewchangestatus_modal() {
        await this.page.waitForSelector(this._interview_change_status_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._interviewChangeStatus_modal_close_button.click();
    }

    //  this function will click random "YES" or "NO" Button from ["Would you like to send automated alerts"] Modal
    async randomly_select_yes_no_wouldyouliketosendautomated_modal() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        const yes_no_buttons = [this._yes_btn, this._no_btn];
        const randomly_selected_button_index = Math.floor(Math.random() * yes_no_buttons.length);
        await yes_no_buttons[randomly_selected_button_index].click();
    }

    // this function will click on "OK" Button in ["Applicant will move to previous stage - alert"]
    async click_ok_willmovetopreviousstage() {
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._ok_button.click();
    }

    async applicant_profile_change_stage_dropdown(stage: any) {
        await this.change_to_any_stage(stage);
        await this.click_YES();
    }

    // this function will help in randomly select PASS, FAIL, NO SHOW or CANCELLED from ["Interview Change Status"] Modal Popup
    async randomly_select_p_f_ns_c_from_interviewchangestatus() {
        await this.page.waitForSelector(this._interview_change_status_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        const all_checkbox_count = await this.all_Checkbox.count();
        const random_checkbox = Math.floor(Math.random() * all_checkbox_count);
        await this.all_Checkbox.nth(random_checkbox).click();
    }

    // this function will click "PASS" on Interview Change Status Modal Popup
    async pass_interviewchangestatus() {
        await this.page.waitForSelector(this._interview_change_status_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._modalpass.check();
    }

    // this function will help clicking RADIOS in EXTERNAL QUESTIONNAIRE QUALIFYING
    async externalQuestionnaire_Qualifying() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._Yes_Q_radio.click();
        await this._20_30_miles_Q.click();
        await this._PCA_checkbox.check();
        await this._IamEnrolled_checkbox.check();
        await this._northernKentucky_radio.click();
        await this._submit_button.click();
    }

    // this function will help clicking RADIOS in EXTERNAL QUESTIONNAIRE UNQUALIFYING
    async externalQuestionnaire_UnQualifying() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._No_radio.click();
        await this._JustDogs_radio.click();
        await this._whatShiftsareYouMostInterested_dropdown.selectOption("Night Shifts");
        await this._validFloridaDriversLicense_dropdown.selectOption("No");
        await this._PCA_checkbox.check();
        await this._IamNewToCaregiving_checkbox.check();
        await this._submit_button.click();
    }

    // this function will help clicking RADIOS in EXTERNAL QUESTIONNAIRE TRIGGERS
    async externalQuestionnaire_Trigger() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._JustCats_Q_radio.click();
        await this._whatShiftsareYouMostInterested_dropdown.selectOption("Night Shifts");
        await this._validFloridaDriversLicense_dropdown.selectOption("Yes");
        await this._IamNewToCaregiving_checkbox.check();
        await this._PCW_checkbox.check();
        await this._columbusOhio_radio.click();
        await this._submit_button.click();
    }

    // purpose of this function is to get 50-50% result in external questionnaire
    async externalQuestionnaire_Q_UQ() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._CNA_Q_radio.click();
        await this._No_radio.click();
        await this._submit_button.click();
    }

    // this function will help in filling all questions of "Internal Questionnaire - (Profile)"
    async fill_internalquestionnaire() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._columbus_radio.check();
        await this._CBRF_checkbox.check();
        await this._FloridaDriversLicense_dropdown.selectOption("Yes");
        await this._availableToWorkOnWeekends_dropdown.selectOption("Yes");
        await this._submit_button.click();
    }

    // this function will help in editing all questions of "Internal Questionnaire Profile"
    async edit_internalquestionnaire() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._cincinnati_radio.check();
        await this._RN_LPN_checkbox.check();
        await this._FloridaDriversLicense_dropdown.selectOption("No");
        await this._availableToWorkOnWeekends_dropdown.selectOption("No");
        await this._submit_button.click();
    }

    // this function will help in Filling all questions of "Internal Questionnaire in Interview Action"
    async fill_internalquestionnaireininterviewaction() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._familyandFriendsOnly_radio.check();
        await this._shiftsareyoumostinterested_dropdown.selectOption("Night Shifts");
        await this._cna_radio.check();
        await this._justCats_radio.check();
        await this._submit_button.click();
    }

    // this function will help in Editing all questions of "Internal Questionnaire in Interview Action"
    async edit_internalquestionnaireininterviewaction() {
        await this.page.waitForLoadState("domcontentloaded");
        await this._NoExperience_radio.check();
        await this._shiftsareyoumostinterested_dropdown.selectOption("Open to any Shifts");
        await this._hha_radio.check();
        await this._justDogs_radio.check();
        await this._submit_button.click();
    }

    // this function will only type text into NOTES
    async add_note(ADD_NOTE: string) {
        await this._profile_note_textarea.fill(ADD_NOTE);
        await this.page.waitForSelector(this._add_notes_button_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._profile_addNote_button.click();
        await this.page.waitForLoadState("load");
    }

    // this function will only update text into NOTES
    async update_note(UPDATE_NOTE: string) {
        await this._profile_viewNotes_button.click();
        await this.page.waitForSelector(this._notes_textbox_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForSelector(this._update_notes_pencil_icon_, { state: "visible", strict: true });
        await this._update_notes_pencil_icon.click();
        await this._update_note_textArea.click();
        await this._update_note_textArea.fill(UPDATE_NOTE);
        await this.page.waitForSelector(this._update_notes_Update_button_, { state: "visible", strict: true });
        await this._note_Update_button.click();
    }

    //this function will only delete text into NOTES
    async delete_note() {
        await this.page.waitForSelector(this._profile_viewNotes_button_, { state: "visible", strict: true });
        await this._profile_viewNotes_button.click();
        await this.page.waitForSelector(this._notes_textbox_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForSelector(this._delete_notes_icon_, { state: "visible", strict: true });
        await this._note_Delete_icon.click();
    }

    // this function will just click on Automated JOB (job title)
    async automatedJOB_and_StageName(STAGE_NAME: string) {
        await this.jobs_dropdown.click();
        await this.automateJob_treeitem.click();
        await this.stages_dropdown.click();
        await this.page.getByRole("treeitem").getByText(STAGE_NAME).click();
        await this.applyfilter();
    }

    // this function will only help in clicking "Apply Filters" Button
    async applyfilter() {
        await this.applyFilters_button.click();
    }

    // this function will just click on "Direct" Sources
    async directSOURCE_click() {
        await this.sources_dropdown.click();
        await this.direct_treeitem.click();
        await this.applyfilter();
    }

    // this function will randomly Select Existing Labels and return their Text Only
    async select_random_existing_label() {
        await this.selectLabels_dropdown.click();
        const random = Math.floor(Math.random() * 5);
        const selected_existingLabel_text = (await this.all_existing_labels_treeitem.nth(random).textContent()).trim();

        await this.all_existing_labels_treeitem.nth(random).click();
        await this.applyfilter();

        return { selected_existingLabel_text }
    }

    // this function will just help in clicking dropdown of Qualifications and Select Qualified (itemtree) from it
    async qualifiedQUALIFICATION_click() {
        await this.qualifications_dropdown.click();
        await this.qualified_treeitem.click();
        await this.applyfilter();
    }

    // this function will just help in clicking dropdown of Qualifications and Select UnQualified (itemtree) from it
    async unqualifiedQUALIFICATION_click() {
        await this.qualifications_dropdown.click();
        await this.unqualified_treeitem.click();
        await this.applyfilter();
    }

    // this function will click on Email (input Box) and type Given Email into it
    async emailFilter(email: string) {
        await this.email_input.click();
        await this.email_input.fill(email);
        await this.applyfilter();
    }

    // this function will click on "Search by name or phone" and type Given Name into it
    async searchbynameorphone(applicant: string) {
        await this.searchByNameOrPhone.click();
        await this.searchByNameOrPhone.fill(applicant);
        await this.page.keyboard.press("Enter");
    }

    // this function will randomly pick any label color, and type some text into it
    async randomly_selected_label_color_and_type_text() {
        await this._profile_AddLabel_button.click();
        await this.page.waitForLoadState("domcontentloaded");
        const allLabelsColours_count = await this._labels_color_circle.count();
        const random = Math.floor(Math.random() * allLabelsColours_count);
        await this._labels_color_circle.nth(random).click();
        await this._label_editable_input.fill(this._demoLabelTestingText_tv);
        await this._label_editable_input.hover();
        await this._label_editable_input_ok.click();
        const _demoLabelTestingText_tv = this._demoLabelTestingText_tv;
        await this.waitFor_all_ingoing_processes();
        return { _demoLabelTestingText_tv };
    }

    // this function will peform action on OUR EXPECTED LABEL, and deactivate it
    async applicant_label_activate_deactivate(DEMO_LABEL_TEXT_tv: string) {
        await this._profile_AddLabel_button.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this._profile_label_available_labels.getByText(DEMO_LABEL_TEXT_tv).click();
        await this.waitFor_all_ingoing_processes();
    }

    // this function will use to DELETE our expected LABEL
    async applicant_label_deletion(DEMO_LABEL_TEXT_tv: string) {
        await this._profile_AddLabel_button.click();
        await this.page.waitForLoadState("domcontentloaded");
        const allAvailableLabels_count = await this._profile_label_available_labels.count();
        for (let i = 0; i < allAvailableLabels_count; i++) {
            if (await this._profile_label_available_labels.nth(i).textContent() === DEMO_LABEL_TEXT_tv) {
                await this._label_delete_icon.nth(i).click();
                await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
                await this.page.waitForLoadState("domcontentloaded");
                await this._deleteConfirm_button.click();
                await this.waitFor_all_ingoing_processes();
                return;
            }
        }
    }

    // this function will return only value that further uses in loop through
    async getRange_Labels() {
        const allExistingLabels: any[] = await this._profile_label_available_labels.allInnerTexts();
        const toBeSelectedLabels: any[] = allExistingLabels.slice(0, 5);
        const range = (Math.floor(Math.random() * toBeSelectedLabels.length)) + 1;
        return { range };
    }

    // this function will be given RANGE and will return all multiple (random) Labels in ARRAY
    async getUniqueRandom_Labels(RANGE: number) {
        const allExistingLabels: any[] = await this._profile_label_available_labels.allInnerTexts();
        const toBeSelectedLabels: any[] = allExistingLabels.slice(0, 5);

        let uniqueMultipleLabels: any[] = [];
        const allUniqueMultipleLabels = new Set();

        while (allUniqueMultipleLabels.size < RANGE) {
            const randomIndex = Math.floor(Math.random() * toBeSelectedLabels.length);
            allUniqueMultipleLabels.add(toBeSelectedLabels[randomIndex]);
        }
        uniqueMultipleLabels = Array.from(allUniqueMultipleLabels);
        return { uniqueMultipleLabels };
    }

    // this function will click on all Labels returned from above function
    async click_multiple_random_labels(MULTIPLE_LABELS: any[]) {
        await this._profile_AddLabel_button.click();
        for (const element of MULTIPLE_LABELS) {
            await this._profile_AddLabel_button.click();
            await this._profile_label_available_labels.getByText(element).click();
            await this.waitFor_all_ingoing_processes();
        }
    }

    // this function will add random (number of) stars on applicant
    async add_stars_on_applicant() {
        const allStars_count = await this._profile_all_stars.count();
        const randomlySelect_Star = Math.floor(Math.random() * allStars_count);
        await this._profile_star_select.nth(randomlySelect_Star).click();
        await this.waitFor_all_ingoing_processes();
        return { randomlySelect_Star };
    }

    // this function will delete stars (ratings)
    async delete_stars_on_applicant() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(this._delete_stars_icon_);
        await this._profile_star_delete_icon.click();
        await this.page.waitForLoadState("load");
    }

    // this function will delete all attachments (documents) inside Documents Modal Popup
    async documents_delete() {
        await this._documents_delete_icon.nth(0).click();
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._deleteConfirm_button.click();
    }

    // this function will get Phone Screen (stage) url - button inside mail
    async get_PhoneScreen_scheduling_url() {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            this._PhoneScreen_Schedule_button.click()
        ]);
        const SCHEDULE_URL = newTab.url();
        await newTab.close();
        return { SCHEDULE_URL };
    }

    // this function will click random "pass", "fail", "no show" button inside applicant's profile
    async random_pass_fail_noshow_action() {
        const pass_fail_noshow_buttons_count = await this._pass_fail_noshow_buttons.count();
        const randomlySelected_button = Math.floor(Math.random() * pass_fail_noshow_buttons_count);
        await this._pass_fail_noshow_buttons.nth(randomlySelected_button).click();
        await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
        await this._yes_btn.click();
        await this.click_yes_automatedalerts_modal_popup();
        await this.waitFor_all_ingoing_processes();
    }

    // this function will help in randomly select PASS, FAIL, NO SHOW or CANCELLED from ["Interview Details"] Modal Popup
    async randomly_select_p_f_ns_c_from_interviewdetailsModal() {
        const allCheckbox_count = (await this.all_Checkbox.count()) - 1;
        const random_checkbox = Math.floor(Math.random() * allCheckbox_count);
        await this.all_Checkbox.nth(random_checkbox).click();
        await this.waitFor_all_ingoing_processes();
    }

    /* ================================================ */

    // this function will have only Selectors to wait for (after) notes timeline texts
    async waitForSelector_notes_timeline_texts() {
        await this.page.waitForSelector(this._internalQuestionnaire_notes_timeline_texts_, { state: "visible", strict: true });
        await this.page.waitForLoadState("domcontentloaded");
    }

    // this function will wait for every ingoing process
    async waitFor_all_ingoing_processes() {
        await Promise.all([
            this.page.waitForEvent("requestfinished"),
            this.page.waitForEvent("response")
        ])
    }

}
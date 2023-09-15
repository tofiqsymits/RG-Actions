import { Page } from "@playwright/test";
import { applicant_info } from "../utils/applicant_info";

export class ApplicantPageWorkflowView {
  readonly page: Page;

  /* ======== ALL GLOBAL URLS ======== */
  private Workflowview_Page_URL: string;

  /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
  private _deleteConfirm_button: any;

  /* ======== ALL GLOBAL LOCATORS ======== */
  _first_applicant: any;

  // all locators related to Applicant's Profile
  _profile_applicant_email: any;
  _profile_AddLabel_button: any;
  _profile_schedule_button: any;
  _profile_applicants_modal_close: any;
  _profile_InternalQuestionnaire_fill_button: any;
  _profile_InternalQuestionnaire_edit_button: any;
  _profile_timeline_all_texts: any;
  _profile_documentsAddEdit_button: any;

  /* ======== ALL PRIVATE LOCATORS ======== */

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

  // all locators related to Filters
  private applyFilters_button: any;
  private qualifications_dropdown: any;
  private qualified_treeitem: any;
  private unqualified_treeitem: any;
  private sources_dropdown: any;
  private direct_treeitem: any;
  private selectLabels_dropdown: any;
  private all_existing_labels_treeitem: any;
  private email_input: any;
  private searchByNameOrPhone: any;

  // all locators related to Labels
  private _demoLabelTestingText_wv: string;
  private _labels_color_circle: any;
  private _label_editable_input: any;
  private _label_editable_input_ok: any;
  private _label_delete_icon: any;

  // all locators related to "External Questionnaire"
  private _mail_link: any;

  /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */
  _thankYouSubmission: any;
  _warning_alert: any;
  _success_alert: any;

  // all locators related to Filters
  filterResults_attr: any;
  profileLabels_after_Filters: any;

  // all locators related to "External Questionnaire"
  _heading_externalquestionnaire: any;
  _description_externalquestionnaire: any;

  // all locators related to Labels
  _profile_label_applicants_modal_labels: any;
  _profile_label_available_labels: any;
  prefix_allLabels_visible: string;
  suffix_allLabels_visible: string;

  // all locators related to "Internal Questionnaire (Profile) & (Interview Action)"
  _description_box_inside_internalquestionnaire_modal: any;
  _heading_inside_internalquestionnaire_modal: any;
  _profile_start_interview_button: any;
  _internal_questionnaire_interview_action_button: any;
  _interviewDetails_modal_close_button: any;

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

  /* ======== ALL SELECTORS ======== */
  _sweerAlert_modal_popup_: string;
  _interview_change_status_modal_popup_: string;
  _profile_modal_sidebar_: string;
  _internalQuestionnaire_notes_timeline_texts_: string;
  _internalQuestionnaire_modal_popup_: string;
  _interviewDetails_modal_popup_: string;
  _internalQuestionnaireInterviewAction_button_: string;
  _documents_modal_popup_: string;

  // some extra locators
  private _yes_btn: any;
  private _no_btn: any;
  private _yes_no_button: any
  private _ok_button: any;
  private _interviewChangeStatus_modal_close_button: any;
  private all_Checkbox: any;
  private _modalpass: any;
  all_Qualifications: any;
  all_Sources_Direct: any;
  all_Names: any

  // all suffix & prefix 
  prefix_specific_ApplicantName_full_div: string;
  suffix_specific_ApplicantName_full_div: string;
  prefix_specific_destination_StageName_full_div: string;
  suffix_specific_destination_StageName_full_div: string;
  prefix_specific_ApplicantName_specific_StageName: string;
  suffix_specific_ApplicantName_specific_StageName: string;

  constructor(page: Page) {
    this.page = page

    /* ======== ALL GLOBAL URLS ======== */
    this.Workflowview_Page_URL = "admin/job-applications#mail-setting";

    /* ======== ALL GLOBAL PRIVATE LOCATORS ======== */
    this._deleteConfirm_button = page.getByRole("button", { name: "Delete", exact: true });

    /* ======== ALL GLOBAL LOCATORS ======== */
    this._first_applicant = page.locator("h5[class='text-bold mb-1']>>nth=0");

    // all locators related to Applicant's Profile
    this._profile_applicant_email = page.locator("#applicant-email");
    this._profile_AddLabel_button = page.locator('#addLabels');
    this._profile_schedule_button = page.locator('#schedule-btn');
    this._profile_applicants_modal_close = page.locator("//i[@class='fa fa-close']");
    this._profile_InternalQuestionnaire_fill_button = page.getByRole('link', { name: "Fill", exact: true });
    this._profile_InternalQuestionnaire_edit_button = page.getByRole('link', { name: "Edit", exact: true });
    this._profile_timeline_all_texts = page.locator('p.text-muted.fw-500.pb-1');
    this._profile_documentsAddEdit_button = page.locator("#add-doc-btn");

    /* ======== ALL PRIVATE LOCATORS ======== */

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

    // all locators related to Filters
    this.applyFilters_button = page.getByRole("button", { name: " Apply" });
    this.qualifications_dropdown = page.getByRole("combobox", { name: "All Qualifications", exact: true });
    this.qualified_treeitem = page.getByRole("treeitem").getByText("Qualified", { exact: true });
    this.unqualified_treeitem = page.getByRole("treeitem").getByText("UnQualified", { exact: true });
    this.sources_dropdown = page.getByRole("combobox", { name: "All sources" });
    this.direct_treeitem = page.getByRole("treeitem").getByText("Direct", { exact: true });
    this.selectLabels_dropdown = page.locator("input[placeholder='Select Labels']");
    this.all_existing_labels_treeitem = page.getByRole("treeitem");
    this.email_input = page.getByPlaceholder("Email", { exact: true });
    this.searchByNameOrPhone = page.getByPlaceholder("Search", { exact: true });

    // all locators related to Labels
    this._demoLabelTestingText_wv = applicant_info.a_Random_Note;
    this._labels_color_circle = page.locator('#pic_color div');
    this._label_editable_input = page.locator("div[class='clonable_label'] div");
    this._label_editable_input_ok = page.locator("//div[@class='clonable_label']//i[contains(@class,'fa-check')]");
    this._label_delete_icon = page.locator("//i[@class='text-danger fa fa-trash']");

    // all locators related to "External Questionnaire"
    this._mail_link = page.frameLocator("#html_msg_body");

    /* ======== ALL LOCATORS RELATED TO ASSERTIONS ======== */
    this._thankYouSubmission = page.locator("//h2[normalize-space()='Thank you for your submission']");
    this._warning_alert = page.locator(".jq-toast-single.jq-has-icon.jq-icon-error");
    this._success_alert = page.locator('.jq-toast-single.jq-has-icon.jq-icon-success');

    // all locators related to Filters
    this.filterResults_attr = page.locator("//a[@id='toggle-filter']");
    this.profileLabels_after_Filters = page.locator("//div[@title]");

    // all locators related to "External Questionnaire"
    this._heading_externalquestionnaire = page.locator("//h2[contains(@class, 'form-sub-heading')]");
    this._description_externalquestionnaire = page.locator("//h5[contains(@class, 'form-sub-heading')]");

    // all locators related to Labels
    this._profile_label_applicants_modal_labels = page.locator('#label_container div.label');
    this._profile_label_available_labels = page.locator("span[class=lbl_txt]");
    this.prefix_allLabels_visible = `//div[@title='`;
    this.suffix_allLabels_visible = `']`;

    // all locators related to "Internal Questionnaire (Profile) & (Interview Action)"
    this._description_box_inside_internalquestionnaire_modal = page.locator("//div[contains(@class,'form-sub-heading')]");
    this._heading_inside_internalquestionnaire_modal = page.locator("//h4[contains(@class,'form-sub-heading')]");
    this._profile_start_interview_button = page.locator("//a[normalize-space()='Start Interview']");
    this._internal_questionnaire_interview_action_button = page.locator("a[title='Internal Questionnaire - Interview Action']");
    this._interviewDetails_modal_close_button = page.locator("//button[@class='btn dark btn-outline']");

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

    /* ======== ALL SELECTORS ======== */
    this._sweerAlert_modal_popup_ = "div.sweet-alert.showSweetAlert.visible";
    this._interview_change_status_modal_popup_ = "label[for='pass']";
    this._profile_modal_sidebar_ = "div.form-group textarea";
    this._internalQuestionnaire_notes_timeline_texts_ = "//div[contains(@class,'timeline-container')]";
    this._internalQuestionnaire_modal_popup_ = 'img[class="questionnaire-banner"]';
    this._interviewDetails_modal_popup_ = "div[class='modal-content'] a[target$='_blank']";
    this._internalQuestionnaireInterviewAction_button_ = "a[title='Internal Questionnaire - Interview Action']";
    this._documents_modal_popup_ = "tr[class='odd']";

    // some extra locators
    this._yes_btn = page.getByRole('button', { name: 'Yes', exact: true });
    this._no_btn = page.getByRole('button', { name: 'No', exact: true });
    this._yes_no_button = page.locator("div.sa-button-container").getByRole('button');
    this._ok_button = page.locator("//button[normalize-space()='Ok']");
    this._interviewChangeStatus_modal_close_button = page.getByRole('button', { name: 'Close' });
    this.all_Checkbox = page.locator("div.portlet-body label[for]");
    this._modalpass = page.getByLabel('Pass');
    this.all_Qualifications = page.locator("//p[normalize-space()]");
    this.all_Sources_Direct = page.locator("//span[contains(text(),'Direct')]");
    this.all_Names = page.locator("h5[class='text-bold mb-1']");

    // all suffix & prefix 
    this.prefix_specific_ApplicantName_full_div = "//h5[normalize-space()='";
    this.suffix_specific_ApplicantName_full_div = "']/parent::div";
    this.prefix_specific_destination_StageName_full_div = "//div[contains(@data-stage_name,'";
    this.suffix_specific_destination_StageName_full_div = "')]";
    this.prefix_specific_ApplicantName_specific_StageName = "/ancestor::div[contains(@stage-title,'";
    this.suffix_specific_ApplicantName_specific_StageName = "')]";

  }

  /* ################################################ */

  // this function will navigate to Workflowview Page
  async Navigate_to_Workflowview_Page() {
    await this.page.goto(this.Workflowview_Page_URL, { waitUntil: "networkidle" });
  }

  // this function will navigate to Applicant's Tableview Page and will pick applicant with it's name
  async navigate_and_pick_Applicant(APPLICANT_NAME: string) {
    await this.Navigate_to_Workflowview_Page();
    await this.pick_Applicant(APPLICANT_NAME);
  }

  // this function will only PICK APPLICANT (by name)
  async pick_Applicant(APPLICANT_NAME: string) {
    await this.page.getByRole('heading', { name: '' + APPLICANT_NAME + '' }).click();
    await this.page.waitForSelector(this._profile_modal_sidebar_, { state: "visible", strict: true });
    await this.page.waitForLoadState("domcontentloaded");
  }

  // this function will swap applicant by given name (from it's stage to GIVEN stage)
  async swapApplicant_workflowview_by_name(APPLICANT_NAME: string, DESTINATION: any) {
    const SOURCE_STAGE: any = this.page.locator(this.prefix_specific_ApplicantName_full_div + APPLICANT_NAME + this.suffix_specific_ApplicantName_full_div);
    const DESTINATION_STAGE: any = this.page.locator(this.prefix_specific_destination_StageName_full_div + DESTINATION + this.suffix_specific_destination_StageName_full_div);
    let psBound = await SOURCE_STAGE.boundingBox();
    let wiBound = await DESTINATION_STAGE.boundingBox();

    await this.page.mouse.move(psBound.x, psBound.y);
    await this.page.mouse.down();
    await this.page.mouse.move(wiBound.x, wiBound.y);
    await this.page.mouse.down();
    await this.page.mouse.click(wiBound.x, wiBound.y);
  }

  /* ========== ALL ACTIONS ========== */

  // this function will click on "YES" Buttons on both ["Are you sure to move stage?"] and ["Would you like to send automated Alerts?"] Modals
  async click_YES() {
    await this.click_yes_areyoursure_modal_popup();
    await this.click_yes_automatedalerts_modal_popup();
  }

  // this function will click on "YES" Button in ["Are you sure to move stage?"] Modal
  async click_yes_areyoursure_modal_popup() {
    await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
    await this.page.waitForLoadState("domcontentloaded");
    await this._yes_btn.click();
  }

  // this function will click "YES" Button in ["Would you like to send automated Alerts?"] Modal
  async click_yes_automatedalerts_modal_popup() {
    await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
    await this.page.waitForLoadState("domcontentloaded");
    await this._yes_btn.click();
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

  // this function will click on Email (input Box) and type Given Email into it
  async emailFilter(email: string) {
    await this.email_input.click();
    await this.email_input.fill(email);
    await this.applyfilter();
  }

  // this function will click on "Search by name or phone" and type Given Name into it
  async search_in_workflow_top(applicant: string) {
    await this.searchByNameOrPhone.click();
    await this.searchByNameOrPhone.fill(applicant);
    await this.page.keyboard.press("Enter");
  }

  // this function will only help in clicking "Apply Filters" Button
  async applyfilter() {
    await this.applyFilters_button.click();
  }

  // this function will randomly pick any label color, and type some text into it
  async randomly_selected_label_color_and_type_text() {
    await this._profile_AddLabel_button.click();
    await this.page.waitForLoadState("domcontentloaded");
    const allLabelsColours_count = await this._labels_color_circle.count();
    const random = Math.floor(Math.random() * allLabelsColours_count);
    await this._labels_color_circle.nth(random).click();
    await this._label_editable_input.fill(this._demoLabelTestingText_wv);
    await this._label_editable_input.hover();
    await this._label_editable_input_ok.click();
    const _demoLabelTestingText_wv = this._demoLabelTestingText_wv;
    await this.waitFor_all_ingoing_processes();
    return { _demoLabelTestingText_wv };
  }

  // this function will peform action on OUR EXPECTED LABEL, and deactivate it
  async applicant_label_activate_deactivate(DEMO_LABEL_TEXT_wv: string) {
    await this._profile_AddLabel_button.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this._profile_label_available_labels.getByText(DEMO_LABEL_TEXT_wv).click();
    await this.waitFor_all_ingoing_processes();
  }

  // this function will use to DELETE our expected LABEL
  async applicant_label_deletion(DEMO_LABEL_TEXT_wv: string) {
    await this._profile_AddLabel_button.click();
    await this.page.waitForLoadState("domcontentloaded");
    const allAvailableLabels_count = await this._profile_label_available_labels.count();
    for (let i = 0; i < allAvailableLabels_count; i++) {
      if (await this._profile_label_available_labels.nth(i).textContent() === DEMO_LABEL_TEXT_wv) {
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

  // this function will only return random INDEX number (of given stages) to which stage it will be moved
  async get_random_stage_index([...Stages]: string[]) {
    const randomly_selected_index: number = Math.floor(Math.random() * [...Stages].length);
    return { randomly_selected_index };
  }

  // this function will help in randomly select PASS, FAIL, NO SHOW or CANCELLED from ["Interview Change Status"] Modal Popup
  async randomly_select_p_f_ns_c_from_interviewchangestatus() {
    await this.page.waitForSelector(this._interview_change_status_modal_popup_, { state: "visible", strict: true });
    await this.page.waitForLoadState("domcontentloaded");
    const all_checkbox_count = await this.all_Checkbox.count();
    const random_checkbox = Math.floor(Math.random() * all_checkbox_count);
    await this.all_Checkbox.nth(random_checkbox).click();
  }

  // this function will delete all attachments (documents) inside Documents Modal Popup
  async documents_delete() {
    await this._documents_delete_icon.nth(0).click();
    await this.page.waitForSelector(this._sweerAlert_modal_popup_, { state: "visible", strict: true });
    await this.page.waitForLoadState("domcontentloaded");
    await this._deleteConfirm_button.click();
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
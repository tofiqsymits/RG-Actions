import { Page } from '@playwright/test';

export class NavigationPages {
  page: Page

  url_admin: string;
  _navigation_Dashboard: any;
  _navigation_Applicants: any;
  _navigation_Interview_Calendar: any;
  _navigation_Custom_Events: any;
  _navigation_Holidays: any;
  _navigation_Text_Messages: any;
  _navigation_Reports: any;
  _navigation_JOBS_Dropdown: any;
  _navigation_All_Jobs: any;
  _navigation_Job_Categories: any;
  _navigation_Skills: any;
  _navigation_Locations: any;
  _navigation_Landing_Page: any;
  _navigation_Custom_Questions: any;
  _navigation_Question_Catergories: any;
  _navigation_Questionnaire: any;
  _navigation_JOBS_Templates: any;
  _navigation_EMPLOYEES_Dropdown: any;
  _navigation_Onboard: any;
  _navigation_Roles_and_Permissions: any;
  _navigation_Team: any;
  _navigation_Email_and_Text_Alerts: any;
  _navigation_My_Account: any;
  _navigation_Company: any;
  _navigation_ToDos: any;
  _navigation_Landing_Page_Settings: any;
  _navigation_WORKFLOWS_Dropdown: any;
  _navigation_All_Workflows: any;
  _navigation_WORKFLOWS_Templates: any;
  _navigation_Triggers: any;
  _Elements_dashboard_: any;

  // All Selectors
  _navigation_Question_Catergories_: string;
  _navigation_All_Jobs_: string;

  constructor(page: Page) {
    // All pages redirection locators
    this.page = page;

    this.url_admin = "admin/profile";

    // all LOCATORS that are available in sidebar menu (excluding dropdowns)
    this._navigation_Dashboard = page.locator("//p[normalize-space()='Dashboard']");    //  Dashboard locator
    this._navigation_Applicants = page.locator("//p[normalize-space()='Applicants']")   //  Applicants Locator
    this._navigation_Interview_Calendar = page.locator("//p[normalize-space()='Interview Calendar']")   //  Interview Calendar Locator
    this._navigation_Custom_Events = page.locator("//p[normalize-space()='Custom Events']");    //  Custom Events Locator
    this._navigation_Holidays = page.locator("//p[normalize-space()='Holidays']");    //  Holidays Locator
    this._navigation_Text_Messages = page.locator("//p[normalize-space()='Text Messages']");    //  Text Messages Locator
    this._navigation_Reports = page.locator("//p[normalize-space()='Reports']");    // Reports Locator

    // all LOCATORS that clicks on HEADINGS and OPEN DROPDOWN MENU
    this._navigation_JOBS_Dropdown = page.locator("//p[normalize-space()='Jobs']");   //  this locator will click on JOBS dropdown and open menu
    this._navigation_EMPLOYEES_Dropdown = page.locator("//p[normalize-space()='Employees']");    //  this Locator will click on EMPLOYEES dropdown and open menu
    this._navigation_WORKFLOWS_Dropdown = page.locator("//p[normalize-space()='Workflows']");   //  this locator will click on WORKFLOW dropdown and open menu

    // all LOCATORS that are available in sidebar Dropdown {JOBS} menu
    this._navigation_All_Jobs = page.locator("//p[normalize-space()='All Jobs']");  //  All Jobs Locator
    this._navigation_Job_Categories = page.locator("//p[normalize-space()='Job Categories']");    //  Job Categories Locator
    this._navigation_Skills = page.locator("//p[normalize-space()='Skills']");    //    Skills Locator
    this._navigation_Locations = page.locator("//p[normalize-space()='Locations']");    //    Locations Locator
    this._navigation_Landing_Page = page.locator("//p[normalize-space()='Landing Page']");   //  Landing Page Locator
    this._navigation_Custom_Questions = page.locator("//p[normalize-space()='Custom Questions']");    //    Custom Questions Locator
    this._navigation_Question_Catergories = page.locator("//p[normalize-space()='Question Categories']");   //    Question Categories Locator
    this._navigation_Questionnaire = page.locator("//p[normalize-space()='Questionnaires']");    //    Questionnaire Locator
    this._navigation_JOBS_Templates = page.locator("(//p[contains(text(),'Templates')])[1]");    //    Templates Locator (inside Jobs Dropdown)

    // all LOCATORS that are available in sidebar Dropdown {EMPLOYEES} menu
    this._navigation_Onboard = page.locator("//p[normalize-space()='Onboard']");    //    Onboard Locator
    this._navigation_Roles_and_Permissions = page.locator("//p[normalize-space()='Roles & Permissions']");    //  Roles and Permissions Locator
    this._navigation_Team = page.locator("//p[normalize-space()='Team']");    // Team Locator

    // all LOCATORS that are available in sidebar Dropdown {PREFERENCES} menu
    this._navigation_Email_and_Text_Alerts = page.locator("//p[normalize-space()='Email and Text Alerts']");    //    Email and Alerts Locator
    this._navigation_My_Account = page.locator("//p[normalize-space()='My Account']");    //    My Account Locator
    this._navigation_Company = page.locator("//p[normalize-space()='Company']");    //    Company Locator
    this._navigation_ToDos = page.locator("//p[normalize-space()='ToDos']");    //    ToDos Locator
    this._navigation_Landing_Page_Settings = page.locator("li.nav-item").getByText("Landing Page Settings");   //    Landing Page Settings Locator

    // all LOCATORS that are available in sidebar Dropdown {WORKFLOWS} menu
    this._navigation_All_Workflows = page.locator("//p[normalize-space()='All Workflows']");    //    All Workflows Locator
    this._navigation_WORKFLOWS_Templates = page.locator("(//p[contains(text(),'Templates')])[2]");    //  Templates Locator (inside Workflows Dropdown)
    this._navigation_Triggers = page.locator("//p[normalize-space()='Triggers']");    //    Triggers Locator

    // all ELEMENT's LOCATOR that are available in Respective Pages

    // all Selectors
    this._navigation_Question_Catergories_ = "//p[normalize-space()='Question Categories']";
    this._navigation_All_Jobs_ = "//p[normalize-space()='All Jobs']";
  }

  // all ACTIONS that are available in sidebar menu (excluding dropdowns)
  async navigation_DASHBOARD() {
    await this._navigation_Dashboard.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_APPLICANTS() {
    await this._navigation_Applicants.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_INTERVIEW_CALENDAR() {
    await this._navigation_Interview_Calendar.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_CUSTOM_EVENTS() {
    await this._navigation_Custom_Events.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_HOLIDAYS() {
    await this._navigation_Holidays.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_TEXT_MESSAGES() {
    await this._navigation_Text_Messages.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_REPORTS() {
    await this._navigation_Reports.click();
    await this.page.waitForURL("admin/reports");
  }
  // ABOVE ACTIONS ARE RELATED TO SIDEBAR CLICKS, (excluding DROPDOWNS)


  // all ACTIONS that are available in sidebar Dropdown {JOBS}
  async navigation_ALL_JOBS() {
    await this._navigation_JOBS_Dropdown.click();
    await this.page.waitForSelector(this._navigation_All_Jobs_);
    await this._navigation_All_Jobs.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_JOB_CATEGORIES() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Job_Categories.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_SKILLS() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Skills.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_LOCATIONS() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Locations.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_LANDING_PAGE() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Landing_Page.click();
    const [JobPage] = await Promise.all([
      this.page.waitForEvent("popup")
    ])
    await this.page.waitForLoadState("networkidle");
    const LandingPageURL = JobPage.url();
    return { LandingPageURL };
  }

  async navigation_CUSTOM_QUESTIONS() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Custom_Questions.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_QUESTION_CATEGORIES() {
    await this._navigation_JOBS_Dropdown.click();
    await this.page.waitForSelector(this._navigation_Question_Catergories_);
    await this._navigation_Question_Catergories.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_QUESTIONNAIRE() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_Questionnaire.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_JOBS_TEMPLATES() {
    await this._navigation_JOBS_Dropdown.click();
    await this._navigation_JOBS_Templates.click();
    await this.page.waitForLoadState("networkidle");
  }

  // all ACTIONS that are available in sidebar Dropdown {EMPLOYEES}
  async navigation_ONBOARD() {
    await this._navigation_EMPLOYEES_Dropdown.click();
    await this._navigation_Onboard.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_ROLES_AND_PERMISSIONS() {
    await this._navigation_EMPLOYEES_Dropdown.click();
    await this._navigation_Roles_and_Permissions.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_TEAM() {
    await this._navigation_EMPLOYEES_Dropdown.click();
    await this._navigation_Team.click();
    await this.page.waitForLoadState("networkidle");
  }

  // all ACTIONS that are available in sidebar Dropdown {PREFERENCES}
  async navigation_EMAIL_AND_TEXT_ALERTS() {
    await this._navigation_Email_and_Text_Alerts.click();
    await this.page.waitForLoadState("networkidle");
  }
  async navigation_MY_ACCOUNT() {
    await this._navigation_My_Account.click();
    await this.page.waitForLoadState("networkidle");
  }
  async navigation_COMPANY() {
    await this._navigation_Company.click();
    await this.page.waitForLoadState("networkidle");
  }
  async navigation_TODOS() {
    await this._navigation_ToDos.click();
    await this.page.waitForLoadState("networkidle");
  }
  async navigation_LANDING_PAGE_SETTINGS() {
    await this._navigation_Landing_Page_Settings.click();
    await this.page.waitForLoadState("networkidle");
  }

  // all ACTIONS that are available in sidebar Dropdown {WORKFLOWS}
  async navigation_ALL_WORKFLOWS() {
    await this._navigation_WORKFLOWS_Dropdown.click();
    await this._navigation_All_Workflows.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_WORKFLOWS_TEMPLATES() {
    await this._navigation_WORKFLOWS_Dropdown.click();
    await this._navigation_WORKFLOWS_Templates.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigation_TRIGGERS() {
    await this._navigation_WORKFLOWS_Dropdown.click();
    await this._navigation_Triggers.click();
    await this.page.waitForLoadState("networkidle");
  }

} 
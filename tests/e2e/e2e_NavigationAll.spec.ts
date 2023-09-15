import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { POManager } from "../../Pages/POManager";

// all variables related to URL
let LANDINGPAGEURL: string;

test.describe.configure({ mode: 'parallel' });

// all browser's related variables
let context: BrowserContext;
let page: Page;
let context_private: BrowserContext;
let page_private: Page;

test.beforeAll(async ({ browser: Browser }) => {
    context = await Browser.newContext();
    page = await context.newPage();
    context_private = await Browser.newContext();
    await context_private.clearCookies();
    page_private = await context_private.newPage();
});

test.beforeEach(async () => {
    const POM = new POManager(page);
    await page.goto(POM._navigationpage.url_admin, { waitUntil: 'networkidle' });
});

test.afterAll(async () => {
    await page.close();
    await context.close();
    await page_private.close();
    await context_private.close();
});

test.describe('Page Redirections Suit', () => {

    test('Dashboard Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_DASHBOARD();
        await expect(page).toHaveURL("admin/dashboard");
        await expect(page).toHaveTitle('ENGYJ Recruit | Dashboard');
    });

    test('Applicant Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_APPLICANTS();
        await expect(page).toHaveURL("admin/job-applications/table-view");
        await expect(page).toHaveTitle('ENGYJ Recruit | Applicants');
    });

    test('Interview calender Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_INTERVIEW_CALENDAR();
        await expect(page).toHaveURL("admin/interview-schedule");
        await expect(page).toHaveTitle('ENGYJ Recruit | Interview Calendar');
    });

    test('Custom Event Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_CUSTOM_EVENTS();
        await expect(page).toHaveURL("admin/custom-event");
        await expect(page).toHaveTitle('ENGYJ Recruit | Custom Events');
    });

    test('Holidays Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_HOLIDAYS();
        await expect(page).toHaveURL("admin/holiday");
        await expect(page).toHaveTitle('ENGYJ Recruit | Holidays');
    });

    test('Text Messages Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_TEXT_MESSAGES();
        await expect(page).toHaveURL("admin/text-messages");
        await expect(page).toHaveTitle('ENGYJ Recruit | Text Messages');
    });

    test('Reports Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_REPORTS();
        await expect(page).toHaveTitle('ENGYJ Recruit | Reports');
    });

    // ABOVE TEST CASES ARE RELATED TO SIDEBAR CLICKS, (excluding DROPDOWNS)
    //----------------------------------- ENDS ------------------------------------------


    // BELOW TEST CASES ARE RELATED TO SIDEBAR {JOBS} DROPDOWN
    test('All Jobs Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_ALL_JOBS();
        await expect(page).toHaveURL("admin/jobs");
        await expect(page).toHaveTitle('ENGYJ Recruit | Jobs');
    });

    test('Job Categories Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_JOB_CATEGORIES();
        await expect(page).toHaveURL("admin/job-categories");
        await expect(page).toHaveTitle('ENGYJ Recruit | Job Categories');
    });

    test('Job Skills Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_SKILLS();
        await expect(page).toHaveURL("admin/skills");
        await expect(page).toHaveTitle('ENGYJ Recruit | Skills');
    });

    test('Job Location Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_LOCATIONS();
        await expect(page).toHaveURL("admin/locations");
        await expect(page).toHaveTitle('ENGYJ Recruit | Locations');
    });

    test('Job Custom Questions Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_CUSTOM_QUESTIONS();
        await expect(page).toHaveURL("admin/questions");
        await expect(page).toHaveTitle('ENGYJ Recruit | Custom Questions');
    });

    test('Job Question Categories Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_QUESTION_CATEGORIES();
        await expect(page).toHaveURL("admin/question-categories");
        await expect(page).toHaveTitle('ENGYJ Recruit | Question Categories');
    });

    test('Job Questionnaire Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_QUESTIONNAIRE();
        await expect(page).toHaveURL("admin/questionnaire");
        await expect(page).toHaveTitle('ENGYJ Recruit | Questionnaires');
    });

    test('Job Templates Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_JOBS_TEMPLATES();
        await expect(page).toHaveURL("admin/job-templates");
        await expect(page).toHaveTitle('ENGYJ Recruit | Job Templates');
    });

    // ABOVE TEST CASES ARE ONLY RELATED TO {JOBS} (dropdown menu)
    //----------------------------------- ENDS ------------------------------------------


    // BELOW TEST CASES ARE RELATED TO SIDEBAR {EMPLOYEES} DROPDOWN
    test('Employees Roles & Permission Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_ROLES_AND_PERMISSIONS();
        await expect(page).toHaveURL("admin/settings/role-permission");
        await expect(page).toHaveTitle('ENGYJ Recruit | Roles & Permissions');
    });

    test('Employees Team Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_TEAM();
        await expect(page).toHaveURL("admin/team");
        await expect(page).toHaveTitle('ENGYJ Recruit | Team');
    });

    // ABOVE TEST CASES ARE ONLY RELATED TO {EMPLOYEES} (dropdown menu)
    //----------------------------------- ENDS ------------------------------------------


    // BELOW TEST CASES ARE RELATED TO SIDEBAR {PREFERENCES} DROPDOWN
    test('Email & Text Allerts Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_EMAIL_AND_TEXT_ALERTS();
        await expect(page).toHaveURL("admin/settings/application-setting");
        await expect(page).toHaveTitle('ENGYJ Recruit | Email and Text Alerts');
    });

    test('My Account Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_MY_ACCOUNT();
        await expect(page).toHaveURL("admin/profile");
        await expect(page).toHaveTitle('ENGYJ Recruit | My Profile');
    });

    test('My Company Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_COMPANY();
        await expect(page).toHaveURL("admin/settings/settings");
        await expect(page).toHaveTitle('ENGYJ Recruit | Company Settings');
    });

    test('ToDos Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_TODOS();
        await expect(page).toHaveURL("admin/todo-items");
        await expect(page).toHaveTitle('ENGYJ Recruit | ToDos');
    });

    test('landing Page Settings Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_LANDING_PAGE_SETTINGS();
        await expect(page).toHaveURL("admin/settings/landing_page");
        await expect(page).toHaveTitle('ENGYJ Recruit | Landing Page Settings');
    });

    test('Job Landing Page Redirection', async () => {
        const POM = new POManager(page);
        LANDINGPAGEURL = (await POM._navigationpage.navigation_LANDING_PAGE()).LandingPageURL;

        await page_private.goto(LANDINGPAGEURL, { waitUntil: "networkidle" });
        await expect(page_private).toHaveTitle("Job Openings");
    });

    // ABOVE TEST CASES ARE ONLY RELATED TO {PREFERENCES} (dropdown menu)
    //----------------------------------- ENDS ------------------------------------------


    // BELOW TEST CASES ARE RELATED TO SIDEBAR {WORKFLOWS} DROPDOWN
    test('All Workflows Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_ALL_WORKFLOWS();
        await expect(page).toHaveURL('admin/workflow/index');
        await expect(page).toHaveTitle("ENGYJ Recruit | Workflows");
    });

    test('Templates Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_WORKFLOWS_TEMPLATES();
        await expect(page).toHaveURL('admin/templates');
    });

    test('Triggers Page Redirection', async () => {
        const POM = new POManager(page);
        await POM._navigationpage.navigation_TRIGGERS();
        await expect(page).toHaveURL("admin/workflow/trigger");
        await expect(page).toHaveTitle('ENGYJ Recruit | Triggers');
    });

});

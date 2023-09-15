import { test, expect, BrowserContext } from '@playwright/test';
let webcontext: BrowserContext;

//npx playwright test .\tests\AccountSetup.spec.js

// let sub_domain = "https://stage.engyj.com/hr/public/admin/";
// let web_url = "https://stage.engyj.com/hr/public/login";

let sub_domain = "https://recruit.engyj.com/admin/";
let web_url = "https://recruit.engyj.com/login";


//Add account credentials
let user_email = '';
let user_password = '';
let admin_name = 'West Orange';

// Admin profile
let companry_name = 'Assisting Hands';
let companry_pohone = 'none';
let Workflow_name = 'Caregiver';

//Add Job
let Location_Name = 'USA';
let Location_Address = 'USA';
let Location_Directions = "";

let Job_name = 'Caregiver';
let Job_Description = '-';
let Job_Requirement = '-';

let Thanks_URL_Page = 'https://engyj.com/thankyouschedule/';

// Workflow url
let workflow_url: '';

// timings
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let start_date = ["08", "00", "AM"];
let end_date = ["05", "00", "PM"];


// for one time login
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(web_url);
    await page.locator("[class$='form-control ']").type(user_email);
    await page.locator("//input[@id='password']").type(user_password);
    await page.locator("#save-form").click();
    await context.storageState({ path: 'state.json' });
    webcontext = await browser.newContext({ storageState: 'state.json' });
    await page.close();
})


test.describe.skip('Account Complete Create', () => {
    test.describe.parallel('Profile / Company /Email and Texts Creation', () => {
        test('Admin profile creation', async () => {
            const page = await webcontext.newPage();
            await page.goto(sub_domain + 'profile');
            await expect(page).toHaveTitle('ENGYJ Recruit | My Profile');
            await page.locator("//input[@name='mobile']").type('Non');
        
            // for uncheck days
            for (let a = 0; a < days.length; a++) {
                await page.locator("//label[normalize-space()='" + days[a] + "']").check();
            }
            //for Monday
            for (let i = 0; i < start_date.length; i++) {
                await page.locator("input[placeholder='Time in (eg: 09:00 AM)'][name='schedule[days][monday][time_in]']").type(start_date[i]);
            }
            for (let x = 0; x < end_date.length; x++) {
                await page.locator("input[placeholder='Time Out (eg: 05:00 PM)'][name='schedule[days][monday][time_out]']").type(end_date[x]);
            }
            // for Tuesday
            for (let c = 0; c < start_date.length; c++) {
                await page.locator("input[placeholder='Time in (eg: 09:00 AM)'][name='schedule[days][tuesday][time_in]']").type(start_date[c]);
            }
            for (let d = 0; d < end_date.length; d++) {
                await page.locator("input[placeholder='Time Out (eg: 05:00 PM)'][name='schedule[days][tuesday][time_out]']").type(end_date[d]);
            }
            // for Wednesday
            for (let e = 0; e < start_date.length; e++) {
                await page.locator("input[placeholder='Time in (eg: 09:00 AM)'][name='schedule[days][wednesday][time_in]']").type(start_date[e]);
            }
            for (let f = 0; f < end_date.length; f++) {
                await page.locator("input[placeholder='Time Out (eg: 05:00 PM)'][name='schedule[days][wednesday][time_out]']").type(end_date[f]);
            }
            // for Thursday
            for (let i = 0; i < start_date.length; i++) {
                await page.locator("input[placeholder='Time in (eg: 09:00 AM)'][name='schedule[days][thursday][time_in]']").type(start_date[i]);
            }
            for (let x = 0; x < end_date.length; x++) {
                await page.locator("input[placeholder='Time Out (eg: 05:00 PM)'][name='schedule[days][thursday][time_out]']").type(end_date[x]);
            }
            // for Friday
            for (let i = 0; i < start_date.length; i++) {
                await page.locator("input[placeholder='Time in (eg: 09:00 AM)'][name='schedule[days][friday][time_in]']").type(start_date[i]);
            }
            for (let x = 0; x < end_date.length; x++) {
                await page.locator("input[placeholder='Time Out (eg: 05:00 PM)'][name='schedule[days][friday][time_out]']").type(end_date[x]);
            }
            await page.locator("#save-form").click();
            await expect(page).toHaveURL('https://recruit.engyj.com/admin/profile');
        })
    
        test('Company Settings', async () => {
            const page = await webcontext.newPage();
            await page.goto(sub_domain + 'settings/settings');
            for (let i = 0; i < start_date.length; i++) {
                await page.locator("#checkin").type(start_date[i]);
            }
            for (let i = 0; i < end_date.length; i++) {
                await page.locator("#checkout").type(end_date[i]);
            }
            await page.locator('#select2-timezone-container').click();
            await page.locator('li[role="treeitem"]:has-text("Pacific Time")').click();
            await page.locator("//button[@id='save-form']").click();
        })
    
        test('Email and Text alerts', async () => {
            const page = await webcontext.newPage();
            page.goto(sub_domain + 'settings/application-setting');
            for (let i = 0; i < 22; i++) {
                await page.locator('.icheckbox_flat-green').nth(i).uncheck();
            }
            for (let b = 0; b < 9; b++) {
                await page.frameLocator('.wysihtml5-sandbox').nth(b).locator('.form-control.wysihtml5.wysihtml5-editor').fill('-');
            }
            const fom = await page.locator("[class='form-control']").count();
            for (let c = 3; c < fom; c++) {
                if (c == 22) {
                    continue;
                }
                await page.locator("[class='form-control']").nth(c).fill('-');
            }
            await page.locator('#thanks_page_url').fill(Thanks_URL_Page);
            await page.locator('#save-form').click();
        })
    })
    
    
    test.describe.serial('Workflow Creation', () => {
    
        test.skip('Create Triggers', async () => {
            const trigger_url = (sub_domain + "workflow/trigger/create");
        
            const page = await webcontext.newPage();
            await page.goto(trigger_url);
            
            // Click text=Create New
            await page.locator('#trigger_name').hover();
            await page.locator('#edit-icon').click();
            await page.locator('[placeholder="Enter Trigger Name Here"]').fill('Qualified');
            await page.locator('#edit-icon').click();
            await page.locator('#add_condition i').click();
            await page.locator('.form-control.col-md-3.d-inline.ml-2.qualification_field').selectOption('Is greater than');
            await page.locator('[placeholder="Condition Value"]').click();
            await page.locator('[placeholder="Condition Value"]').fill('99');
            await page.locator('#save-form').click();
            await expect(page).toHaveURL(trigger_url);
        
            await page.goto(trigger_url);
            await page.locator('#trigger_name').hover();
            await page.locator('#edit-icon').click();
            await page.locator('[placeholder="Enter Trigger Name Here"]').fill('Unqualified');
            await page.locator('#add_condition i').click();
            await page.locator('.form-control.col-md-3.d-inline.ml-2.qualification_field').selectOption('Is less than');
            await page.locator('[placeholder="Condition Value"]').click();
            await page.locator('[placeholder="Condition Value"]').fill('99');
            await page.locator('#save-form').click();
            await expect(page).toHaveURL(trigger_url);
        })
        
        test('Creating a new Workflow', async () => {
            const workflow_url = sub_domain + "workflow/index";
        
            const page = await webcontext.newPage();
            await page.goto(workflow_url, { waitUntil: 'networkidle' });
            await page.locator('text=Create New').click();
            let current_workflow_url = page.url();
            await page.goto(current_workflow_url, { waitUntil: 'networkidle' });
            await expect(page).toHaveTitle('ENGYJ Recruit | Workflows');
            await page.locator('#workfow_title').hover();
            await page.locator('#edit-icon').click();
            await page.locator('#workfow_title').fill('Caregiver');
            await Promise.all([
                page.locator('#edit-icon').click(),
                page.waitForURL(current_workflow_url, { waitUntil: 'networkidle' }),
                expect(page).toHaveURL(current_workflow_url)
            ]);
            await page.waitForResponse("https://recruit.engyj.com/favicon/favico.ico")
            // await page.waitForURL(current_workflow_url, { waitUntil: 'networkidle' });
            await page.locator('a:has-text("Add a new stage")').click();
            await page.locator('text=Name Field is empty >> input[name="stage_name"]').fill('Phone screen');
            await page.locator('text=Name Field is empty Color >> #stageColor3 input[name="stage_color"]').check();
            await Promise.all([
                page.locator("//button[normalize-space()='Submit']").click(),
                page.waitForURL(current_workflow_url, { waitUntil: 'networkidle' }),
                expect(page).toHaveURL(current_workflow_url)
            ]);
            await page.waitForResponse("https://recruit.engyj.com/favicon/favico.ico");
            await page.goto(current_workflow_url, { waitUntil: 'networkidle' });
            await page.locator('a:has-text("Add a new stage")').click();
            await page.locator('text=Name Field is empty >> input[name="stage_name"]').fill('Unqualified');
            await page.locator('text=Name Field is empty Color >> #stageColor7 input[name="stage_color"]').check();
            await Promise.all([
                page.locator("//button[normalize-space()='Submit']").click(),
                page.waitForURL(current_workflow_url, { waitUntil: 'networkidle' }),
                expect(page).toHaveURL(current_workflow_url)
            ]);
            // Add triggers on stage
            //await page.waitForResponse("https://recruit.engyj.com/favicon/favico.ico");
            await page.locator('.card-header').nth(1).click();
            await page.locator('.float-right.text-bold.dropdown-toggle.add-action-btn').nth(1).click();
            await page.locator("div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(4)").click();
            await page.locator("div[class='form-group'] select[name='to_stage']").selectOption({ label: 'Phone Screen' });
            await page.locator('select[name="trigger_id"]').selectOption({ label: 'Qualified' });
            await page.locator('input[name="action"]').click();
            await page.waitForResponse("https://recruit.engyj.com/favicon/favico.ico");
            await page.locator('.card-header').nth(1).click();
            await page.locator('.float-right.text-bold.dropdown-toggle.add-action-btn').nth(1).click();
            await page.locator("div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(4)").click();
            await page.locator("div[class='form-group'] select[name='to_stage']").selectOption({ label: 'Unqualified' });
            await page.locator('select[name="trigger_id"]').selectOption({ label: 'Unqualified' });
            await page.locator('input[name="action"]').click();
            await page.waitForResponse("https://recruit.engyj.com/favicon/favico.ico");
            // Add action (Schedule Appointment)
            await page.goto(current_workflow_url, { waitUntil: 'networkidle' });
            await page.locator('.card-header').nth(2).click();
            await page.locator("i[title='Open'] >> nth=1").click();
            await page.locator('.float-right.text-bold.dropdown-toggle.add-action-btn >> nth=2').click();
            await page.locator("div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(3)").click();
            await page.locator("input[name='session_title']").fill('Phone screen');
            await page.locator('text=Appointment Managers Please select the managers who will receive the appointment >> input[role="textbox"]').click();
            await page.locator('li[role="treeitem"]:has-text("' + admin_name + '")').click();
            await page.locator('text=Auto accept if only one Hiring Manager is available >> ins').click();
            await page.locator('#available_days').selectOption('14');
            await page.locator('#timeslot').selectOption('30');
            await page.locator('#actionModal3 >> text=Insert').click();
        })
        
    })
    
    test.describe.parallel('Creating Job Location & Categories', () => {
        test('Job location', async () => {
            const page = await webcontext.newPage();
            await page.goto(sub_domain + 'locations'); // Job Location
            await page.locator('text=Create New').click();
            await page.waitForURL(sub_domain + 'locations/create');
            await page.locator('#select2-country_id-container').click();
            await page.locator('li[role="treeitem"]:has-text("United States")').click();
            await page.locator('[placeholder="Locations Name"]').fill(Location_Name);
            await page.locator('[placeholder="Locations Address"]').fill(Location_Address);
            await page.locator('textarea[name="location_directions"]').fill(Location_Directions);
            await page.locator('#save-form').click();
            await page.waitForURL(sub_domain + 'locations');
        })
        
        test('Job Categories', async () => {
            const page = await webcontext.newPage();
            await page.goto(sub_domain + 'job-categories/'); // JOb Categories
            await page.locator('text=Create New').click();
            await page.waitForURL(sub_domain + 'job-categories/create');
            await page.locator('[placeholder="Job Categories Name"]').fill('Caregiver');
            await page.locator('#save-form').click();
            await page.waitForURL(sub_domain + 'job-categories');
        })
        
    })
    
    
    test.describe.serial('JOB creation', () => {
        test('Job Creation', async () => {
            const page = await webcontext.newPage();
            // Creating now job
            await page.goto(sub_domain + 'jobs/create');
            await expect(page).toHaveURL(sub_domain + 'jobs/create')
            await page.locator('#select2-category_id-container').click();
            await page.locator('li[role="treeitem"]:has-text("Caregiver")').click();
            await page.locator('input[name="title"]').fill(Job_name);
            await page.frameLocator('text=Job Description Normal text Normal textHeading 1Heading 2Heading 3Black BlackSil >> iframe').locator('text=Enter text ...').fill(Job_Description);
            await page.frameLocator('text=Job Requirement Normal text Normal textHeading 1Heading 2Heading 3Black BlackSil >> iframe').locator('text=Enter text ...').fill(Job_Requirement);
            await page.locator('#workflow').selectOption({ label: Workflow_name });
            await page.locator('.select2-selection__rendered').nth(3).click();
            await page.locator('.select2-results__options').click();
            await page.locator('input[name="end_date"]').click();
            await page.locator("(//i[@class='ti-angle-right'])[2]").dblclick();
            await page.locator('.dtp-btn-ok.btn.btn-success').nth(0).click();
            await page.locator('input[name="eligibility_percentage"]').fill('100');
            await page.locator('text=Set as default for Workflow view').click();
            await page.locator('#save-form').click();
        })      
    })
})
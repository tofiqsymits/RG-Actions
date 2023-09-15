import { test, expect } from '@playwright/test';
import { applicant_info } from "../utils/applicant_info";

test("Making Live an applicant va landing page", async ({ page }) => {
  const url = "https://recruit.engyj.com/job/t-job-82/apply";
  await page.goto(url);
  await page
    .getByPlaceholder("Your First and Last Name")
    .fill(applicant_info.a_Name);
  await page
    .getByPlaceholder("Your Email Address")
    .fill(applicant_info.a_Email);
  await page
    .getByPlaceholder("Your Cell Phone Number")
    .fill(applicant_info.a_Phone);
  await page.locator(".checkbox-inline.d-block").nth(0).click();
  await page.locator(".checkbox-inline.d-block").nth(2).click();
  await page.locator(".checkbox-inline.d-block").nth(4).click();
  await page.getByRole("button", { name: "Submit Application" }).click();
  await console.log(
    "\n\t****APPLICANT CREATED ON LIVE*****\n",
    "URL: " + url + "\n",
    "NAME: " + applicant_info.a_Name + "\n",
    "PHONE: " + applicant_info.a_Phone + "\n",
    "EMAIL: " + applicant_info.a_Email + "\n",
    "STATUS: QUALIFIED"
  );
  await expect(page.locator('.alert.alert-success.my-100')).toBeVisible();
});

test("Making Stage an applicant va landing page", async ({ page }) => {
  const url = "https://stage.engyj.com/job/hca-caregiver-73/apply";
  await page.goto(url);
  await page
    .getByPlaceholder("Your First and Last Name")
    .fill(applicant_info.a_Name);
  await page
    .getByPlaceholder("Your Email Address")
    .fill(applicant_info.a_Email);
  await page
    .getByPlaceholder("Your Cell Phone Number")
    .fill(applicant_info.a_Phone);
  await page.locator(".checkbox-inline.d-block").nth(0).click();
  await page.getByRole("button", { name: "Submit Application" }).click();
  await console.log(
    "\n\t****APPLICANT CREATED ON STAGE*****\n",
    "URL: " + url + "\n",
    "NAME: " + applicant_info.a_Name + "\n",
    "PHONE: " + applicant_info.a_Phone + "\n",
    "EMAIL: " + applicant_info.a_Email + "\n",
    "STATUS: QUALIFIED"
  );
  await expect(page.locator('.alert.alert-success.my-100')).toBeVisible();
});

test.use({
  
})
test.only('sample', async ({ page }) => {
  console.log('applicant_info.a_Name');
})

// @ts-check
const { test, expect } = require('@playwright/test');


// Testing the workflow, starting by logging in and then creating a 
// employee onboarding workflow (enter details, create user login, send email)
// and then checking if we expect the result which is the check marks that it has
// completed.

test('workflow end to end test', async ({ page }) => {
 await page.goto('http://localhost:5173/login');
 await page.waitForTimeout(1500);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test123@aol.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test123');
  await page.getByTestId('login-button').click();
  await expect(page.getByRole("heading", { name: "Custom Workflow Builder*" })).toBeVisible();
  await page.getByRole('button', { name: 'Enter Details' }).click();
  await page.locator('div').filter({ hasText: /^Name:$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Name:$/ }).getByRole('textbox').fill('Markus Chmiel');
  await page.locator('div').filter({ hasText: /^Name:$/ }).getByRole('textbox').press('Tab');
  await page.locator('input[type="email"]').fill('mclife2001@gmail.com');
  await page.locator('div').filter({ hasText: /^Job Role:$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Job Role:$/ }).getByRole('textbox').fill('devops');
  await page.getByRole('button', { name: 'Add "Enter Details" Action' }).click();
  await page.getByRole('button', { name: 'Create User Login' }).click();
  await page.getByRole('button', { name: 'Send Email' }).click();
  await page.getByRole('button', { name: 'Start Custom Workflow' }).click();
  await expect(page.locator("li").filter({ hasText: "✔Enter DetailsDelete" }).locator("span")).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "✔Enter DetailsDelete" }).locator("span")).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "✔Send EmailDelete" }).locator("span")).toBeVisible()
});

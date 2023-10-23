// @ts-check
const { test, expect } = require('@playwright/test');

test('Login', async ({ page }) => {
  await page.goto('http://localhost:4173/login');
  await page.getByPlaceholder('City College Email').click();
  await page.getByPlaceholder('City College Email').fill('test@test.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'LogOut' })).toBeVisible();
});

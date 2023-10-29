// @ts-check
const { test, expect } = require('@playwright/test');

test('Login', async ({ page }) => {
  await page.goto('http://localhost:4173/login');
  await page.getByPlaceholder('Email').fill('test@test.com');
  await page.getByPlaceholder('Password').fill('test123');
  await page.getByRole('button', { name: 'Login' }).click({ force: true});
  await page.waitForURL('http://localhost:4173/');
  await expect(page.getByRole('button', { name: 'LogOut' })).toBeVisible();
});

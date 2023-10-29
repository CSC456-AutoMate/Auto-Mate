import { test, expect } from '@playwright/test';

// Make Sure the user email isn't already in used, if so delete in Firebase

/* End to End Test: Open up web page, automatically gets redirected to sign up page, input user email and password, press sign up,
    gets redirected to login page, input user email and password, press login, login successful and gets redirected to home page.
    Finally, user is able to logout.
*/
test('End to End Test', async ({ page }) => {
  const timeout = 60000;
  await page.setDefaultTimeout(timeout);


  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/signup');
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('junhuihuang@example.com');
  await page.waitForTimeout(3000);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456789');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'SignUp' }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('junhuihuang@example.com');
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456789');
  await page.waitForTimeout(2000);
  await page.getByTestId('login-button').click();
  await page.waitForTimeout(3000);
  await page.getByTestId('logout').click();
});
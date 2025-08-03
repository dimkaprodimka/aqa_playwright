import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = '../playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.openPage()
  await loginPage.userLogin(`${process.env.LOGIN_EMAIL}`, `${process.env.LOGIN_PASSWORD}`)
  await expect(page.getByRole("button", {name: "Add Car"})).toBeVisible()
  await page.context().storageState({ path: authFile });
});

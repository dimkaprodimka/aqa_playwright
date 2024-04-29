import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../user_data';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.openPage()
  await loginPage.userLogin(users.user1.email, users.user1.password)
  await page.waitForURL("/panel/garage")
  await page.context().storageState({ path: authFile });
});
import { test, expect } from '@playwright/test'
import { LoginPage } from "../pages/LoginPage"
import { GaragePage } from '../pages/GaragePage'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Successful login', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
    test('User can successfully login with correct creds', async ({ page }) => {
      const garagePage = new GaragePage(page)
      await expect(garagePage.garagePageHeader).toHaveText("Garage")
    })

    test('User can successfully logout', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.logout()
      await expect(loginPage.signInButton).toBeVisible()
    })
})

test.describe('Negative tests for QAuto user login', () => {
  test.use({ storageState: undefined });
    test('User can not register with wrong Email', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.userLogin('aqa-emmaagmail.com', 'Emma_Pass123')
      await expect(loginPage.invalidEmailMessage).toHaveText("Email is incorrect")
    })

    test('User can not register with wrong Password', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.userLogin('aqa-emmaa@gmail.com', 'Emma_Pass345')
      await expect(loginPage.invalidPasswordMessage).toHaveText("Wrong email or password")
    })

    test('User can not register with empty creds', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.userLogin('', '')
      await expect(loginPage.invalidEmailMessage.nth(0)).toHaveText("Email required")
      await expect(loginPage.invalidEmailMessage.nth(1)).toHaveText("Password required")
    })
})
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator("//button[text()='Sign In']").click()
})

test.describe('Tests for QAuto login and registration', () => {

  test('Login with correct basic auth creds', async ({ page }) => {
    await expect(page).toHaveTitle(/Hillel Qauto/)
  })

  test.skip('New user registartion', async ({ page }) => {
    await page.locator("//button[text()='Registration']").click()
    await page.locator("input#signupName").fill("Kris")
    await page.locator("input#signupLastName").fill("Walker")
    await page.locator("input#signupEmail").fill("krisw@gmail.com")
    await page.locator("input#signupPassword").fill("Kris_Pass123")
    await page.locator("input#signupRepeatPassword").fill("Kris_Pass123")
    await page.locator("//button[text()='Register']").click()
    await expect(page.locator("div.alert.alert-success p"))
    .toHaveText("Registration complete")
  })

  test.skip('New user login', async ({ page }) => {
    await page.locator("input#signinEmail").fill("krisw@gmail.com")
    await page.locator("input#signinPassword").fill("Kris_Pass123")
    await page.locator("//button[text()='Login']").click()
    await expect(page.locator("div.alert.alert-success p"))
    .toHaveText("You have been successfully logged in")
  })

  test('Delete user', async ({ page }) => {
    await page.locator("input#signinEmail").fill("aqa-emmaa@gmail.com")
    await page.locator("input#signinPassword").fill("Emma_Pass123")
    await page.locator("//button[text()='Login']").click()
    await page.locator("button#userNavDropdown").click()
    await page.locator("//a[text()='Settings']").click()
    await page.locator("//button[text()='Remove my account']").click()
    await page.locator("//button[text()='Remove']").click()
    await expect(page.locator("div.alert.alert-success p").nth(1))
    .toHaveText("User account has been removed")
  })
})



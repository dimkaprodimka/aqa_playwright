import { test, expect } from '@playwright/test'
import { users } from '../user_data'
import { RegistrationPage } from '../pages/RegistrationPage'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator("//button[text()='Sign In']").click()
  await page.locator("//button[text()='Registration']").click()
})

test.describe('Tests for QAuto user registration', () => {
  test('User can successfully register with correct creds', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.fillNameField(users.user1.name)
    await register_page.fillLastNameField(users.user1.lastname)
    await register_page.fillEmailField(users.user1.email)
    await register_page.fillPasswordField(users.user1.password)
    await register_page.fillRepeatPasswordField(users.user1.repeat_password)
    await register_page.clickRegisterButton()
    await expect(register_page.elements.registerMessage).toHaveText('Registration complete')
  })

  test('User can not register with empty creds', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.clickNameField()
    await register_page.clickLastNameField()
    await register_page.clickEmailField()
    await register_page.clickPasswordField()
    await register_page.clickRepeatPasswordField()
    await register_page.clickRegisterButton()
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Name required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1)).toHaveText('Last name required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(2)).toHaveText('Email required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(3)).toHaveText('Password required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(4)).toHaveText('Re-enter password required')
  })

  test('User can not register, using special characters in name and lastname', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.fillNameField(users.user2.name)
    await register_page.fillLastNameField(users.user2.lastname)
    await register_page.fillEmailField(users.user2.email)
    await register_page.fillPasswordField(users.user2.password)
    await register_page.fillRepeatPasswordField(users.user2.repeat_password)
    await register_page.clickRegisterButton()
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Name is invalid')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1)).toHaveText('Last name is invalid')
  })

  test('User can not register, using invalid email format', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.fillNameField(users.user3.name)
    await register_page.fillLastNameField(users.user3.lastname)
    await register_page.fillEmailField(users.user3.email)
    await register_page.fillPasswordField(users.user3.password)
    await register_page.fillRepeatPasswordField(users.user3.repeat_password)
    await register_page.clickRegisterButton()
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Email is incorrect')
  })

  test('User can not register with weak password', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.fillNameField(users.user4.name)
    await register_page.fillLastNameField(users.user4.lastname)
    await register_page.fillEmailField(users.user4.email)
    await register_page.fillPasswordField(users.user4.password)
    await register_page.fillRepeatPasswordField(users.user4.repeat_password)
    await register_page.clickRegisterButton()
    await expect(register_page.elements.invalidFeedbackMessage.nth(0))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least \
one integer, one capital, and one small letter')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least \
one integer, one capital, and one small letter')
  })

  test('User can not register with non-matching passwords', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.fillNameField(users.user5.name)
    await register_page.fillLastNameField(users.user5.lastname)
    await register_page.fillEmailField(users.user5.email)
    await register_page.fillPasswordField(users.user5.password)
    await register_page.fillRepeatPasswordField(users.user5.repeat_password)
    await register_page.clickRegisterButton()
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Passwords do not match')
  })
})
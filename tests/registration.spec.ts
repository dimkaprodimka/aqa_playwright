import { test, expect } from '@playwright/test'
import { users } from '../testdata/user_data'
import { RegistrationPage } from '../pages/RegistrationPage'
import { fakerEN } from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('User registration', { tag: ["@smoke", "@regression"] }, () => {
  test('User can successfully register with correct creds', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    const firstName = fakerEN.person.firstName()
    const lastName = fakerEN.person.lastName()
    await register_page.userRegistration(firstName, lastName, 
      `aqa-${firstName}${lastName[0]}@gmail.com`, 
      `${firstName}_Pass123`, `${firstName}_Pass123`)
    await expect(register_page.elements.registerMessage).toHaveText('Registration complete')
  })

  test('User can not register, using special characters in name and lastname', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.userRegistration(users.user2.name, users.user2.lastname, users.user2.email, 
      users.user2.password, users.user2.repeat_password)
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Name is invalid')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1)).toHaveText('Last name is invalid')
  })

  test('User can not register, using invalid email format', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.userRegistration(users.user3.name, users.user3.lastname, users.user3.email, 
      users.user3.password, users.user3.repeat_password)
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Email is incorrect')
  })

  test('User can not register with weak password', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.userRegistration(users.user4.name, users.user4.lastname, users.user4.email, 
      users.user4.password, users.user4.repeat_password)
    await expect(register_page.elements.invalidFeedbackMessage.nth(0))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least \
one integer, one capital, and one small letter')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least \
one integer, one capital, and one small letter')
  })

  test('User can not register with non-matching passwords', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.userRegistration(users.user5.name, users.user5.lastname, users.user5.email, 
      users.user5.password, users.user5.repeat_password)
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Passwords do not match')
  })

  test('User can not register with empty creds', async ({ page }) => {
    const register_page = new RegistrationPage(page)
    await register_page.userRegistration(users.user6.name, users.user6.lastname, users.user6.email, 
      users.user6.password, users.user6.repeat_password)
    await expect(register_page.elements.invalidFeedbackMessage.nth(0)).toHaveText('Name required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(1)).toHaveText('Last name required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(2)).toHaveText('Email required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(3)).toHaveText('Password required')
    await expect(register_page.elements.invalidFeedbackMessage.nth(4)).toHaveText('Re-enter password required')
  })
})

import { Page, Locator } from "@playwright/test"

export class RegistrationPage {

    readonly page: Page
    readonly nameField: Locator
    readonly lastNameField: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly repeatPasswordField: Locator
    readonly registerButton: Locator
    readonly registerMessage: Locator
    readonly invalidFeedbackMessage: Locator

    constructor(page: Page) {
    this.page = page
    this.nameField = page.locator("input#signupName")
    this.lastNameField = page.locator("input#signupLastName")
    this.emailField = page.locator("input#signupEmail")
    this.passwordField = page.locator("input#signupPassword")
    this.repeatPasswordField = page.locator("input#signupRepeatPassword")
    this.registerButton = page.locator("//button[text()='Register']")
    this.registerMessage = page.locator("div.alert.alert-success p")
    this.invalidFeedbackMessage = page.locator("div.invalid-feedback")
    }

    async fillNameField(name) {
        await this.nameField.fill(name)
    }

    async clickNameField() {
        await this.nameField.click()
    }

    async fillLastNameField(lastname) {
        await this.lastNameField.fill(lastname)
    }

    async clickLastNameField() {
        await this.lastNameField.click()
    }

    async fillEmailField(email) {
        await this.emailField.fill(email)
    }

    async clickEmailField() {
        await this.emailField.click()
    }

    async fillPasswordField(password) {
        await this.passwordField.fill(password)
    }

    async clickPasswordField() {
        await this.passwordField.click()
    }

    async fillRepeatPasswordField(repeat_password) {
        await this.repeatPasswordField.fill(repeat_password)
    }

    async clickRepeatPasswordField() {
        await this.repeatPasswordField.click()
    }

    async clickRegisterButton() {
        await this.registerButton.click({force: true})
    }
}

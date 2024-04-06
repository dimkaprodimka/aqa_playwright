import { Page, Locator } from "@playwright/test"

export class RegistrationPage {

    readonly page: Page
    elements: Record<string, Locator>

    constructor(page: Page) {
    this.page = page
    this.elements = {
        nameField: page.locator("input#signupName"),
        lastNameField: page.locator("input#signupLastName"),
        emailField: page.locator("input#signupEmail"),
        passwordField: page.locator("input#signupPassword"),
        repeatPasswordField: page.locator("input#signupRepeatPassword"),
        registerButton: page.locator("//button[text()='Register']"),
        registerMessage: page.locator("div.alert.alert-success p"),
        invalidFeedbackMessage: page.locator("div.invalid-feedback")
    }
    }

    async fillNameField(name) {
        await this.elements.nameField.fill(name)
    }

    async clickNameField() {
        await this.elements.nameField.click()
    }

    async fillLastNameField(lastname) {
        await this.elements.lastNameField.fill(lastname)
    }

    async clickLastNameField() {
        await this.elements.lastNameField.click()
    }

    async fillEmailField(email) {
        await this.elements.emailField.fill(email)
    }

    async clickEmailField() {
        await this.elements.emailField.click()
    }

    async fillPasswordField(password) {
        await this.elements.passwordField.fill(password)
    }

    async clickPasswordField() {
        await this.elements.passwordField.click()
    }

    async fillRepeatPasswordField(repeat_password) {
        await this.elements.repeatPasswordField.fill(repeat_password)
    }

    async clickRepeatPasswordField() {
        await this.elements.repeatPasswordField.click()
    }

    async clickRegisterButton() {
        await this.elements.registerButton.click({force: true})
    }
}

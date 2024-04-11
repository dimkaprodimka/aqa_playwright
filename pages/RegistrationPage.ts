import { Page, Locator } from "@playwright/test"

export class RegistrationPage {

    readonly page: Page
    elements: Record<string, Locator>

    constructor(page: Page) {
    this.page = page
    this.elements = {
        signInButton: page.locator("//button[text()='Sign In']"),
        registrationButton: page.locator("//button[text()='Registration']"),
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

    async userRegistration(name:string, lastname: string, email: string, 
        password: string, repeat_password: string) {
        await this.elements.signInButton.click()
        await this.elements.registrationButton.click()
        await this.elements.nameField.fill(name)
        await this.elements.lastNameField.fill(lastname)
        await this.elements.emailField.fill(email)
        await this.elements.passwordField.fill(password)
        await this.elements.repeatPasswordField.fill(repeat_password)
        await this.elements.registerButton.click({force: true})
    }

}

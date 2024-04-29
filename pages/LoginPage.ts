import { Page, Locator } from "@playwright/test"

export class LoginPage {

    readonly page: Page
    elements: Record<string, Locator>

    constructor(page: Page) {
    this.page = page
    this.elements = {
        signInButton: page.locator("//button[text()='Sign In']"),
        emailField: page.locator('#signinEmail'),
        passwordField: page.locator('#signinPassword'),
        loginButton: page.locator('//button[text()="Login"]')
    }
    }

    async openPage() {
        await this.page.goto("/")
    }

    async userLogin(email: string, password: string) {
        await this.elements.signInButton.click()
        await this.elements.emailField.fill(email)
        await this.elements.passwordField.fill(password)
        await this.elements.loginButton.click()
    }
}
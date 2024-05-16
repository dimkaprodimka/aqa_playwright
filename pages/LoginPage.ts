import { Page, Locator } from "@playwright/test"

export class LoginPage {

    readonly page: Page
    elements: Record<string, Locator>
    invalidEmailMessage: Locator
    invalidPasswordMessage: Locator
    signInButton: Locator

    constructor(page: Page) {
    this.page = page
    this.elements = {
        signInButton: page.locator("//button[text()='Sign In']"),
        emailField: page.locator('#signinEmail'),
        passwordField: page.locator('#signinPassword'),
        loginButton: page.locator('//button[text()="Login"]'),
        navigationButton: page.locator('#userNavDropdown'),
        logoutButton: page.locator('//button[text()="Logout"]')
    }
    this.invalidEmailMessage = page.locator(".invalid-feedback>p")
    this.invalidPasswordMessage = page.locator(".ng-dirty.ng-touched.ng-valid>.alert.alert-danger")
    this.signInButton = page.locator("//button[text()='Sign In']")
    }

    async openPage() {
        await this.page.goto("/")
    }

    async userLogin(email: string, password: string) {
        await this.elements.signInButton.click()
        await this.elements.emailField.fill(email)
        await this.elements.passwordField.fill(password)
        await this.elements.loginButton.click({force:true})
    }

    async logout() {
        await this.elements.navigationButton.click()
        await this.elements.logoutButton.click()
    }
}
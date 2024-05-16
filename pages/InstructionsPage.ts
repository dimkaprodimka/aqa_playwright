import { Page, Locator } from "@playwright/test"

export class InstructionsPage {

    readonly page: Page
    elements: Record<string, Locator>
    instructionTitle: Locator

    constructor(page: Page) {
    this.page = page
    this.elements = {
        brandSelectDropdown: page.locator("#brandSelectDropdown"),
        modelSelectDropdown: page.locator("#modelSelectDropdown"),
        brandOptions: page.locator("#brandSelectDropdown+ul>li"),
        modelOptions: page.locator("#modelSelectDropdown+ul>li"),
        searchButton: page.locator("//button[text()='Search']")
    }
    this.instructionTitle = page.locator("p.instruction-link_description")
}

async openPage() {
    await this.page.goto("/panel/instructions")
}

    async searchInstruction(brand: string, model: string) {
        await this.elements.brandSelectDropdown.click()
        await this.elements.brandOptions.filter({hasText: brand}).click()
        await this.elements.modelSelectDropdown.click()
        await this.elements.modelOptions.filter({hasText: model}).click()
        await this.elements.searchButton.click() 
         
    }
}
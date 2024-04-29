import { Page, Locator } from "@playwright/test"

export class GaragePage {

    readonly page: Page
    elements: Record<string, Locator>
    carName: Locator
    infoMessage: Locator

    constructor(page: Page) {
    this.page = page
    this.elements = {
        addCarButton: page.locator("//button[text()='Add car']"),
        addCarBrandField: page.locator("#addCarBrand"),
        addCarModelField: page.locator("#addCarModel"),
        addCarMileage: page.locator("#addCarMileage"),
        addButton: page.locator("//button[text()='Add']"),
        editCarIcon: page.locator(".icon.icon-edit"),
        saveChangesButton: page.locator("//button[text()='Save']"),
        removeCarButton: page.locator("//button[text()='Remove car']"),
        finalRemoveButton: page.locator("//button[text()='Remove']")
    }
    this.infoMessage = page.locator("div.alert.alert-success p")
    this.carName = page.locator(".car_name.h2")
}

    async openPage() {
        await this.page.goto("/panel/garage")
    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.elements.addCarButton.click()
        await this.elements.addCarBrandField.selectOption(brand)
        await this.elements.addCarModelField.selectOption(model)
        await this.elements.addCarMileage.fill(mileage)
        await this.elements.addButton.click()
    }

    async changeCarDetails(brand: string, model: string, mileage: string) {
        await this.elements.editCarIcon.click()
        await this.elements.addCarBrandField.selectOption(brand)
        await this.elements.addCarModelField.selectOption(model)
        await this.elements.addCarMileage.fill(mileage)
        await this.elements.saveChangesButton.click()
    }

    async deleteCar() {
        await this.elements.editCarIcon.click()
        await this.elements.removeCarButton.click()
        await this.elements.finalRemoveButton.click()
    }
}
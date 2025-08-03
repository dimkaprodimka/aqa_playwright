import { Page, Locator } from "@playwright/test"

export class FuelExpensesPage {

    readonly page: Page
    elements: Record<string, Locator>
    noFuelExpenseMessage: Locator


    constructor(page: Page) {
    this.page = page
    this.elements = {
        //addExpenseButton: page.locator("//button[text()='Add an expense']"),
        //addExpenseButton: page.locator("button:has-text('Add an expense')"),
        //addExpenseButton: page.getByRole('button', {name:'Add an expense' }),
        addExpenseButton: page.getByText('Add an expense'),
        addExpenseMilleage: page.locator("#addExpenseMileage"),
        addExpenseLitters: page.locator("#addExpenseLiters"),
        addExpenseCost: page.locator("#addExpenseTotalCost"),
        addButton: page.locator("//button[text()='Add']"),
        garageLink: page.locator(".header_nav.d-flex.align-items-center>a[routerlink='/panel/garage']"),
        editIcon: page.locator(".btn.btn-edit"),
        saveButton: page.locator("//button[text()='Save']"),
        deleteIcon: page.locator(".icon.icon-delete"),
        removeButton: page.locator("//button[text()='Remove']"),
        tableCell: page.locator("table>tbody>tr>td")
    }
    this.noFuelExpenseMessage = page.locator(".h3.panel-empty_message")
}

    async addExpense(milleage: string, litters: string, cost: string) {
        await this.elements.addExpenseButton.click()
        await this.elements.addExpenseMilleage.click()
        await this.elements.addExpenseMilleage.clear()
        await this.elements.addExpenseMilleage.click()
        await this.elements.addExpenseMilleage.fill(milleage)
        await this.elements.addExpenseLitters.fill(litters)
        await this.elements.addExpenseCost.fill(cost)
        await this.elements.addButton.click()
    }

    async changeExpense(milleage: string, litters: string, cost: string) {
        await this.elements.tableCell.nth(4).hover()
        await this.elements.editIcon.click()
        await this.elements.addExpenseMilleage.clear()
        await this.elements.addExpenseMilleage.click()
        await this.elements.addExpenseMilleage.fill(milleage)
        await this.elements.addExpenseLitters.clear()
        await this.elements.addExpenseLitters.fill(litters)
        await this.elements.addExpenseCost.clear()
        await this.elements.addExpenseCost.fill(cost)
        await this.elements.saveButton.click()
    }

    async deleteExpense() {
        await this.elements.tableCell.nth(4).hover()
        await this.elements.deleteIcon.click()
        await this.elements.removeButton.click()
    }

    async goToGarage() {
        await this.elements.garageLink.click()
    }
}

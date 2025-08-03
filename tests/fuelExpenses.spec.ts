import { FuelExpensesPage } from "../pages/FuelExpensesPage";
import { GaragePage } from "../pages/GaragePage";
import { test, expect } from "../util/garage.fixture"

test.afterEach(async ({ page }) => {
    const fuelExpensePage = new FuelExpensesPage(page)
    await fuelExpensePage.goToGarage()
    const garagePage = new GaragePage(page)
    await garagePage.deleteCar()
})

test.describe('Fuel Expenses tests', () => {
    test.describe.configure({ mode: 'serial' });

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    
    test.use({ storageState: '../playwright/.auth/user.json' });
    test('adding fuel expense is successful', {tag: ['@smoke']}, async ({ addingCar, page }) => {
        await addingCar.goToFuelExpenses()
        const fuelExpensePage = new FuelExpensesPage(page)
        await fuelExpensePage.addExpense('2000', '2000', '2000')
        await expect(fuelExpensePage.elements.tableCell.nth(0)).toHaveText(`${dd}.${mm}.${yyyy}`)
        await expect(fuelExpensePage.elements.tableCell.nth(1)).toHaveText('2000')
        await expect(fuelExpensePage.elements.tableCell.nth(2)).toHaveText('2000L')
        await expect(fuelExpensePage.elements.tableCell.nth(3)).toHaveText('2000.00 USD')
    })

    test('changing fuel expense is successful', async ({ addingCar, page }) => {
        await addingCar.goToFuelExpenses()
        const fuelExpensePage = new FuelExpensesPage(page)
        await fuelExpensePage.addExpense('2000', '2000', '2000')
        await fuelExpensePage.changeExpense('3000', '3000', '3000')
        await expect(fuelExpensePage.elements.tableCell.nth(0)).toHaveText(`${dd}.${mm}.${yyyy}`)
        await expect(fuelExpensePage.elements.tableCell.nth(1)).toHaveText('3000')
        await expect(fuelExpensePage.elements.tableCell.nth(2)).toHaveText('3000L')
        await expect(fuelExpensePage.elements.tableCell.nth(3)).toHaveText('3000.00 USD')
        await fuelExpensePage.goToGarage()
    })

    test('deleting fuel expense is successful', async ({ addingCar, page }) => {
        await addingCar.goToFuelExpenses()
        const fuelExpensePage = new FuelExpensesPage(page)
        await fuelExpensePage.addExpense('2000', '2000', '2000')
        await fuelExpensePage.deleteExpense()
        await expect(fuelExpensePage.noFuelExpenseMessage).toHaveText("You don’t have any fuel expenses filed in")
        await fuelExpensePage.goToGarage()
    })
})

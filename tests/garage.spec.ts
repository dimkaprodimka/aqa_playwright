import { test, expect } from "../util/garage.fixture"
import { cars } from "../cars_data"

test.describe('Garage tests', () => {
    test('adding car is successful', async ({ addingCar, page }) => {
        await expect(addingCar.infoMessage).toHaveText('Car added')
        await expect(addingCar.carName).toHaveText('Porsche 911')
        await addingCar.deleteCar()
    })

    test.skip('changing car details is successful', async ({ addingCar, page }) => {
        await addingCar.changeCarDetails(cars.car2.brand, cars.car2.model, cars.car2.mileage)
        await expect(addingCar.infoMessage.last()).toHaveText('Car updated')
        await expect(addingCar.carName).toHaveText('Audi TT')
        await addingCar.deleteCar()
    })

    test.skip('deleting car is successful', async ({ addingCar, page  }) => {
        await addingCar.deleteCar()
        await expect(addingCar.infoMessage.last()).toHaveText('Car removed')
    })
})


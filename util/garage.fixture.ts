import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';
import { cars } from '../cars_data';

type userGaragePage = {
    addingCar: GaragePage
}

export const test = base.extend<userGaragePage>({
    addingCar: async ({ page }, use) => {
        const addingCar = new GaragePage(page)
        await addingCar.openPage()
        await addingCar.addCar(cars.car1.brand, cars.car1.model, cars.car1.mileage)
        await use(addingCar)
    }
})

export { expect } from '@playwright/test';
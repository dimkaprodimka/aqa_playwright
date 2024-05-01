import { test, expect, request } from '@playwright/test'

test.describe('API tests', () => {
  test('mock response for changed user profile', async ({ page }) => {
      await page.route("/api/users/profile", async (route) => {
      const json = {
        status: 'ok',
        data: {
          userId: 114948,
          photoFilename: 'user-1714565778811.jpg',
          name: 'AnaMaria',
          lastName: 'Rogers',
          dateBirth: '2021-03-17T15:21:05.000Z',
          country: 'US'
        }
      }
      await route.fulfill({ json });
    });
    await page.goto('/panel/profile')
    await expect(page.locator(".profile_name.display-4")).toHaveText("AnaMaria Rogers")
  })

  test('update user profile is successful', async ({ page, request }) => {
    const updatedUserData = await request.put("/api/users/profile", {
      data: {
        "photo": "user-1714565778811.jpg",
        "name": "Jane",
        "lastName": "Thompson",
        "dateBirth": "2024-03-17T15:21:05.000Z",
        "country": "US"
      }
    });
    await page.route('**/*.jpg', route => route.fulfill({ path: 'user_photo.jpg' }));

    expect(updatedUserData.ok()).toBeTruthy();
  
    const respBody = await request.get("/api/users/profile");
    expect(respBody.ok()).toBeTruthy();
    expect(await respBody.json()).toMatchObject({"status": "ok", 
    "data": {"country": "US", "dateBirth": "2024-03-17T15:21:05.000Z", 
    "lastName": "Thompson", "name": "Jane", "photoFilename": "user-1714565778811.jpg", 
    "userId": 114948}});
    await page.goto('/panel/profile')
    await expect(page.locator(".profile_name.display-4")).toHaveText("Jane Thompson")
    expect(await page.screenshot()).toMatchSnapshot()
  });

  test('posting new car is successful', async ({ page, request }) => {
    const postNewCar = await request.post("/api/cars", {
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122
      }
    });
    expect(postNewCar.ok()).toBeTruthy();
  
    const getNewCar = await request.get("/api/cars");
    expect(getNewCar.ok()).toBeTruthy();
    const respBody = await getNewCar.json()
    expect(respBody.data[0].brand).toBe("Audi")
    expect(respBody.data[0].model).toBe("TT")
    expect(respBody.data[0].mileage).toBe(122)
    const carId = respBody.data[0].id
    await page.goto('/panel/garage')
    await expect(page.locator(".car_name.h2")).toHaveText("Audi TT")
    await request.delete(`/api/cars/${carId}`)
  });

  test('posting new car to wrong endpoint shows error', async ({ request }) => {
    const postNewCar = await request.post("/api/my_cars", {
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122
      }
    });
    const respBody = await postNewCar.json()
    expect(await respBody).toMatchObject({
      "status": "error",
      "message": "Not found"
    });
  });

  test('posting new car with wrong brand shows error', async ({ request }) => {
    const postNewCar = await request.post("/api/my_cars", {
      data: {
        "carBrandId": 10,
        "carModelId": 1,
        "mileage": 0
      }
    });
    const respBody = await postNewCar.json()
    expect(await respBody).toMatchObject({
      "status": "error",
      "message": "Not found"
    });
  });
});
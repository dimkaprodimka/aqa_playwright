import { test, expect } from "../util/garage.fixture"
import { InstructionsPage } from "../pages/InstructionsPage";

test.describe('Instructions tests', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('searching for instruction is successful', async ({ page }) => {
        const instructionsPage = new InstructionsPage(page)
        await instructionsPage.openPage()
        await instructionsPage.searchInstruction('BMW', 'X5')
        await page.waitForTimeout(500);
        const titles = await instructionsPage.instructionTitle.allTextContents()
        console.log(titles)
        for (const title of titles) {expect(title).toContain("BMW X5")}
        })
    })
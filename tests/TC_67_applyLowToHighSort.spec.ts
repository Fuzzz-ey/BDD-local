import { test, expect } from '@playwright/test';
import { ApplyLowToHighSortPage } from '../pages/applyLowToHighSortPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_67');

test.afterEach(async () => {
    runReport.save();
});

test('TC_67 - Apply Low to High Sort', async ({ page }) => {
    const applyLowToHighSortPage = new ApplyLowToHighSortPage(page);
    let selectedSort = '';

    await test.step('Navigate to the Decathlon PLP URL', async () => {
        await applyLowToHighSortPage.openPlp();
    });

    await test.step('Wait for the initial product load', async () => {
        await applyLowToHighSortPage.waitForProductGrid();
    });

    await test.step('Locate and click the sorting dropdown', async () => {
        await applyLowToHighSortPage.openSortDropdown();
    });

    await test.step("Select the 'Price: Low to High' option", async () => {
        await applyLowToHighSortPage.selectLowToHigh();
    });

    await test.step('Wait for the sorting API request to trigger', async () => {
        await applyLowToHighSortPage.waitForSortToApply();
    });

    await test.step('Wait for the UI loading spinner to detach', async () => {
        await applyLowToHighSortPage.waitForLoaderToDetach();
    });

    await test.step('Verify the product cards have re-rendered', async () => {
        await expect(applyLowToHighSortPage.getProductCards().first()).toBeVisible();
    });

    await test.step("Extract the dropdown's selected value", async () => {
        selectedSort = await applyLowToHighSortPage.getSelectedSortText();
    });

    await test.step("Assert the selected value is now 'Price: Low to High'", async () => {
        expect(selectedSort).toContain(data.lowToHighLabel);
    });

    await test.step('Capture confirmation screenshot', async () => {
        await captureScreenShot(page, 'TC_67 Low to High Applied');
    });
});

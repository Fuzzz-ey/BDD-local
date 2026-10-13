import { test, expect } from '@playwright/test';
import { FilterPersistencePage } from '../pages/filterPersistencePage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_64 - Filter Persistence', async ({ page }) => {
    const filterPersistencePage = new FilterPersistencePage(page);
    let countText = '';
    let filteredText = '';

    await test.step('Navigate to the target PLP', async () => {
        await filterPersistencePage.openPlp();
        await filterPersistencePage.waitForProductGrid();
    });

    await test.step("Apply a 'Size' filter constraint ('M')", async () => {
        countText = await filterPersistencePage.getResultCountText();
        await filterPersistencePage.expandSizeFilter();
        await filterPersistencePage.selectSize();
    });

    await test.step('Wait for the product list to update', async () => {
        await filterPersistencePage.waitForResultsToRefresh(countText);
        filteredText = await filterPersistencePage.getResultCountText();
    });

    await test.step('Trigger a full page reload using page.reload()', async () => {
        await filterPersistencePage.reloadPage();
    });

    await test.step("Wait for the 'domcontentloaded' event again", async () => {
        await filterPersistencePage.waitForDomContentLoaded();
        await filterPersistencePage.waitForProductGrid();
    });

    await test.step("Locate the 'Size' filter in the sidebar", async () => {
        await expect(filterPersistencePage.getSizeFilter()).toBeVisible();
        await filterPersistencePage.expandSizeFilter();
    });

    await test.step("Assert the 'M' checkbox retains the checked attribute", async () => {
        await expect(filterPersistencePage.getSizeCheckbox()).toBeChecked();
    });

    await test.step('Count the product cards in the DOM', async () => {
        expect(await filterPersistencePage.getProductCards().count()).toBeGreaterThan(0);
    });

    await test.step('Assert the product count reflects the filtered state', async () => {
        await expect(filterPersistencePage.getResultCountLocator()).toHaveText(filteredText);
    });

    await test.step('Capture UI screenshot', async () => {
        await captureScreenShot(page, 'TC_64 Filter After Reload');
    });
});

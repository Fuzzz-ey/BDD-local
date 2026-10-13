import { test, expect } from '@playwright/test';
import { ApplySingleSizeFilterPage } from '../pages/applySingleSizeFilterPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_56 - Apply Single Size Filter', async ({ page }) => {
    const applySingleSizeFilterPage = new ApplySingleSizeFilterPage(page);
    let baselineText = '';
    let baselineCount = 0;
    let filteredCount = 0;

    await test.step('Navigate to a valid Decathlon PLP', async () => {
        await applySingleSizeFilterPage.openPlp();
    });

    await test.step('Wait for initial page elements to stabilize', async () => {
        await applySingleSizeFilterPage.waitForProductGrid();
        baselineText = await applySingleSizeFilterPage.getResultCountText();
        baselineCount = await applySingleSizeFilterPage.getResultCount();
    });

    await test.step("Locate the 'Size' filter accordion in the DOM", async () => {
        await expect(applySingleSizeFilterPage.getSizeAccordion()).toBeVisible();
    });

    await test.step("Click to expand the 'Size' section if collapsed", async () => {
        await applySingleSizeFilterPage.expandSizeFilter();
    });

    await test.step("Locate the checkbox for size 'M'", async () => {
        await expect(applySingleSizeFilterPage.getSizeOption()).toBeVisible();
    });

    await test.step("Click the 'M' size checkbox", async () => {
        await applySingleSizeFilterPage.selectSize();
    });

    await test.step('Wait for the loading spinner to appear and detach', async () => {
        await applySingleSizeFilterPage.waitForResultsToRefresh(baselineText);
    });

    await test.step("Assert product grid updates to show 'M' items", async () => {
        await expect(applySingleSizeFilterPage.getSizeCheckbox()).toBeChecked();
        filteredCount = await applySingleSizeFilterPage.getResultCount();
        expect(filteredCount).toBeGreaterThan(0);
        expect(filteredCount).toBeLessThan(baselineCount);
        await expect(applySingleSizeFilterPage.getProductCards().first()).toBeVisible();
    });

    await test.step('Log the total count of filtered products', async () => {
        logger.info(`TC_56 filtered product count for size M: ${filteredCount}`);
    });

    await test.step('Capture screenshot', async () => {
        await captureScreenShot(page, 'TC_56 Size M Applied');
    });
});

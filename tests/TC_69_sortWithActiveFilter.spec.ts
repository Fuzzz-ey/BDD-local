import { test, expect } from '@playwright/test';
import { SortWithActiveFilterPage } from '../pages/sortWithActiveFilterPage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_69 - Sort with Active Filter', async ({ page }) => {
    const sortWithActiveFilterPage = new SortWithActiveFilterPage(page);
    let countText = '';
    let filteredText = '';
    let prices: number[] = [];

    await test.step('Navigate to the Decathlon PLP', async () => {
        await sortWithActiveFilterPage.openPlp();
        await sortWithActiveFilterPage.waitForProductGrid();
    });

    await test.step("Apply a 'Color' filter (e.g., 'White')", async () => {
        countText = await sortWithActiveFilterPage.getResultCountText();
        await sortWithActiveFilterPage.expandColorFilter();
        await sortWithActiveFilterPage.selectColor();
    });

    await test.step('Wait for the filtering loader to complete', async () => {
        await sortWithActiveFilterPage.waitForResultsToRefresh(countText);
        filteredText = await sortWithActiveFilterPage.getResultCountText();
    });

    await test.step('Open the sorting dropdown menu', async () => {
        await sortWithActiveFilterPage.openSortDropdown();
    });

    await test.step("Select 'Price: Low to High'", async () => {
        await sortWithActiveFilterPage.selectLowToHigh();
    });

    await test.step('Wait for the sorting loader to complete', async () => {
        await sortWithActiveFilterPage.waitForSortToApply();
    });

    await test.step('Extract prices of the first three loaded products', async () => {
        prices = await sortWithActiveFilterPage.getFirstPrices(3);
        logger.info(`TC_69 prices: ${prices.join(', ')}`);
    });

    await test.step('Assert the three prices are in ascending order', async () => {
        expect(prices[0]).toBeLessThanOrEqual(prices[1]);
        expect(prices[1]).toBeLessThanOrEqual(prices[2]);
    });

    await test.step("Assert all three products adhere to the 'White' filter", async () => {
        await expect(sortWithActiveFilterPage.getColorCheckbox()).toBeChecked();
        await expect(sortWithActiveFilterPage.getResultCountLocator()).toHaveText(filteredText);
    });
});

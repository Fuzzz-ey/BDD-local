import { test, expect } from '@playwright/test';
import { ClearAllFiltersPage } from '../pages/clearAllFiltersPage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_62 - Clear All Filters', async ({ page }) => {
    const clearAllFiltersPage = new ClearAllFiltersPage(page);
    let countText = '';
    let baselineCount = 0;
    let filteredText = '';
    let filteredCount = 0;

    await test.step('Navigate to the Decathlon PLP', async () => {
        await clearAllFiltersPage.openPlp();
        await clearAllFiltersPage.waitForProductGrid();
        baselineCount = await clearAllFiltersPage.getResultCount();
    });

    await test.step('Apply multiple filter constraints (Size, Color)', async () => {
        countText = await clearAllFiltersPage.getResultCountText();
        await clearAllFiltersPage.expandSizeFilter();
        await clearAllFiltersPage.selectSize();
        await clearAllFiltersPage.waitForResultsToRefresh(countText);
        countText = await clearAllFiltersPage.getResultCountText();
        await clearAllFiltersPage.expandColorFilter();
        await clearAllFiltersPage.selectColor();
    });

    await test.step('Wait for the product list to filter completely', async () => {
        await clearAllFiltersPage.waitForResultsToRefresh(countText);
    });

    await test.step('Record the filtered total product count', async () => {
        filteredText = await clearAllFiltersPage.getResultCountText();
        filteredCount = await clearAllFiltersPage.getResultCount();
        expect(filteredCount).toBeLessThan(baselineCount);
    });

    await test.step('Scroll to the top of the filter sidebar', async () => {
        await clearAllFiltersPage.scrollToFilterSidebar();
    });

    await test.step("Locate the 'Clear All' UI button", async () => {
        await expect(clearAllFiltersPage.getClearAllButton()).toBeVisible();
    });

    await test.step("Click the 'Clear All' button", async () => {
        await clearAllFiltersPage.clickClearAll();
    });

    await test.step('Wait for the default product grid to reload', async () => {
        await clearAllFiltersPage.waitForResultsToRefresh(filteredText);
    });

    await test.step('Assert all checkboxes are in unchecked state', async () => {
        await expect(clearAllFiltersPage.getCheckedFilters()).toHaveCount(0);
    });

    await test.step('Assert total count reverts to the baseline maximum', async () => {
        expect(await clearAllFiltersPage.getResultCount()).toBeGreaterThanOrEqual(baselineCount);
    });
});

import { test, expect } from '@playwright/test';
import { NoResultsFilterUiPage } from '../pages/noResultsFilterUiPage';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_60');

test.afterEach(async () => {
    runReport.save();
});

test('TC_60 - No Results Filter UI', async ({ page }) => {
    const noResultsFilterUiPage = new NoResultsFilterUiPage(page);
    let baselineText = '';

    await test.step('Navigate to Decathlon PLP', async () => {
        await noResultsFilterUiPage.openPlp();
    });

    await test.step('Wait for the network idle state', async () => {
        await noResultsFilterUiPage.waitForPageLoad();
        baselineText = await noResultsFilterUiPage.getResultCountText();
    });

    await test.step("Expand 'Size' filter and select a restrictive size", async () => {
        await noResultsFilterUiPage.expandSizeFilter();
        await noResultsFilterUiPage.selectSize();
        await noResultsFilterUiPage.waitForResultsToRefresh(baselineText);
    });

    await test.step("Expand 'Color' filter and select a conflicting color", async () => {
        await noResultsFilterUiPage.expandColorFilter();
        await expect(noResultsFilterUiPage.getConflictingColorOption()).toHaveCount(0);
        await noResultsFilterUiPage.applyConflictingFilters();
    });

    await test.step('Wait for the backend API response to resolve', async () => {
        await noResultsFilterUiPage.waitForFilteredPage();
    });

    await test.step('Verify the product grid container is empty', async () => {
        await expect(noResultsFilterUiPage.getProductCards()).toHaveCount(0, { timeout: 15000 });
    });

    await test.step('Assert that 0 product cards exist in the DOM', async () => {
        expect(await noResultsFilterUiPage.getProductCards().count()).toBe(0);
    });

    await test.step('Locate the fallback text alert element on the page', async () => {
        await expect(noResultsFilterUiPage.getCollectionsMessage()).toBeVisible();
    });

    await test.step('Assert the alert text exactly matches "Explore all our collections"', async () => {
        await expect(noResultsFilterUiPage.getCollectionsMessage()).toHaveText(data.expectedMessage);
    });

    await test.step('Capture evidence screenshot', async () => {
        await captureScreenShot(page, 'TC_60 No Results');
    });
});
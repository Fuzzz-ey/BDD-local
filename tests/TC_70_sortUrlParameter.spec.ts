import { test, expect } from '@playwright/test';
import { SortUrlParameterPage } from '../pages/sortUrlParameterPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_70');

test.afterEach(async () => {
    runReport.save();
});

test('TC_70 - Sort URL Parameter', async ({ page }) => {
    const sortUrlParameterPage = new SortUrlParameterPage(page);
    let currentUrl = '';
    let queryString = '';

    await test.step('Navigate to the PLP URL', async () => {
        await sortUrlParameterPage.openPlp();
    });

    await test.step("Wait for 'domcontentloaded'", async () => {
        await sortUrlParameterPage.waitForDomContentLoaded();
        await sortUrlParameterPage.waitForProductGrid();
    });

    await test.step('Open the sorting dropdown element', async () => {
        await sortUrlParameterPage.openSortDropdown();
    });

    await test.step('Click to select a specific sort option', async () => {
        await sortUrlParameterPage.selectLowToHigh();
    });

    await test.step('Wait for the page routing to capture the new state', async () => {
        await sortUrlParameterPage.waitForSortToApply();
        await sortUrlParameterPage.openPlpWithSort();
    });

    await test.step('Invoke page.url() to fetch the updated URL string', async () => {
        currentUrl = sortUrlParameterPage.getCurrentUrl();
    });

    await test.step('Parse the URL string for query parameters', async () => {
        queryString = decodeURIComponent(new URL(currentUrl).search);
        expect(queryString).not.toBe('');
    });

    await test.step('Assert the URL string contains the expected sort key', async () => {
        expect(queryString).toContain('sort=');
        expect(queryString).toContain('price_asc');
        await expect(sortUrlParameterPage.getSortDropdown()).toContainText(data.lowToHighLabel);
    });

    await test.step('Log the final URL for debugging', async () => {
        logger.info(`TC_70 sorted URL: ${currentUrl}`);
    });

    await test.step('Capture screenshot of the sorted UI', async () => {
        await captureScreenShot(page, 'TC_70 Sort URL');
    });
});
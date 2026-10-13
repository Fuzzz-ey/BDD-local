import { test, expect } from '@playwright/test';
import { FilterUrlParameterPage } from '../pages/filterUrlParameterPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_63');

test.afterEach(async () => {
    runReport.save();
});

test('TC_63 - Filter URL Parameter', async ({ page }) => {
    const filterUrlParameterPage = new FilterUrlParameterPage(page);
    let baseUrl = '';
    let urlAfterSize = '';
    let currentUrl = '';

    await test.step('Navigate to the base Decathlon PLP URL', async () => {
        await filterUrlParameterPage.openPlp();
        await filterUrlParameterPage.waitForProductGrid();
    });

    await test.step('Record the initial base URL string', async () => {
        baseUrl = filterUrlParameterPage.getCurrentUrl();
    });

    await test.step("Locate and click an 'XL' Size filter", async () => {
        await filterUrlParameterPage.expandSizeFilter();
        await filterUrlParameterPage.selectSize();
    });

    await test.step('Wait for the page routing event to fire', async () => {
        await filterUrlParameterPage.waitForUrlChange(baseUrl);
        urlAfterSize = filterUrlParameterPage.getCurrentUrl();
    });

    await test.step("Locate and click a 'Grey' Color filter", async () => {
        await filterUrlParameterPage.expandColorFilter();
        await filterUrlParameterPage.selectColor();
    });

    await test.step('Wait for the secondary page routing event', async () => {
        await filterUrlParameterPage.waitForUrlChange(urlAfterSize);
    });

    await test.step('Fetch the current active URL using Playwright page.url()', async () => {
        currentUrl = decodeURIComponent(filterUrlParameterPage.getCurrentUrl());
    });

    await test.step('Assert the URL contains size query parameters', async () => {
        expect(currentUrl).toContain('?');
        expect(currentUrl).toMatch(/size/i);
        expect(currentUrl).toContain(data.size);
    });

    await test.step('Assert the URL contains color query parameters', async () => {
        expect(currentUrl).toMatch(/colou?r/i);
        expect(currentUrl.toLowerCase()).toContain(data.color.toLowerCase());
    });

    await test.step('Log URL state and capture screenshot', async () => {
        logger.info(`TC_63 filtered URL: ${currentUrl}`);
        await captureScreenShot(page, 'TC_63 Filter URL');
    });
});

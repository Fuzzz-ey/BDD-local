import { test, expect } from '@playwright/test';
import { BackNavigationStatePage } from '../pages/backNavigationStatePage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_74');

test.afterEach(async () => {
    runReport.save();
});

test('TC_74 - Back Navigation State', async ({ page }) => {
    const backNavigationStatePage = new BackNavigationStatePage(page);
    let prices: number[] = [];

    await test.step('Navigate to PLP', async () => {
        await backNavigationStatePage.openPlp();
        await backNavigationStatePage.waitForProductGrid();
    });

    await test.step("Apply the 'Price: Low to High' sort parameter", async () => {
        await backNavigationStatePage.openSortDropdown();
        await backNavigationStatePage.selectLowToHigh();
    });

    await test.step('Wait for the product list to process the sort', async () => {
        await backNavigationStatePage.waitForSortToApply();
    });

    await test.step('Click a product card to transition to the PDP', async () => {
        await backNavigationStatePage.clickFirstProductCard();
    });

    await test.step('Wait for the PDP to load entirely', async () => {
        await backNavigationStatePage.waitForPdp();
    });

    await test.step('Trigger page.goBack() to simulate browser back action', async () => {
        await backNavigationStatePage.goBack();
    });

    await test.step('Wait for the PLP to re-render from cache or network', async () => {
        await backNavigationStatePage.waitForProductGrid();
    });

    await test.step('Locate the sorting dropdown element', async () => {
        await expect(backNavigationStatePage.getSortDropdown()).toBeVisible();
    });

    await test.step("Assert the dropdown still displays 'Price: Low to High'", async () => {
        await expect(backNavigationStatePage.getSortDropdown()).toContainText(data.lowToHighLabel);
    });

    await test.step('Assert the product order remains correctly sorted', async () => {
        prices = await backNavigationStatePage.getFirstPrices(3);
        expect(prices[0]).toBeLessThanOrEqual(prices[1]);
        expect(prices[1]).toBeLessThanOrEqual(prices[2]);
    });
});

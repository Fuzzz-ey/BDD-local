import { test, expect } from '@playwright/test';
import { SortOrderAccuracyPage } from '../pages/sortOrderAccuracyPage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_68 - Sort Order Accuracy', async ({ page }) => {
    const sortOrderAccuracyPage = new SortOrderAccuracyPage(page);
    let price1 = 0;
    let price2 = 0;
    let price3 = 0;

    await test.step('Navigate to PLP and wait for page load', async () => {
        await sortOrderAccuracyPage.openPlp();
        await sortOrderAccuracyPage.waitForPageLoad();
    });

    await test.step("Apply the 'Price: Low to High' sort parameter", async () => {
        await sortOrderAccuracyPage.openSortDropdown();
        await sortOrderAccuracyPage.selectLowToHigh();
    });

    await test.step('Wait for the product grid to fully update', async () => {
        await sortOrderAccuracyPage.waitForSortToApply();
    });

    await test.step('Locate the price element of the 1st product card', async () => {
        await expect(sortOrderAccuracyPage.getProductCards().nth(0)).toBeVisible();
    });

    await test.step('Extract and parse the numeric price of the 1st product', async () => {
        price1 = await sortOrderAccuracyPage.getCardPrice(0);
    });

    await test.step('Locate the price element of the 2nd product card', async () => {
        await expect(sortOrderAccuracyPage.getProductCards().nth(1)).toBeVisible();
    });

    await test.step('Extract and parse the numeric price of the 2nd product', async () => {
        price2 = await sortOrderAccuracyPage.getCardPrice(1);
    });

    await test.step('Locate the price element of the 3rd product card', async () => {
        await expect(sortOrderAccuracyPage.getProductCards().nth(2)).toBeVisible();
    });

    await test.step('Extract and parse the numeric price of the 3rd product', async () => {
        price3 = await sortOrderAccuracyPage.getCardPrice(2);
    });

    await test.step('Assert that Price 1 <= Price 2 <= Price 3', async () => {
        logger.info(`TC_68 prices: ${price1}, ${price2}, ${price3}`);
        expect(price1).toBeLessThanOrEqual(price2);
        expect(price2).toBeLessThanOrEqual(price3);
    });
});

import { test, expect } from '@playwright/test';
import { ApplyMultipleFiltersPage } from '../pages/applyMultipleFiltersPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_58 - Apply Multiple Filters', async ({ page }) => {
    const applyMultipleFiltersPage = new ApplyMultipleFiltersPage(page);
    let baselineText = '';
    let afterSizeText = '';
    let afterSizeCount = 0;
    let firstTitle = '';
    let firstPrice = 0;

    await test.step('Navigate to the targeted PLP', async () => {
        await applyMultipleFiltersPage.openPlp();
        await applyMultipleFiltersPage.waitForProductGrid();
        baselineText = await applyMultipleFiltersPage.getResultCountText();
    });

    await test.step("Expand 'Size' section and check 'L'", async () => {
        await applyMultipleFiltersPage.expandSizeFilter();
        await applyMultipleFiltersPage.selectSize();
    });

    await test.step('Wait for the initial DOM refresh cycle', async () => {
        await applyMultipleFiltersPage.waitForResultsToRefresh(baselineText);
        afterSizeText = await applyMultipleFiltersPage.getResultCountText();
        afterSizeCount = await applyMultipleFiltersPage.getResultCount();
    });

    await test.step("Expand 'Color' section and select 'Blue'", async () => {
        await applyMultipleFiltersPage.expandColorFilter();
        await applyMultipleFiltersPage.selectColor();
    });

    await test.step('Wait for the secondary DOM refresh cycle', async () => {
        await applyMultipleFiltersPage.waitForResultsToRefresh(afterSizeText);
    });

    await test.step('Extract attributes from the first loaded product', async () => {
        firstTitle = await applyMultipleFiltersPage.getCardTitleText(0);
        firstPrice = await applyMultipleFiltersPage.getCardPrice(0);
        logger.info(`TC_58 first product: ${firstTitle} | ${firstPrice}`);
    });

    await test.step("Assert the product matches 'L' and 'Blue' criteria", async () => {
        await expect(applyMultipleFiltersPage.getSizeCheckbox()).toBeChecked();
        await expect(applyMultipleFiltersPage.getColorCheckbox()).toBeChecked();
        const finalCount = await applyMultipleFiltersPage.getResultCount();
        expect(finalCount).toBeGreaterThan(0);
        expect(finalCount).toBeLessThan(afterSizeCount);
        expect(firstTitle).not.toBe('');
        expect(firstPrice).toBeGreaterThan(0);
    });

    await test.step('Capture final state screenshot', async () => {
        await captureScreenShot(page, 'TC_58 Size L and Blue Applied');
    });
});

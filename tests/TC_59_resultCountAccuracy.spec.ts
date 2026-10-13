import { test, expect } from '@playwright/test';
import { ResultCountAccuracyPage } from '../pages/resultCountAccuracyPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_59 - Result Count Accuracy', async ({ page }) => {
    const resultCountAccuracyPage = new ResultCountAccuracyPage(page);
    let countText = '';
    let displayedCount = 0;
    let cardCount = 0;

    await test.step('Navigate to the Decathlon PLP', async () => {
        await resultCountAccuracyPage.openPlp();
        await resultCountAccuracyPage.waitForProductGrid();
    });

    await test.step("Apply a 'Size' filter constraint", async () => {
        countText = await resultCountAccuracyPage.getResultCountText();
        await resultCountAccuracyPage.expandSizeFilter();
        await resultCountAccuracyPage.selectSize();
        await resultCountAccuracyPage.waitForResultsToRefresh(countText);
    });

    await test.step("Apply a 'Color' filter constraint", async () => {
        countText = await resultCountAccuracyPage.getResultCountText();
        await resultCountAccuracyPage.expandColorFilter();
        await resultCountAccuracyPage.selectColor();
        await resultCountAccuracyPage.waitForResultsToRefresh(countText);
    });

    await test.step('Locate the result count text element at page top', async () => {
        await expect(resultCountAccuracyPage.getResultCountLocator()).toBeVisible();
    });

    await test.step('Extract the numeric value from the text string', async () => {
        displayedCount = await resultCountAccuracyPage.getResultCount();
        expect(displayedCount).toBeGreaterThan(0);
    });

    await test.step('Count the locator elements for product cards', async () => {
        cardCount = await resultCountAccuracyPage.loadAllProductCards();
    });

    await test.step('Assert extracted number equals the locator count', async () => {
        expect(cardCount).toBe(displayedCount);
    });

    await test.step('Log assertion result and screenshot', async () => {
        logger.info(`TC_59 displayed count ${displayedCount} matches card count ${cardCount}`);
        await captureScreenShot(page, 'TC_59 Result Count');
    });
});

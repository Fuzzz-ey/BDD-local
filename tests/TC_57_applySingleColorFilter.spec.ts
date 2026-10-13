import { test, expect } from '@playwright/test';
import { ApplySingleColorFilterPage } from '../pages/applySingleColorFilterPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_57 - Apply Single Color Filter', async ({ page }) => {
    const applySingleColorFilterPage = new ApplySingleColorFilterPage(page);
    let baselineText = '';
    let baselineCount = 0;

    await test.step('Navigate to the Decathlon PLP', async () => {
        await applySingleColorFilterPage.openPlp();
    });

    await test.step('Wait for all network requests to hit idle state', async () => {
        await applySingleColorFilterPage.waitForPageLoad();
        baselineText = await applySingleColorFilterPage.getResultCountText();
        baselineCount = await applySingleColorFilterPage.getResultCount();
    });

    await test.step("Locate the 'Color' filter accordion on the UI", async () => {
        await expect(applySingleColorFilterPage.getColorAccordion()).toBeVisible();
    });

    await test.step("Click to expand the 'Color' section", async () => {
        await applySingleColorFilterPage.expandColorFilter();
    });

    await test.step("Identify the 'Black' color swatch element", async () => {
        await expect(applySingleColorFilterPage.getColorOption()).toBeVisible();
    });

    await test.step("Click the 'Black' color swatch", async () => {
        await applySingleColorFilterPage.selectColor();
    });

    await test.step('Wait for the asynchronous product grid refresh', async () => {
        await applySingleColorFilterPage.waitForResultsToRefresh(baselineText);
    });

    await test.step('Assert that loaded product images correspond to black', async () => {
        await expect(applySingleColorFilterPage.getColorCheckbox()).toBeChecked();
        const filteredCount = await applySingleColorFilterPage.getResultCount();
        expect(filteredCount).toBeGreaterThan(0);
        expect(filteredCount).toBeLessThan(baselineCount);
        await expect(applySingleColorFilterPage.getFirstCardImage()).toBeVisible();
    });

    await test.step('Capture success screenshot for custom logger', async () => {
        await captureScreenShot(page, 'TC_57 Black Applied');
        logger.info('TC_57 Black colour filter applied successfully');
    });
});

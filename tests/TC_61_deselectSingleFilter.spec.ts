import { test, expect } from '@playwright/test';
import { DeselectSingleFilterPage } from '../pages/deselectSingleFilterPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_61 - Deselect Single Filter', async ({ page }) => {
    const deselectSingleFilterPage = new DeselectSingleFilterPage(page);
    let countText = '';
    let recordedText = '';
    let recordedCount = 0;
    let newCount = 0;

    await test.step('Navigate to PLP and wait for load', async () => {
        await deselectSingleFilterPage.openPlp();
        await deselectSingleFilterPage.waitForProductGrid();
    });

    await test.step("Select a 'Size' filter and wait for UI update", async () => {
        countText = await deselectSingleFilterPage.getResultCountText();
        await deselectSingleFilterPage.expandSizeFilter();
        await deselectSingleFilterPage.selectSize();
        await deselectSingleFilterPage.waitForResultsToRefresh(countText);
    });

    await test.step("Select a 'Color' filter and wait for UI update", async () => {
        countText = await deselectSingleFilterPage.getResultCountText();
        await deselectSingleFilterPage.expandColorFilter();
        await deselectSingleFilterPage.selectColor();
        await deselectSingleFilterPage.waitForResultsToRefresh(countText);
    });

    await test.step('Record the current product result count', async () => {
        recordedText = await deselectSingleFilterPage.getResultCountText();
        recordedCount = await deselectSingleFilterPage.getResultCount();
    });

    await test.step("Locate the applied 'Size' filter checkbox", async () => {
        await expect(deselectSingleFilterPage.getSizeCheckbox()).toBeChecked();
    });

    await test.step('Click the checkbox again to deselect it', async () => {
        await deselectSingleFilterPage.deselectSize();
    });

    await test.step('Wait for the loading spinner to resolve', async () => {
        await deselectSingleFilterPage.waitForResultsToRefresh(recordedText);
    });

    await test.step('Extract the new product result count', async () => {
        newCount = await deselectSingleFilterPage.getResultCount();
    });

    await test.step('Assert the new count is greater than the recorded count', async () => {
        expect(newCount).toBeGreaterThan(recordedCount);
        await expect(deselectSingleFilterPage.getSizeCheckbox()).not.toBeChecked();
        await expect(deselectSingleFilterPage.getColorCheckbox()).toBeChecked();
    });

    await test.step('Capture screenshot of updated state', async () => {
        await captureScreenShot(page, 'TC_61 Size Deselected');
    });
});

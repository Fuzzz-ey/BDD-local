import { test, expect } from '@playwright/test';
import { FilterVisibilityPage } from '../pages/filterVisibilityPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_55 - Filter Visibility', async ({ page }) => {
    const filterVisibilityPage = new FilterVisibilityPage(page);

    await test.step('Navigate to Decathlon PLP URL', async () => {
        await filterVisibilityPage.openPlp();
    });

    await test.step("Wait for 'domcontentloaded' network state", async () => {
        await filterVisibilityPage.waitForDomContentLoaded();
    });

    await test.step('Scroll down to the left-side filter sidebar', async () => {
        await filterVisibilityPage.scrollToFilterSidebar();
    });

    await test.step("Locate the 'Size' filter container", async () => {
        await expect(filterVisibilityPage.getSizeFilter()).toBeAttached();
    });

    await test.step("Assert that the 'Size' filter is visible", async () => {
        await expect(filterVisibilityPage.getSizeFilter()).toBeVisible();
    });

    await test.step("Assert that the 'Color' filter is visible", async () => {
        await expect(filterVisibilityPage.getColorFilter()).toBeVisible();
    });

    await test.step('Capture screenshot', async () => {
        await captureScreenShot(page, 'TC_55 Filter Visibility');
    });
});

import { test, expect } from '@playwright/test';
import { NavigateToPdpPage } from '../pages/navigateToPdpPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_71 - Navigate to PDP', async ({ page }) => {
    const navigateToPdpPage = new NavigateToPdpPage(page);
    let currentUrl = '';

    await test.step('Navigate to the Decathlon PLP', async () => {
        await navigateToPdpPage.openPlp();
    });

    await test.step('Wait for the product cards to render in the DOM', async () => {
        await navigateToPdpPage.waitForProductGrid();
    });

    await test.step('Locate the first available product card wrapper', async () => {
        await expect(navigateToPdpPage.getProductCards().first()).toBeVisible();
    });

    await test.step('Scroll the product card into the browser viewport', async () => {
        await navigateToPdpPage.scrollFirstCardIntoView();
    });

    await test.step("Click on the product card's primary image or title", async () => {
        await navigateToPdpPage.clickFirstProductCard();
    });

    await test.step('Wait for the new document to load completely', async () => {
        await navigateToPdpPage.waitForPdp();
    });

    await test.step('Fetch the current URL string', async () => {
        currentUrl = navigateToPdpPage.getCurrentUrl();
    });

    await test.step('Assert the URL matches a valid PDP structure/regex', async () => {
        expect(currentUrl).toMatch(/\/p\//);
        await expect(navigateToPdpPage.getPdpTitle()).toBeVisible();
    });

    await test.step('Capture screenshot of the loaded PDP', async () => {
        await captureScreenShot(page, 'TC_71 PDP Loaded');
    });
});

import { test, expect } from '@playwright/test';
import { SortOptionsVisibilityPage } from '../pages/sortOptionsVisibilityPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_66');

test.afterEach(async () => {
    runReport.save();
});

test('TC_66 - Sort Options Visibility', async ({ page }) => {
    const sortOptionsVisibilityPage = new SortOptionsVisibilityPage(page);
    let optionTexts: string[] = [];

    await test.step('Navigate to the targeted Decathlon PLP', async () => {
        await sortOptionsVisibilityPage.openPlp();
    });

    await test.step('Wait for network connections to idle', async () => {
        await sortOptionsVisibilityPage.waitForPageLoad();
    });

    await test.step('Locate the sorting dropdown container', async () => {
        await expect(sortOptionsVisibilityPage.getSortDropdown()).toBeVisible();
    });

    await test.step('Click the dropdown to expand all options', async () => {
        await sortOptionsVisibilityPage.openSortDropdown();
    });

    await test.step('Fetch all option locators within the select element', async () => {
        optionTexts = await sortOptionsVisibilityPage.getSortOptionTexts();
        expect(optionTexts.length).toBeGreaterThan(0);
    });

    await test.step("Assert 'Price: Low to High' exists in the list", async () => {
        expect(optionTexts).toContain(data.lowToHighLabel);
    });

    await test.step("Assert 'Price: High to Low' exists in the list", async () => {
        expect(optionTexts).toContain(data.highToLowOption);
    });

    await test.step("Assert 'Highest discount' exists in the list", async () => {
        expect(optionTexts).toContain(data.discountOption);
    });

    await test.step('Capture screenshot of expanded dropdown', async () => {
        await captureScreenShot(page, 'TC_66 Sort Options');
    });

    await test.step('Log the full list of extracted options', async () => {
        logger.info(`TC_66 sort options: ${optionTexts.join(', ')}`);
    });
});

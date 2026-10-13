import { test, expect } from '@playwright/test';
import { InvalidSearchQueryResultsPage } from '../pages/invalidSearchQueryResultsPage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_73');

test.afterEach(async () => {
    runReport.save();
});

test('TC_73 - Invalid Search Query Results', async ({ page }) => {
    const invalidSearchQueryResultsPage = new InvalidSearchQueryResultsPage(page);
    const searchText = data.searchText;
    let cardCount = -1;

    await test.step('Navigate to the Decathlon India homepage', async () => {
        await invalidSearchQueryResultsPage.openHomePage();
    });

    await test.step('Wait for the global header to load', async () => {
        await invalidSearchQueryResultsPage.waitForGlobalHeader();
    });

    await test.step('Locate the main search bar input field', async () => {
        await expect(invalidSearchQueryResultsPage.getSearchInput()).toBeVisible();
    });

    await test.step('Enter the test string: XYZ999INVALID!', async () => {
        await invalidSearchQueryResultsPage.enterSearchText(searchText);
        await expect(invalidSearchQueryResultsPage.getSearchInput()).toHaveValue(searchText);
    });

    await test.step("Press the 'Enter' key to trigger the search query", async () => {
        await invalidSearchQueryResultsPage.pressEnter();
    });

    await test.step('Wait for the resulting PLP to fully render', async () => {
        await invalidSearchQueryResultsPage.waitForSearchResults();
        await expect(invalidSearchQueryResultsPage.getNoResultsMessage()).toBeVisible();
    });

    await test.step('Query the DOM for product card locators', async () => {
        cardCount = await invalidSearchQueryResultsPage.getSearchProductCards().count();
    });

    await test.step('Assert that exactly 0 product card locators exist', async () => {
        expect(cardCount).toBe(0);
    });

    await test.step('Assert the exact text "Sorry, No Results Found...!" is visible on the screen', async () => {
        await expect(invalidSearchQueryResultsPage.getNoResultsMessage()).toBeVisible();
    });
});

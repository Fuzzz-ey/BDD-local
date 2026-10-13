import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { InvalidSearchQueryResultsLocators } from '../locators/invalidSearchQueryResultsLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class InvalidSearchQueryResultsPage extends BasePage {
    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: openHomePage
     * Description: Navigates to the Decathlon India homepage.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async openHomePage(): Promise<void> {
        try {
            logger.info('Opening Decathlon homepage');
            runReport.record('Opening Decathlon homepage');

            await this.page.goto(InvalidSearchQueryResultsLocators.HOME_URL, { waitUntil: 'domcontentloaded' });

            logger.info('Opening Decathlon homepage successful');
            runReport.record('Opening Decathlon homepage successful');
        } catch (error) {
            logger.error(`Opening Decathlon homepage failed: ${error}`);
            runReport.record('Opening Decathlon homepage failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForGlobalHeader
     * Description: Waits until the global header is visible.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForGlobalHeader(): Promise<void> {
        try {
            logger.info('Waiting for global header');
            runReport.record('Waiting for global header');

            await this.page.locator(InvalidSearchQueryResultsLocators.GLOBAL_HEADER).waitFor({ state: 'visible' });

            logger.info('Waiting for global header successful');
            runReport.record('Waiting for global header successful');
        } catch (error) {
            logger.error(`Waiting for global header failed: ${error}`);
            runReport.record('Waiting for global header failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getSearchInput
     * Description: Returns the header search input.
     * Parameter: None
     * Return Type: Locator
     */
    getSearchInput(): Locator {
        try {
            logger.info('Fetching search input locator');
            runReport.record('Fetching search input locator');

            const searchInput = this.page.getByRole(InvalidSearchQueryResultsLocators.SEARCH_ROLE).getByRole(InvalidSearchQueryResultsLocators.SEARCHBOX_ROLE);

            logger.info('Fetching search input locator successful');
            runReport.record('Fetching search input locator successful');
            return searchInput;
        } catch (error) {
            logger.error(`Fetching search input locator failed: ${error}`);
            runReport.record('Fetching search input locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: enterSearchText
     * Description: Types the search text in the header search.
     * Parameter: searchText: string
     * Return Type: Promise<void>
     */
    async enterSearchText(searchText: string): Promise<void> {
        try {
            logger.info('Entering search text');
            runReport.record('Entering search text');

            const searchInput = this.page.getByRole(InvalidSearchQueryResultsLocators.SEARCH_ROLE).getByRole(InvalidSearchQueryResultsLocators.SEARCHBOX_ROLE);
            await searchInput.click();
            await searchInput.fill(searchText);

            logger.info('Entering search text successful');
            runReport.record('Entering search text successful');
        } catch (error) {
            logger.error(`Entering search text failed: ${error}`);
            runReport.record('Entering search text failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: pressEnter
     * Description: Presses Enter in the search input.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async pressEnter(): Promise<void> {
        try {
            logger.info('Pressing Enter');
            runReport.record('Pressing Enter');

            await this.page.getByRole(InvalidSearchQueryResultsLocators.SEARCH_ROLE).getByRole(InvalidSearchQueryResultsLocators.SEARCHBOX_ROLE).press('Enter');

            logger.info('Pressing Enter successful');
            runReport.record('Pressing Enter successful');
        } catch (error) {
            logger.error(`Pressing Enter failed: ${error}`);
            runReport.record('Pressing Enter failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForSearchResults
     * Description: Waits for the search result page to load.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForSearchResults(): Promise<void> {
        try {
            logger.info('Waiting for search result page');
            runReport.record('Waiting for search result page');

            await this.page.waitForLoadState('load');

            logger.info('Waiting for search result page successful');
            runReport.record('Waiting for search result page successful');
        } catch (error) {
            logger.error(`Waiting for search result page failed: ${error}`);
            runReport.record('Waiting for search result page failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getSearchProductCards
     * Description: Returns the product cards of the search grid.
     * Parameter: None
     * Return Type: Locator
     */
    getSearchProductCards(): Locator {
        try {
            logger.info('Fetching search product cards locator');
            runReport.record('Fetching search product cards locator');

            const productCards = this.page.locator(InvalidSearchQueryResultsLocators.SEARCH_PRODUCT_CARDS);

            logger.info('Fetching search product cards locator successful');
            runReport.record('Fetching search product cards locator successful');
            return productCards;
        } catch (error) {
            logger.error(`Fetching search product cards locator failed: ${error}`);
            runReport.record('Fetching search product cards locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getNoResultsMessage
     * Description: Returns the no results message.
     * Parameter: None
     * Return Type: Locator
     */
    getNoResultsMessage(): Locator {
        try {
            logger.info('Fetching no results message locator');
            runReport.record('Fetching no results message locator');

            const noResultsMessage = this.page.getByText(InvalidSearchQueryResultsLocators.NO_RESULTS_TEXT, { exact: true });

            logger.info('Fetching no results message locator successful');
            runReport.record('Fetching no results message locator successful');
            return noResultsMessage;
        } catch (error) {
            logger.error(`Fetching no results message locator failed: ${error}`);
            runReport.record('Fetching no results message locator failed', 'failed');
            throw error;
        }
    }
}

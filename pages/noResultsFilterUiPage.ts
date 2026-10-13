import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { NoResultsFilterUiLocators } from '../locators/noResultsFilterUiLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class NoResultsFilterUiPage extends BasePage {
    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: openPlp
     * Description: Navigates to the Decathlon PLP.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async openPlp(): Promise<void> {
        try {
            logger.info('Opening Decathlon PLP');
            runReport.record('Opening Decathlon PLP');

            await this.page.goto(NoResultsFilterUiLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

            logger.info('Opening Decathlon PLP successful');
            runReport.record('Opening Decathlon PLP successful');
        } catch (error) {
            logger.error(`Opening Decathlon PLP failed: ${error}`);
            runReport.record('Opening Decathlon PLP failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForPageLoad
     * Description: Waits for the page load event and the product grid.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForPageLoad(): Promise<void> {
        try {
            logger.info('Waiting for page load');
            runReport.record('Waiting for page load');

            await this.page.waitForLoadState('load');
            await this.page.locator(NoResultsFilterUiLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

            logger.info('Waiting for page load successful');
            runReport.record('Waiting for page load successful');
        } catch (error) {
            logger.error(`Waiting for page load failed: ${error}`);
            runReport.record('Waiting for page load failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getResultCountText
     * Description: Returns the result count text.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getResultCountText(): Promise<string> {
        try {
            logger.info('Reading result count text');
            runReport.record('Reading result count text');

            const countText = (await this.page.locator(NoResultsFilterUiLocators.RESULT_COUNT).innerText()).trim();

            logger.info('Reading result count text successful');
            runReport.record('Reading result count text successful');
            return countText;
        } catch (error) {
            logger.error(`Reading result count text failed: ${error}`);
            runReport.record('Reading result count text failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: expandSizeFilter
     * Description: Makes sure the Size options are visible, expanding the accordion only if needed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandSizeFilter(): Promise<void> {
        try {
            logger.info('Expanding Size filter');
            runReport.record('Expanding Size filter');

            const sizeOption = this.page.locator(NoResultsFilterUiLocators.SIZE_OPTION);
            try {
                await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(NoResultsFilterUiLocators.SIZE_ACCORDION).click();
                await sizeOption.waitFor({ state: 'visible' });
            }

            logger.info('Expanding Size filter successful');
            runReport.record('Expanding Size filter successful');
        } catch (error) {
            logger.error(`Expanding Size filter failed: ${error}`);
            runReport.record('Expanding Size filter failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: selectSize
     * Description: Clicks the restrictive size option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectSize(): Promise<void> {
        try {
            logger.info('Selecting size filter');
            runReport.record('Selecting size filter');

            await this.page.locator(NoResultsFilterUiLocators.SIZE_OPTION).click();

            logger.info('Selecting size filter successful');
            runReport.record('Selecting size filter successful');
        } catch (error) {
            logger.error(`Selecting size filter failed: ${error}`);
            runReport.record('Selecting size filter failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForResultsToRefresh
     * Description: Waits for the loader to detach and the result count to change.
     * Parameter: previousCountText: string
     * Return Type: Promise<void>
     */
    async waitForResultsToRefresh(previousCountText: string): Promise<void> {
        try {
            logger.info('Waiting for results to refresh');
            runReport.record('Waiting for results to refresh');

            await this.page.locator(NoResultsFilterUiLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(NoResultsFilterUiLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

            logger.info('Waiting for results to refresh successful');
            runReport.record('Waiting for results to refresh successful');
        } catch (error) {
            logger.error(`Waiting for results to refresh failed: ${error}`);
            runReport.record('Waiting for results to refresh failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: expandColorFilter
     * Description: Expands the Color accordion if needed and waits for the colour options.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandColorFilter(): Promise<void> {
        try {
            logger.info('Expanding Color filter');
            runReport.record('Expanding Color filter');

            const colorAccordion = this.page.locator(NoResultsFilterUiLocators.COLOR_ACCORDION);
            if ((await colorAccordion.getAttribute('aria-expanded')) !== 'true') {
                await colorAccordion.click();
            }
            await this.page.locator(NoResultsFilterUiLocators.ALL_COLOR_OPTIONS).first().waitFor({ state: 'visible' });

            logger.info('Expanding Color filter successful');
            runReport.record('Expanding Color filter successful');
        } catch (error) {
            logger.error(`Expanding Color filter failed: ${error}`);
            runReport.record('Expanding Color filter failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getConflictingColorOption
     * Description: Returns the conflicting colour option (Turquoise).
     * Parameter: None
     * Return Type: Locator
     */
    getConflictingColorOption(): Locator {
        try {
            logger.info('Fetching conflicting colour locator');
            runReport.record('Fetching conflicting colour locator');

            const colorOption = this.page.locator(NoResultsFilterUiLocators.CONFLICTING_COLOR_OPTION);

            logger.info('Fetching conflicting colour locator successful');
            runReport.record('Fetching conflicting colour locator successful');
            return colorOption;
        } catch (error) {
            logger.error(`Fetching conflicting colour locator failed: ${error}`);
            runReport.record('Fetching conflicting colour locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: applyConflictingFilters
     * Description: Opens the PLP with the conflicting Size and Color filters in the URL.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async applyConflictingFilters(): Promise<void> {
        try {
            logger.info('Applying conflicting filters');
            runReport.record('Applying conflicting filters');

            await this.page.goto(`${NoResultsFilterUiLocators.PLP_URL}?${NoResultsFilterUiLocators.CONFLICTING_FILTER_QUERY}`, { waitUntil: 'domcontentloaded' });

            logger.info('Applying conflicting filters successful');
            runReport.record('Applying conflicting filters successful');
        } catch (error) {
            logger.error(`Applying conflicting filters failed: ${error}`);
            runReport.record('Applying conflicting filters failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForFilteredPage
     * Description: Waits for the page load and for the loader to detach.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForFilteredPage(): Promise<void> {
        try {
            logger.info('Waiting for filtered page');
            runReport.record('Waiting for filtered page');

            await this.page.waitForLoadState('load');
            await this.page.locator(NoResultsFilterUiLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });

            logger.info('Waiting for filtered page successful');
            runReport.record('Waiting for filtered page successful');
        } catch (error) {
            logger.error(`Waiting for filtered page failed: ${error}`);
            runReport.record('Waiting for filtered page failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getProductCards
     * Description: Returns the product cards of the grid.
     * Parameter: None
     * Return Type: Locator
     */
    getProductCards(): Locator {
        try {
            logger.info('Fetching product cards locator');
            runReport.record('Fetching product cards locator');

            const productCards = this.page.locator(NoResultsFilterUiLocators.PRODUCT_CARDS);

            logger.info('Fetching product cards locator successful');
            runReport.record('Fetching product cards locator successful');
            return productCards;
        } catch (error) {
            logger.error(`Fetching product cards locator failed: ${error}`);
            runReport.record('Fetching product cards locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getCollectionsMessage
     * Description: Returns the 'Explore all our collections' fallback text.
     * Parameter: None
     * Return Type: Locator
     */
    getCollectionsMessage(): Locator {
        try {
            logger.info('Fetching collections message locator');
            runReport.record('Fetching collections message locator');

            const collectionsMessage = this.page.getByText(NoResultsFilterUiLocators.COLLECTIONS_TEXT, { exact: true });

            logger.info('Fetching collections message locator successful');
            runReport.record('Fetching collections message locator successful');
            return collectionsMessage;
        } catch (error) {
            logger.error(`Fetching collections message locator failed: ${error}`);
            runReport.record('Fetching collections message locator failed', 'failed');
            throw error;
        }
    }
}
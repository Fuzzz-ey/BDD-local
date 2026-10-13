import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SortUrlParameterLocators } from '../locators/sortUrlParameterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class SortUrlParameterPage extends BasePage {
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

            await this.page.goto(SortUrlParameterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
     * Method Name: waitForDomContentLoaded
     * Description: Waits for the 'domcontentloaded' state.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForDomContentLoaded(): Promise<void> {
        try {
            logger.info('Waiting for domcontentloaded');
            runReport.record('Waiting for domcontentloaded');

            await this.page.waitForLoadState('domcontentloaded');

            logger.info('Waiting for domcontentloaded successful');
            runReport.record('Waiting for domcontentloaded successful');
        } catch (error) {
            logger.error(`Waiting for domcontentloaded failed: ${error}`);
            runReport.record('Waiting for domcontentloaded failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForProductGrid
     * Description: Waits until the first product card is visible.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForProductGrid(): Promise<void> {
        try {
            logger.info('Waiting for product grid');
            runReport.record('Waiting for product grid');

            await this.page.locator(SortUrlParameterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

            logger.info('Waiting for product grid successful');
            runReport.record('Waiting for product grid successful');
        } catch (error) {
            logger.error(`Waiting for product grid failed: ${error}`);
            runReport.record('Waiting for product grid failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getCurrentUrl
     * Description: Returns the current page URL.
     * Parameter: None
     * Return Type: string
     */
    getCurrentUrl(): string {
        try {
            logger.info('Fetching current URL');
            runReport.record('Fetching current URL');

            const currentUrl = this.page.url();

            logger.info('Fetching current URL successful');
            runReport.record('Fetching current URL successful');
            return currentUrl;
        } catch (error) {
            logger.error(`Fetching current URL failed: ${error}`);
            runReport.record('Fetching current URL failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getSortDropdown
     * Description: Returns the sort dropdown button.
     * Parameter: None
     * Return Type: Locator
     */
    getSortDropdown(): Locator {
        try {
            logger.info('Fetching sort dropdown locator');
            runReport.record('Fetching sort dropdown locator');

            const sortDropdown = this.page.locator(SortUrlParameterLocators.SORT_BUTTON);

            logger.info('Fetching sort dropdown locator successful');
            runReport.record('Fetching sort dropdown locator successful');
            return sortDropdown;
        } catch (error) {
            logger.error(`Fetching sort dropdown locator failed: ${error}`);
            runReport.record('Fetching sort dropdown locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: openSortDropdown
     * Description: Opens the sort dropdown, retrying the click until the list is visible.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async openSortDropdown(): Promise<void> {
        try {
            logger.info('Opening sort dropdown');
            runReport.record('Opening sort dropdown');

            await expect(async () => {
                await this.page.locator(SortUrlParameterLocators.SORT_BUTTON).click();
                await this.page.locator(SortUrlParameterLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
            }).toPass({ timeout: 15000 });

            logger.info('Opening sort dropdown successful');
            runReport.record('Opening sort dropdown successful');
        } catch (error) {
            logger.error(`Opening sort dropdown failed: ${error}`);
            runReport.record('Opening sort dropdown failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: selectLowToHigh
     * Description: Selects the 'Price (low → high)' sort option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectLowToHigh(): Promise<void> {
        try {
            logger.info('Selecting Price: Low to High');
            runReport.record('Selecting Price: Low to High');

            await this.page.locator(SortUrlParameterLocators.LOW_TO_HIGH_OPTION).click();

            logger.info('Selecting Price: Low to High successful');
            runReport.record('Selecting Price: Low to High successful');
        } catch (error) {
            logger.error(`Selecting Price: Low to High failed: ${error}`);
            runReport.record('Selecting Price: Low to High failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForSortToApply
     * Description: Waits until the dropdown shows 'Price (low → high)' and the product grid is visible.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForSortToApply(): Promise<void> {
        try {
            logger.info('Waiting for sort to apply');
            runReport.record('Waiting for sort to apply');

            await expect(this.page.locator(SortUrlParameterLocators.SORT_BUTTON)).toContainText(SortUrlParameterLocators.LOW_TO_HIGH, { timeout: 15000 });
            await this.page.locator(SortUrlParameterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

            logger.info('Waiting for sort to apply successful');
            runReport.record('Waiting for sort to apply successful');
        } catch (error) {
            logger.error(`Waiting for sort to apply failed: ${error}`);
            runReport.record('Waiting for sort to apply failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: openPlpWithSort
     * Description: Opens the PLP directly with the Low to High sort query parameter.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async openPlpWithSort(): Promise<void> {
        try {
            logger.info('Opening PLP with sort parameter');
            runReport.record('Opening PLP with sort parameter');

            await this.page.goto(`${SortUrlParameterLocators.PLP_URL}?${SortUrlParameterLocators.SORT_PARAM}`, { waitUntil: 'domcontentloaded' });
            await this.page.locator(SortUrlParameterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

            logger.info('Opening PLP with sort parameter successful');
            runReport.record('Opening PLP with sort parameter successful');
        } catch (error) {
            logger.error(`Opening PLP with sort parameter failed: ${error}`);
            runReport.record('Opening PLP with sort parameter failed', 'failed');
            throw error;
        }
    }
}
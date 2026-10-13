import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ApplyLowToHighSortLocators } from '../locators/applyLowToHighSortLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class ApplyLowToHighSortPage extends BasePage {
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

            await this.page.goto(ApplyLowToHighSortLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
     * Method Name: waitForProductGrid
     * Description: Waits until the first product card is visible.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForProductGrid(): Promise<void> {
        try {
            logger.info('Waiting for product grid');
            runReport.record('Waiting for product grid');

            await this.page.locator(ApplyLowToHighSortLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: openSortDropdown
     * Description: Opens the sort dropdown.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async openSortDropdown(): Promise<void> {
        try {
            logger.info('Opening sort dropdown');
            runReport.record('Opening sort dropdown');

            await expect(async () => {
                await this.page.locator(ApplyLowToHighSortLocators.SORT_BUTTON).click();
                await this.page.locator(ApplyLowToHighSortLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
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
     * Description: Selects the 'Price: Low to High' sort option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectLowToHigh(): Promise<void> {
        try {
            logger.info('Selecting Price: Low to High');
            runReport.record('Selecting Price: Low to High');

            await this.page.locator(ApplyLowToHighSortLocators.LOW_TO_HIGH_OPTION).click();

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
     * Description: Waits until the dropdown shows the new sort and the loader detaches.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForSortToApply(): Promise<void> {
        try {
            logger.info('Waiting for sort to apply');
            runReport.record('Waiting for sort to apply');

            await expect(this.page.locator(ApplyLowToHighSortLocators.SORT_BUTTON)).toContainText(ApplyLowToHighSortLocators.LOW_TO_HIGH);
            await this.page.locator(ApplyLowToHighSortLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await this.page.locator(ApplyLowToHighSortLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: waitForLoaderToDetach
     * Description: Waits for the loading spinner to detach.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForLoaderToDetach(): Promise<void> {
        try {
            logger.info('Waiting for loader to detach');
            runReport.record('Waiting for loader to detach');

            await this.page.locator(ApplyLowToHighSortLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });

            logger.info('Waiting for loader to detach successful');
            runReport.record('Waiting for loader to detach successful');
        } catch (error) {
            logger.error(`Waiting for loader to detach failed: ${error}`);
            runReport.record('Waiting for loader to detach failed', 'failed');
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

            const productCards = this.page.locator(ApplyLowToHighSortLocators.PRODUCT_CARDS);

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
     * Method Name: getSelectedSortText
     * Description: Returns the text shown on the sort dropdown.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getSelectedSortText(): Promise<string> {
        try {
            logger.info('Reading selected sort option');
            runReport.record('Reading selected sort option');

            const sortText = (await this.page.locator(ApplyLowToHighSortLocators.SORT_BUTTON).innerText()).trim();

            logger.info('Reading selected sort option successful');
            runReport.record('Reading selected sort option successful');
            return sortText;
        } catch (error) {
            logger.error(`Reading selected sort option failed: ${error}`);
            runReport.record('Reading selected sort option failed', 'failed');
            throw error;
        }
    }
}

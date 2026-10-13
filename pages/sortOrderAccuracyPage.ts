import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SortOrderAccuracyLocators } from '../locators/sortOrderAccuracyLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class SortOrderAccuracyPage extends BasePage {
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

            await this.page.goto(SortOrderAccuracyLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
            await this.page.locator(SortOrderAccuracyLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
                await this.page.locator(SortOrderAccuracyLocators.SORT_BUTTON).click();
                await this.page.locator(SortOrderAccuracyLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
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

            await this.page.locator(SortOrderAccuracyLocators.LOW_TO_HIGH_OPTION).click();

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

            await expect(this.page.locator(SortOrderAccuracyLocators.SORT_BUTTON)).toContainText(SortOrderAccuracyLocators.LOW_TO_HIGH);
            await this.page.locator(SortOrderAccuracyLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await this.page.locator(SortOrderAccuracyLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getProductCards
     * Description: Returns the product cards of the grid.
     * Parameter: None
     * Return Type: Locator
     */
    getProductCards(): Locator {
        try {
            logger.info('Fetching product cards locator');
            runReport.record('Fetching product cards locator');

            const productCards = this.page.locator(SortOrderAccuracyLocators.PRODUCT_CARDS);

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
     * Method Name: getCardPrice
     * Description: Returns the selling price of the product card at the given index.
     * Parameter: index: number
     * Return Type: Promise<number>
     */
    async getCardPrice(index: number): Promise<number> {
        try {
            logger.info('Reading product card price');
            runReport.record('Reading product card price');

            const priceText = await this.page.locator(SortOrderAccuracyLocators.PRODUCT_CARDS).nth(index).locator(SortOrderAccuracyLocators.CARD_PRICE).innerText();
            const price = Number(priceText.replace(/[^0-9.]/g, ''));

            logger.info('Reading product card price successful');
            runReport.record('Reading product card price successful');
            return price;
        } catch (error) {
            logger.error(`Reading product card price failed: ${error}`);
            runReport.record('Reading product card price failed', 'failed');
            throw error;
        }
    }
}

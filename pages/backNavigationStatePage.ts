import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { BackNavigationStateLocators } from '../locators/backNavigationStateLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class BackNavigationStatePage extends BasePage {
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

            await this.page.goto(BackNavigationStateLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(BackNavigationStateLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
                await this.page.locator(BackNavigationStateLocators.SORT_BUTTON).click();
                await this.page.locator(BackNavigationStateLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
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

            await this.page.locator(BackNavigationStateLocators.LOW_TO_HIGH_OPTION).click();

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

            await expect(this.page.locator(BackNavigationStateLocators.SORT_BUTTON)).toContainText(BackNavigationStateLocators.LOW_TO_HIGH);
            await this.page.locator(BackNavigationStateLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await this.page.locator(BackNavigationStateLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: clickFirstProductCard
     * Description: Clicks the title of the first product card.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async clickFirstProductCard(): Promise<void> {
        try {
            logger.info('Clicking first product card');
            runReport.record('Clicking first product card');

            await this.page.locator(BackNavigationStateLocators.PRODUCT_CARDS).first().locator(BackNavigationStateLocators.CARD_TITLE).click();

            logger.info('Clicking first product card successful');
            runReport.record('Clicking first product card successful');
        } catch (error) {
            logger.error(`Clicking first product card failed: ${error}`);
            runReport.record('Clicking first product card failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: waitForPdp
     * Description: Waits for the PDP URL and the product title.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async waitForPdp(): Promise<void> {
        try {
            logger.info('Waiting for PDP to load');
            runReport.record('Waiting for PDP to load');

            await this.page.waitForURL(BackNavigationStateLocators.PDP_URL_PATTERN);
            await this.page.waitForLoadState('load');
            await this.page.locator(BackNavigationStateLocators.PDP_TITLE).waitFor({ state: 'visible' });

            logger.info('Waiting for PDP to load successful');
            runReport.record('Waiting for PDP to load successful');
        } catch (error) {
            logger.error(`Waiting for PDP to load failed: ${error}`);
            runReport.record('Waiting for PDP to load failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: goBack
     * Description: Navigates back to the previous page.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async goBack(): Promise<void> {
        try {
            logger.info('Navigating back');
            runReport.record('Navigating back');

            await this.page.goBack({ waitUntil: 'domcontentloaded' });

            logger.info('Navigating back successful');
            runReport.record('Navigating back successful');
        } catch (error) {
            logger.error(`Navigating back failed: ${error}`);
            runReport.record('Navigating back failed', 'failed');
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

            const sortDropdown = this.page.locator(BackNavigationStateLocators.SORT_BUTTON);

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
     * Method Name: getFirstPrices
     * Description: Returns the selling prices of the first product cards.
     * Parameter: total: number
     * Return Type: Promise<number[]>
     */
    async getFirstPrices(total: number): Promise<number[]> {
        try {
            logger.info('Reading first product prices');
            runReport.record('Reading first product prices');

            const prices: number[] = [];
            for (let index = 0; index < total; index++) {
                const priceText = await this.page.locator(BackNavigationStateLocators.PRODUCT_CARDS).nth(index).locator(BackNavigationStateLocators.CARD_PRICE).innerText();
                prices.push(Number(priceText.replace(/[^0-9.]/g, '')));
            }

            logger.info('Reading first product prices successful');
            runReport.record('Reading first product prices successful');
            return prices;
        } catch (error) {
            logger.error(`Reading first product prices failed: ${error}`);
            runReport.record('Reading first product prices failed', 'failed');
            throw error;
        }
    }
}

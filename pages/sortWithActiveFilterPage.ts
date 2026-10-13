import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SortWithActiveFilterLocators } from '../locators/sortWithActiveFilterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class SortWithActiveFilterPage extends BasePage {
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

            await this.page.goto(SortWithActiveFilterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(SortWithActiveFilterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getResultCountText
     * Description: Returns the result count text.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getResultCountText(): Promise<string> {
        try {
            logger.info('Reading result count text');
            runReport.record('Reading result count text');

            const countText = (await this.page.locator(SortWithActiveFilterLocators.RESULT_COUNT).innerText()).trim();

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
     * Method Name: expandColorFilter
     * Description: Expands the Color filter if it is collapsed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandColorFilter(): Promise<void> {
        try {
            logger.info('Expanding Color filter');
            runReport.record('Expanding Color filter');

            const colorOption = this.page.locator(SortWithActiveFilterLocators.COLOR_OPTION);
            try {
                await colorOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(SortWithActiveFilterLocators.COLOR_ACCORDION).click();
                await colorOption.waitFor({ state: 'visible' });
            }

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
     * Method Name: selectColor
     * Description: Clicks the colour option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectColor(): Promise<void> {
        try {
            logger.info('Selecting colour filter');
            runReport.record('Selecting colour filter');

            await this.page.locator(SortWithActiveFilterLocators.COLOR_OPTION).click();

            logger.info('Selecting colour filter successful');
            runReport.record('Selecting colour filter successful');
        } catch (error) {
            logger.error(`Selecting colour filter failed: ${error}`);
            runReport.record('Selecting colour filter failed', 'failed');
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

            await this.page.locator(SortWithActiveFilterLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(SortWithActiveFilterLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

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
                await this.page.locator(SortWithActiveFilterLocators.SORT_BUTTON).click();
                await this.page.locator(SortWithActiveFilterLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
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

            await this.page.locator(SortWithActiveFilterLocators.LOW_TO_HIGH_OPTION).click();

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

            await expect(this.page.locator(SortWithActiveFilterLocators.SORT_BUTTON)).toContainText(SortWithActiveFilterLocators.LOW_TO_HIGH);
            await this.page.locator(SortWithActiveFilterLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await this.page.locator(SortWithActiveFilterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
                const priceText = await this.page.locator(SortWithActiveFilterLocators.PRODUCT_CARDS).nth(index).locator(SortWithActiveFilterLocators.CARD_PRICE).innerText();
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

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getColorCheckbox
     * Description: Returns the colour checkbox.
     * Parameter: None
     * Return Type: Locator
     */
    getColorCheckbox(): Locator {
        try {
            logger.info('Fetching colour checkbox locator');
            runReport.record('Fetching colour checkbox locator');

            const colorCheckbox = this.page.locator(SortWithActiveFilterLocators.COLOR_CHECKBOX);

            logger.info('Fetching colour checkbox locator successful');
            runReport.record('Fetching colour checkbox locator successful');
            return colorCheckbox;
        } catch (error) {
            logger.error(`Fetching colour checkbox locator failed: ${error}`);
            runReport.record('Fetching colour checkbox locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getResultCountLocator
     * Description: Returns the result count text locator.
     * Parameter: None
     * Return Type: Locator
     */
    getResultCountLocator(): Locator {
        try {
            logger.info('Fetching result count locator');
            runReport.record('Fetching result count locator');

            const resultCount = this.page.locator(SortWithActiveFilterLocators.RESULT_COUNT);

            logger.info('Fetching result count locator successful');
            runReport.record('Fetching result count locator successful');
            return resultCount;
        } catch (error) {
            logger.error(`Fetching result count locator failed: ${error}`);
            runReport.record('Fetching result count locator failed', 'failed');
            throw error;
        }
    }
}

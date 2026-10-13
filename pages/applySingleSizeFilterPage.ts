import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ApplySingleSizeFilterLocators } from '../locators/applySingleSizeFilterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class ApplySingleSizeFilterPage extends BasePage {
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

            await this.page.goto(ApplySingleSizeFilterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(ApplySingleSizeFilterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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

            const countText = (await this.page.locator(ApplySingleSizeFilterLocators.RESULT_COUNT).innerText()).trim();

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
     * Method Name: getResultCount
     * Description: Returns the numeric result count.
     * Parameter: None
     * Return Type: Promise<number>
     */
    async getResultCount(): Promise<number> {
        try {
            logger.info('Reading numeric result count');
            runReport.record('Reading numeric result count');

            const countText = await this.page.locator(ApplySingleSizeFilterLocators.RESULT_COUNT).innerText();
            const resultCount = Number(countText.replace(/[^0-9]/g, ''));

            logger.info('Reading numeric result count successful');
            runReport.record('Reading numeric result count successful');
            return resultCount;
        } catch (error) {
            logger.error(`Reading numeric result count failed: ${error}`);
            runReport.record('Reading numeric result count failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getSizeAccordion
     * Description: Returns the Size accordion button.
     * Parameter: None
     * Return Type: Locator
     */
    getSizeAccordion(): Locator {
        try {
            logger.info('Fetching Size accordion locator');
            runReport.record('Fetching Size accordion locator');

            const sizeAccordion = this.page.locator(ApplySingleSizeFilterLocators.SIZE_ACCORDION);

            logger.info('Fetching Size accordion locator successful');
            runReport.record('Fetching Size accordion locator successful');
            return sizeAccordion;
        } catch (error) {
            logger.error(`Fetching Size accordion locator failed: ${error}`);
            runReport.record('Fetching Size accordion locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: expandSizeFilter
     * Description: Expands the Size filter if it is collapsed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandSizeFilter(): Promise<void> {
        try {
            logger.info('Expanding Size filter');
            runReport.record('Expanding Size filter');

        const sizeOption = this.page.locator(ApplySingleSizeFilterLocators.SIZE_OPTION);
            try {
                await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(ApplySingleSizeFilterLocators.SIZE_ACCORDION).click();
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
     * Method Name: getSizeOption
     * Description: Returns the size option row.
     * Parameter: None
     * Return Type: Locator
     */
    getSizeOption(): Locator {
        try {
            logger.info('Fetching size option locator');
            runReport.record('Fetching size option locator');

            const sizeOption = this.page.locator(ApplySingleSizeFilterLocators.SIZE_OPTION);

            logger.info('Fetching size option locator successful');
            runReport.record('Fetching size option locator successful');
            return sizeOption;
        } catch (error) {
            logger.error(`Fetching size option locator failed: ${error}`);
            runReport.record('Fetching size option locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: selectSize
     * Description: Clicks the size option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectSize(): Promise<void> {
        try {
            logger.info('Selecting size filter');
            runReport.record('Selecting size filter');

            await this.page.locator(ApplySingleSizeFilterLocators.SIZE_OPTION).click();

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

            await this.page.locator(ApplySingleSizeFilterLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(ApplySingleSizeFilterLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

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
     * Method Name: getSizeCheckbox
     * Description: Returns the size checkbox.
     * Parameter: None
     * Return Type: Locator
     */
    getSizeCheckbox(): Locator {
        try {
            logger.info('Fetching size checkbox locator');
            runReport.record('Fetching size checkbox locator');

            const sizeCheckbox = this.page.locator(ApplySingleSizeFilterLocators.SIZE_CHECKBOX);

            logger.info('Fetching size checkbox locator successful');
            runReport.record('Fetching size checkbox locator successful');
            return sizeCheckbox;
        } catch (error) {
            logger.error(`Fetching size checkbox locator failed: ${error}`);
            runReport.record('Fetching size checkbox locator failed', 'failed');
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

            const productCards = this.page.locator(ApplySingleSizeFilterLocators.PRODUCT_CARDS);

            logger.info('Fetching product cards locator successful');
            runReport.record('Fetching product cards locator successful');
            return productCards;
        } catch (error) {
            logger.error(`Fetching product cards locator failed: ${error}`);
            runReport.record('Fetching product cards locator failed', 'failed');
            throw error;
        }
    }
}

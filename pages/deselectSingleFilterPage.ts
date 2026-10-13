import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { DeselectSingleFilterLocators } from '../locators/deselectSingleFilterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class DeselectSingleFilterPage extends BasePage {
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

            await this.page.goto(DeselectSingleFilterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(DeselectSingleFilterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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

            const countText = (await this.page.locator(DeselectSingleFilterLocators.RESULT_COUNT).innerText()).trim();

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

            const countText = await this.page.locator(DeselectSingleFilterLocators.RESULT_COUNT).innerText();
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
     * Method Name: expandSizeFilter
     * Description: Expands the Size filter if it is collapsed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandSizeFilter(): Promise<void> {
        try {
            logger.info('Expanding Size filter');
            runReport.record('Expanding Size filter');

            const sizeOption = this.page.locator(DeselectSingleFilterLocators.SIZE_OPTION);
            try {
                await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(DeselectSingleFilterLocators.SIZE_ACCORDION).click();
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
     * Description: Clicks the size option.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async selectSize(): Promise<void> {
        try {
            logger.info('Selecting size filter');
            runReport.record('Selecting size filter');

            await this.page.locator(DeselectSingleFilterLocators.SIZE_OPTION).click();

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
     * Method Name: expandColorFilter
     * Description: Expands the Color filter if it is collapsed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandColorFilter(): Promise<void> {
        try {
            logger.info('Expanding Color filter');
            runReport.record('Expanding Color filter');

            const colorOption = this.page.locator(DeselectSingleFilterLocators.COLOR_OPTION);
            try {
                await colorOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(DeselectSingleFilterLocators.COLOR_ACCORDION).click();
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

            await this.page.locator(DeselectSingleFilterLocators.COLOR_OPTION).click();

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

            await this.page.locator(DeselectSingleFilterLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(DeselectSingleFilterLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

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

            const sizeCheckbox = this.page.locator(DeselectSingleFilterLocators.SIZE_CHECKBOX);

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
     * Method Name: deselectSize
     * Description: Clicks the selected size option again to remove it.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async deselectSize(): Promise<void> {
        try {
            logger.info('Deselecting size filter');
            runReport.record('Deselecting size filter');

            await this.page.locator(DeselectSingleFilterLocators.SIZE_OPTION).click();

            logger.info('Deselecting size filter successful');
            runReport.record('Deselecting size filter successful');
        } catch (error) {
            logger.error(`Deselecting size filter failed: ${error}`);
            runReport.record('Deselecting size filter failed', 'failed');
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

            const colorCheckbox = this.page.locator(DeselectSingleFilterLocators.COLOR_CHECKBOX);

            logger.info('Fetching colour checkbox locator successful');
            runReport.record('Fetching colour checkbox locator successful');
            return colorCheckbox;
        } catch (error) {
            logger.error(`Fetching colour checkbox locator failed: ${error}`);
            runReport.record('Fetching colour checkbox locator failed', 'failed');
            throw error;
        }
    }
}

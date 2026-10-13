import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ClearAllFiltersLocators } from '../locators/clearAllFiltersLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class ClearAllFiltersPage extends BasePage {
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

            await this.page.goto(ClearAllFiltersLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(ClearAllFiltersLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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

            const countText = (await this.page.locator(ClearAllFiltersLocators.RESULT_COUNT).innerText()).trim();

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

            const countText = await this.page.locator(ClearAllFiltersLocators.RESULT_COUNT).innerText();
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

            const sizeOption = this.page.locator(ClearAllFiltersLocators.SIZE_OPTION);
            try {
                await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(ClearAllFiltersLocators.SIZE_ACCORDION).click();
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

            await this.page.locator(ClearAllFiltersLocators.SIZE_OPTION).click();

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

            const colorOption = this.page.locator(ClearAllFiltersLocators.COLOR_OPTION);
            try {
                await colorOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(ClearAllFiltersLocators.COLOR_ACCORDION).click();
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

            await this.page.locator(ClearAllFiltersLocators.COLOR_OPTION).click();

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

            await this.page.locator(ClearAllFiltersLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(ClearAllFiltersLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

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
     * Method Name: scrollToFilterSidebar
     * Description: Scrolls to the filter sidebar.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async scrollToFilterSidebar(): Promise<void> {
        try {
            logger.info('Scrolling to filter sidebar');
            runReport.record('Scrolling to filter sidebar');

            await this.page.locator(ClearAllFiltersLocators.FILTER_SIDEBAR).scrollIntoViewIfNeeded();

            logger.info('Scrolling to filter sidebar successful');
            runReport.record('Scrolling to filter sidebar successful');
        } catch (error) {
            logger.error(`Scrolling to filter sidebar failed: ${error}`);
            runReport.record('Scrolling to filter sidebar failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getClearAllButton
     * Description: Returns the Clear All button.
     * Parameter: None
     * Return Type: Locator
     */
    getClearAllButton(): Locator {
        try {
            logger.info('Fetching Clear All locator');
            runReport.record('Fetching Clear All locator');

            const clearAllButton = this.page.locator(ClearAllFiltersLocators.CLEAR_ALL);

            logger.info('Fetching Clear All locator successful');
            runReport.record('Fetching Clear All locator successful');
            return clearAllButton;
        } catch (error) {
            logger.error(`Fetching Clear All locator failed: ${error}`);
            runReport.record('Fetching Clear All locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: clickClearAll
     * Description: Clicks the Clear All button.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async clickClearAll(): Promise<void> {
        try {
            logger.info('Clicking Clear All');
            runReport.record('Clicking Clear All');

            await this.page.locator(ClearAllFiltersLocators.CLEAR_ALL).click();

            logger.info('Clicking Clear All successful');
            runReport.record('Clicking Clear All successful');
        } catch (error) {
            logger.error(`Clicking Clear All failed: ${error}`);
            runReport.record('Clicking Clear All failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getCheckedFilters
     * Description: Returns all checked filter checkboxes.
     * Parameter: None
     * Return Type: Locator
     */
    getCheckedFilters(): Locator {
        try {
            logger.info('Fetching checked filters locator');
            runReport.record('Fetching checked filters locator');

            const checkedFilters = this.page.locator(ClearAllFiltersLocators.CHECKED_FILTERS);

            logger.info('Fetching checked filters locator successful');
            runReport.record('Fetching checked filters locator successful');
            return checkedFilters;
        } catch (error) {
            logger.error(`Fetching checked filters locator failed: ${error}`);
            runReport.record('Fetching checked filters locator failed', 'failed');
            throw error;
        }
    }
}

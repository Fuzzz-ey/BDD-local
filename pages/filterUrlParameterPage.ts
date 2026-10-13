import { BasePage } from './basePage';
import { FilterUrlParameterLocators } from '../locators/filterUrlParameterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class FilterUrlParameterPage extends BasePage {
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

            await this.page.goto(FilterUrlParameterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(FilterUrlParameterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: expandSizeFilter
     * Description: Expands the Size filter if it is collapsed.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async expandSizeFilter(): Promise<void> {
        try {
            logger.info('Expanding Size filter');
            runReport.record('Expanding Size filter');

            const sizeOption = this.page.locator(FilterUrlParameterLocators.SIZE_OPTION);
            try {
                await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(FilterUrlParameterLocators.SIZE_ACCORDION).click();
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

            await this.page.locator(FilterUrlParameterLocators.SIZE_OPTION).click();

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
     * Method Name: waitForUrlChange
     * Description: Waits until the page URL changes.
     * Parameter: previousUrl: string
     * Return Type: Promise<void>
     */
    async waitForUrlChange(previousUrl: string): Promise<void> {
        try {
            logger.info('Waiting for URL change');
            runReport.record('Waiting for URL change');

            await this.page.waitForURL((url) => url.toString() !== previousUrl);

            logger.info('Waiting for URL change successful');
            runReport.record('Waiting for URL change successful');
        } catch (error) {
            logger.error(`Waiting for URL change failed: ${error}`);
            runReport.record('Waiting for URL change failed', 'failed');
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

            const colorOption = this.page.locator(FilterUrlParameterLocators.COLOR_OPTION);
            try {
                await colorOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(FilterUrlParameterLocators.COLOR_ACCORDION).click();
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

            await this.page.locator(FilterUrlParameterLocators.COLOR_OPTION).click();

            logger.info('Selecting colour filter successful');
            runReport.record('Selecting colour filter successful');
        } catch (error) {
            logger.error(`Selecting colour filter failed: ${error}`);
            runReport.record('Selecting colour filter failed', 'failed');
            throw error;
        }
    }
}

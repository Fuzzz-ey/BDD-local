import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { FilterVisibilityLocators } from '../locators/filterVisibilityLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class FilterVisibilityPage extends BasePage {
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

            await this.page.goto(FilterVisibilityLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
     * Method Name: scrollToFilterSidebar
     * Description: Scrolls to the filter sidebar.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async scrollToFilterSidebar(): Promise<void> {
        try {
            logger.info('Scrolling to filter sidebar');
            runReport.record('Scrolling to filter sidebar');

            await this.page.locator(FilterVisibilityLocators.FILTER_SIDEBAR).scrollIntoViewIfNeeded();

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
     * Method Name: getSizeFilter
     * Description: Returns the Size filter title locator.
     * Parameter: None
     * Return Type: Locator
     */
    getSizeFilter(): Locator {
        try {
            logger.info('Fetching Size filter locator');
            runReport.record('Fetching Size filter locator');

            const sizeFilter = this.page.locator(FilterVisibilityLocators.SIZE_FILTER);

            logger.info('Fetching Size filter locator successful');
            runReport.record('Fetching Size filter locator successful');
            return sizeFilter;
        } catch (error) {
            logger.error(`Fetching Size filter locator failed: ${error}`);
            runReport.record('Fetching Size filter locator failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getColorFilter
     * Description: Returns the Color filter title locator.
     * Parameter: None
     * Return Type: Locator
     */
    getColorFilter(): Locator {
        try {
            logger.info('Fetching Color filter locator');
            runReport.record('Fetching Color filter locator');

            const colorFilter = this.page.locator(FilterVisibilityLocators.COLOR_FILTER);

            logger.info('Fetching Color filter locator successful');
            runReport.record('Fetching Color filter locator successful');
            return colorFilter;
        } catch (error) {
            logger.error(`Fetching Color filter locator failed: ${error}`);
            runReport.record('Fetching Color filter locator failed', 'failed');
            throw error;
        }
    }
}

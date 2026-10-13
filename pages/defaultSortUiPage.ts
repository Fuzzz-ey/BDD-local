import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { DefaultSortUiLocators } from '../locators/defaultSortUiLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class DefaultSortUiPage extends BasePage {
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

            await this.page.goto(DefaultSortUiLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(DefaultSortUiLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: scrollToSortDropdown
     * Description: Scrolls the sort dropdown into view.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async scrollToSortDropdown(): Promise<void> {
        try {
            logger.info('Scrolling to sort dropdown');
            runReport.record('Scrolling to sort dropdown');

            await this.page.locator(DefaultSortUiLocators.SORT_BUTTON).scrollIntoViewIfNeeded();

            logger.info('Scrolling to sort dropdown successful');
            runReport.record('Scrolling to sort dropdown successful');
        } catch (error) {
            logger.error(`Scrolling to sort dropdown failed: ${error}`);
            runReport.record('Scrolling to sort dropdown failed', 'failed');
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

            const sortDropdown = this.page.locator(DefaultSortUiLocators.SORT_BUTTON);

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
     * Method Name: getSelectedSortText
     * Description: Returns the text shown on the sort dropdown.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getSelectedSortText(): Promise<string> {
        try {
            logger.info('Reading selected sort option');
            runReport.record('Reading selected sort option');

            const sortText = (await this.page.locator(DefaultSortUiLocators.SORT_BUTTON).innerText()).trim();

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

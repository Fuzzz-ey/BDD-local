import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SortOptionsVisibilityLocators } from '../locators/sortOptionsVisibilityLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class SortOptionsVisibilityPage extends BasePage {
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

            await this.page.goto(SortOptionsVisibilityLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
            await this.page.locator(SortOptionsVisibilityLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getSortDropdown
     * Description: Returns the sort dropdown button.
     * Parameter: None
     * Return Type: Locator
     */
    getSortDropdown(): Locator {
        try {
            logger.info('Fetching sort dropdown locator');
            runReport.record('Fetching sort dropdown locator');

            const sortDropdown = this.page.locator(SortOptionsVisibilityLocators.SORT_BUTTON);

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
                await this.page.locator(SortOptionsVisibilityLocators.SORT_BUTTON).click();
                await this.page.locator(SortOptionsVisibilityLocators.SORT_LIST).waitFor({ state: 'visible', timeout: 2000 });
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
     * Method Name: getSortOptionTexts
     * Description: Returns the text of every sort option.
     * Parameter: None
     * Return Type: Promise<string[]>
     */
    async getSortOptionTexts(): Promise<string[]> {
        try {
            logger.info('Reading sort options');
            runReport.record('Reading sort options');

            const optionTexts = (await this.page.locator(SortOptionsVisibilityLocators.SORT_LIST).getByRole(SortOptionsVisibilityLocators.SORT_OPTION_ROLE).allInnerTexts()).map((text) => text.trim());

            logger.info('Reading sort options successful');
            runReport.record('Reading sort options successful');
            return optionTexts;
        } catch (error) {
            logger.error(`Reading sort options failed: ${error}`);
            runReport.record('Reading sort options failed', 'failed');
            throw error;
        }
    }
}

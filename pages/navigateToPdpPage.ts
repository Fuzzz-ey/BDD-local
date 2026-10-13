import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { NavigateToPdpLocators } from '../locators/navigateToPdpLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class NavigateToPdpPage extends BasePage {
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

            await this.page.goto(NavigateToPdpLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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

            await this.page.locator(NavigateToPdpLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getProductCards
     * Description: Returns the product cards of the grid.
     * Parameter: None
     * Return Type: Locator
     */
    getProductCards(): Locator {
        try {
            logger.info('Fetching product cards locator');
            runReport.record('Fetching product cards locator');

            const productCards = this.page.locator(NavigateToPdpLocators.PRODUCT_CARDS);

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
     * Method Name: scrollFirstCardIntoView
     * Description: Scrolls the first product card into view.
     * Parameter: None
     * Return Type: Promise<void>
     */
    async scrollFirstCardIntoView(): Promise<void> {
        try {
            logger.info('Scrolling first product card into view');
            runReport.record('Scrolling first product card into view');

            await this.page.locator(NavigateToPdpLocators.PRODUCT_CARDS).first().scrollIntoViewIfNeeded();

            logger.info('Scrolling first product card into view successful');
            runReport.record('Scrolling first product card into view successful');
        } catch (error) {
            logger.error(`Scrolling first product card into view failed: ${error}`);
            runReport.record('Scrolling first product card into view failed', 'failed');
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

            await this.page.locator(NavigateToPdpLocators.PRODUCT_CARDS).first().locator(NavigateToPdpLocators.CARD_TITLE).click();

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

            await this.page.waitForURL(NavigateToPdpLocators.PDP_URL_PATTERN);
            await this.page.waitForLoadState('load');
            await this.page.locator(NavigateToPdpLocators.PDP_TITLE).waitFor({ state: 'visible' });

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
     * Method Name: getPdpTitle
     * Description: Returns the PDP product title.
     * Parameter: None
     * Return Type: Locator
     */
    getPdpTitle(): Locator {
        try {
            logger.info('Fetching PDP title locator');
            runReport.record('Fetching PDP title locator');

            const pdpTitle = this.page.locator(NavigateToPdpLocators.PDP_TITLE);

            logger.info('Fetching PDP title locator successful');
            runReport.record('Fetching PDP title locator successful');
            return pdpTitle;
        } catch (error) {
            logger.error(`Fetching PDP title locator failed: ${error}`);
            runReport.record('Fetching PDP title locator failed', 'failed');
            throw error;
        }
    }
}

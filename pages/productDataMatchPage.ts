import { Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ProductDataMatchLocators } from '../locators/productDataMatchLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class ProductDataMatchPage extends BasePage {
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

            await this.page.goto(ProductDataMatchLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
            await this.page.locator(ProductDataMatchLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getProductCards
     * Description: Returns the product cards of the grid.
     * Parameter: None
     * Return Type: Locator
     */
    getProductCards(): Locator {
        try {
            logger.info('Fetching product cards locator');
            runReport.record('Fetching product cards locator');

            const productCards = this.page.locator(ProductDataMatchLocators.PRODUCT_CARDS);

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
     * Method Name: getCardTitleText
     * Description: Returns the title of the product card at the given index.
     * Parameter: index: number
     * Return Type: Promise<string>
     */
    async getCardTitleText(index: number): Promise<string> {
        try {
            logger.info('Reading product card title');
            runReport.record('Reading product card title');

            const titleText = (await this.page.locator(ProductDataMatchLocators.PRODUCT_CARDS).nth(index).locator(ProductDataMatchLocators.CARD_TITLE).innerText()).trim();

            logger.info('Reading product card title successful');
            runReport.record('Reading product card title successful');
            return titleText;
        } catch (error) {
            logger.error(`Reading product card title failed: ${error}`);
            runReport.record('Reading product card title failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getCardPrice
     * Description: Returns the selling price of the product card at the given index.
     * Parameter: index: number
     * Return Type: Promise<number>
     */
    async getCardPrice(index: number): Promise<number> {
        try {
            logger.info('Reading product card price');
            runReport.record('Reading product card price');

            const priceText = await this.page.locator(ProductDataMatchLocators.PRODUCT_CARDS).nth(index).locator(ProductDataMatchLocators.CARD_PRICE).innerText();
            const price = Number(priceText.replace(/[^0-9.]/g, ''));

            logger.info('Reading product card price successful');
            runReport.record('Reading product card price successful');
            return price;
        } catch (error) {
            logger.error(`Reading product card price failed: ${error}`);
            runReport.record('Reading product card price failed', 'failed');
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

            await this.page.locator(ProductDataMatchLocators.PRODUCT_CARDS).first().locator(ProductDataMatchLocators.CARD_TITLE).click();

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

            await this.page.waitForURL(ProductDataMatchLocators.PDP_URL_PATTERN);
            await this.page.waitForLoadState('load');
            await this.page.locator(ProductDataMatchLocators.PDP_TITLE).waitFor({ state: 'visible' });

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
     * Method Name: getPdpTitleText
     * Description: Returns the PDP product title text.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getPdpTitleText(): Promise<string> {
        try {
            logger.info('Reading PDP title');
            runReport.record('Reading PDP title');

            const titleText = (await this.page.locator(ProductDataMatchLocators.PDP_TITLE).innerText()).trim();

            logger.info('Reading PDP title successful');
            runReport.record('Reading PDP title successful');
            return titleText;
        } catch (error) {
            logger.error(`Reading PDP title failed: ${error}`);
            runReport.record('Reading PDP title failed', 'failed');
            throw error;
        }
    }

    /**
     * Author Name: Fuzelur Rahaman
     * Method Name: getPdpPrice
     * Description: Returns the PDP selling price.
     * Parameter: None
     * Return Type: Promise<number>
     */
    async getPdpPrice(): Promise<number> {
        try {
            logger.info('Reading PDP price');
            runReport.record('Reading PDP price');

            const priceText = await this.page.locator(ProductDataMatchLocators.PDP_PRICE).first().innerText();
            const price = Number(priceText.replace(/[^0-9.]/g, ''));

            logger.info('Reading PDP price successful');
            runReport.record('Reading PDP price successful');
            return price;
        } catch (error) {
            logger.error(`Reading PDP price failed: ${error}`);
            runReport.record('Reading PDP price failed', 'failed');
            throw error;
        }
    }
}

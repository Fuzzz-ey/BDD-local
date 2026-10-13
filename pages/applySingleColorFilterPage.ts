import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ApplySingleColorFilterLocators } from '../locators/applySingleColorFilterLocators';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

export class ApplySingleColorFilterPage extends BasePage {
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

            await this.page.goto(ApplySingleColorFilterLocators.PLP_URL, { waitUntil: 'domcontentloaded' });

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
            await this.page.locator(ApplySingleColorFilterLocators.PRODUCT_CARDS).first().waitFor({ state: 'visible' });

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
     * Method Name: getResultCountText
     * Description: Returns the result count text.
     * Parameter: None
     * Return Type: Promise<string>
     */
    async getResultCountText(): Promise<string> {
        try {
            logger.info('Reading result count text');
            runReport.record('Reading result count text');

            const countText = (await this.page.locator(ApplySingleColorFilterLocators.RESULT_COUNT).innerText()).trim();

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

            const countText = await this.page.locator(ApplySingleColorFilterLocators.RESULT_COUNT).innerText();
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
     * Method Name: getColorAccordion
     * Description: Returns the Color accordion button.
     * Parameter: None
     * Return Type: Locator
     */
    getColorAccordion(): Locator {
        try {
            logger.info('Fetching Color accordion locator');
            runReport.record('Fetching Color accordion locator');

            const colorAccordion = this.page.locator(ApplySingleColorFilterLocators.COLOR_ACCORDION);

            logger.info('Fetching Color accordion locator successful');
            runReport.record('Fetching Color accordion locator successful');
            return colorAccordion;
        } catch (error) {
            logger.error(`Fetching Color accordion locator failed: ${error}`);
            runReport.record('Fetching Color accordion locator failed', 'failed');
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

            const colorOption = this.page.locator(ApplySingleColorFilterLocators.COLOR_OPTION);
            try {
                await colorOption.waitFor({ state: 'visible', timeout: 5000 });
            } catch {
                await this.page.locator(ApplySingleColorFilterLocators.COLOR_ACCORDION).click();
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
     * Method Name: getColorOption
     * Description: Returns the colour option row.
     * Parameter: None
     * Return Type: Locator
     */
    getColorOption(): Locator {
        try {
            logger.info('Fetching colour option locator');
            runReport.record('Fetching colour option locator');

            const colorOption = this.page.locator(ApplySingleColorFilterLocators.COLOR_OPTION);

            logger.info('Fetching colour option locator successful');
            runReport.record('Fetching colour option locator successful');
            return colorOption;
        } catch (error) {
            logger.error(`Fetching colour option locator failed: ${error}`);
            runReport.record('Fetching colour option locator failed', 'failed');
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

            await this.page.locator(ApplySingleColorFilterLocators.COLOR_OPTION).click();

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

            await this.page.locator(ApplySingleColorFilterLocators.LOADING_SPINNER).first().waitFor({ state: 'hidden' });
            await expect(this.page.locator(ApplySingleColorFilterLocators.RESULT_COUNT)).not.toHaveText(previousCountText);

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
     * Method Name: getColorCheckbox
     * Description: Returns the colour checkbox.
     * Parameter: None
     * Return Type: Locator
     */
    getColorCheckbox(): Locator {
        try {
            logger.info('Fetching colour checkbox locator');
            runReport.record('Fetching colour checkbox locator');

            const colorCheckbox = this.page.locator(ApplySingleColorFilterLocators.COLOR_CHECKBOX);

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
     * Method Name: getFirstCardImage
     * Description: Returns the image of the first product card.
     * Parameter: None
     * Return Type: Locator
     */
    getFirstCardImage(): Locator {
        try {
            logger.info('Fetching first card image locator');
            runReport.record('Fetching first card image locator');

            const cardImage = this.page.locator(ApplySingleColorFilterLocators.PRODUCT_CARDS).first().locator(ApplySingleColorFilterLocators.CARD_IMAGE);

            logger.info('Fetching first card image locator successful');
            runReport.record('Fetching first card image locator successful');
            return cardImage;
        } catch (error) {
            logger.error(`Fetching first card image locator failed: ${error}`);
            runReport.record('Fetching first card image locator failed', 'failed');
            throw error;
        }
    }
}

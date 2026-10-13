import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ResultCountAccuracyPage } from '../pages/resultCountAccuracyPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';
import { settleResultCount } from '../support/settleCount';

Given(
  'the user navigates to the Decathlon PLP for result count accuracy',
  async function (this: CustomWorld) {
    this.resultCountAccuracyPage = new ResultCountAccuracyPage(this.page);
    this.countText = '';
    this.displayedCount = 0;
    this.cardCount = 0;

    await this.resultCountAccuracyPage.openPlp();
    await this.resultCountAccuracyPage.waitForProductGrid();
  }
);

When(
  'the user applies a Size filter constraint for result count accuracy',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.resultCountAccuracyPage.expandSizeFilter();
    await this.resultCountAccuracyPage.selectSize();
    await this.resultCountAccuracyPage.waitForResultsToRefresh(this.countText);
    await settleResultCount(this.page);
  }
);

When(
  'the user applies a Color filter constraint for result count accuracy',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.resultCountAccuracyPage.expandColorFilter();
    await this.resultCountAccuracyPage.selectColor();
    await this.resultCountAccuracyPage.waitForResultsToRefresh(this.countText);
    await settleResultCount(this.page);
  }
);

When(
  'the result count text at the top of the page is visible for result count accuracy',
  async function (this: CustomWorld) {
    await expect(this.resultCountAccuracyPage.getResultCountLocator()).toBeVisible();
  }
);

When(
  'the numeric displayed count is extracted and is greater than zero for result count accuracy',
  async function (this: CustomWorld) {
    this.displayedCount = await this.resultCountAccuracyPage.getResultCount();
    expect(this.displayedCount).toBeGreaterThan(0);
  }
);

When(
  'all product cards are loaded and counted for result count accuracy',
  async function (this: CustomWorld) {
    this.cardCount = await this.resultCountAccuracyPage.loadAllProductCards();

    if (this.cardCount !== this.displayedCount) {
      const info = await this.page.evaluate(() => ({
        url: location.href,
        gridExists: document.querySelectorAll('[data-test-id="category-products-grid"]').length,
        cardsInGrid: document.querySelectorAll('[data-test-id="category-products-grid"] [data-test-id="product-card-link"]').length,
        cardLinksAnywhere: document.querySelectorAll('[data-test-id="product-card-link"]').length,
        productHrefs: document.querySelectorAll('a[href*="/p/"]').length,
        header: document.querySelector('[data-test-id="search-query-text"]')?.textContent?.trim()
      }));
      console.log('TC_59 DEBUG ' + JSON.stringify({ displayed: this.displayedCount, cards: this.cardCount, ...info }));
      await this.page.screenshot({ path: 'reports/screenshots/debug-TC_59.png' });
    }
  }
);

Then(
  'the displayed count should equal the product card count for result count accuracy',
  async function (this: CustomWorld) {
    expect(this.cardCount).toBe(this.displayedCount);
  }
);

Then(
  'the result count match is logged and a screenshot is captured for TC_59 Result Count',
  async function (this: CustomWorld) {
    logger.info(`TC_59 displayed count ${this.displayedCount} matches card count ${this.cardCount}`);
    await captureScreenShot(this.page, 'TC_59 Result Count');
  }
);
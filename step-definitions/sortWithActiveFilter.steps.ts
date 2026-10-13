import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortWithActiveFilterPage } from '../pages/sortWithActiveFilterPage';
import { logger } from '../utils/logger';
import { CustomWorld } from '../support/world';
import { settleResultCount } from '../support/settleCount';

Given(
  'the user navigates to the Decathlon PLP for sort with active filter',
  async function (this: CustomWorld) {
    this.sortWithActiveFilterPage = new SortWithActiveFilterPage(this.page);
    this.countText = '';
    this.filteredText = '';
    this.prices = [];

    await this.sortWithActiveFilterPage.openPlp();
    await this.sortWithActiveFilterPage.waitForProductGrid();
  }
);

When(
  'the user applies a Color filter for sort with active filter',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.sortWithActiveFilterPage.expandColorFilter();
    await this.sortWithActiveFilterPage.selectColor();
  }
);

When(
  'the filtering loader completes for sort with active filter',
  async function (this: CustomWorld) {
    await this.sortWithActiveFilterPage.waitForResultsToRefresh(this.countText);
    this.filteredText = await settleResultCount(this.page);
  }
);

When(
  'the user opens the sorting dropdown for sort with active filter',
  async function (this: CustomWorld) {
    await this.sortWithActiveFilterPage.openSortDropdown();
  }
);

When(
  'the user selects Price Low to High for sort with active filter',
  async function (this: CustomWorld) {
    await this.sortWithActiveFilterPage.selectLowToHigh();
  }
);

When(
  'the sorting loader completes for sort with active filter',
  async function (this: CustomWorld) {
    await this.sortWithActiveFilterPage.waitForSortToApply();
  }
);

When(
  'the prices of the first three loaded products are extracted for sort with active filter',
  async function (this: CustomWorld) {
    this.prices = await this.sortWithActiveFilterPage.getFirstPrices(3);
    logger.info(`TC_69 prices: ${this.prices.join(', ')}`);
  }
);

Then(
  'the three prices should be in ascending order for sort with active filter',
  async function (this: CustomWorld) {
    expect(this.prices[0]).toBeLessThanOrEqual(this.prices[1]);
    expect(this.prices[1]).toBeLessThanOrEqual(this.prices[2]);
  }
);

Then(
  'the Color filter should remain checked and the result count should match the filtered state for sort with active filter',
  async function (this: CustomWorld) {
    await expect(this.sortWithActiveFilterPage.getColorCheckbox()).toBeChecked();
    await expect(this.sortWithActiveFilterPage.getResultCountLocator()).toHaveText(this.filteredText);
  }
);
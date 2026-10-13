import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortOrderAccuracyPage } from '../pages/sortOrderAccuracyPage';
import { logger } from '../utils/logger';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the PLP and waits for page load for sort order accuracy',
  async function (this: CustomWorld) {
    this.sortOrderAccuracyPage = new SortOrderAccuracyPage(this.page);
    this.price1 = 0;
    this.price2 = 0;
    this.price3 = 0;

    await this.sortOrderAccuracyPage.openPlp();
    await this.sortOrderAccuracyPage.waitForPageLoad();
  }
);

When(
  'the user applies the Price Low to High sort for sort order accuracy',
  async function (this: CustomWorld) {
    await this.sortOrderAccuracyPage.openSortDropdown();
    await this.sortOrderAccuracyPage.selectLowToHigh();
  }
);

When(
  'the product grid fully updates for sort order accuracy',
  async function (this: CustomWorld) {
    await this.sortOrderAccuracyPage.waitForSortToApply();
  }
);

When(
  'the first product card is visible and its price is extracted for sort order accuracy',
  async function (this: CustomWorld) {
    await expect(this.sortOrderAccuracyPage.getProductCards().nth(0)).toBeVisible();
    this.price1 = await this.sortOrderAccuracyPage.getCardPrice(0);
  }
);

When(
  'the second product card is visible and its price is extracted for sort order accuracy',
  async function (this: CustomWorld) {
    await expect(this.sortOrderAccuracyPage.getProductCards().nth(1)).toBeVisible();
    this.price2 = await this.sortOrderAccuracyPage.getCardPrice(1);
  }
);

When(
  'the third product card is visible and its price is extracted for sort order accuracy',
  async function (this: CustomWorld) {
    await expect(this.sortOrderAccuracyPage.getProductCards().nth(2)).toBeVisible();
    this.price3 = await this.sortOrderAccuracyPage.getCardPrice(2);
  }
);

Then(
  'the first three prices should be in ascending order for sort order accuracy',
  async function (this: CustomWorld) {
    logger.info(`TC_68 prices: ${this.price1}, ${this.price2}, ${this.price3}`);
    expect(this.price1).toBeLessThanOrEqual(this.price2);
    expect(this.price2).toBeLessThanOrEqual(this.price3);
  }
);
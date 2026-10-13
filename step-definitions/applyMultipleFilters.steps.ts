import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApplyMultipleFiltersPage } from '../pages/applyMultipleFiltersPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the targeted PLP and notes the baseline count for multiple filters',
  async function (this: CustomWorld) {
    this.applyMultipleFiltersPage = new ApplyMultipleFiltersPage(this.page);
    this.baselineText = '';
    this.afterSizeText = '';
    this.afterSizeCount = 0;
    this.firstTitle = '';
    this.firstPrice = 0;

    await this.applyMultipleFiltersPage.openPlp();
    await this.applyMultipleFiltersPage.waitForProductGrid();
    this.baselineText = await this.applyMultipleFiltersPage.getResultCountText();
  }
);

When(
  'the user expands the Size section and checks size L for multiple filters',
  async function (this: CustomWorld) {
    await this.applyMultipleFiltersPage.expandSizeFilter();
    await this.applyMultipleFiltersPage.selectSize();
  }
);

When(
  'the results refresh after the size L selection for multiple filters',
  async function (this: CustomWorld) {
    await this.applyMultipleFiltersPage.waitForResultsToRefresh(this.baselineText);
    this.afterSizeText = await this.applyMultipleFiltersPage.getResultCountText();
    this.afterSizeCount = await this.applyMultipleFiltersPage.getResultCount();
  }
);

When(
  'the user expands the Color section and selects Blue for multiple filters',
  async function (this: CustomWorld) {
    await this.applyMultipleFiltersPage.expandColorFilter();
    await this.applyMultipleFiltersPage.selectColor();
  }
);

When(
  'the results refresh after the Blue selection for multiple filters',
  async function (this: CustomWorld) {
    await this.applyMultipleFiltersPage.waitForResultsToRefresh(this.afterSizeText);
  }
);

When(
  'the details of the first loaded product are extracted for multiple filters',
  async function (this: CustomWorld) {
    this.firstTitle = await this.applyMultipleFiltersPage.getCardTitleText(0);
    this.firstPrice = await this.applyMultipleFiltersPage.getCardPrice(0);
    logger.info(`TC_58 first product: ${this.firstTitle} | ${this.firstPrice}`);
  }
);

Then(
  'the size L and Blue color checkboxes should both be checked for multiple filters',
  async function (this: CustomWorld) {
    await expect(this.applyMultipleFiltersPage.getSizeCheckbox()).toBeChecked();
    await expect(this.applyMultipleFiltersPage.getColorCheckbox()).toBeChecked();
  }
);

Then(
  'the final count should be greater than zero and less than the count after size L',
  async function (this: CustomWorld) {
    await expect
      .poll(
        async () => await this.applyMultipleFiltersPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeLessThan(this.afterSizeCount);

    const finalCount = await this.applyMultipleFiltersPage.getResultCount();
    expect(finalCount).toBeGreaterThan(0);
  }
);

Then(
  'the first product title should not be empty and its price should be greater than zero',
  async function (this: CustomWorld) {
    expect(this.firstTitle).not.toBe('');
    expect(this.firstPrice).toBeGreaterThan(0);
  }
);

Then(
  'a screenshot is captured for TC_58 Size L and Blue Applied',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_58 Size L and Blue Applied');
  }
);
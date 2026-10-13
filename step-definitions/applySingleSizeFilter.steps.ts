import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApplySingleSizeFilterPage } from '../pages/applySingleSizeFilterPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';
import { settleResultCount } from '../support/settleCount';

Given(
  'the user navigates to a valid Decathlon PLP for single size filter',
  async function (this: CustomWorld) {
    this.applySingleSizeFilterPage = new ApplySingleSizeFilterPage(this.page);
    this.baselineText = '';
    this.baselineCount = 0;
    this.filteredCount = 0;
    await this.applySingleSizeFilterPage.openPlp();
  }
);

Given(
  'the product grid is stable and the baseline result count is noted for single size filter',
  async function (this: CustomWorld) {
    await this.applySingleSizeFilterPage.waitForProductGrid();
    this.baselineText = await settleResultCount(this.page);
    this.baselineCount = await this.applySingleSizeFilterPage.getResultCount();
  }
);

Given(
  'the Size filter accordion is visible for single size filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleSizeFilterPage.getSizeAccordion()).toBeVisible();
  }
);

When(
  'the user expands the Size section for single size filter',
  async function (this: CustomWorld) {
    await this.applySingleSizeFilterPage.expandSizeFilter();
  }
);

When(
  'the size M checkbox is visible for single size filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleSizeFilterPage.getSizeOption()).toBeVisible();
  }
);

When(
  'the user clicks the size M checkbox for single size filter',
  async function (this: CustomWorld) {
    await this.applySingleSizeFilterPage.selectSize();
  }
);

When(
  'the results refresh after the size M selection',
  async function (this: CustomWorld) {
    await this.applySingleSizeFilterPage.waitForResultsToRefresh(this.baselineText);
    await settleResultCount(this.page);
  }
);

Then(
  'the size M checkbox should be checked for single size filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleSizeFilterPage.getSizeCheckbox()).toBeChecked();
  }
);

Then(
  'the filtered count should be greater than zero and less than the baseline count',
  async function (this: CustomWorld) {
    await expect
      .poll(
        async () => await this.applySingleSizeFilterPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeLessThan(this.baselineCount);

    this.filteredCount = await this.applySingleSizeFilterPage.getResultCount();
    expect(this.filteredCount).toBeGreaterThan(0);
  }
);

Then(
  'the first product card should be visible after size M filtering',
  async function (this: CustomWorld) {
    await expect(this.applySingleSizeFilterPage.getProductCards().first()).toBeVisible();
  }
);

Then(
  'the filtered product count for size M is logged',
  async function (this: CustomWorld) {
    logger.info(`TC_56 filtered product count for size M: ${this.filteredCount}`);
  }
);

Then(
  'a screenshot is captured for TC_56 Size M Applied',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_56 Size M Applied');
  }
);
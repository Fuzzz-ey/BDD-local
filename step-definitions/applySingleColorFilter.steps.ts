import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApplySingleColorFilterPage } from '../pages/applySingleColorFilterPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the Decathlon PLP for single color filter',
  async function (this: CustomWorld) {
    this.applySingleColorFilterPage = new ApplySingleColorFilterPage(this.page);
    this.baselineText = '';
    this.baselineCount = 0;
    await this.applySingleColorFilterPage.openPlp();
  }
);

Given(
  'the page load completes and the baseline result count is noted for single color filter',
  async function (this: CustomWorld) {
    await this.applySingleColorFilterPage.waitForPageLoad();
    this.baselineText = await this.applySingleColorFilterPage.getResultCountText();
    this.baselineCount = await this.applySingleColorFilterPage.getResultCount();
  }
);

Given(
  'the Color filter accordion is visible for single color filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleColorFilterPage.getColorAccordion()).toBeVisible();
  }
);

When(
  'the user expands the Color section for single color filter',
  async function (this: CustomWorld) {
    await this.applySingleColorFilterPage.expandColorFilter();
  }
);

When(
  'the Black color swatch is visible for single color filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleColorFilterPage.getColorOption()).toBeVisible();
  }
);

When(
  'the user clicks the Black color swatch for single color filter',
  async function (this: CustomWorld) {
    await this.applySingleColorFilterPage.selectColor();
  }
);

When(
  'the product grid refreshes after the Black color selection',
  async function (this: CustomWorld) {
    await this.applySingleColorFilterPage.waitForResultsToRefresh(this.baselineText);
  }
);

Then(
  'the Black color checkbox should be checked for single color filter',
  async function (this: CustomWorld) {
    await expect(this.applySingleColorFilterPage.getColorCheckbox()).toBeChecked();
  }
);

Then(
  'the color filtered count should be greater than zero and less than the baseline count',
  async function (this: CustomWorld) {
    await expect
      .poll(
        async () => await this.applySingleColorFilterPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeLessThan(this.baselineCount);

    const filteredCount = await this.applySingleColorFilterPage.getResultCount();
    expect(filteredCount).toBeGreaterThan(0);
  }
);

Then(
  'the first product card image should be visible after Black color filtering',
  async function (this: CustomWorld) {
    await expect(this.applySingleColorFilterPage.getFirstCardImage()).toBeVisible();
  }
);

Then(
  'a screenshot is captured for TC_57 Black Applied',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_57 Black Applied');
  }
);

Then(
  'the Black colour filter success message is logged',
  async function (this: CustomWorld) {
    logger.info('TC_57 Black colour filter applied successfully');
  }
);
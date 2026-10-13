import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DeselectSingleFilterPage } from '../pages/deselectSingleFilterPage';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';
import { settleResultCount } from '../support/settleCount';

Given(
  'the user navigates to the PLP and waits for load for deselect single filter',
  async function (this: CustomWorld) {
    this.deselectSingleFilterPage = new DeselectSingleFilterPage(this.page);
    this.countText = '';
    this.recordedText = '';
    this.recordedCount = 0;
    this.newCount = 0;

    await this.deselectSingleFilterPage.openPlp();
    await this.deselectSingleFilterPage.waitForProductGrid();
  }
);

When(
  'the user selects a Size filter and waits for the UI update for deselect single filter',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.deselectSingleFilterPage.expandSizeFilter();
    await this.deselectSingleFilterPage.selectSize();
    await this.deselectSingleFilterPage.waitForResultsToRefresh(this.countText);
    await settleResultCount(this.page);
  }
);

When(
  'the user selects a Color filter and waits for the UI update for deselect single filter',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.deselectSingleFilterPage.expandColorFilter();
    await this.deselectSingleFilterPage.selectColor();
    await this.deselectSingleFilterPage.waitForResultsToRefresh(this.countText);
    await settleResultCount(this.page);
  }
);

When(
  'the current product result count is recorded for deselect single filter',
  async function (this: CustomWorld) {
    this.recordedText = await settleResultCount(this.page);
    this.recordedCount = await this.deselectSingleFilterPage.getResultCount();
  }
);

When(
  'the applied Size filter checkbox is checked for deselect single filter',
  async function (this: CustomWorld) {
    await expect(this.deselectSingleFilterPage.getSizeCheckbox()).toBeChecked();
  }
);

When(
  'the user clicks the Size checkbox again to deselect it for deselect single filter',
  async function (this: CustomWorld) {
    await this.deselectSingleFilterPage.deselectSize();
  }
);

When(
  'the results refresh after the Size deselection for deselect single filter',
  async function (this: CustomWorld) {
    await this.deselectSingleFilterPage.waitForResultsToRefresh(this.recordedText);
    await settleResultCount(this.page);
  }
);

Then(
  'the new result count should be greater than the recorded count for deselect single filter',
  async function (this: CustomWorld) {
    await expect
      .poll(
        async () => await this.deselectSingleFilterPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeGreaterThan(this.recordedCount);

    this.newCount = await this.deselectSingleFilterPage.getResultCount();
  }
);

Then(
  'the Size checkbox should be unchecked and the Color checkbox should remain checked for deselect single filter',
  async function (this: CustomWorld) {
    await expect(this.deselectSingleFilterPage.getSizeCheckbox()).not.toBeChecked();
    await expect(this.deselectSingleFilterPage.getColorCheckbox()).toBeChecked();
  }
);

Then(
  'a screenshot is captured for TC_61 Size Deselected',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_61 Size Deselected');
  }
);
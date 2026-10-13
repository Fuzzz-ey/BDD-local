import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NoResultsFilterUiPage } from '../pages/noResultsFilterUiPage';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_60');

Given(
  'the user navigates to the Decathlon PLP for no results filter UI',
  async function (this: CustomWorld) {
    this.noResultsFilterUiPage = new NoResultsFilterUiPage(this.page);
    this.baselineText = '';
    await this.noResultsFilterUiPage.openPlp();
  }
);

Given(
  'the page load completes and the baseline result count text is noted for no results filter UI',
  async function (this: CustomWorld) {
    await this.noResultsFilterUiPage.waitForPageLoad();
    this.baselineText = await this.noResultsFilterUiPage.getResultCountText();
  }
);

When(
  'the user expands the Size filter and selects a restrictive size for no results filter UI',
  async function (this: CustomWorld) {
    await this.noResultsFilterUiPage.expandSizeFilter();
    await this.noResultsFilterUiPage.selectSize();
    await this.noResultsFilterUiPage.waitForResultsToRefresh(this.baselineText);
  }
);

When(
  'the user expands the Color filter and applies a conflicting color for no results filter UI',
  async function (this: CustomWorld) {
    await this.noResultsFilterUiPage.expandColorFilter();
    await expect(this.noResultsFilterUiPage.getConflictingColorOption()).toHaveCount(0);
    await this.noResultsFilterUiPage.applyConflictingFilters();
  }
);

When(
  'the filtered page response is resolved for no results filter UI',
  async function (this: CustomWorld) {
    await this.noResultsFilterUiPage.waitForFilteredPage();
  }
);

Then(
  'the product grid should be empty for no results filter UI',
  async function (this: CustomWorld) {
    await expect(this.noResultsFilterUiPage.getProductCards()).toHaveCount(0, { timeout: 15000 });
  }
);

Then(
  'zero product cards should exist in the DOM for no results filter UI',
  async function (this: CustomWorld) {
    expect(await this.noResultsFilterUiPage.getProductCards().count()).toBe(0);
  }
);

Then(
  'the collections fallback message should be visible for no results filter UI',
  async function (this: CustomWorld) {
    await expect(this.noResultsFilterUiPage.getCollectionsMessage()).toBeVisible();
  }
);

Then(
  'the collections fallback message should match the expected text for no results filter UI',
  async function (this: CustomWorld) {
    await expect(this.noResultsFilterUiPage.getCollectionsMessage()).toHaveText(data.expectedMessage);
  }
);

Then(
  'a screenshot is captured for TC_60 No Results',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_60 No Results');
  }
);
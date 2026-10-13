import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ClearAllFiltersPage } from '../pages/clearAllFiltersPage';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the Decathlon PLP and notes the baseline count for clear all filters',
  async function (this: CustomWorld) {
    this.clearAllFiltersPage = new ClearAllFiltersPage(this.page);
    this.countText = '';
    this.baselineCount = 0;
    this.filteredText = '';
    this.filteredCount = 0;

    await this.clearAllFiltersPage.openPlp();
    await this.clearAllFiltersPage.waitForProductGrid();
    this.baselineCount = await this.clearAllFiltersPage.getResultCount();
  }
);

When(
  'the user applies Size and Color filter constraints for clear all filters',
  async function (this: CustomWorld) {
    this.countText = await this.clearAllFiltersPage.getResultCountText();
    await this.clearAllFiltersPage.expandSizeFilter();
    await this.clearAllFiltersPage.selectSize();
    await this.clearAllFiltersPage.waitForResultsToRefresh(this.countText);
    this.countText = await this.clearAllFiltersPage.getResultCountText();
    await this.clearAllFiltersPage.expandColorFilter();
    await this.clearAllFiltersPage.selectColor();
  }
);

When(
  'the product list finishes filtering for clear all filters',
  async function (this: CustomWorld) {
    await this.clearAllFiltersPage.waitForResultsToRefresh(this.countText);
  }
);

When(
  'the filtered total product count is recorded and is below the baseline for clear all filters',
  async function (this: CustomWorld) {
    this.filteredText = await this.clearAllFiltersPage.getResultCountText();

    await expect
      .poll(
        async () => await this.clearAllFiltersPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeLessThan(this.baselineCount);

    this.filteredCount = await this.clearAllFiltersPage.getResultCount();
  }
);

When(
  'the user scrolls to the top of the filter sidebar for clear all filters',
  async function (this: CustomWorld) {
    await this.clearAllFiltersPage.scrollToFilterSidebar();
  }
);

When(
  'the Clear All button is visible for clear all filters',
  async function (this: CustomWorld) {
    await expect(this.clearAllFiltersPage.getClearAllButton()).toBeVisible();
  }
);

When(
  'the user clicks the Clear All button for clear all filters',
  async function (this: CustomWorld) {
    await this.clearAllFiltersPage.clickClearAll();
  }
);

When(
  'the default product grid reloads for clear all filters',
  async function (this: CustomWorld) {
    await this.clearAllFiltersPage.waitForResultsToRefresh(this.filteredText);
  }
);

Then(
  'no filter checkboxes should be checked for clear all filters',
  async function (this: CustomWorld) {
    await expect(this.clearAllFiltersPage.getCheckedFilters()).toHaveCount(0);
  }
);

Then(
  'the total count should revert to at least the baseline count for clear all filters',
  async function (this: CustomWorld) {
    await expect
      .poll(
        async () => await this.clearAllFiltersPage.getResultCount(),
        { timeout: 20000, intervals: [500, 1000, 2000] }
      )
      .toBeGreaterThanOrEqual(this.baselineCount);
  }
);
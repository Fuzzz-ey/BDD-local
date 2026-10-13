import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FilterPersistencePage } from '../pages/filterPersistencePage';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';
import { settleResultCount } from '../support/settleCount';

Given(
  'the user navigates to the target PLP for filter persistence',
  async function (this: CustomWorld) {
    this.filterPersistencePage = new FilterPersistencePage(this.page);
    this.countText = '';
    this.filteredText = '';

    await this.filterPersistencePage.openPlp();
    await this.filterPersistencePage.waitForProductGrid();
  }
);

When(
  'the user applies the Size M filter constraint for filter persistence',
  async function (this: CustomWorld) {
    this.countText = await settleResultCount(this.page);
    await this.filterPersistencePage.expandSizeFilter();
    await this.filterPersistencePage.selectSize();
  }
);

When(
  'the product list updates after the Size M selection for filter persistence',
  async function (this: CustomWorld) {
    await this.filterPersistencePage.waitForResultsToRefresh(this.countText);
    this.filteredText = await settleResultCount(this.page);
  }
);

When(
  'the user reloads the page for filter persistence',
  async function (this: CustomWorld) {
    await this.filterPersistencePage.reloadPage();
  }
);

When(
  'the page reaches domcontentloaded again and the product grid is visible for filter persistence',
  async function (this: CustomWorld) {
    await this.filterPersistencePage.waitForDomContentLoaded();
    await this.filterPersistencePage.waitForProductGrid();
  }
);

When(
  'the Size filter is visible in the sidebar and expanded for filter persistence',
  async function (this: CustomWorld) {
    await expect(this.filterPersistencePage.getSizeFilter()).toBeVisible();
    await this.filterPersistencePage.expandSizeFilter();
  }
);

Then(
  'the Size M checkbox should still be checked for filter persistence',
  async function (this: CustomWorld) {
    await expect(this.filterPersistencePage.getSizeCheckbox()).toBeChecked();
  }
);

Then(
  'the product cards count should be greater than zero for filter persistence',
  async function (this: CustomWorld) {
    expect(await this.filterPersistencePage.getProductCards().count()).toBeGreaterThan(0);
  }
);

Then(
  'the result count should reflect the filtered state for filter persistence',
  async function (this: CustomWorld) {
    await expect(this.filterPersistencePage.getResultCountLocator()).toHaveText(
      this.filteredText,
      { timeout: 15000 }
    );
  }
);

Then(
  'a screenshot is captured for TC_64 Filter After Reload',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_64 Filter After Reload');
  }
);
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FilterVisibilityPage } from '../pages/filterVisibilityPage';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../utils/world'

Given(
  'the user navigates to the Decathlon PLP URL for filter visibility',
  async function (this: CustomWorld) {
    this.filterVisibilityPage = new FilterVisibilityPage(this.page);
    await this.filterVisibilityPage.openPlp();
  }
);

Given(
  'the page reaches the domcontentloaded state',
  async function (this: CustomWorld) {
    await this.filterVisibilityPage.waitForDomContentLoaded();
  }
);

When(
  'the user scrolls down to the left-side filter sidebar',
  async function (this: CustomWorld) {
    await this.filterVisibilityPage.scrollToFilterSidebar();
  }
);

Then(
  'the Size filter container should be attached to the DOM',
  async function (this: CustomWorld) {
    await expect(this.filterVisibilityPage.getSizeFilter()).toBeAttached();
  }
);

Then(
  'the Size filter should be visible',
  async function (this: CustomWorld) {
    await expect(this.filterVisibilityPage.getSizeFilter()).toBeVisible();
  }
);

Then(
  'the Color filter should be visible',
  async function (this: CustomWorld) {
    await expect(this.filterVisibilityPage.getColorFilter()).toBeVisible();
  }
);

Then(
  'a screenshot is captured for TC_55 Filter Visibility',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_55 Filter Visibility');
  }
);
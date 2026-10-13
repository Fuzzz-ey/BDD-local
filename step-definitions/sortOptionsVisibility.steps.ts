import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortOptionsVisibilityPage } from '../pages/sortOptionsVisibilityPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_66');

Given(
  'the user navigates to the targeted Decathlon PLP for sort options visibility',
  async function (this: CustomWorld) {
    this.sortOptionsVisibilityPage = new SortOptionsVisibilityPage(this.page);
    this.optionTexts = [];
    await this.sortOptionsVisibilityPage.openPlp();
  }
);

Given(
  'the page load completes for sort options visibility',
  async function (this: CustomWorld) {
    await this.sortOptionsVisibilityPage.waitForPageLoad();
  }
);

Given(
  'the sorting dropdown is visible for sort options visibility',
  async function (this: CustomWorld) {
    await expect(this.sortOptionsVisibilityPage.getSortDropdown()).toBeVisible();
  }
);

When(
  'the user opens the sorting dropdown for sort options visibility',
  async function (this: CustomWorld) {
    await this.sortOptionsVisibilityPage.openSortDropdown();
  }
);

When(
  'all sort option texts are fetched and the list is not empty for sort options visibility',
  async function (this: CustomWorld) {
    this.optionTexts = await this.sortOptionsVisibilityPage.getSortOptionTexts();
    expect(this.optionTexts.length).toBeGreaterThan(0);
  }
);

Then(
  'the options should contain the Low to High label for sort options visibility',
  async function (this: CustomWorld) {
    expect(this.optionTexts).toContain(data.lowToHighLabel);
  }
);

Then(
  'the options should contain the High to Low option for sort options visibility',
  async function (this: CustomWorld) {
    expect(this.optionTexts).toContain(data.highToLowOption);
  }
);

Then(
  'the options should contain the Highest discount option for sort options visibility',
  async function (this: CustomWorld) {
    expect(this.optionTexts).toContain(data.discountOption);
  }
);

Then(
  'a screenshot is captured for TC_66 Sort Options',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_66 Sort Options');
  }
);

Then(
  'the full list of sort options is logged for sort options visibility',
  async function (this: CustomWorld) {
    logger.info(`TC_66 sort options: ${this.optionTexts.join(', ')}`);
  }
);
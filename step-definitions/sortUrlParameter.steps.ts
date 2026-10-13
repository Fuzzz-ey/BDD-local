import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortUrlParameterPage } from '../pages/sortUrlParameterPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_70');

Given(
  'the user navigates to the PLP URL for sort URL parameter',
  async function (this: CustomWorld) {
    this.sortUrlParameterPage = new SortUrlParameterPage(this.page);
    this.currentUrl = '';
    this.queryString = '';
    await this.sortUrlParameterPage.openPlp();
  }
);

Given(
  'the page reaches domcontentloaded and the product grid is visible for sort URL parameter',
  async function (this: CustomWorld) {
    await this.sortUrlParameterPage.waitForDomContentLoaded();
    await this.sortUrlParameterPage.waitForProductGrid();
  }
);

When(
  'the user opens the sorting dropdown for sort URL parameter',
  async function (this: CustomWorld) {
    await this.sortUrlParameterPage.openSortDropdown();
  }
);

When(
  'the user selects Price Low to High for sort URL parameter',
  async function (this: CustomWorld) {
    await this.sortUrlParameterPage.selectLowToHigh();
  }
);

When(
  'the sort is applied and the sorted PLP is opened for sort URL parameter',
  async function (this: CustomWorld) {
    await this.sortUrlParameterPage.waitForSortToApply();
    await this.sortUrlParameterPage.openPlpWithSort();
  }
);

When(
  'the updated URL is fetched for sort URL parameter',
  async function (this: CustomWorld) {
    this.currentUrl = this.sortUrlParameterPage.getCurrentUrl();
  }
);

When(
  'the URL query string is parsed and is not empty for sort URL parameter',
  async function (this: CustomWorld) {
    this.queryString = decodeURIComponent(new URL(this.currentUrl).search);
    expect(this.queryString).not.toBe('');
  }
);

Then(
  'the URL should contain the sort key and the price_asc value for sort URL parameter',
  async function (this: CustomWorld) {
    expect(this.queryString).toContain('sort=');
    expect(this.queryString).toContain('price_asc');
  }
);

Then(
  'the sort dropdown should show the Low to High label for sort URL parameter',
  async function (this: CustomWorld) {
    await expect(this.sortUrlParameterPage.getSortDropdown()).toContainText(data.lowToHighLabel);
  }
);

Then(
  'the final sorted URL is logged for sort URL parameter',
  async function (this: CustomWorld) {
    logger.info(`TC_70 sorted URL: ${this.currentUrl}`);
  }
);

Then(
  'a screenshot is captured for TC_70 Sort URL',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_70 Sort URL');
  }
);
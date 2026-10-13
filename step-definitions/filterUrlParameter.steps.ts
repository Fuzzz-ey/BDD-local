import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FilterUrlParameterPage } from '../pages/filterUrlParameterPage';
import { logger } from '../utils/logger';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_63');

Given(
  'the user navigates to the base Decathlon PLP URL for filter URL parameter',
  async function (this: CustomWorld) {
    this.filterUrlParameterPage = new FilterUrlParameterPage(this.page);
    this.baseUrl = '';
    this.urlAfterSize = '';
    this.currentUrl = '';

    await this.filterUrlParameterPage.openPlp();
    await this.filterUrlParameterPage.waitForProductGrid();
  }
);

Given(
  'the initial base URL is recorded for filter URL parameter',
  async function (this: CustomWorld) {
    this.baseUrl = this.filterUrlParameterPage.getCurrentUrl();
  }
);

When(
  'the user selects the Size filter for filter URL parameter',
  async function (this: CustomWorld) {
    await this.filterUrlParameterPage.expandSizeFilter();
    await this.filterUrlParameterPage.selectSize();
  }
);

When(
  'the URL changes after the Size selection for filter URL parameter',
  async function (this: CustomWorld) {
    await this.filterUrlParameterPage.waitForUrlChange(this.baseUrl);
    this.urlAfterSize = this.filterUrlParameterPage.getCurrentUrl();
  }
);

When(
  'the user selects the Color filter for filter URL parameter',
  async function (this: CustomWorld) {
    await this.filterUrlParameterPage.expandColorFilter();
    await this.filterUrlParameterPage.selectColor();
  }
);

When(
  'the URL changes after the Color selection for filter URL parameter',
  async function (this: CustomWorld) {
    await this.filterUrlParameterPage.waitForUrlChange(this.urlAfterSize);
  }
);

When(
  'the current active URL is fetched for filter URL parameter',
  async function (this: CustomWorld) {
    this.currentUrl = decodeURIComponent(this.filterUrlParameterPage.getCurrentUrl());
  }
);

Then(
  'the URL should contain the size query parameter for filter URL parameter',
  async function (this: CustomWorld) {
    expect(this.currentUrl).toContain('?');
    expect(this.currentUrl).toMatch(/size/i);
    expect(this.currentUrl).toContain(data.size);
  }
);

Then(
  'the URL should contain the color query parameter for filter URL parameter',
  async function (this: CustomWorld) {
    expect(this.currentUrl).toMatch(/colou?r/i);
    expect(this.currentUrl.toLowerCase()).toContain(data.color.toLowerCase());
  }
);

Then(
  'the filtered URL is logged and a screenshot is captured for TC_63 Filter URL',
  async function (this: CustomWorld) {
    logger.info(`TC_63 filtered URL: ${this.currentUrl}`);
    await captureScreenShot(this.page, 'TC_63 Filter URL');
  }
);
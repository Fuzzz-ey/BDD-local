import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NavigateToPdpPage } from '../pages/navigateToPdpPage';
import { captureScreenShot } from '../utils/runReport';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the Decathlon PLP for navigate to PDP',
  async function (this: CustomWorld) {
    this.navigateToPdpPage = new NavigateToPdpPage(this.page);
    this.currentUrl = '';
    await this.navigateToPdpPage.openPlp();
  }
);

Given(
  'the product cards are rendered in the DOM for navigate to PDP',
  async function (this: CustomWorld) {
    await this.navigateToPdpPage.waitForProductGrid();
  }
);

When(
  'the first product card is visible for navigate to PDP',
  async function (this: CustomWorld) {
    await expect(this.navigateToPdpPage.getProductCards().first()).toBeVisible();
  }
);

When(
  'the user scrolls the first product card into the viewport for navigate to PDP',
  async function (this: CustomWorld) {
    await this.navigateToPdpPage.scrollFirstCardIntoView();
  }
);

When(
  'the user clicks the first product card for navigate to PDP',
  async function (this: CustomWorld) {
    await this.navigateToPdpPage.clickFirstProductCard();
  }
);

When(
  'the PDP document finishes loading for navigate to PDP',
  async function (this: CustomWorld) {
    await this.navigateToPdpPage.waitForPdp();
  }
);

When(
  'the current URL is fetched for navigate to PDP',
  async function (this: CustomWorld) {
    this.currentUrl = this.navigateToPdpPage.getCurrentUrl();
  }
);

Then(
  'the URL should match a valid PDP structure for navigate to PDP',
  async function (this: CustomWorld) {
    expect(this.currentUrl).toMatch(/\/p\//);
  }
);

Then(
  'the PDP title should be visible for navigate to PDP',
  async function (this: CustomWorld) {
    await expect(this.navigateToPdpPage.getPdpTitle()).toBeVisible();
  }
);

Then(
  'a screenshot is captured for TC_71 PDP Loaded',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_71 PDP Loaded');
  }
);
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductDataMatchPage } from '../pages/productDataMatchPage';
import { logger } from '../utils/logger';
import { CustomWorld } from '../support/world';

Given(
  'the user navigates to the PLP and waits for the idle state for product data match',
  async function (this: CustomWorld) {
    this.productDataMatchPage = new ProductDataMatchPage(this.page);
    this.plpTitle = '';
    this.plpPrice = 0;
    this.pdpTitle = '';
    this.pdpPrice = 0;

    await this.productDataMatchPage.openPlp();
    await this.productDataMatchPage.waitForPageLoad();
  }
);

When(
  'the first product card is visible for product data match',
  async function (this: CustomWorld) {
    await expect(this.productDataMatchPage.getProductCards().first()).toBeVisible();
  }
);

When(
  'the product title is extracted from the PLP card for product data match',
  async function (this: CustomWorld) {
    this.plpTitle = await this.productDataMatchPage.getCardTitleText(0);
  }
);

When(
  'the product price is extracted from the PLP card for product data match',
  async function (this: CustomWorld) {
    this.plpPrice = await this.productDataMatchPage.getCardPrice(0);
  }
);

When(
  'the user clicks the first product card for product data match',
  async function (this: CustomWorld) {
    await this.productDataMatchPage.clickFirstProductCard();
  }
);

When(
  'the PDP finishes rendering for product data match',
  async function (this: CustomWorld) {
    await this.productDataMatchPage.waitForPdp();
  }
);

When(
  'the product title is extracted from the PDP for product data match',
  async function (this: CustomWorld) {
    this.pdpTitle = await this.productDataMatchPage.getPdpTitleText();
  }
);

When(
  'the product price is extracted from the PDP for product data match',
  async function (this: CustomWorld) {
    this.pdpPrice = await this.productDataMatchPage.getPdpPrice();
  }
);

Then(
  'the PLP title should contain the PDP title for product data match',
  async function (this: CustomWorld) {
    logger.info(`TC_72 PLP: ${this.plpTitle} | PDP: ${this.pdpTitle}`);
    expect(this.plpTitle).toContain(this.pdpTitle);
  }
);

Then(
  'the PDP price should equal the PLP price for product data match',
  async function (this: CustomWorld) {
    expect(this.pdpPrice).toBe(this.plpPrice);
  }
);
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BackNavigationStatePage } from '../pages/backNavigationStatePage';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_74');

Given(
  'the user navigates to the PLP for back navigation state',
  async function (this: CustomWorld) {
    this.backNavigationStatePage = new BackNavigationStatePage(this.page);
    this.prices = [];

    await this.backNavigationStatePage.openPlp();
    await this.backNavigationStatePage.waitForProductGrid();
  }
);

When(
  'the user applies the Price Low to High sort for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.openSortDropdown();
    await this.backNavigationStatePage.selectLowToHigh();
  }
);

When(
  'the product list processes the sort for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.waitForSortToApply();
  }
);

When(
  'the user clicks the first product card to open the PDP for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.clickFirstProductCard();
  }
);

When(
  'the PDP loads entirely for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.waitForPdp();
  }
);

When(
  'the user navigates back to the PLP for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.goBack();
  }
);

When(
  'the PLP product grid re-renders for back navigation state',
  async function (this: CustomWorld) {
    await this.backNavigationStatePage.waitForProductGrid();
  }
);

When(
  'the sorting dropdown is visible for back navigation state',
  async function (this: CustomWorld) {
    await expect(this.backNavigationStatePage.getSortDropdown()).toBeVisible();
  }
);

Then(
  'the sort dropdown should still show Price Low to High for back navigation state',
  async function (this: CustomWorld) {
    await expect(this.backNavigationStatePage.getSortDropdown()).toContainText(data.lowToHighLabel);
  }
);

Then(
  'the first three product prices should remain in ascending order for back navigation state',
  async function (this: CustomWorld) {
    this.prices = await this.backNavigationStatePage.getFirstPrices(3);
    expect(this.prices[0]).toBeLessThanOrEqual(this.prices[1]);
    expect(this.prices[1]).toBeLessThanOrEqual(this.prices[2]);
  }
);
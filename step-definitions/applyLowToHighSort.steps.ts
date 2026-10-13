import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApplyLowToHighSortPage } from '../pages/applyLowToHighSortPage';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_67');

Given(
  'the user navigates to the Decathlon PLP URL for low to high sort',
  async function (this: CustomWorld) {
    this.applyLowToHighSortPage = new ApplyLowToHighSortPage(this.page);
    this.selectedSort = '';
    await this.applyLowToHighSortPage.openPlp();
  }
);

Given(
  'the initial product grid is loaded for low to high sort',
  async function (this: CustomWorld) {
    await this.applyLowToHighSortPage.waitForProductGrid();
  }
);

When(
  'the user opens the sorting dropdown for low to high sort',
  async function (this: CustomWorld) {
    await this.applyLowToHighSortPage.openSortDropdown();
  }
);

When(
  'the user selects the Price Low to High option for low to high sort',
  async function (this: CustomWorld) {
    await this.applyLowToHighSortPage.selectLowToHigh();
  }
);

When(
  'the sorting request is applied for low to high sort',
  async function (this: CustomWorld) {
    await this.applyLowToHighSortPage.waitForSortToApply();
  }
);

When(
  'the loading spinner detaches for low to high sort',
  async function (this: CustomWorld) {
    await this.applyLowToHighSortPage.waitForLoaderToDetach();
  }
);

Then(
  'the first product card should be visible after re-render for low to high sort',
  async function (this: CustomWorld) {
    await expect(this.applyLowToHighSortPage.getProductCards().first()).toBeVisible();
  }
);

Then(
  'the selected sort value should be Price Low to High for low to high sort',
  async function (this: CustomWorld) {
    this.selectedSort = await this.applyLowToHighSortPage.getSelectedSortText();
    expect(this.selectedSort).toContain(data.lowToHighLabel);
  }
);

Then(
  'a screenshot is captured for TC_67 Low to High Applied',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_67 Low to High Applied');
  }
);
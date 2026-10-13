import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DefaultSortUiPage } from '../pages/defaultSortUiPage';
import { captureScreenShot } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_65');

Given(
  'the user navigates to the Decathlon PLP for default sort UI',
  async function (this: CustomWorld) {
    this.defaultSortUiPage = new DefaultSortUiPage(this.page);
    this.selectedSort = '';
    await this.defaultSortUiPage.openPlp();
  }
);

Given(
  'the primary product grid is loaded for default sort UI',
  async function (this: CustomWorld) {
    await this.defaultSortUiPage.waitForProductGrid();
  }
);

When(
  'the user scrolls the sorting dropdown into the viewport for default sort UI',
  async function (this: CustomWorld) {
    await this.defaultSortUiPage.scrollToSortDropdown();
  }
);

When(
  'the sort dropdown is visible for default sort UI',
  async function (this: CustomWorld) {
    await expect(this.defaultSortUiPage.getSortDropdown()).toBeVisible();
  }
);

When(
  'the text of the currently selected sort option is extracted for default sort UI',
  async function (this: CustomWorld) {
    this.selectedSort = await this.defaultSortUiPage.getSelectedSortText();
  }
);

Then(
  'the selected sort text should match the expected default for default sort UI',
  async function (this: CustomWorld) {
    expect(this.selectedSort).toContain(data.defaultSort);
  }
);

Then(
  'a screenshot is captured for TC_65 Default Sort',
  async function (this: CustomWorld) {
    await captureScreenShot(this.page, 'TC_65 Default Sort');
  }
);
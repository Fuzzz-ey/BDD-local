import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InvalidSearchQueryResultsPage } from '../pages/invalidSearchQueryResultsPage';
import { getTestData } from '../utils/testDataReader';
import { CustomWorld } from '../support/world';

const data = getTestData('TC_73');

Given(
  'the user navigates to the Decathlon India homepage for invalid search query',
  async function (this: CustomWorld) {
    this.invalidSearchQueryResultsPage = new InvalidSearchQueryResultsPage(this.page);
    this.searchText = data.searchText;
    this.cardCount = -1;
    await this.invalidSearchQueryResultsPage.openHomePage();
  }
);

Given(
  'the global header is loaded for invalid search query',
  async function (this: CustomWorld) {
    await this.invalidSearchQueryResultsPage.waitForGlobalHeader();
  }
);

When(
  'the main search bar input is visible for invalid search query',
  async function (this: CustomWorld) {
    await expect(this.invalidSearchQueryResultsPage.getSearchInput()).toBeVisible();
  }
);

When(
  'the user enters the invalid search text for invalid search query',
  async function (this: CustomWorld) {
    await this.invalidSearchQueryResultsPage.enterSearchText(this.searchText);
    await expect(this.invalidSearchQueryResultsPage.getSearchInput()).toHaveValue(this.searchText);
  }
);

When(
  'the user presses Enter to trigger the search for invalid search query',
  async function (this: CustomWorld) {
    await this.invalidSearchQueryResultsPage.pressEnter();
  }
);

When(
  'the search results page finishes rendering with the no results message for invalid search query',
  async function (this: CustomWorld) {
    await this.invalidSearchQueryResultsPage.waitForSearchResults();
    await expect(this.invalidSearchQueryResultsPage.getNoResultsMessage()).toBeVisible();
  }
);

When(
  'the product card locators are queried for invalid search query',
  async function (this: CustomWorld) {
    this.cardCount = await this.invalidSearchQueryResultsPage.getSearchProductCards().count();
  }
);

Then(
  'zero product cards should exist for invalid search query',
  async function (this: CustomWorld) {
    expect(this.cardCount).toBe(0);
  }
);

Then(
  'the no results message should be visible on the screen for invalid search query',
  async function (this: CustomWorld) {
    await expect(this.invalidSearchQueryResultsPage.getNoResultsMessage()).toBeVisible();
  }
);
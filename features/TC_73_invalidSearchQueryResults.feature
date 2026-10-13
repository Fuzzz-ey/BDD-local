Feature: TC_73 - Invalid Search Query Results

  @sanity @regression
  Scenario: TC_73 - An invalid search query shows the no results message
    Given the user navigates to the Decathlon India homepage for invalid search query
    And the global header is loaded for invalid search query
    When the main search bar input is visible for invalid search query
    And the user enters the invalid search text for invalid search query
    And the user presses Enter to trigger the search for invalid search query
    And the search results page finishes rendering with the no results message for invalid search query
    And the product card locators are queried for invalid search query
    Then zero product cards should exist for invalid search query
    And the no results message should be visible on the screen for invalid search query

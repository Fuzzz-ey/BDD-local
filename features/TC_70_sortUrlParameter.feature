Feature: TC_70 - Sort URL Parameter

  @regression
  Scenario: TC_70 - Applying Low to High sort adds the sort parameter to the URL
    Given the user navigates to the PLP URL for sort URL parameter
    And the page reaches domcontentloaded and the product grid is visible for sort URL parameter
    When the user opens the sorting dropdown for sort URL parameter
    And the user selects Price Low to High for sort URL parameter
    And the sort is applied and the sorted PLP is opened for sort URL parameter
    And the updated URL is fetched for sort URL parameter
    And the URL query string is parsed and is not empty for sort URL parameter
    Then the URL should contain the sort key and the price_asc value for sort URL parameter
    And the sort dropdown should show the Low to High label for sort URL parameter
    And the final sorted URL is logged for sort URL parameter
    And a screenshot is captured for TC_70 Sort URL

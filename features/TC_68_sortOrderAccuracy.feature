Feature: TC_68 - Sort Order Accuracy

  @regression
  Scenario: TC_68 - Prices of the first three products are in ascending order after Low to High sort
    Given the user navigates to the PLP and waits for page load for sort order accuracy
    When the user applies the Price Low to High sort for sort order accuracy
    And the product grid fully updates for sort order accuracy
    And the first product card is visible and its price is extracted for sort order accuracy
    And the second product card is visible and its price is extracted for sort order accuracy
    And the third product card is visible and its price is extracted for sort order accuracy
    Then the first three prices should be in ascending order for sort order accuracy

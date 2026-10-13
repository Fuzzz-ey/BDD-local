Feature: TC_64 - Filter Persistence

  @regression
  Scenario: TC_64 - Size filter persists after a full page reload
    Given the user navigates to the target PLP for filter persistence
    When the user applies the Size M filter constraint for filter persistence
    And the product list updates after the Size M selection for filter persistence
    And the user reloads the page for filter persistence
    And the page reaches domcontentloaded again and the product grid is visible for filter persistence
    And the Size filter is visible in the sidebar and expanded for filter persistence
    Then the Size M checkbox should still be checked for filter persistence
    And the product cards count should be greater than zero for filter persistence
    And the result count should reflect the filtered state for filter persistence
    And a screenshot is captured for TC_64 Filter After Reload

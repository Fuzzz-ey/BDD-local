Feature: TC_61 - Deselect Single Filter

  @regression
  Scenario: TC_61 - Deselecting the size filter increases the count and keeps the color filter
    Given the user navigates to the PLP and waits for load for deselect single filter
    When the user selects a Size filter and waits for the UI update for deselect single filter
    And the user selects a Color filter and waits for the UI update for deselect single filter
    And the current product result count is recorded for deselect single filter
    And the applied Size filter checkbox is checked for deselect single filter
    And the user clicks the Size checkbox again to deselect it for deselect single filter
    And the results refresh after the Size deselection for deselect single filter
    Then the new result count should be greater than the recorded count for deselect single filter
    And the Size checkbox should be unchecked and the Color checkbox should remain checked for deselect single filter
    And a screenshot is captured for TC_61 Size Deselected

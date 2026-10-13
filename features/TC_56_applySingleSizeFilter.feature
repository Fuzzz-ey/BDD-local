Feature: TC_56 - Apply Single Size Filter

  @smoke @regression
  Scenario: TC_56 - Apply size M filter and verify the filtered products
    Given the user navigates to a valid Decathlon PLP for single size filter
    And the product grid is stable and the baseline result count is noted for single size filter
    And the Size filter accordion is visible for single size filter
    When the user expands the Size section for single size filter
    And the size M checkbox is visible for single size filter
    And the user clicks the size M checkbox for single size filter
    And the results refresh after the size M selection
    Then the size M checkbox should be checked for single size filter
    And the filtered count should be greater than zero and less than the baseline count
    And the first product card should be visible after size M filtering
    And the filtered product count for size M is logged
    And a screenshot is captured for TC_56 Size M Applied

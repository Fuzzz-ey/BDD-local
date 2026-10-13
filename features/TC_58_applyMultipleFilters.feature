Feature: TC_58 - Apply Multiple Filters

  @sanity @regression
  Scenario: TC_58 - Apply size L and color Blue filters together and verify the results
    Given the user navigates to the targeted PLP and notes the baseline count for multiple filters
    When the user expands the Size section and checks size L for multiple filters
    And the results refresh after the size L selection for multiple filters
    And the user expands the Color section and selects Blue for multiple filters
    And the results refresh after the Blue selection for multiple filters
    And the details of the first loaded product are extracted for multiple filters
    Then the size L and Blue color checkboxes should both be checked for multiple filters
    And the final count should be greater than zero and less than the count after size L
    And the first product title should not be empty and its price should be greater than zero
    And a screenshot is captured for TC_58 Size L and Blue Applied

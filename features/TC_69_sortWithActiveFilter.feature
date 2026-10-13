Feature: TC_69 - Sort with Active Filter

  @regression
  Scenario: TC_69 - Low to High sort works while a color filter is active
    Given the user navigates to the Decathlon PLP for sort with active filter
    When the user applies a Color filter for sort with active filter
    And the filtering loader completes for sort with active filter
    And the user opens the sorting dropdown for sort with active filter
    And the user selects Price Low to High for sort with active filter
    And the sorting loader completes for sort with active filter
    And the prices of the first three loaded products are extracted for sort with active filter
    Then the three prices should be in ascending order for sort with active filter
    And the Color filter should remain checked and the result count should match the filtered state for sort with active filter

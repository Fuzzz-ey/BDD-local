Feature: TC_67 - Apply Low to High Sort

  @smoke @regression
  Scenario: TC_67 - Selecting Price Low to High updates the sort dropdown
    Given the user navigates to the Decathlon PLP URL for low to high sort
    And the initial product grid is loaded for low to high sort
    When the user opens the sorting dropdown for low to high sort
    And the user selects the Price Low to High option for low to high sort
    And the sorting request is applied for low to high sort
    And the loading spinner detaches for low to high sort
    Then the first product card should be visible after re-render for low to high sort
    And the selected sort value should be Price Low to High for low to high sort
    And a screenshot is captured for TC_67 Low to High Applied

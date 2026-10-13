Feature: TC_74 - Back Navigation State

  @regression
  Scenario: TC_74 - Low to High sort is preserved after navigating back from the PDP
    Given the user navigates to the PLP for back navigation state
    When the user applies the Price Low to High sort for back navigation state
    And the product list processes the sort for back navigation state
    And the user clicks the first product card to open the PDP for back navigation state
    And the PDP loads entirely for back navigation state
    And the user navigates back to the PLP for back navigation state
    And the PLP product grid re-renders for back navigation state
    And the sorting dropdown is visible for back navigation state
    Then the sort dropdown should still show Price Low to High for back navigation state
    And the first three product prices should remain in ascending order for back navigation state

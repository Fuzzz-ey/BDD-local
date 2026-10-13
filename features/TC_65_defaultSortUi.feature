Feature: TC_65 - Default Sort UI

  @sanity @regression
  Scenario: TC_65 - The sort dropdown shows the expected default option
    Given the user navigates to the Decathlon PLP for default sort UI
    And the primary product grid is loaded for default sort UI
    When the user scrolls the sorting dropdown into the viewport for default sort UI
    And the sort dropdown is visible for default sort UI
    And the text of the currently selected sort option is extracted for default sort UI
    Then the selected sort text should match the expected default for default sort UI
    And a screenshot is captured for TC_65 Default Sort

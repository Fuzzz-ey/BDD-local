Feature: TC_55 - Filter Visibility

  @smoke @regression
  Scenario: TC_55 - Size and Color filters are visible on the Decathlon PLP
    Given the user navigates to the Decathlon PLP URL for filter visibility
    And the page reaches the domcontentloaded state
    When the user scrolls down to the left-side filter sidebar
    Then the Size filter container should be attached to the DOM
    And the Size filter should be visible
    And the Color filter should be visible
    And a screenshot is captured for TC_55 Filter Visibility

Feature: TC_71 - Navigate to PDP

  @smoke @regression
  Scenario: TC_71 - Clicking the first product card opens a valid PDP
    Given the user navigates to the Decathlon PLP for navigate to PDP
    And the product cards are rendered in the DOM for navigate to PDP
    When the first product card is visible for navigate to PDP
    And the user scrolls the first product card into the viewport for navigate to PDP
    And the user clicks the first product card for navigate to PDP
    And the PDP document finishes loading for navigate to PDP
    And the current URL is fetched for navigate to PDP
    Then the URL should match a valid PDP structure for navigate to PDP
    And the PDP title should be visible for navigate to PDP
    And a screenshot is captured for TC_71 PDP Loaded

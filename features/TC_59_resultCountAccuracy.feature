Feature: TC_59 - Result Count Accuracy

  @regression
  Scenario: TC_59 - Displayed result count matches the number of product cards after filters
    Given the user navigates to the Decathlon PLP for result count accuracy
    When the user applies a Size filter constraint for result count accuracy
    And the user applies a Color filter constraint for result count accuracy
    And the result count text at the top of the page is visible for result count accuracy
    And the numeric displayed count is extracted and is greater than zero for result count accuracy
    And all product cards are loaded and counted for result count accuracy
    Then the displayed count should equal the product card count for result count accuracy
    And the result count match is logged and a screenshot is captured for TC_59 Result Count

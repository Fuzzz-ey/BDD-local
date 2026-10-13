Feature: TC_66 - Sort Options Visibility

  @sanity @regression
  Scenario: TC_66 - The sort dropdown lists the expected sort options
    Given the user navigates to the targeted Decathlon PLP for sort options visibility
    And the page load completes for sort options visibility
    And the sorting dropdown is visible for sort options visibility
    When the user opens the sorting dropdown for sort options visibility
    And all sort option texts are fetched and the list is not empty for sort options visibility
    Then the options should contain the Low to High label for sort options visibility
    And the options should contain the High to Low option for sort options visibility
    And the options should contain the Highest discount option for sort options visibility
    And a screenshot is captured for TC_66 Sort Options
    And the full list of sort options is logged for sort options visibility

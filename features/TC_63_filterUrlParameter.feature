Feature: TC_63 - Filter URL Parameter

  @regression
  Scenario: TC_63 - Applied size and color filters appear in the URL query parameters
    Given the user navigates to the base Decathlon PLP URL for filter URL parameter
    And the initial base URL is recorded for filter URL parameter
    When the user selects the Size filter for filter URL parameter
    And the URL changes after the Size selection for filter URL parameter
    And the user selects the Color filter for filter URL parameter
    And the URL changes after the Color selection for filter URL parameter
    And the current active URL is fetched for filter URL parameter
    Then the URL should contain the size query parameter for filter URL parameter
    And the URL should contain the color query parameter for filter URL parameter
    And the filtered URL is logged and a screenshot is captured for TC_63 Filter URL

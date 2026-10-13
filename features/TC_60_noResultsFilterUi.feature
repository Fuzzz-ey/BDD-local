Feature: TC_60 - No Results Filter UI

  @regression
  Scenario: TC_60 - Conflicting size and color filters show the no results state
    Given the user navigates to the Decathlon PLP for no results filter UI
    And the page load completes and the baseline result count text is noted for no results filter UI
    When the user expands the Size filter and selects a restrictive size for no results filter UI
    And the user expands the Color filter and applies a conflicting color for no results filter UI
    And the filtered page response is resolved for no results filter UI
    Then the product grid should be empty for no results filter UI
    And zero product cards should exist in the DOM for no results filter UI
    And the collections fallback message should be visible for no results filter UI
    And the collections fallback message should match the expected text for no results filter UI
    And a screenshot is captured for TC_60 No Results

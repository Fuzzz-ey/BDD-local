Feature: TC_62 - Clear All Filters

  @regression
  Scenario: TC_62 - Clear All resets the filters and restores the baseline count
    Given the user navigates to the Decathlon PLP and notes the baseline count for clear all filters
    When the user applies Size and Color filter constraints for clear all filters
    And the product list finishes filtering for clear all filters
    And the filtered total product count is recorded and is below the baseline for clear all filters
    And the user scrolls to the top of the filter sidebar for clear all filters
    And the Clear All button is visible for clear all filters
    And the user clicks the Clear All button for clear all filters
    And the default product grid reloads for clear all filters
    Then no filter checkboxes should be checked for clear all filters
    And the total count should revert to at least the baseline count for clear all filters

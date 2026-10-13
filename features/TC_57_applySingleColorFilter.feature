Feature: TC_57 - Apply Single Color Filter

  @sanity @regression
  Scenario: TC_57 - Apply Black color filter and verify the filtered products
    Given the user navigates to the Decathlon PLP for single color filter
    And the page load completes and the baseline result count is noted for single color filter
    And the Color filter accordion is visible for single color filter
    When the user expands the Color section for single color filter
    And the Black color swatch is visible for single color filter
    And the user clicks the Black color swatch for single color filter
    And the product grid refreshes after the Black color selection
    Then the Black color checkbox should be checked for single color filter
    And the color filtered count should be greater than zero and less than the baseline count
    And the first product card image should be visible after Black color filtering
    And a screenshot is captured for TC_57 Black Applied
    And the Black colour filter success message is logged

Feature: TC_72 - Product Data Match

  @sanity @regression
  Scenario: TC_72 - The first PLP product title and price match the PDP
    Given the user navigates to the PLP and waits for the idle state for product data match
    When the first product card is visible for product data match
    And the product title is extracted from the PLP card for product data match
    And the product price is extracted from the PLP card for product data match
    And the user clicks the first product card for product data match
    And the PDP finishes rendering for product data match
    And the product title is extracted from the PDP for product data match
    And the product price is extracted from the PDP for product data match
    Then the PLP title should contain the PDP title for product data match
    And the PDP price should equal the PLP price for product data match

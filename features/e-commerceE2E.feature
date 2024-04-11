Feature: Ecommerce E2E Validations
    @Regression
    Scenario: Placing the Order On Ecommerce Website
        Given I login to e-commerce website with "mariotest@gmail.com" and "Qatester1309"
        When I add "ADIDAS ORIGINAL"
        When I verify that "ADIDAS ORIGINAL" is displayed in the cart
        When I enter valid details and place the order with my username "mariotest@gmail.com"
        Then I should verify that the order is displayed in the Order History page

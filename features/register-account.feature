Feature: Register Your Account
    Scenario: Successful Registration Of A New User Account
        Given I land on login page and click on register button
        When I verify that title is "Register"
        When I enter first name "Mario", last name "Nizic", email "qatester03@gmail.com", phone number "1234567890"
        When I select occupation
        When I select my gender
        When I enter password "Qatester1309"
        When I confirm password "Qatester1309"
        When I check the checkbox to confirm age
        When I click on register button
        Then I should be presented with a message of successful account creation
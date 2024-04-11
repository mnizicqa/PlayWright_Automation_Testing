Feature: Error Validation When Logging Into Aplication
    @Validation
    Scenario: Validate That Error Message Is Shown When We Enter Incorrect Username And Password
        Given I login to web application with "<username>" and "<password>"
        Then Validate that error message "<errorMessage>" is displayed

        Examples:
            | username            | password     | errorMessage |
            | mariotest@gmail.com | Qatester1309 | Incorrect    |
            | rahulshettyacademy  |              | Empty        |
            |                     | learning     | Empty        |
            |                     |              | Empty        |

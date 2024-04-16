const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "I land on login page and click on register button",
  { timeout: 10 * 1000 },
  async function () {
    this.registerPage = this.poManager.getRegisterPage();
    await this.registerPage.navigateTo();
    await this.registerPage.clickOnRegisterButton();
  }
);

When("I verify that title is {string}", async function (title) {
  await this.registerPage.verifyTitle(title);
});

When(
  "I enter first name {string}, last name {string}, email {string}, phone number {string}",
  async function (firstName, lastName, email, phoneNumber) {
    await this.registerPage.enterBasicInformation(
      firstName,
      lastName,
      email,
      phoneNumber
    );
  }
);

When("I select occupation", async function () {
  await this.registerPage.selectOccupation();
});

When("I select my gender", async function () {
  await this.registerPage.selectGender();
});

When("I enter password {string}", async function (password) {
  await this.registerPage.enterPassword(password);
});

When("I confirm password {string}", async function (confirmPassword) {
  await this.registerPage.repeatPassword(confirmPassword);
});

When("I check the checkbox to confirm age", async function () {
  await this.registerPage.selectCheckbox();
});

When("I click on register button", async function () {
  await this.registerPage.registerAccount();
});

Then(
  "I should be presented with a message of successful account creation",
  async function () {
    await this.registerPage.verifyAccountIsCreated();
  }
);

const { expect } = require("@playwright/test");

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerButton = page.locator("[routerlink*='register']");
    this.title = page.locator(".login-title");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.phoneNumber = page.locator("#userMobile");
    this.password = page.locator("#userPassword");
    this.confirmPassword = page.locator("#confirmPassword");
    this.createAccountButton = page.locator("#login");
  }

  async navigateTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async clickOnRegisterButton() {
    await this.registerButton.click();
  }

  async verifyTitle(title) {
    await expect(this.title).toHaveText(title);
  }

  async enterBasicInformation(firstName, lastName, email, phoneNumber) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.phoneNumber.fill(phoneNumber);
  }

  async selectOccupation() {
    await this.page.locator(".custom-select").selectOption("Engineer");
  }

  async selectGender() {
    await this.page.getByLabel("Male", { exact: true }).check();
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async repeatPassword(confirmPassword) {
    await this.confirmPassword.fill(confirmPassword);
  }

  async selectCheckbox() {
    await this.page.locator("[type='checkbox']").check();
  }

  async registerAccount() {
    await this.createAccountButton.click();
  }

  async verifyAccountIsCreated() {
    await expect(this.page.locator(".headcolor")).toHaveText(
      "Account Created Successfully"
    );
  }
}

module.exports = { RegisterPage };

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "I login to e-commerce website with {string} and {string}",
  { timeout: 30 * 1000 },
  async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.successfulLogin(username, password);
  }
);

When("I add {string}", async function (productName) {
  const dashboardPage = this.poManager.getDashBoardPage();
  await dashboardPage.selectAndAddProductToCart(productName);
  await dashboardPage.clickOnCart();
});

When(
  "I verify that {string} is displayed in the cart",
  async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.checkIfProductIsDisplayed(productName);
    await cartPage.clickOnCheckout();
  }
);

When(
  "I enter valid details and place the order with my username {string}",
  async function (username) {
    const orderDetailsPage = this.poManager.getOrderDetailsPage();
    await orderDetailsPage.typeDesiredCountry();
    await orderDetailsPage.selectDesiredCountryFromDropdown();
    orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(username);
    this.orderId = await orderDetailsPage.placeOrder();
    console.log(this.orderId);
  }
);

Then(
  "I should verify that the order is displayed in the Order History page",
  async function () {
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.clickOnOrdersLink();
    await orderHistoryPage.verifyOrderHistoryTitle();
    await orderHistoryPage.checkIfOrderIdIsInOrderHistory(this.orderId);
    expect(
      this.orderId.includes(await orderHistoryPage.getOrderId())
    ).toBeTruthy();
  }
);

Given(
  "I login to web application with {string} and {string}",
  async function (username, password) {
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
  }
);

Then(
  "Validate that error message {string} is displayed",
  { timeout: 20 * 1000 },
  async function (errorMessage) {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText(
      errorMessage
    );
  }
);

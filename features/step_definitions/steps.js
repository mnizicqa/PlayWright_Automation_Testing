const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");

Given(
  "I login to e-commerce website with {string} and {string}",
  { timeout: 30 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const loginPage = this.poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.successfulLogin(username, password);
  }
);

When("I add {string}", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
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
    // Write code here that turns the phrase above into concrete actions
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
    // Write code here that turns the phrase above into concrete actions
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.clickOnOrdersLink();
    await orderHistoryPage.verifyOrderHistoryTitle();
    await orderHistoryPage.checkIfOrderIdIsInOrderHistory(this.orderId);
    expect(
      this.orderId.includes(await orderHistoryPage.getOrderId())
    ).toBeTruthy();
  }
);

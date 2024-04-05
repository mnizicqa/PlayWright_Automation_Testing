const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { OrderDetailsPage } = require("../pageobjects/OrderDetailsPage");
const { OrderHistoryPage } = require("../pageobjects/OrderHistoryPage");

test("Client App Successful Login", async ({ page }) => {
  const productName = "ADIDAS ORIGINAL";
  const username = "mariotest@gmail.com";
  const password = "Qatester1309";
  const desiredInput = "bo";
  const selectedCountry = "Bosnia and Herzegowina";
  const title = "Your Orders";

  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.successfulLogin(username, password);

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.selectAndAddProductToCart(productName);
  await dashboardPage.clickOnCart();

  const cartPage = new CartPage(page);
  await cartPage.checkIfProductIsDisplayed(productName);
  await cartPage.clickOnCheckout();

  const orderDetailsPage = new OrderDetailsPage(page);
  await orderDetailsPage.typeDesiredCountry(desiredInput);
  await orderDetailsPage.selectDesiredCountryFromDropdown(selectedCountry);
  orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(username);
  const orderId = await orderDetailsPage.placeOrder();
  console.log(orderId);

  const orderHistoryPage = new OrderHistoryPage(page);
  await orderHistoryPage.clickOnOrdersLink();
  await orderHistoryPage.verifyOrderHistoryTitle(title);
  await orderHistoryPage.checkIfOrderIdIsInOrderHistory(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

const { test, expect } = require("@playwright/test");

const { POManager } = require("../pageobjects/POManager");

test("Client App Successful Login", async ({ page }) => {
  const poManager = new POManager(page);
  const productName = "ADIDAS ORIGINAL";
  const username = "mariotest@gmail.com";
  const password = "Qatester1309";
  const desiredInput = "bo";
  const selectedCountry = "Bosnia and Herzegowina";
  const title = "Your Orders";

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateTo();
  await loginPage.successfulLogin(username, password);

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.selectAndAddProductToCart(productName);
  await dashboardPage.clickOnCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkIfProductIsDisplayed(productName);
  await cartPage.clickOnCheckout();

  const orderDetailsPage = poManager.getOrderDetailsPage();
  await orderDetailsPage.typeDesiredCountry(desiredInput);
  await orderDetailsPage.selectDesiredCountryFromDropdown(selectedCountry);
  orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(username);
  const orderId = await orderDetailsPage.placeOrder();
  console.log(orderId);

  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.clickOnOrdersLink();
  await orderHistoryPage.verifyOrderHistoryTitle(title);
  await orderHistoryPage.checkIfOrderIdIsInOrderHistory(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

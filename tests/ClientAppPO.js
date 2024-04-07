const { test, expect } = require("@playwright/test");
const testData = JSON.parse(
  JSON.stringify(require("../utilities/placeOrderTestData.json"))
);

const { POManager } = require("../pageobjects/POManager");

test("Client App Successful Login", async ({ page }) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateTo();
  await loginPage.successfulLogin(testData.username, testData.password);

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.selectAndAddProductToCart(testData.productName);
  await dashboardPage.clickOnCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkIfProductIsDisplayed(testData.productName);
  await cartPage.clickOnCheckout();

  const orderDetailsPage = poManager.getOrderDetailsPage();
  await orderDetailsPage.typeDesiredCountry(testData.desiredInput);
  await orderDetailsPage.selectDesiredCountryFromDropdown(
    testData.selectedCountry
  );
  orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(
    testData.username
  );
  const orderId = await orderDetailsPage.placeOrder();
  console.log(orderId);

  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.clickOnOrdersLink();
  await orderHistoryPage.verifyOrderHistoryTitle(testData.title);
  await orderHistoryPage.checkIfOrderIdIsInOrderHistory(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

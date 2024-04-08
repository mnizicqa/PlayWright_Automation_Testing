const { test, expect } = require("@playwright/test");
const { customTest } = require("../utilities/TestBase");
const { POManager } = require("../pageobjects/POManager");
const testData = JSON.parse(
  JSON.stringify(require("../utilities/placeOrderTestData.json"))
);

for (const data of testData) {
  test(`Client App Successful Login for ${data.productName}`, async ({
    page,
  }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.successfulLogin(data.username, data.password);

    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.selectAndAddProductToCart(data.productName);
    await dashboardPage.clickOnCart();

    const cartPage = poManager.getCartPage();
    await cartPage.checkIfProductIsDisplayed(data.productName);
    await cartPage.clickOnCheckout();

    const orderDetailsPage = poManager.getOrderDetailsPage();
    await orderDetailsPage.typeDesiredCountry();
    await orderDetailsPage.selectDesiredCountryFromDropdown();
    orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(data.username);
    const orderId = await orderDetailsPage.placeOrder();
    console.log(orderId);

    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.clickOnOrdersLink();
    await orderHistoryPage.verifyOrderHistoryTitle();
    await orderHistoryPage.checkIfOrderIdIsInOrderHistory(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
  });
}

customTest.only(
  "Client App Successful Login",
  async ({ page, testDataOrder }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.successfulLogin(
      testDataOrder.username,
      testDataOrder.password
    );

    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.selectAndAddProductToCart(testDataOrder.productName);
    await dashboardPage.clickOnCart();

    const cartPage = poManager.getCartPage();
    await cartPage.checkIfProductIsDisplayed(testDataOrder.productName);
    await cartPage.clickOnCheckout();
  }
);

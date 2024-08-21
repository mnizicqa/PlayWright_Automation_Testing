import {test, expect} from "@playwright/test";
import { customTest } from "../utilities_ts/TestBase";
import {POManager} from "../pageobjects_ts/POManager";
const testData = JSON.parse(
  JSON.stringify(require("../utilities/placeOrderTestData.json"))
);

for (const data of testData) {
  test(
    `E-commerce E2E Testing Using Page Obj
    ect Model for ${data.productName}`,
    { tag: "@Web" },
    async ({ page }) => {
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
      orderDetailsPage.verifyIfItIsTheSameUsernameInTheInputField(
        data.username
      );
      let orderId:any;
      orderId = await orderDetailsPage.placeOrder();
      console.log(orderId);

      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.clickOnOrdersLink();
      await orderHistoryPage.verifyOrderHistoryTitle();
      await orderHistoryPage.checkIfOrderIdIsInOrderHistory(orderId);
      expect(
        orderId.includes(await orderHistoryPage.getOrderId())
      ).toBeTruthy();
    }
  );
}

customTest(
  "Client App Successful Login",
  { tag: "@Web" },
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

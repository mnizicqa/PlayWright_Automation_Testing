const { test, expect, request } = require("@playwright/test");
const { APIUtilities } = require("../utilities/APIUtilities");
const loginPayload = {
  userEmail: "mariotest@gmail.com",
  userPassword: "Qatester1309",
};
const orderPayload = {
  orders: [
    {
      country: "Croatia",
      productOrderedId: "6581ca979fd99c85e8ee7faf",
    },
  ],
};
const fakePayload = { data: [], message: "No Orders" };
let createOrder;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtilities(apiContext, loginPayload);
  createOrder = await apiUtils.createOrder(orderPayload);
});

test("@API Place the Order Via Api", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, createOrder.loginToken);
  // Intercepting response and sending a fake response via API
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayload);
      route.fulfill({
        response,
        body,
      });
    }
  );
  await page.locator("button[routerlink *= 'myorders']").click();
  // await page.waitForResponse(
  //   "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  // );
  await expect(page.locator(".mt-4 ")).toHaveText(
    " You have No Orders to show at this time. Please Visit Back Us "
  );
});

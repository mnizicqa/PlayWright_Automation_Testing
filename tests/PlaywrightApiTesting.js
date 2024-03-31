const { test, expect, request } = require("@playwright/test");
const { APIUtilities } = require("./utilities/APIUtilities");
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
let createOrder;
let i;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtilities(apiContext, loginPayload);
  createOrder = await apiUtils.createOrder(orderPayload);
});

test("Place the Order Via Api", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, createOrder.loginToken);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink *= 'myorders']").click();
  await expect(page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (createOrder.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("text=View").click();
      break;
    }
  }
  const myOrderDescription = await page.locator(".col-text").textContent();
  expect(createOrder.orderId.includes(myOrderDescription)).toBeTruthy();
});

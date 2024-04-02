const { test, expect } = require("@playwright/test");

test("Security Testing Request Intercept", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("mariotest@gmail.com");
  await page.locator("#userPassword").fill("Qatester1309");
  await page.locator("[value='Login']").click();
  await page.locator(".card-body b ").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=660bd20ea86f8f74dcb4b168",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator(".blink_me")).toHaveText(
    "You are not authorize to view this order"
  );
});

const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("mariotest@gmail.com");
  await page.locator("#userPassword").fill("Qatester1309");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  // Session storage in Playwright
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@API Client App Successful Login Using Storage State", async () => {
  const productName = "ADIDAS ORIGINAL";
  const email = "mariotest@gmail.com";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");

  const titles = await products.allTextContents();
  console.log(titles);
  await expect(page.locator(".m-2.blink_me")).toBeVisible();
  const count = await products.count();
  let i;

  for (i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await expect(page.locator("h3:has-text('ADIDAS ORIGINAL')")).toBeVisible();

  await page.locator("text=Checkout").click();
  await page.locator("[placeholder='Select Country']").pressSequentially("bo");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() == "Bosnia and Herzegowina") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name label[type='text']")).toHaveText(
    email
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink *= 'orders']").click();
  await expect(page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("text=View").click();
      break;
    }
  }

  const myOrderDescription = await page.locator(".col-text").textContent();
  expect(orderId.includes(myOrderDescription)).toBeTruthy();
});

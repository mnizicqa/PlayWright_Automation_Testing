const { test, expect } = require("@playwright/test");

test("Alert,Hover,Popup,Iframe Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://google.com");
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.locator("#show-textbox").click();
  await expect(page.locator("#displayed-text")).toBeVisible();

  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  await expect(page.locator(".mouse-hover-content")).toBeVisible();
  await page.locator(".mouse-hover-content a").first().click();
  await page.pause();

  const iframePage = page.frameLocator("#courses-iframe");
  await iframePage.locator("li a[href='lifetime-access']:visible").click();
  await expect(iframePage.locator("h1")).toHaveText("All Access Subscription");
  const textToCheck = await iframePage.locator(".text h2").textContent();
  const numberOfStudents = textToCheck.split(" ")[1];
  console.log(numberOfStudents);
});
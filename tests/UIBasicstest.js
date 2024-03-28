const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("marionizic");
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");

  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child window handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const completeText = text.split("@");
  const newUserName = completeText[1].split(" ")[0].replace(".com", "");
  console.log(newUserName);
  await userName.fill(newUserName);
});

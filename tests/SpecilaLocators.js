import { test, expect } from "@playwright/test";

test("Playwright Special Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abcd1234");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Success! The Form has been submitted successfully!.")
  ).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
  await expect(page.locator(".btn-primary")).toHaveText(
    "Checkout ( 1 ) (current)"
  );
});

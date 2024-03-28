const { test, expect } = require("@playwright/test");

test("Calendar Validations", async ({ page }) => {
  const date = "15";
  const month = "6";
  const year = "2027";
  const desiredDate = [];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__calendar-button").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(parseInt(month - 1))
    .click();
  await page.locator("//abbr[text()='" + date + "']").click();
  const inputs = await page.locator(".react-date-picker__inputGroup input");
  for (let index = 0; index < inputs.count(); index++) {
    const value = inputs[index].getAttribute("value");
    const chosenDate = desiredDate.push(value[index]);
    expect(value).toEqual(chosenDate);
  }
});

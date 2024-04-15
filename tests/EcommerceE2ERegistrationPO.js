const { test } = require("@playwright/test");
const { RegisterPage } = require("../pageobjects/RegisterPage");
const registerAccountData = JSON.parse(
  JSON.stringify(require("../utilities/registerAccountData.json"))
);

test("@Web Ecommerce E2E successful registration", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.navigateTo();
  await registerPage.clickOnRegisterButton();
  await registerPage.enterBasicInformation(
    registerAccountData.firstName,
    registerAccountData.lastName,
    registerAccountData.email,
    registerAccountData.phoneNumber
  );

  await registerPage.selectOccupation();
  await registerPage.selectGender();
  await registerPage.enterPassword(registerAccountData.password);
  await registerPage.repeatPassword(registerAccountData.confirmPassword);

  await registerPage.selectCheckbox();
  await page.pause();
  await registerPage.registerAccount();
  await registerPage.verifyAccountIsCreated();
});

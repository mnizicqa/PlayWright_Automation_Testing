const { test } = require("@playwright/test");
const registerAccountData = JSON.parse(
  JSON.stringify(require("../utilities/registerAccountData.json"))
);
const { POManager } = require("../pageobjects/POManager");

test("@Web Ecommerce E2E successful registration", async ({ page }) => {
  const poManager = new POManager(page);

  const registerPage = poManager.getRegisterPage();
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

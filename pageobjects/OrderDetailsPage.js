const { expect } = require("@playwright/test");

class OrderDetailsPage {
  constructor(page) {
    this.page = page;
    this.selectCountry = page.locator("[placeholder='Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.usernameField = page.locator(".user__name label[type='text']");
    this.placeOrderButton = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderConfirmationProductName = page.locator(".m-3 .title");
    this.orderConfirmationProductQuantity = page.locator(".m-3 .sub");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async typeDesiredCountry(desiredInput) {
    await this.selectCountry.pressSequentially(desiredInput);
  }

  async selectDesiredCountryFromDropdown(selectedCountry) {
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() == selectedCountry) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async verifyIfItIsTheSameUsernameInTheInputField(username) {
    await expect(this.usernameField).toHaveText(username);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. "
    );
    await expect(this.orderConfirmationProductName).toHaveText(
      "ADIDAS ORIGINAL"
    );
    await expect(this.orderConfirmationProductQuantity).toHaveText("Qty: 1");
    return await this.orderId.textContent();
  }
}

module.exports = { OrderDetailsPage };

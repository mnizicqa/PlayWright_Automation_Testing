const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator("div li");
    this.checkoutBtn = page.locator("text=Checkout");
  }

  async checkIfProductIsDisplayed(productName) {
    await this.cartProducts.first().waitFor();
    await expect(this.getProductLocator(productName)).toBeVisible();
  }

  async clickOnCheckout() {
    await this.checkoutBtn.click();
  }

  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}

module.exports = { CartPage };

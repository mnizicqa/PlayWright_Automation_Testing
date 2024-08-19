import { expect, Locator, Page } from "@playwright/test";
export class CartPage {

  cartProducts:Locator;
  checkoutBtn:Locator;
  page:Page

  constructor(page:Page) {
    this.page = page;
    this.cartProducts = page.locator("div li");
    this.checkoutBtn = page.locator("text=Checkout");
  }

  async checkIfProductIsDisplayed(productName:string) {
    await this.cartProducts.first().waitFor();
    await expect(this.getProductLocator(productName)).toBeVisible();
  }

  async clickOnCheckout() {
    await this.checkoutBtn.click();
  }

  getProductLocator(productName:string) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}

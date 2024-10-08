import { expect, Locator, Page } from "@playwright/test";
export class DashboardPage {

  products:Locator;
  productsText:Locator;
  blinkingText:Locator;
  cart:Locator;
  page:Page

  constructor(page:Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.blinkingText = page.locator(".m-2.blink_me");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async selectAndAddProductToCart(productName:string) {
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    await expect(this.blinkingText).toBeVisible();
    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async clickOnCart() {
    await this.cart.click();
  }
}

import { expect, Locator, Page } from "@playwright/test";

export class OrderHistoryPage {

  orderLink: Locator;
  orderHistoryTitle:Locator;
  orderHistoryList:Locator;
  rows:Locator;
  myOrderId:Locator;
  page:Page;

  constructor(page:Page) {
    this.page = page;
    this.orderLink = page.locator("button[routerlink *= 'orders']");
    this.orderHistoryTitle = page.locator("h1.ng-star-inserted");
    this.orderHistoryList = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.myOrderId = page.locator(".col-text");
  }

  async clickOnOrdersLink() {
    await this.orderLink.click();
  }

  async verifyOrderHistoryTitle() {
    await expect(this.orderHistoryTitle).toHaveText("Your Orders");
  }

  async checkIfOrderIdIsInOrderHistory(orderId:any) {
    await this.orderHistoryList.waitFor();
    for (let i = 0; i < (await this.rows.count()); i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(i).locator("text=View").click();
        break;
      }
    }
  }

  getOrderId() {
    return this.myOrderId.textContent();
  }
}

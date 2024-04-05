const { expect } = require("@playwright/test");

class OrderHistoryPage {
  constructor(page) {
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

  async verifyOrderHistoryTitle(title) {
    await expect(this.orderHistoryTitle).toHaveText(title);
  }

  async checkIfOrderIdIsInOrderHistory(orderId) {
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

module.exports = { OrderHistoryPage };

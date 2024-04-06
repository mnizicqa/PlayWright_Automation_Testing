const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderDetailsPage } = require("./OrderDetailsPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderDetailsPage = new OrderDetailsPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashBoardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderDetailsPage() {
    return this.orderDetailsPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}

module.exports = { POManager };

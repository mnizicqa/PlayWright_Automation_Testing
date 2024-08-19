import { CartPage } from "./CartPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { RegisterPage } from "./RegisterPage";
import { Page } from "@playwright/test";

export class POManager {
  cartPage : CartPage;
  dashboardPage : DashboardPage;
  loginPage : LoginPage;
  orderDetailsPage: OrderDetailsPage;
  orderHistoryPage : OrderHistoryPage;
  registerPage : RegisterPage;
  page: Page;

  constructor(page:Page) {
    this.page = page;
    this.registerPage = new RegisterPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderDetailsPage = new OrderDetailsPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
  }

  getRegisterPage() {
    return this.registerPage;
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

import {Locator, Page } from "@playwright/test";
export class LoginPage {

  username:Locator;
  password:Locator;
  loginButton:Locator;
  page:Page;

  constructor(page:Page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginButton = page.locator("[value='Login']");
  }

  async navigateTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async successfulLogin(username:string, password:string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

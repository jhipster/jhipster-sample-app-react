import { $, browser, ElementFinder } from 'protractor';

import BasePage from './base-component';

const selector: ElementFinder = $('#login-page');
export default class SignInPage extends BasePage {
  selector: ElementFinder;
  username: ElementFinder = this.selector.$('#username');
  password: ElementFinder = this.selector.$('#password');
  loginButton: ElementFinder = this.selector.$('button[type=submit]');
  title: ElementFinder = this.selector.$('#login-title');

  constructor() {
    super(selector);
    this.selector = selector;
  }

  get() {
    browser.get('#/login');
    this.waitUntilDisplayed();
  }

  getTitle() {
    return this.title.getAttribute('id');
  }

  setUserName(username: string) {
    return this.username.sendKeys(username);
  }

  clearUserName() {
    return this.username.clear();
  }

  setPassword(password: string) {
    return this.password.sendKeys(password);
  }

  clearPassword() {
    return this.password.clear();
  }

  autoSignInUsing(username: string, password: string) {
    this.setUserName(username);
    this.setPassword(password);
    return this.login();
  }

  autoSignOut = () => browser.get('#/logout');

  login() {
    return this.loginButton.click();
  }
}

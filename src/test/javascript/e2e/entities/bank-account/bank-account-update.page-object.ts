import { element, by, ElementFinder } from 'protractor';

export default class BankAccountUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#bank-account-name'));
  balanceInput: ElementFinder = element(by.css('input#bank-account-balance'));
  userSelect: ElementFinder = element(by.css('select#bank-account-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setBalanceInput(balance) {
    this.balanceInput.sendKeys(balance);
  }

  getBalanceInput() {
    return this.balanceInput.getAttribute('value');
  }

  userSelectLastOption() {
    this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  userSelectOption(option) {
    this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}

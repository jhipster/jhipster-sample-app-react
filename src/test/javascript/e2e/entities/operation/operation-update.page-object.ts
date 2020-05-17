import { element, by, ElementFinder } from 'protractor';

export default class OperationUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#operation-date'));
  descriptionInput: ElementFinder = element(by.css('input#operation-description'));
  amountInput: ElementFinder = element(by.css('input#operation-amount'));
  bankAccountSelect: ElementFinder = element(by.css('select#operation-bankAccount'));
  labelSelect: ElementFinder = element(by.css('select#operation-label'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async bankAccountSelectLastOption() {
    await this.bankAccountSelect.all(by.tagName('option')).last().click();
  }

  async bankAccountSelectOption(option) {
    await this.bankAccountSelect.sendKeys(option);
  }

  getBankAccountSelect() {
    return this.bankAccountSelect;
  }

  async getBankAccountSelectedOption() {
    return this.bankAccountSelect.element(by.css('option:checked')).getText();
  }

  async labelSelectLastOption() {
    await this.labelSelect.all(by.tagName('option')).last().click();
  }

  async labelSelectOption(option) {
    await this.labelSelect.sendKeys(option);
  }

  getLabelSelect() {
    return this.labelSelect;
  }

  async getLabelSelectedOption() {
    return this.labelSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}

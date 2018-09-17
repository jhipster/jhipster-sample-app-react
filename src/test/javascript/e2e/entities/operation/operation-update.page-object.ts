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

  setDateInput(date) {
    this.dateInput.sendKeys(date);
  }

  getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  setDescriptionInput(description) {
    this.descriptionInput.sendKeys(description);
  }

  getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  setAmountInput(amount) {
    this.amountInput.sendKeys(amount);
  }

  getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  bankAccountSelectLastOption() {
    this.bankAccountSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  bankAccountSelectOption(option) {
    this.bankAccountSelect.sendKeys(option);
  }

  getBankAccountSelect() {
    return this.bankAccountSelect;
  }

  getBankAccountSelectedOption() {
    return this.bankAccountSelect.element(by.css('option:checked')).getText();
  }

  labelSelectLastOption() {
    this.labelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  labelSelectOption(option) {
    this.labelSelect.sendKeys(option);
  }

  getLabelSelect() {
    return this.labelSelect;
  }

  getLabelSelectedOption() {
    return this.labelSelect.element(by.css('option:checked')).getText();
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

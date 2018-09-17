import { element, by, ElementFinder } from 'protractor';

export default class LabelUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.label.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  labelInput: ElementFinder = element(by.css('input#label-label'));

  getPageTitle() {
    return this.pageTitle;
  }

  setLabelInput(label) {
    this.labelInput.sendKeys(label);
  }

  getLabelInput() {
    return this.labelInput.getAttribute('value');
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

import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LabelUpdatePage {
  pageTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.label.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  labelInput: ElementFinder = element(by.css('input#label-label'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLabelInput(label) {
    await this.labelInput.sendKeys(label);
  }

  async getLabelInput() {
    return this.labelInput.getAttribute('value');
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

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setLabelInput('label');
    expect(await this.getLabelInput()).to.match(/label/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}

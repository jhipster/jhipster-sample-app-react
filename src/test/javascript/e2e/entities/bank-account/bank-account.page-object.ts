import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BankAccountUpdatePage from './bank-account-update.page-object';

const expect = chai.expect;
export class BankAccountDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.bankAccount.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bankAccount'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BankAccountComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bank-account-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('bank-account');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBankAccount() {
    await this.createButton.click();
    return new BankAccountUpdatePage();
  }

  async deleteBankAccount() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bankAccountDeleteDialog = new BankAccountDeleteDialog();
    await waitUntilDisplayed(bankAccountDeleteDialog.deleteModal);
    expect(await bankAccountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.delete.question/
    );
    await bankAccountDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bankAccountDeleteDialog.deleteModal);

    expect(await isVisible(bankAccountDeleteDialog.deleteModal)).to.be.false;
  }
}

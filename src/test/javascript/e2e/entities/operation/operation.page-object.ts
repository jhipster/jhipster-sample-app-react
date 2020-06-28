import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OperationUpdatePage from './operation-update.page-object';

const expect = chai.expect;
export class OperationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('jhipsterSampleApplicationReactApp.operation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-operation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OperationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('operation-heading'));
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
    await navBarPage.getEntityPage('operation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOperation() {
    await this.createButton.click();
    return new OperationUpdatePage();
  }

  async deleteOperation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const operationDeleteDialog = new OperationDeleteDialog();
    await waitUntilDisplayed(operationDeleteDialog.deleteModal);
    expect(await operationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.delete.question/
    );
    await operationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(operationDeleteDialog.deleteModal);

    expect(await isVisible(operationDeleteDialog.deleteModal)).to.be.false;
  }
}

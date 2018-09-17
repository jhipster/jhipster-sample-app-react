/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import OperationComponentsPage from './operation.page-object';
import { OperationDeleteDialog } from './operation.page-object';
import OperationUpdatePage from './operation-update.page-object';

const expect = chai.expect;

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let operationUpdatePage: OperationUpdatePage;
  let operationComponentsPage: OperationComponentsPage;
  let operationDeleteDialog: OperationDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Operations', async () => {
    navBarPage.getEntityPage('operation');
    operationComponentsPage = new OperationComponentsPage();
    expect(await operationComponentsPage.getTitle().getText()).to.match(/Operations/);
  });

  it('should load create Operation page', async () => {
    operationComponentsPage.clickOnCreateButton();
    operationUpdatePage = new OperationUpdatePage();
    expect(await operationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel/
    );
  });

  it('should create and save Operations', async () => {
    const nbButtonsBeforeCreate = await operationComponentsPage.countDeleteButtons();

    operationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await operationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    operationUpdatePage.setDescriptionInput('description');
    expect(await operationUpdatePage.getDescriptionInput()).to.match(/description/);
    operationUpdatePage.setAmountInput('5');
    expect(await operationUpdatePage.getAmountInput()).to.eq('5');
    operationUpdatePage.bankAccountSelectLastOption();
    // operationUpdatePage.labelSelectLastOption();
    await operationUpdatePage.save();
    expect(await operationUpdatePage.getSaveButton().isPresent()).to.be.false;

    operationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Operation', async () => {
    operationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await operationComponentsPage.countDeleteButtons();
    await operationComponentsPage.clickOnLastDeleteButton();

    operationDeleteDialog = new OperationDeleteDialog();
    expect(await operationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.delete.question/
    );
    await operationDeleteDialog.clickOnConfirmButton();

    operationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});

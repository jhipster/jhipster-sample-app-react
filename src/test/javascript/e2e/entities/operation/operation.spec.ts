import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OperationComponentsPage, { OperationDeleteDialog } from './operation.page-object';
import OperationUpdatePage from './operation-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let operationComponentsPage: OperationComponentsPage;
  let operationUpdatePage: OperationUpdatePage;
  let operationDeleteDialog: OperationDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Operations', async () => {
    await navBarPage.getEntityPage('operation');
    operationComponentsPage = new OperationComponentsPage();
    expect(await operationComponentsPage.title.getText()).to.match(/Operations/);

    expect(await operationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([operationComponentsPage.noRecords, operationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(operationComponentsPage.noRecords)) ? 0 : await getRecordsCount(operationComponentsPage.table);
  });

  it('should load create Operation page', async () => {
    await operationComponentsPage.createButton.click();
    operationUpdatePage = new OperationUpdatePage();
    expect(await operationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel/
    );
    await operationUpdatePage.cancel();
  });

  it('should create and save Operations', async () => {
    await operationComponentsPage.createButton.click();
    await operationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await operationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    await operationUpdatePage.setDescriptionInput('description');
    expect(await operationUpdatePage.getDescriptionInput()).to.match(/description/);
    await operationUpdatePage.setAmountInput('5');
    expect(await operationUpdatePage.getAmountInput()).to.eq('5');
    await operationUpdatePage.bankAccountSelectLastOption();
    // operationUpdatePage.labelSelectLastOption();
    await waitUntilDisplayed(operationUpdatePage.saveButton);
    await operationUpdatePage.save();
    await waitUntilHidden(operationUpdatePage.saveButton);
    expect(await isVisible(operationUpdatePage.saveButton)).to.be.false;

    expect(await operationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(operationComponentsPage.table);

    await waitUntilCount(operationComponentsPage.records, beforeRecordsCount + 1);
    expect(await operationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Operation', async () => {
    const deleteButton = operationComponentsPage.getDeleteButton(operationComponentsPage.records.last());
    await click(deleteButton);

    operationDeleteDialog = new OperationDeleteDialog();
    await waitUntilDisplayed(operationDeleteDialog.deleteModal);
    expect(await operationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.delete.question/
    );
    await operationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(operationDeleteDialog.deleteModal);

    expect(await isVisible(operationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([operationComponentsPage.noRecords, operationComponentsPage.table]);

    const afterCount = (await isVisible(operationComponentsPage.noRecords)) ? 0 : await getRecordsCount(operationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

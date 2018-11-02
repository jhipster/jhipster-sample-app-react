/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OperationComponentsPage from './operation.page-object';
import { OperationDeleteDialog } from './operation.page-object';
import OperationUpdatePage from './operation-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let operationUpdatePage: OperationUpdatePage;
  let operationComponentsPage: OperationComponentsPage;
  let operationDeleteDialog: OperationDeleteDialog;

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
  });

  it('should load Operations', async () => {
    await navBarPage.getEntityPage('operation');
    operationComponentsPage = new OperationComponentsPage();
    expect(await operationComponentsPage.getTitle().getText()).to.match(/Operations/);
  });

  it('should load create Operation page', async () => {
    await operationComponentsPage.clickOnCreateButton();
    operationUpdatePage = new OperationUpdatePage();
    expect(await operationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel/
    );
  });

  it('should create and save Operations', async () => {
    const nbButtonsBeforeCreate = await operationComponentsPage.countDeleteButtons();

    await operationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await operationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    await operationUpdatePage.setDescriptionInput('description');
    expect(await operationUpdatePage.getDescriptionInput()).to.match(/description/);
    await operationUpdatePage.setAmountInput('5');
    expect(await operationUpdatePage.getAmountInput()).to.eq('5');
    await operationUpdatePage.bankAccountSelectLastOption();
    // operationUpdatePage.labelSelectLastOption();
    await waitUntilDisplayed(operationUpdatePage.getSaveButton());
    await operationUpdatePage.save();
    await waitUntilHidden(operationUpdatePage.getSaveButton());
    expect(await operationUpdatePage.getSaveButton().isPresent()).to.be.false;

    await operationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Operation', async () => {
    await operationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await operationComponentsPage.countDeleteButtons();
    await operationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    operationDeleteDialog = new OperationDeleteDialog();
    expect(await operationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.operation.delete.question/
    );
    await operationDeleteDialog.clickOnConfirmButton();

    await operationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

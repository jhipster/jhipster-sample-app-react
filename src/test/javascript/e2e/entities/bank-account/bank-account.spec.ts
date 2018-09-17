/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import BankAccountComponentsPage from './bank-account.page-object';
import { BankAccountDeleteDialog } from './bank-account.page-object';
import BankAccountUpdatePage from './bank-account-update.page-object';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let bankAccountUpdatePage: BankAccountUpdatePage;
  let bankAccountComponentsPage: BankAccountComponentsPage;
  let bankAccountDeleteDialog: BankAccountDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load BankAccounts', async () => {
    navBarPage.getEntityPage('bank-account');
    bankAccountComponentsPage = new BankAccountComponentsPage();
    expect(await bankAccountComponentsPage.getTitle().getText()).to.match(/Bank Accounts/);
  });

  it('should load create BankAccount page', async () => {
    bankAccountComponentsPage.clickOnCreateButton();
    bankAccountUpdatePage = new BankAccountUpdatePage();
    expect(await bankAccountUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel/
    );
  });

  it('should create and save BankAccounts', async () => {
    const nbButtonsBeforeCreate = await bankAccountComponentsPage.countDeleteButtons();

    bankAccountUpdatePage.setNameInput('name');
    expect(await bankAccountUpdatePage.getNameInput()).to.match(/name/);
    bankAccountUpdatePage.setBalanceInput('5');
    expect(await bankAccountUpdatePage.getBalanceInput()).to.eq('5');
    bankAccountUpdatePage.userSelectLastOption();
    await bankAccountUpdatePage.save();
    expect(await bankAccountUpdatePage.getSaveButton().isPresent()).to.be.false;

    bankAccountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last BankAccount', async () => {
    bankAccountComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await bankAccountComponentsPage.countDeleteButtons();
    await bankAccountComponentsPage.clickOnLastDeleteButton();

    bankAccountDeleteDialog = new BankAccountDeleteDialog();
    expect(await bankAccountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.delete.question/
    );
    await bankAccountDeleteDialog.clickOnConfirmButton();

    bankAccountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});

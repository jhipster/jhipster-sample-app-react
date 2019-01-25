/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankAccountComponentsPage from './bank-account.page-object';
import { BankAccountDeleteDialog } from './bank-account.page-object';
import BankAccountUpdatePage from './bank-account-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankAccountUpdatePage: BankAccountUpdatePage;
  let bankAccountComponentsPage: BankAccountComponentsPage;
  let bankAccountDeleteDialog: BankAccountDeleteDialog;

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

  it('should load BankAccounts', async () => {
    await navBarPage.getEntityPage('bank-account');
    bankAccountComponentsPage = new BankAccountComponentsPage();
    expect(await bankAccountComponentsPage.getTitle().getText()).to.match(/Bank Accounts/);
  });

  it('should load create BankAccount page', async () => {
    await bankAccountComponentsPage.clickOnCreateButton();
    bankAccountUpdatePage = new BankAccountUpdatePage();
    expect(await bankAccountUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel/
    );
  });

  it('should create and save BankAccounts', async () => {
    const nbButtonsBeforeCreate = await bankAccountComponentsPage.countDeleteButtons();

    await bankAccountUpdatePage.setNameInput('name');
    expect(await bankAccountUpdatePage.getNameInput()).to.match(/name/);
    await bankAccountUpdatePage.setBalanceInput('5');
    expect(await bankAccountUpdatePage.getBalanceInput()).to.eq('5');
    await bankAccountUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(bankAccountUpdatePage.getSaveButton());
    await bankAccountUpdatePage.save();
    await waitUntilHidden(bankAccountUpdatePage.getSaveButton());
    expect(await bankAccountUpdatePage.getSaveButton().isPresent()).to.be.false;

    await bankAccountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last BankAccount', async () => {
    await bankAccountComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await bankAccountComponentsPage.countDeleteButtons();
    await bankAccountComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    bankAccountDeleteDialog = new BankAccountDeleteDialog();
    expect(await bankAccountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.delete.question/
    );
    await bankAccountDeleteDialog.clickOnConfirmButton();

    await bankAccountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

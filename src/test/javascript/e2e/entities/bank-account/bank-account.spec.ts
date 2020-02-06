import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankAccountComponentsPage, { BankAccountDeleteDialog } from './bank-account.page-object';
import BankAccountUpdatePage from './bank-account-update.page-object';
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

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankAccountComponentsPage: BankAccountComponentsPage;
  let bankAccountUpdatePage: BankAccountUpdatePage;
  let bankAccountDeleteDialog: BankAccountDeleteDialog;
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

  it('should load BankAccounts', async () => {
    await navBarPage.getEntityPage('bank-account');
    bankAccountComponentsPage = new BankAccountComponentsPage();
    expect(await bankAccountComponentsPage.title.getText()).to.match(/Bank Accounts/);

    expect(await bankAccountComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([bankAccountComponentsPage.noRecords, bankAccountComponentsPage.table]);

    beforeRecordsCount = (await isVisible(bankAccountComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bankAccountComponentsPage.table);
  });

  it('should load create BankAccount page', async () => {
    await bankAccountComponentsPage.createButton.click();
    bankAccountUpdatePage = new BankAccountUpdatePage();
    expect(await bankAccountUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel/
    );
    await bankAccountUpdatePage.cancel();
  });

  it('should create and save BankAccounts', async () => {
    await bankAccountComponentsPage.createButton.click();
    await bankAccountUpdatePage.setNameInput('name');
    expect(await bankAccountUpdatePage.getNameInput()).to.match(/name/);
    await bankAccountUpdatePage.setBalanceInput('5');
    expect(await bankAccountUpdatePage.getBalanceInput()).to.eq('5');
    await bankAccountUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(bankAccountUpdatePage.saveButton);
    await bankAccountUpdatePage.save();
    await waitUntilHidden(bankAccountUpdatePage.saveButton);
    expect(await isVisible(bankAccountUpdatePage.saveButton)).to.be.false;

    expect(await bankAccountComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(bankAccountComponentsPage.table);

    await waitUntilCount(bankAccountComponentsPage.records, beforeRecordsCount + 1);
    expect(await bankAccountComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last BankAccount', async () => {
    const deleteButton = bankAccountComponentsPage.getDeleteButton(bankAccountComponentsPage.records.last());
    await click(deleteButton);

    bankAccountDeleteDialog = new BankAccountDeleteDialog();
    await waitUntilDisplayed(bankAccountDeleteDialog.deleteModal);
    expect(await bankAccountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.bankAccount.delete.question/
    );
    await bankAccountDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bankAccountDeleteDialog.deleteModal);

    expect(await isVisible(bankAccountDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([bankAccountComponentsPage.noRecords, bankAccountComponentsPage.table]);

    const afterCount = (await isVisible(bankAccountComponentsPage.noRecords)) ? 0 : await getRecordsCount(bankAccountComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankAccountComponentsPage from './bank-account.page-object';
import BankAccountUpdatePage from './bank-account-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankAccountComponentsPage: BankAccountComponentsPage;
  let bankAccountUpdatePage: BankAccountUpdatePage;

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

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    bankAccountComponentsPage = new BankAccountComponentsPage();
    bankAccountComponentsPage = await bankAccountComponentsPage.goToPage(navBarPage);
  });

  it('should load BankAccounts', async () => {
    expect(await bankAccountComponentsPage.title.getText()).to.match(/Bank Accounts/);
    expect(await bankAccountComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BankAccounts', async () => {
    const beforeRecordsCount = (await isVisible(bankAccountComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bankAccountComponentsPage.table);
    bankAccountUpdatePage = await bankAccountComponentsPage.goToCreateBankAccount();
    await bankAccountUpdatePage.enterData();

    expect(await bankAccountComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bankAccountComponentsPage.table);
    await waitUntilCount(bankAccountComponentsPage.records, beforeRecordsCount + 1);
    expect(await bankAccountComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bankAccountComponentsPage.deleteBankAccount();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bankAccountComponentsPage.records, beforeRecordsCount);
      expect(await bankAccountComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bankAccountComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

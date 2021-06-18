import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OperationComponentsPage from './operation.page-object';
import OperationUpdatePage from './operation-update.page-object';
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

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let operationComponentsPage: OperationComponentsPage;
  let operationUpdatePage: OperationUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    operationComponentsPage = new OperationComponentsPage();
    operationComponentsPage = await operationComponentsPage.goToPage(navBarPage);
  });

  it('should load Operations', async () => {
    expect(await operationComponentsPage.title.getText()).to.match(/Operations/);
    expect(await operationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Operations', async () => {
    const beforeRecordsCount = (await isVisible(operationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(operationComponentsPage.table);
    operationUpdatePage = await operationComponentsPage.goToCreateOperation();
    await operationUpdatePage.enterData();
    expect(await isVisible(operationUpdatePage.saveButton)).to.be.false;

    expect(await operationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(operationComponentsPage.table);
    await waitUntilCount(operationComponentsPage.records, beforeRecordsCount + 1);
    expect(await operationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await operationComponentsPage.deleteOperation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(operationComponentsPage.records, beforeRecordsCount);
      expect(await operationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(operationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

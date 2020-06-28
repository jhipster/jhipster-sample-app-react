import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LabelComponentsPage from './label.page-object';
import LabelUpdatePage from './label-update.page-object';
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

describe('Label e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let labelComponentsPage: LabelComponentsPage;
  let labelUpdatePage: LabelUpdatePage;

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
    labelComponentsPage = new LabelComponentsPage();
    labelComponentsPage = await labelComponentsPage.goToPage(navBarPage);
  });

  it('should load Labels', async () => {
    expect(await labelComponentsPage.title.getText()).to.match(/Labels/);
    expect(await labelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Labels', async () => {
    const beforeRecordsCount = (await isVisible(labelComponentsPage.noRecords)) ? 0 : await getRecordsCount(labelComponentsPage.table);
    labelUpdatePage = await labelComponentsPage.goToCreateLabel();
    await labelUpdatePage.enterData();

    expect(await labelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(labelComponentsPage.table);
    await waitUntilCount(labelComponentsPage.records, beforeRecordsCount + 1);
    expect(await labelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await labelComponentsPage.deleteLabel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(labelComponentsPage.records, beforeRecordsCount);
      expect(await labelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(labelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

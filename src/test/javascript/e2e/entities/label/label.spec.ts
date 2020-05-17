import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LabelComponentsPage, { LabelDeleteDialog } from './label.page-object';
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
  let labelDeleteDialog: LabelDeleteDialog;
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

  it('should load Labels', async () => {
    await navBarPage.getEntityPage('label');
    labelComponentsPage = new LabelComponentsPage();
    expect(await labelComponentsPage.title.getText()).to.match(/Labels/);

    expect(await labelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([labelComponentsPage.noRecords, labelComponentsPage.table]);

    beforeRecordsCount = (await isVisible(labelComponentsPage.noRecords)) ? 0 : await getRecordsCount(labelComponentsPage.table);
  });

  it('should load create Label page', async () => {
    await labelComponentsPage.createButton.click();
    labelUpdatePage = new LabelUpdatePage();
    expect(await labelUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.label.home.createOrEditLabel/
    );
    await labelUpdatePage.cancel();
  });

  it('should create and save Labels', async () => {
    await labelComponentsPage.createButton.click();
    await labelUpdatePage.setLabelInput('label');
    expect(await labelUpdatePage.getLabelInput()).to.match(/label/);
    await waitUntilDisplayed(labelUpdatePage.saveButton);
    await labelUpdatePage.save();
    await waitUntilHidden(labelUpdatePage.saveButton);
    expect(await isVisible(labelUpdatePage.saveButton)).to.be.false;

    expect(await labelComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(labelComponentsPage.table);

    await waitUntilCount(labelComponentsPage.records, beforeRecordsCount + 1);
    expect(await labelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Label', async () => {
    const deleteButton = labelComponentsPage.getDeleteButton(labelComponentsPage.records.last());
    await click(deleteButton);

    labelDeleteDialog = new LabelDeleteDialog();
    await waitUntilDisplayed(labelDeleteDialog.deleteModal);
    expect(await labelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationReactApp.label.delete.question/);
    await labelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(labelDeleteDialog.deleteModal);

    expect(await isVisible(labelDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([labelComponentsPage.noRecords, labelComponentsPage.table]);

    const afterCount = (await isVisible(labelComponentsPage.noRecords)) ? 0 : await getRecordsCount(labelComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LabelComponentsPage from './label.page-object';
import { LabelDeleteDialog } from './label.page-object';
import LabelUpdatePage from './label-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Label e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let labelUpdatePage: LabelUpdatePage;
  let labelComponentsPage: LabelComponentsPage;
  let labelDeleteDialog: LabelDeleteDialog;

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

  it('should load Labels', async () => {
    await navBarPage.getEntityPage('label');
    labelComponentsPage = new LabelComponentsPage();
    expect(await labelComponentsPage.getTitle().getText()).to.match(/Labels/);
  });

  it('should load create Label page', async () => {
    await labelComponentsPage.clickOnCreateButton();
    labelUpdatePage = new LabelUpdatePage();
    expect(await labelUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /jhipsterSampleApplicationReactApp.label.home.createOrEditLabel/
    );
  });

  it('should create and save Labels', async () => {
    const nbButtonsBeforeCreate = await labelComponentsPage.countDeleteButtons();

    await labelUpdatePage.setLabelInput('label');
    expect(await labelUpdatePage.getLabelInput()).to.match(/label/);
    await waitUntilDisplayed(labelUpdatePage.getSaveButton());
    await labelUpdatePage.save();
    await waitUntilHidden(labelUpdatePage.getSaveButton());
    expect(await labelUpdatePage.getSaveButton().isPresent()).to.be.false;

    await labelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await labelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Label', async () => {
    await labelComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await labelComponentsPage.countDeleteButtons();
    await labelComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    labelDeleteDialog = new LabelDeleteDialog();
    expect(await labelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jhipsterSampleApplicationReactApp.label.delete.question/);
    await labelDeleteDialog.clickOnConfirmButton();

    await labelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await labelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
